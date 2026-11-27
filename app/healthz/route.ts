/** Container healthcheck. Static so it also exists in the static export. */
export const dynamic = "force-static";

export function GET() {
  return new Response("ok\n", {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
