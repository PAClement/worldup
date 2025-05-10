export const getUserImage = (session: any) => {
  const sessionImage = session?.data?.user?.image
  const sessionName = session?.data?.user?.name

  if (sessionImage && sessionImage.startsWith('storage/')) {
    return `profiles/${sessionImage.replace('storage/', '')}`
  } else if (sessionImage) {
    return sessionImage
  } else if (sessionName) {
    return `https://ui-avatars.com/api/?name=${sessionName}`
  } else {
    return null
  }
}