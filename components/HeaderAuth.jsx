"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { signOut } from "@/app/actions";

async function fetchSession(url) {
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Could not load session.");
  }

  return response.json();
}

export default function HeaderAuth() {
  const pathname = usePathname();

  const { data, mutate } = useSWR("/api/session", fetchSession, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  useEffect(() => {
    void mutate();
  }, [pathname, mutate]);

  const user = data?.user;

  if (!user) {
    return (
      <Link href="/signin" className="touch-target px-2 hover:underline">
        Sign in
      </Link>
    );
  }

  return (
    <>
      {user.role === "staff" && (
        <>
          <Link href="/kitchen" className="touch-target px-2 hover:underline">
            Kitchen
          </Link>

          <Link href="/dashboard" className="touch-target px-2 hover:underline">
            Dashboard
          </Link>
        </>
      )}

      <span className="px-2 text-sm">Hi, {user.name}</span>

      <form
        action={signOut}
        onSubmit={() => {
          void mutate({ user: null }, { revalidate: false });
        }}
      >
        <button type="submit" className="touch-target px-2 hover:underline">
          Sign out
        </button>
      </form>
    </>
  );
}
