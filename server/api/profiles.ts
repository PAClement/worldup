import {db} from "~/db";
import {auth} from "~/auth";
import {eq} from "drizzle-orm/sql/expressions/conditions";
import {mmoCorePlayerData, mmoProfilesPlayerData} from "~/external-schema";
import {isUuidMatchUserId} from "~/server/utils";

export default defineEventHandler(async (event) => {
  const { uuid } = await readBody<{ uuid: string }>(event)

  const session = await auth.api.getSession({
    headers: event.headers,
  })

  if (!await isUuidMatchUserId(session, uuid)) {
    return null
  }

  const rawProfiles = await db.select()
    .from(mmoProfilesPlayerData)
    .where(eq(mmoProfilesPlayerData.uuid, uuid ?? ''))

  if (!rawProfiles[0]?.data) {
    return null
  }

  const profiles = []
  for (const [profile, profileDetails] of Object.entries(JSON.parse(rawProfiles[0].data).Profiles)) {
    const rawProfile = await db.select()
      .from(mmoCorePlayerData)
      .where(eq(mmoCorePlayerData.uuid, profile ?? ''))

    profiles.push({ ...rawProfile[0], balance: (profileDetails as any).Balance })
  }

  return profiles
})