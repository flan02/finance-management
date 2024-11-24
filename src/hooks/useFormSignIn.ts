import { authFormSchema } from "@/zod/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"



const useFormSignIn = (type: string) => {
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

  //let { isLoading, isSubmitting } = form.formState

  //Define a submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values
    // This will be type-safe and validated.
    //console.log(isLoading, isSubmitting);
    console.log(values)
  }
  return { form, onSubmit }
}

export default useFormSignIn