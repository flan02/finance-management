'use client'
import { signIn, signUp } from "@/server/actions"
import { authFormSchema } from "@/zod/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"



const useFormSignIn = (type: string, setUser: any) => {
  const router = useRouter()
  const formType = type
  const formSchema = authFormSchema(formType)
  // Define your form

  const dfltValues = type === 'sign-in' ? {
    email: '',
    password: ''
  } : {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address1: '',
    city: '',
    state: '',
    postalCode: '',
    dateOfBirth: '',
    ssn: ''
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: dfltValues
  })

  // let { isLoading, isSubmitting, isSubmitted } = form.formState

  //Define a submit handler
  async function onSubmit(data: z.infer<typeof formSchema>) {
    //console.log(isLoading, isSubmitting, isSubmitted);
    //console.log(values)
    try {
      // Sign up with Appwrite & create plaid token

      if (type === 'sign-up') {
        const newUser = await signUp(data)
        setUser(newUser)
      }
      if (type === 'sign-in') {
        const response = await signIn({
          email: data.email,
          password: data.password
        })
        if (response) router.push('/')
      }

    } catch (error) {
      console.error(error)
    }
  }
  return { form, onSubmit, setUser }
}

export default useFormSignIn