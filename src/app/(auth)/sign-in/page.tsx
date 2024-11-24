import AuthForm from "@/components/reutilizable/AuthForm"


type Props = {}

const SignIn = (props: Props) => {
  return (
    <section className="flex-center size-full max-w-xl mx-auto px-6">
      <AuthForm type='sign-in' />
    </section>
  )
}

export default SignIn