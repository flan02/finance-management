"use server"

import { Client } from "dwolla-v2"

export interface CreateFundingSourceOptions {
  customerId: string; // Dwolla Customer ID
  fundingSource: string; // Dwolla Funding Source Name
  plaidToken: string; // Plaid Account Processor Token
  _lins: object; // Dwolla On Demand Authorization Link
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
