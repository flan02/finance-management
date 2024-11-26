
import MenuLinks from '../reutilizable/MenuLinks'
import Footer from './Footer'

const Sidebar = ({ user }: SiderbarProps) => {

  return (
    <section className='sidebar'>
      <MenuLinks isMobile={false} user={user} />
      <Footer user={user} type='desktop' />
    </section>
  )
}

export default Sidebar