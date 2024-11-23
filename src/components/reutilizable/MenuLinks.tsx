'use client'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


type Props = {
  isMobile: boolean
  className?: string
}

const MenuLinks = ({ isMobile, className }: Props) => {
  const pathName = usePathname()
  console.log(isMobile);
  return (
    <nav className='flex flex-col gap-4'>
      <Link href='/' className={`${isMobile ? 'gap-1 px-4' : 'mb-12 gap-2'} cursor-pointer flex items-center`}>
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
            className={cn(`${isMobile ? 'mobilenav-sheet_close w-full' : 'sidebar-link'}`, { 'bg-bank-gradient': isActive })} >
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
      USER
    </nav>
  )
}

export default MenuLinks