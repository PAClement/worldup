export const getUserImage = (session: any) => {
  return session?.data?.user?.image || `https://ui-avatars.com/api/?name=${session?.data?.user?.name}`
}