import * as Sentry from "@sentry/nextjs";
import createSupabaseServerClient from "./supabase/server";

export const withSentrySpan = async <T>(name: string, fn: () => Promise<T>) => {
  return Sentry.startSpan({ op: "db.query", name }, async () => {
    try {
      return await fn();
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  });
};

export const getSupabaseClient = async () => {
    return await createSupabaseServerClient();
  };
  