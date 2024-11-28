'use client'
import { signIn, signUp } from "@/server/user.actions"
import { authFormSchema } from "@/zod/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"



const useFormSignIn = (type: string, setUser: any) => {
  const router = useRouter()
  //const formType = type
  let formSchema = authFormSchema(type)
  // Define your form

  const dfltValues = type === 'sign-in' ? {
    email: '',
    password: ''
  } : {
    firstName: '',
    lastName: '',
    address1: '',
    city: '',
    state: '',
    postalCode: '',
    dateOfBirth: '',
    ssn: '',
    email: '',
    password: ''
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: dfltValues
  })

  // let { isLoading, isSubmitting, isSubmitted } = form.formState

  // ? Define a submit handler
  async function onSubmit(data: z.infer<typeof formSchema>) {
    //console.log(isLoading, isSubmitting, isSubmitted);
    // console.log(data)
    try {
      // Sign up with Appwrite & create plaid token
      const userData = {
        firstName: data.firstName!,
        lastName: data.lastName!,
        address1: data.address1!,
        city: data.city!,
        state: data.state!,
        postalCode: data.postalCode!,
        dateOfBirth: data.dateOfBirth!,
        ssn: data.ssn!,
        email: data.email,
        password: data.password
      }

      if (type === 'sign-up') {
        const newUser = await signUp(userData)
        setUser(newUser)
      }

      if (type === 'sign-in') {
        const userData = {
          email: data.email,
          password: data.password
        }
        const response = await signIn(userData) as unknown as User
        console.log('CURRENT RESPONSE', response)
        router.push('/')

      }

    } catch (error) {
      console.error(error)
    }
  }
  return { form, onSubmit, setUser }
}

export default useFormSignIn