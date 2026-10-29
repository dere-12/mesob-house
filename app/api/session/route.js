import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getSession();

  return Response.json(
    {
      user: user
        ? {
            name: user.name,
            role: user.role,
          }
        : null,
    },
    {
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
      },
    },
  );
}
