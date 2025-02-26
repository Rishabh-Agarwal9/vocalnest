'use client';

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { SignedIn, SignedOut, useClerk,useUser } from '@clerk/nextjs';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button';
import { useAudio } from '@/providers/AudioProvider';

const LeftSidebar = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { audio } = useAudio();

  return (
    <section className={cn("left_sidebar h-[calc(100vh-5px)]", {
      'h-[calc(100vh-140px)]': audio?.audioUrl
    })}>
      <nav className="flex flex-col gap-6">
        <Link href="/" className="flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center">
          <Image src="/icons/logo.svg" alt="logo" width={23} height={27} />
          <h1 className="text-24 font-extrabold text-white max-lg:hidden">VocalNest</h1>
        </Link>

        {sidebarLinks.map(({ route, label, imgURL }) => {
          const isActive = pathname === route || pathname.startsWith(`${route}/`);

          if(label==="Your Profile"){
            return <SignedIn key ={label}>
              <Link href={`${route}/${user?.id}`} key={label} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start", {
              'bg-nav-focus border-r-4 border-orange-1': isActive
            })}>
              <Image src={imgURL} alt={label} width={24} height={24} />
              <p>{label}</p>
              </Link>
            </SignedIn>
             
          }
          else{
            return <Link href={route} key={label} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start", {
              'bg-nav-focus border-r-4 border-orange-1': isActive
            })}>
              <Image src={imgURL} alt={label} width={24} height={24} />
              <p>{label}</p>
            </Link>
          }
        })}
      </nav>  
      <SignedOut>
        <div className="flex-center flex-col w-full pb-14 max-lg:px-4 lg:pr-8">
          <Button asChild className="text-16 w-full bg-orange-1 font-extrabold">
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <div className="flex items-center text-slate-400 mt-4">
            <Link href="https://github.com/Rishabh-Agarwal9/vocalnest" target="_blank" rel="noopener noreferrer" className="mr-2">
              <Image src="/icons/github.svg" width={20} height={20} alt="Github" />
            </Link>
            <span>Made by Rishabh</span>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
      <div className="flex-center flex-col w-full pb-14 max-lg:px-4 lg:pr-8">
          <Button className="text-16 w-full bg-orange-1 font-extrabold" onClick={() => signOut(() => router.push('/'))}>
            Log Out
          </Button> 
          <div className="flex items-center text-slate-400 mt-4">
            <Link href="https://github.com/Rishabh-Agarwal9/vocalnest" target="_blank" rel="noopener noreferrer" className="mr-2">
              <Image src="/icons/github.svg" width={20} height={20} alt="Github" />
            </Link>
            <span>Made by Rishabh</span>
          </div>
        </div>
      </SignedIn>
    </section>
  )
}
 
export default LeftSidebar