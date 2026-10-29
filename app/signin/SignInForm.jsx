"use client";

import { useActionState } from "react";
import { signIn } from "@/app/actions";

export default function SignInForm({ next }) {
  const [state, formAction, pending] = useActionState(signIn, null);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <input type="hidden" name="next" value={next} />

      <div>
        <label htmlFor="email" className="mb-1 block font-medium">
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block font-medium">
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      {state?.message && (
        <p role="alert" className="text-sm text-red-600">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-gray-900 px-5 py-2 text-white disabled:opacity-50"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
