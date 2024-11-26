// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.

// TODO -> https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://b133b1f258b73c974144fc08a7d87f0e@o4508365664878592.ingest.us.sentry.io/4508365666582529",

  // Add optional integrations for additional features
  integrations: [
    Sentry.replayIntegration(),
  ],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,
  // While you're testing, we recommend that you set replaysSessionSampleRate to 1.0. This ensures that every user session will be sent to Sentry


  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
