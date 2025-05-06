import { ServerFile } from "nuxt-file-storage";
import {db} from "~/db";
import {user} from "~/auth-schema";
import {auth} from "~/auth";
import {eq} from "drizzle-orm/sql/expressions/conditions";

export default defineEventHandler(async (event) => {
  const { files } = await readBody<{ files: ServerFile[] }>(event)
  const session = await auth.api.getSession({
    headers: event.headers,
  })

  const fileName = await storeFileLocally(
    files[0],
    8,
    '/'
  )

  await db.update(user)
    .set({
      image: `storage/${fileName}`
    })
    .where(eq(user.id, session?.user?.id ?? ''))
})