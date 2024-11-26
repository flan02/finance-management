'use server'

import { ID, Query } from "node-appwrite";
import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "./appwrite";
import { parseStringify } from "@/lib/utils";

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

export const signIn = async (userData: signInProps) => {
  console.log('userData server component', userData);
  try {
    const { account } = await createAdminClient()
    const session = await account.createEmailPasswordSession(userData.email, userData.password)

    cookies().set('appwrite-session', session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true
    })

    console.log("CURRENT SESSION", session.userId);
    const user = await getUserInfo({ userId: session.userId })

    return parseStringify(user)
  } catch (error) {
    console.log('Error', error);
  }
}

export const signUp = async (userData: SignUpParams) => {
  try {
    // Create a user account
    const { account } = await createAdminClient()
    const newUserAccount = await account.create(
      ID.unique(),
      userData.email,
      userData.password,
      `${userData.firstName} ${userData.lastName}`
    )

    // Create a session
    const session = await account.createEmailPasswordSession(userData.email, userData.password)

    // Set the session cookie
    cookies().set('appwrite-session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true
    })

    // ? custom fc -> JSON.parse(JSON.stringify(value))
    return parseStringify(newUserAccount) // ! Next.js doesn't like the circular structure of the object so we need to stringify it first

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
    const user = await account.get()
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