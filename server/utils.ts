import {db} from "~/db";
import {mcAccountLink} from "~/auth-schema";
import {and, eq} from "drizzle-orm/sql/expressions/conditions";

export const isUuidMatchUserId = async (session: any, uuid: string) => {
  const userId = session?.data?.user?.id

  const row = await db.select()
    .from(mcAccountLink)
    .where(and(
      eq(mcAccountLink.userId, userId ?? ''),
      eq(mcAccountLink.mcUuid, uuid ?? '')
    ))

  return !!row
}