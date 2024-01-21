import { Outlet } from 'react-router-dom'
import { Nav } from '@/components/layout/'

function Layout () {
  return (
    <div className='text-krub bg-main-bg min-h-screen'>
      <Nav />
      <Outlet />
    </div>
  )
}

export { Layout }
