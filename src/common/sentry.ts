import * as Sentry from '@sentry/serverless';
import * as  Tracing from "@sentry/tracing";
import * as  mongodb from "mongodb";


Sentry.AWSLambda.init({
    dsn: "https://22ff1da84945405b9e2181583cc9014d@o1242863.ingest.sentry.io/6397684",
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Mongo({
            useMongoose: true // Default: false
        })
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

export const setTransaction = (op = "sentry-test", name = "sentry test transaction") => {
    const transaction = Sentry.startTransaction({
        op, name
    })

    Sentry.configureScope(scope => {
        scope.setSpan(transaction);
    });

    return transaction;
}



export const SentryWrapper = Sentry;
