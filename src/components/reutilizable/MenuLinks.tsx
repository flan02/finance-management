'use client'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Footer from '../custom/Footer'


type Props = {
  isMobile: boolean
  className?: string
  user: any
}

const MenuLinks = ({ isMobile, className, user }: Props) => {
  const pathName = usePathname()
  //console.log(isMobile);
  return (

    <nav className='flex flex-col justify-between gap-4 h-screen'>

      <div >
        <Link href='/' className={`${isMobile ? 'gap-1 px-4 mb-8' : 'mb-12 gap-2'} cursor-pointer flex items-center`}>
          <Image
            src='/icons/logo.svg'
            alt='app-logo'
            width={34}
            height={34}
            className={isMobile ? '' : 'size-[24px] max-xl:size-14'}
          />
          <h1 className={isMobile ? 'text-26 font-bold text-black-1 font-ibm-plex-serif' : 'sidebar-logo'}>CashLens</h1>
        </Link>
        {
          sidebarLinks.map((link, index) => {
            const isActive = pathName === link.route || pathName.startsWith(`${link.route}/`)

            return <Link href={link.route} key={link.label}
              className={cn(`${isMobile ? 'mobilenav-sheet_close w-full space-y-1' : 'sidebar-link'}`, { 'bg-bank-gradient': isActive })} >
              <div className={`${isMobile ? 'size-5' : 'size-6'} relative`}>
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  fill
                  className={cn({ 'brightness-[3] invert-0': isActive })}
                />
              </div>
              <p className={cn(`${isMobile
                ? 'text-16 font-semibold text-black-2'
                : 'sidebar-label'}`,
                {
                  [`${isMobile
                    ? 'text-white'
                    : '!text-white'}`]: isActive
                })
              }>{link.label}</p>
            </Link>

          })
        }
      </div>

      {
        isMobile && <Footer user={user} type='mobile' />
      }
    </nav>
  )
}

export default MenuLinks