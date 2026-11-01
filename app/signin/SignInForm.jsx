"use client";

import { useActionState, useState } from "react";
import { signIn } from "@/app/actions";

const DEMO_ACCOUNTS = {
  customer: {
    email: "customer@addiseats.local",
    password: "1234",
  },
  staff: {
    email: "staff@addiseats.local",
    password: "1234",
  },
};

export default function SignInForm({ next }) {
  const [state, formAction, pending] = useActionState(signIn, null);

  const [selectedAccount, setSelectedAccount] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleGuest(guestType) {
    const credentials = DEMO_ACCOUNTS[guestType];

    if (!credentials) return;

    setSelectedAccount(guestType);
    setEmail(credentials.email);
    setPassword(credentials.password);
  }

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <input type="hidden" name="next" value={next ?? "/"} />

      <div>
        <label htmlFor="email" className="mb-1 block font-medium">
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setSelectedAccount(null);
          }}
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
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setSelectedAccount(null);
          }}
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

      <div>
        <p>
          Don&apos;t you have an account? Continue as
          <button
            type="button"
            aria-pressed={selectedAccount === "customer"}
            className="px-1 text-gray-900 hover:cursor-pointer"
            onClick={() => handleGuest("customer")}
          >
            Customer
          </button>
          or
          <button
            type="button"
            aria-pressed={selectedAccount === "staff"}
            className="px-1 text-gray-900 hover:cursor-pointer"
            onClick={() => handleGuest("staff")}
          >
            Staff
          </button>
        </p>
      </div>
    </form>
  );
}
