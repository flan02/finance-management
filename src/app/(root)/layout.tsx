// * Special layout that is used for the root of the application.

import MobileNav from "@/components/custom/MobileNav";
import Sidebar from "@/components/custom/Sidebar";
import { getLoggedInUser } from "@/server/actions";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const loggedIn = { firstName: 'Dan', lastName: 'Chanivet', email: 'chanivetdan@hotmail.com' }
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) redirect('/sign-in')
  //console.log("ROOT LAYOUT", loggedIn);
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedIn} />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src='/icons/logo.svg' width={30} height={30} alt="app-logo" />
          <div>
            <MobileNav user={loggedIn} />

          </div>
        </div>
        {children}
      </div>
    </main>
  );
}