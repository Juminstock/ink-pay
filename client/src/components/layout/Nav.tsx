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
    <Navbar>
      <NavbarBrand>
        <p className='font-bold text-inherit'>BOOMIE</p>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <Link color='foreground' href='#'>
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href='#' aria-current='page'>
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color='foreground' href='#'>
            Integrations
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
