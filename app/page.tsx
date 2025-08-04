import { SignUpButton } from "@clerk/nextjs"

const page = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      Welcome
      <SignUpButton />
    </div>
  )
}

export default page
