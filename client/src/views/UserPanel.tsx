import { Tab, Tabs } from '@nextui-org/react'
import React from 'react'

function UserPanel () {
  return (
    <main className='flex flex-col justify-center min-h-screen gap-5 items-center'>
      <Tabs aria-label='options'>
        <Tab key='orders' title='Mis ordenes de compra'>
          <h1>Something 1</h1>
        </Tab>
        <Tab key='sales' title='Mis ordenes de venta'>
          <h1>Something 2</h1>
        </Tab>
      </Tabs>
    </main>
  )
}

export { UserPanel }
