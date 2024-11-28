# Finance Management

Dashboard designed to show our preferred finance flow.

## Chart.js

[website](https://www.chartjs.org/)

## App Write

[website](https://appwrite.io/)

[docs](https://appwrite.io/docs)

**Appwrite is an open-source platform for building applications at any scale, using your preferred programming languages and tools.**

## Sentry

[website](https://sentry.io/welcome/?utm_source=google&utm_medium=cpc&utm_id={20403208976}&utm_campaign=Google_Search_Brand_SentryKW_ROW_Alpha&utm_content=g&utm_term=sentry)

**Sentry is an open-source platform, enterprise level, for workflow automation. Also it is an application monitoring software.**

_For banking apps we especially leverage session replay features. This feature watching replays of real user sessions in Sentry._

## Plaid

[website](https://plaid.com/)

**Plaid is a technology company that builds infrastructure for financial services.**

_It gives us a simple way to connect our apps to thousands of different. Additionally guarantees the data we send between the app and the bank is secured. So devs don't have to handle the sentitive stuff._

Use `Dwolla` with Plaid Auth to send and receive payments

**Dwolla is a payment processor that allows you to send and receive payments. It is a payment platform that securely connects to bank accounts and allows you to move money.**

[dwolla website](https://www.dwolla.com/)

[dwolla docs](https://developers.dwolla.com/docs)

---

* Plaid shares the data between those transactions and Dwolla actually makes that happen (Processes the payment).

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
