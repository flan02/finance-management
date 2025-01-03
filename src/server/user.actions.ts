'use server'

import { ID, Query } from "node-appwrite";
import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "./appwrite";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "@/lib/utils";
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
import { plaidClient } from "@/lib/plaid";
import { revalidatePath } from "next/cache";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";



const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal('userId', [userId])]
    )

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error)
  }
}

export const signIn = async ({ email, password }: signInProps) => {
  // console.log('userData server component', userData);
  try {
    const { account } = await createAdminClient()
    const session = await account.createEmailPasswordSession(email, password)

    cookies().set('appwrite-session', session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true
    })

    // console.log("CURRENT SESSION", session.userId);
    const user = await getUserInfo({ userId: session.userId }) // ? Info got from bbdd

    return parseStringify(user)
  } catch (error) {
    console.log('Error', error);
  }
}

export const signUp = async ({ password, ...userData }: SignUpParams) => {
  const { email, firstName, lastName } = userData // ? This way userData contains all info except password
  //const name = `${firstName} ${lastName}`
  //const id = ID.unique()

  let newUserAccount

  try {
    // Create a user account
    const { account, database } = await createAdminClient()

    newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    )

    if (!newUserAccount) throw new Error('Error creating user.')

    // Create a Dwolla customer
    const dwollaCustomerUrl = await createDwollaCustomer({ ...userData, type: 'personal' })

    if (!dwollaCustomerUrl) throw new Error('Error creating Dwolla customer.')

    const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl)

    // ? Create a user document in our database
    // let userDB = { ...userData, userId: newUserAccount.$id, dwollaCustomerId, dwollaCustomerUrl }
    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      { ...userData, userId: newUserAccount.$id, dwollaCustomerId, dwollaCustomerUrl }
    )

    // Create a session
    const session = await account.createEmailPasswordSession(email, password)

    // Set the session cookie
    cookies().set('appwrite-session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true
    })

    // ? custom fc -> JSON.parse(JSON.stringify(value))
    return parseStringify(newUser) // ! Next.js doesn't like the circular structure of the object so we need to stringify it first

  } catch (error) {
    console.log('Error', error);
  }
}

// TODO -> This fc is provided by appwrite
export async function getLoggedInUser() {
  try {
    // Get the logged in user
    const { account } = await createSessionClient()

    // return await account.get()
    const result = await account.get()

    const user = await getUserInfo({ userId: result.$id })

    return parseStringify(user) // ! Next.js doesn't like the circular structure of the object so we need to stringify it first
  } catch (error) {
    console.log('Error', error);
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient()
    cookies().delete('appwrite-session')

    await account.deleteSession('current')
  } catch (error) {
    return null
  }
}


export const createLinkToken = async (user: User) => {

  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id,
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ['auth'] as Products[],
      language: 'en',
      country_codes: ['US'] as CountryCode[],
    }

    // * plaidClient is a instance of the Plaid SDK
    const response = await plaidClient.linkTokenCreate(tokenParams)

    return parseStringify({
      linkToken: response.data.link_token
    })
  } catch (error) {
    console.log(error);
  }
}

export const createBankAccount = async ({ userId, bankId, accountId, accessToken, fundingSourceUrl, shareableId }: createBankAccountProps) => {

  try {
    const { database } = await createAdminClient()

    const bankAccount = await database.createDocument(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        shareableId
      }
    )

    return parseStringify(bankAccount)

  } catch (error) {
    console.error('An error occured while creating bank account: ', error);
  }
}

export const exchangePublicToken = async ({ publicToken, user }: exchangePublicTokenProps) => {
  try {
    // * Exchange the public token for a Plaid access token and item ID
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken
    })

    const accessToken = response.data.access_token
    const itemId = response.data.item_id

    // * Get account info from Plaid using the access token
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken
    })

    const accountData = accountsResponse.data.accounts[0]

    // * Create a processor token for Dwolla using the access token and account ID
    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: 'dwolla' as ProcessorTokenCreateRequestProcessorEnum
    }

    const processorTokenResponse = await plaidClient.processorTokenCreate(request)
    const processorToken = processorTokenResponse.data.processor_token

    // * Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
    // ? addFundingSource is a custom fc coming from the Dwolla SDK
    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name
    })

    // * If the funding source URL is not created, throw an error
    //if(!fundingSourceUrl) throw new Error
    if (fundingSourceUrl === undefined || fundingSourceUrl === null) throw new Error('Funding source URL not created');

    // * Create a bank account using the user ID, item ID, and account ID, access token, funding source URL, and shareable ID
    // ? custom SERVER ACTION
    await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      shareableId: encryptId(accountData.account_id)
    })

    // Revalidate the path to reflect the changes
    revalidatePath('/')

    // Return a success message
    return parseStringify({
      publicTokenExchange: 'complete'
    })

  } catch (error) {
    console.error('An error occured white creating exchanging token: ', error);
  }
}

export const getBanks = async ({ userId }: getBanksProps) => {
  try {
    const { database } = await createAdminClient()

    const banks = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal('userId', [userId])]
    )

    return parseStringify(banks.documents)
  } catch (error) {
    console.error("Error retrieving bank accounts", error)
  }
}

export const getBank = async ({ documentId }: getBankProps) => {
  try {
    const { database } = await createAdminClient();

    const bank = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal('$id', [documentId])]
    )

    return parseStringify(bank.documents[0]);
  } catch (error) {
    console.log(error)
  }
}


export const getBankByAccountId = async ({ accountId }: getBankByAccountIdProps) => {
  try {
    const { database } = await createAdminClient();

    const bank = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal('accountId', [accountId])]
    )

    if (bank.total !== 1) return null;

    return parseStringify(bank.documents[0]);
  } catch (error) {
    console.log(error)
  }
}