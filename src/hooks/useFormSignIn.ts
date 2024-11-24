import { formSchema } from "@/zod/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


const useFormSignIn = () => {
  // Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  //Define a submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values
    // This will be type-safe and validated.
    console.log(values)
  }
  return { form, onSubmit }
}

export default useFormSignIn