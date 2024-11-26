import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import MenuLinks from "../reutilizable/MenuLinks"



type Props = {}

const MobileNav = ({ user }: MobileNavProps) => {
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image src='/icons/hamburger.svg' width={30} height={30} alt="menu" className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent side='left' className="border-none bg-white">
          <SheetTitle></SheetTitle>
          <SheetDescription>
          </SheetDescription>
          <MenuLinks isMobile={true} user={user} />
        </SheetContent>
      </Sheet>



    </section>
  )
}

export default MobileNav