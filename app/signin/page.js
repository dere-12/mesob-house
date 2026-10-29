import { redirect } from "next/navigation";

import SignInForm from "./SignInForm";
import { getSession } from "@/lib/session";
import { safeNextPath } from "@/lib/redirects";

export const dynamic = "force-dynamic";

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const next = safeNextPath(params?.next);

  const user = await getSession();

  if (user) {
    redirect(next);
  }

  return (
    <main className="mx-auto w-[90%] max-w-md py-12">
      <h1 className="text-3xl font-bold">Sign in</h1>

      <p className="mt-3 text-gray-600">
        Sign in to view your orders and access checkout.
      </p>

      <SignInForm next={next} />
    </main>
  );
}
