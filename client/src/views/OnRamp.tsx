import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input
} from '@nextui-org/react'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function mockHookOnRamp () {
  return { orders: 687, pricing: 17.75, totalGHO: 673 }
}

function OnRamp () {
  const [currentGHOValue, setCurrentGHOValue] = useState<string | undefined>(
    undefined
  )
  const navigate = useNavigate()
  const { makerAddress } = useParams()
  const { orders, pricing, totalGHO } = mockHookOnRamp()

  const handleOnGHOChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCurrentGHOValue(value ? (Number(value) / pricing).toString() : undefined)
  }

  return (
    <main className='flex flex-col justify-center min-h-screen gap-5 items-center'>
      <h3 className='text-6xl font-bold text-krub'>Comprar GHO</h3>
      <Card className='min-w-[50vw] max-w-4xl p-5 bg-card-bg'>
        <CardHeader className='flex flex-col gap-4 justify-center items-center'>
          <div className=' w-full flex flex-row gap-4 justify-center items-center'>
            <div className=' h-2 w-2 bg-blue-900 rounded-full' />
            <p className='text-lg font-bold'>{makerAddress}</p>
          </div>
          <div className='w-full flex flex-row justify-center gap-10 items-start'>
            <p className='font-semibold text-3xl'>{orders} Ordenes</p>
            <span className='text-xl font-semibold text-main'>
              <p className=' text-3xl text-black'>{totalGHO * pricing} MXN</p>
              Disponibles
            </span>
          </div>
        </CardHeader>
        <CardBody className='flex flex-col gap-5 justify-center items-center'>
          <Input
            isRequired
            type='number'
            inputMode='numeric'
            label='Quiero pagar'
            placeholder='0.00'
            onChange={handleOnGHOChange}
            endContent={
              <div className='h-full flex justify-center items-center'>
                <p>MXN</p>
              </div>
            }
          />
          <Input
            disabled
            value={currentGHOValue ? currentGHOValue : undefined}
            label='Recibire'
            placeholder='0.00'
            type='number'
            endContent={
              <div className='h-full flex justify-center items-center'>
                <p>GHO</p>
              </div>
            }
          />
        </CardBody>
        <CardFooter className='flex flex-row gap-4 justify-stretch items-center'>
          <Button
            onClick={() => navigate('/')}
            className='py-6 w-full bg-secondary font-bold'
            color='danger'
          >
            Cancelar
          </Button>
          <Button
            className='py-6 w-full bg-main text-white font-bold'
            color='success'
          >
            Comprar
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}

export { OnRamp }
