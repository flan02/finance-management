import { Control, FieldPath } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { authFormSchema } from "@/zod/schema"
import { z } from "zod"

const formSchema = authFormSchema('sign-up')

type FormSchema = z.infer<typeof formSchema> // ! The actual form is authFormSchema, we will add later.

// type SelectedField = Pick<FormSchema, 'email' | 'password'>
// type SelectedFieldPaths = FieldPath<SelectedField> // * We create one single source of truth for the form schema

interface InputProps {
  control: Control<FormSchema>
  name: FieldPath<FormSchema> // SelectedFieldPaths
  label: string
  placeholder: string
}

const InputCustom = ({ control, name, label, placeholder }: InputProps) => {

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              autoComplete={name === 'password' ? 'new-password' : 'new-username'}
              type={name === 'password' ? 'password' : 'text'}
              className='input-class'
              placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage className='text-red-600' />
        </FormItem>
      )}
    />
  )
}

export default InputCustom