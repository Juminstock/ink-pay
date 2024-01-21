import { Outlet } from 'react-router-dom'
import { Nav } from '@/components/layout/'

function Layout () {
  return (
    <div className='bg-neutral-300'>
      <Nav />
      <Outlet />
    </div>
  )
}

export { Layout }
