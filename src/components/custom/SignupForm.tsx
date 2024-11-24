import React from 'react'
import InputCustom from '../reutilizable/InputCustom'

type Props = {
  control: any // Control<FormSchema>
}

interface FormFields {
  name: "firstName" | "lastName" | "address1" | "state" | "postalCode" | "dateOfBirth" | "ssn";
  label: string;
  placeholder: string
}

const formFields: Array<FormFields> = [
  {
    name: 'firstName',
    label: 'First Name',
    placeholder: 'Enter your first name'
  },
  {
    name: 'lastName',
    label: 'Last Name',
    placeholder: 'Enter your last name'
  },
  {
    name: 'address1',
    label: 'Address',
    placeholder: 'Enter your specific address'
  },
  {
    name: 'state',
    label: 'State',
    placeholder: 'Example: Boston'
  },
  {
    name: 'postalCode',
    label: 'Postal Code',
    placeholder: 'Example: 11101'
  },
  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    placeholder: 'YYYY-MM-DD'
  },
  {
    name: 'ssn',
    label: 'SSN',
    placeholder: 'Example: 1234'
  }
]

const SignupForm = ({ control }: Props) => {
  return (
    <>
      {
        formFields.map((field, index) => {
          if (index % 2 === 0) {
            return (
              <div key={`group-${index}`} className='flex gap-4 max-w-full'>
                <InputCustom
                  key={index}
                  control={control}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                />
                {
                  formFields[index + 1] && (
                    <InputCustom
                      key={index + 1}
                      control={control}
                      name={formFields[index + 1].name}
                      label={formFields[index + 1].label}
                      placeholder={formFields[index + 1].placeholder}
                    />
                  )
                }
              </div>
            )
          }
          return null;
        })
      }
    </>
  )
}

export default SignupForm