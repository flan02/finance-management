// * Special layout that is used for the root of the application.

import MobileNav from "@/components/custom/MobileNav";
import Sidebar from "@/components/custom/Sidebar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const loggedIn = { firstName: 'Dan', lastName: 'Chanivet', email: 'chanivetdan@hotmail.com' }

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