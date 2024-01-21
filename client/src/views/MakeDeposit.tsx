import { useOffRamp } from '@/hooks'
import { Button, Card, CardBody, CardFooter, Input } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
type CurrentValues = {
  currentMXNValue: number
  totalMXNValue: number
}

function MakeDeposit () {
  const [currentGHOValue, setcurrentGHOValue] = useState<number | null>(null)
  const [currentValues, setCurrentValues] = useState<CurrentValues>({
    currentMXNValue: 0,
    totalMXNValue: 0
  })
  const navigate = useNavigate()
  const {
    offRampWrite,
    isPrepareOffRampError,
    isLoadingOffRampTxn,
    isOffRampTxnSuccess,
    isOffRampError
  } = useOffRamp(currentGHOValue as number, currentValues.currentMXNValue)
  const handleOnGHOChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setcurrentGHOValue(Number(value))
    setCurrentValues({
      ...currentValues,
      totalMXNValue: currentValues.currentMXNValue * (currentGHOValue as number)
    })
  }

  const handleOnMXNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setCurrentValues({
      ...currentValues,
      currentMXNValue: Number(value),
      totalMXNValue: Number(value) * (currentGHOValue as number)
    })
  }

  const handleOnMakeOrder = () => {
    offRampWrite?.()
  }

  useEffect(() => {
    if (isLoadingOffRampTxn) {
      toast.loading('Procesando transacción', {
        toastId: 'signal-intent-txn',
        isLoading: true
      })
    }
    if (isOffRampError) {
      toast.update('signal-intent-txn', {
        type: 'error',
        isLoading: false,
        render: 'Error al procesar la transacción'
      })
      if (isOffRampTxnSuccess) {
        toast.update('signal-intent-txn', {
          type: 'success',
          isLoading: false,
          render: 'Transacción exitosa'
        })
      }
    }
  }, [isLoadingOffRampTxn, isOffRampTxnSuccess, isOffRampError])

  return (
    <main className='flex flex-col justify-center min-h-screen gap-5 items-center'>
      <h3 className='text-6xl font-bold text-krub'>Depositar GHO</h3>
      <Card className='min-w-[50vw] max-w-4xl p-5 bg-card-bg'>
        <CardBody className='flex flex-col gap-5 justify-center items-center'>
          <Input
            isRequired
            type='number'
            inputMode='numeric'
            label='Quiero depositar'
            placeholder='0.00'
            onChange={handleOnGHOChange}
            endContent={
              <div className='h-full flex justify-center items-center'>
                <p>GHO</p>
              </div>
            }
          />
          <div className='place-self-end flex flex-col justify-end items-end gap-5'>
            <Input
              classNames={{
                mainWrapper: 'w-full'
              }}
              isRequired
              type='number'
              inputMode='numeric'
              labelPlacement='outside-left'
              label='Precio'
              placeholder='0.00'
              onChange={handleOnMXNChange}
              endContent={
                <div className='h-full flex justify-center items-center'>
                  <p>MXN</p>
                </div>
              }
            />
            <Input
              classNames={{
                mainWrapper: 'w-full'
              }}
              isReadOnly
              type='number'
              inputMode='numeric'
              labelPlacement='outside-left'
              label='Recibiras'
              placeholder='0.00'
              value={currentValues.totalMXNValue.toString()}
              endContent={
                <div className='h-full flex justify-center items-center'>
                  <p>MXN</p>
                </div>
              }
            />
          </div>
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
            disabled={isPrepareOffRampError || !offRampWrite}
            onClick={handleOnMakeOrder}
            className={`${
              isPrepareOffRampError || !offRampWrite ? 'bg-gray-400' : 'bg-main'
            } py-6 w-full  text-white font-bold`}
            color='success'
          >
            Depositar GHO
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}

export { MakeDeposit }
