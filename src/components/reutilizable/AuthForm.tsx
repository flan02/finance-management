'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import useFormSignIn from '@/hooks/useFormSignIn'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import InputCustom from './InputCustom'

type Props = {
  type: string
}

const AuthForm = ({ type }: Props) => {
  const [user, setUser] = useState(null)

  const { form, onSubmit } = useFormSignIn()


  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href="/" className='cursor-pointer flex items-center gap-1 px-4'>
          <Image src='/icons/logo.svg' alt='Logo' width={34} height={34} />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">CashLens</h1>
        </Link>
        <div className='flex flex-col gap-1 md:gap-3'>
          <h2 className='text-24 lg:text-36 font-semibold text-gray-900'>
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
              : 'Please enter your credentials to proceed'

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <InputCustom control={form.control} name="email" label="Email" placeholder="Enter your email" />
              <InputCustom control={form.control} name="password" label="Password" placeholder="******" />
              <div className='text-center'>
                <Button type="submit" className='hover:bg-gray-200'>Submit</Button>
              </div>
            </form>
          </Form>
        )
      }
    </section>
  )
}

export default AuthForm