import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link
} from '@nextui-org/react'
import { ConnectKitButton } from 'connectkit'
function Nav () {
  return (
    <Navbar className='fixed' >
      <NavbarBrand>
        <Link href='/' className='font-bold text-inherit'>BOOMIE</Link>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <Link color='foreground' href='/user-panel'>
            Panel de usuario
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href='make-deposit' aria-current='page'>
            Crear ordenenes
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem className='hidden lg:flex'>
          <Link href='#'>Login</Link>
        </NavbarItem>
        <NavbarItem>
          <ConnectKitButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export { Nav }
