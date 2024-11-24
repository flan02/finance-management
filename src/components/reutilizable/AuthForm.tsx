'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import useFormSignIn from '@/hooks/useFormSignIn'
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import InputCustom from './InputCustom'
import { Loader2 } from 'lucide-react'
import SignupForm from '../custom/SignupForm'


type Props = {
  type: string
}

const AuthForm = ({ type }: Props) => {
  const [user, setUser] = useState(null)

  const { form, onSubmit } = useFormSignIn(type)
  let { isLoading, isSubmitting, isSubmitted } = form.formState
  //isLoading = true // ? Uncomment this line to see the loader

  //const formSchema = authFormSchema('sign-up')

  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href="/" className='cursor-pointer flex items-center gap-1 px-4'>
          <Image src='/icons/logo.svg' alt='Logo' width={34} height={34} />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">CashLens</h1>
        </Link>
        <div className='flex flex-col gap-1 md:gap-3'>
          <h2 className='text-24 lg:text-36 font-semibold text-gray-900 text-center'>
            {user
              ? 'Link Account'
              : type === 'sign-in'
                ? 'Sign In'
                : 'Sign Up'
            }

          </h2>
          <span className='text-16 font-normal text-gray-600'>
            {user
              ? 'Link your account to get started'
              : type === 'sign-in'
                ? 'Please sign in to continue'
                : 'Register to get started'

            }
          </span>
        </div>
      </header>
      {
        user ? (
          <div className='flex flex-col gap-4'>
            {/* PlaidLink */}
          </div>
        ) : (
          <>
            <Form {...form} >
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 min-w-[350px] w-[450px] lg:w-[600px]">
                <div className={`${type == 'sign-up' ? 'grid place-content-center' : 'w-[420px] mx-auto px-4'}`}>
                  {type === 'sign-up' && <SignupForm control={form.control} />}
                  <InputCustom control={form.control} name="email" label="Email" placeholder="Enter your email" />
                  <InputCustom control={form.control} name="password" label="Password" placeholder="******" />
                </div>

                <div className='w-[420px] mx-auto px-4'>
                  <Button
                    disabled={isLoading || isSubmitting || isSubmitted}
                    type="submit"
                    className='form-btn w-full'>
                    {
                      isLoading || isSubmitting
                        ? <>
                          <Loader2 size={20} className='animate-spin' /> Loading...
                        </>
                        : type === 'sign-in' ? 'Sign In' : 'Sign Up'
                    }
                  </Button>
                </div>
              </form>
            </Form>

            <footer className='flex justify-center gap-1'>
              <p className='text-14 font-normal text-gray-600'>
                {type === 'sign-in' ? 'Don’t have an account?' : 'Already have an account?'}
              </p>
              <Link
                className='form-link'
                href={
                  type === 'sign-in'
                    ? '/sign-up'
                    : '/sign-in'
                }
              >
                {
                  type === 'sign-in' ? 'Sign Up' : 'Sign In'
                }
              </Link>
            </footer>
          </>
        )
      }
    </section>
  )
}

export default AuthForm

/* 
This is a hidden input to prevent autofill on the form  
  Web browsers will autocomplete this hidden field 
  <input type="text" style={{ display: 'none' }} autoComplete="username" />
*/