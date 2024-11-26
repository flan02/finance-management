import AuthForm from "@/components/reutilizable/AuthForm"
import { getLoggedInUser } from "@/server/actions"


type Props = {}

const SignUp = async () => {
  // const loggedInUser = await getLoggedInUser()
  // console.log(loggedInUser);
  return (
    <section className="flex-center size-full max-w-xl mx-auto px-6">
      <AuthForm type='sign-up' />
    </section>
  )
}

export default SignUp