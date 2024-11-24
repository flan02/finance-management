import AuthForm from "@/components/reutilizable/AuthForm"


type Props = {}

const SignUp = (props: Props) => {
  return (
    <section className="flex-center size-full max-w-xl mx-auto px-6">
      <AuthForm type='sign-up' />
    </section>
  )
}

export default SignUp