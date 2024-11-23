
import MenuLinks from '../reutilizable/MenuLinks'


type Props = {}

const Sidebar = ({ user }: SiderbarProps) => {

  return (
    <section className='sidebar'>
      <MenuLinks isMobile={false} />
      FOOTER
    </section>
  )
}

export default Sidebar