"use server"

import { Client } from "dwolla-v2"

export interface CreateFundingSourceOptions {
  customerId: string; // Dwolla Customer ID
  fundingSourceName: string; // Dwolla Funding Source Name
  plaidToken: string; // Plaid Account Processor Token
  _links: object; // Dwolla On Demand Authorization Link
}

type Environment = 'sandbox' | 'production'

const getEnvironment = (): Environment => {
  const environment = process.env.DWOLLA_ENV as string
  switch (environment) {
    case 'sandbox':
      return 'sandbox'
    case 'production':
      return 'production'
    default:
      throw new Error('Dwolla environment should either be set to `sandbox` or `production`')
  }
}

const dwollaClient = new Client({
  environment: getEnvironment(),
  key: process.env.DWOLLA_KEY as string,
  secret: process.env.DWOLLA_SECRET as string,
})

// ? Create a Dwolla Funding Source using a Plaid Processor Token

export const createFundingSource = async (options: CreateFundingSourceOptions) => {
  try {
    return await dwollaClient.post(`customers/${options.customerId}/funding-sources`, {
      name: options.fundingSourceName,
      plaidToken: options.plaidToken
    })
  } catch (error) {
    console.error("Creating an On Demand Authorization Failed: ", error)
  }
}

export const createOnDemandAuthorization = async () => {
  try {
    const onDemandAuthorization = await dwollaClient.post('on-demand-authorizations')
    const authLink = onDemandAuthorization.body._links
    return authLink
  } catch (error) {
    console.error("Creating an On Demand Authorization Failed: ", error)

  }
}


export const createDwollaCustomer = async (newCustomer: NewDwollaCustomerParams) => {
  try {
    return await dwollaClient.post('customers', newCustomer).then((res: any) => res.headers.get('location'))
  } catch (error) {
    console.error("Creating a Dwolla Customer Failed: ", error)
  }
}


export const createTransfer = async ({ sourceFundingSourceUrl, destinationFundingSourceUrl, amount }: TransferParams) => {
  try {
    const requestBody = {
      _links: {
        source: {
          href: sourceFundingSourceUrl
        },
        destination: {
          href: destinationFundingSourceUrl
        }
      },
      amount: {
        currency: 'USD',
        value: amount
      }
    }

    // For Dwolla API applications, an dwolla can be used for this endpoint.
    return await dwollaClient.post('transfers', requestBody).then((res: any) => res.headers.get('location'))
  } catch (error) {
    console.error("Transfer fund failed: ", error)
  }
}


export const addFundingSource = async ({ dwollaCustomerId, processorToken, bankName }: AddFundingSourceParams) => {
  try {
    // ? Create dwolla auth link
    const dwollaAuthLinks = await createOnDemandAuthorization()

    // ? add funding source to the dwolla customer & get the funding source url
    const fundingSourceOptions: CreateFundingSourceOptions = {
      customerId: dwollaCustomerId,
      fundingSourceName: bankName,
      plaidToken: processorToken,
      _links: dwollaAuthLinks
    }

  } catch (error) {
    console.error("Transfer fund failed: ", error)
  }
}