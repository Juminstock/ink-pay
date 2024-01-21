import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input
} from '@nextui-org/react'
import React from 'react'
import { useParams } from 'react-router-dom'

function mockHookOnRamp () {
  return { orders: 687, pricing: 6748 }
}

function OnRamp () {
  const { makerAddress } = useParams()
  const { orders, pricing } = mockHookOnRamp()
  return (
    <div>
      <h3>Comprar GHO</h3>
      <Card>
        <CardHeader>
          <div className='flex flex-row gap-4 justify-center items-center'>
            <span className=' h-2 w-2 bg-blue-400 rounded-full' />
            <p>{makerAddress}</p>
          </div>
          <div>
            <p>{orders} Ordenes</p>

            <p>{pricing} MXN</p>
          </div>
        </CardHeader>
        <CardBody>
          <Input required label='Quiero pagar' endContent={<p>MXN</p>} />
          <Input disabled label='Recibire' endContent={<p>GHO</p>} />
        </CardBody>
        <CardFooter>
          <Button>Cancelar</Button>
          <Button>Comprar</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export { OnRamp }
