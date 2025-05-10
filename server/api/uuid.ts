import {db} from "~/db";
import {mcAccountLink, user} from "~/auth-schema";
import {auth} from "~/auth";
import {eq} from "drizzle-orm/sql/expressions/conditions";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  })

  const row = await db.select()
    .from(mcAccountLink)
    .where(eq(mcAccountLink.userId, session?.user?.id ?? ''))

  return row[0]?.mcUuid
})