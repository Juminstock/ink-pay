import { BuyOrders } from '@/components'
import { SellOrders } from '@/components/SellOrders'
import {
  Tab,
  Tabs
} from '@nextui-org/react'

function UserPanel () {
  return (
    <main className='flex flex-col justify-center min-h-screen gap-5 items-center'>
      <Tabs aria-label='options'>
        <Tab key='orders' title='Mis ordenes de compra'>
          <BuyOrders />
        </Tab>
        <Tab key='sales' title='Mis ordenes de venta'>
          <SellOrders />
        </Tab>
      </Tabs>
    </main>
  )
}

export { UserPanel }
