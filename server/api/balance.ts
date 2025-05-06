import {db} from "~/db";
import {auth} from "~/auth";
import {eq} from "drizzle-orm/sql/expressions/conditions";
import {xConomy} from "~/external-schema";
import {isUuidMatchUserId} from "~/server/utils";

export default defineEventHandler(async (event) => {
  const { uuid } = await readBody<{ uuid: string }>(event)

  const session = await auth.api.getSession({
    headers: event.headers,
  })

  if (!await isUuidMatchUserId(session, uuid)) {
    return null
  }

  const row = await db.select()
    .from(xConomy)
    .where(eq(xConomy.uid, uuid ?? ''))

  return row[0]
})