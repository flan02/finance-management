# Finance Management

Dashboard designed to show our preferred finance flow.

## Chart.js

[here](https://www.chartjs.org/)

## App Write

[here](https://appwrite.io/)

[docs](https://appwrite.io/docs)

**Appwrite is an open-source platform for building applications at any scale, using your preferred programming languages and tools.**

## Sentry

[here](https://sentry.io/welcome/?utm_source=google&utm_medium=cpc&utm_id={20403208976}&utm_campaign=Google_Search_Brand_SentryKW_ROW_Alpha&utm_content=g&utm_term=sentry)

**Sentry is an open-source platform, enterprise level, for workflow automation.**

## Plaid

[here](https://plaid.com/)

**Plaid is a technology company that builds infrastructure for financial services.**

Use Dwolla with Plaid Auth to send and receive payments

### Server actions

**Server actions are asynchronous functions that are executed on the server. They can be used in Server and Client Components to handle form submissions and data mutations in Next.js applications.**

You can define a server action in two ways:

- Using the `server` keyword in an async function.

```ts
// Server Component
export default function Page(){
  // Server Action
  async function create(){
    'use server'
    try {
     // Mutation / Database / Make fetch
    } catch (error) {
      console.error(error)
    }
  }
}
```

---

- You can just create a new file named `actions.ts`.

```ts
'use server'

export async function create(){
  try {
     // Mutation / Database / Make fetch
    } catch (error) {
      console.error(error)
    }
}
```

We import our server action in our Client component (i.e. button.tsx)

```ts
import { create } from '@/app/actions'

export function Button(){
  return <button onClick={create}>Create</button>
}
```
