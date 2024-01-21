import { useGetDeposit, useSignalIntent } from '@/hooks';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatEther } from 'viem';
import { Deposit } from './Home';

function mockHookOnRamp() {
  return { orders: 687, pricing: 17.75, totalGHO: 673 };
}
type CurrentValues = {
  currentMXNValue: number;
  currentGHOValue: number;
};
const MockAddress = '0x34107Bce5EC357cE31739B84454c2c555a677568';
function MakeIntent() {
  const [currentValues, setCurrentValues] = useState<CurrentValues>({
    currentMXNValue: 0,
    currentGHOValue: 0,
  });
  const navigate = useNavigate();
  const { depositId } = useParams();
  const { orders, pricing, totalGHO } = mockHookOnRamp();
  const { getDepositData: depositData } = useGetDeposit(
    parseInt(depositId as string)
  );
  console.log(depositData);
  const {
    signalIntentWrite,
    isSignalIntentError,
    isSignalIntentTxnSuccess,
    isLoadingSignalIntentTxn,
    isPrepareSignalIntentError,
  } = useSignalIntent(
    parseInt(depositId as string),
    currentValues.currentGHOValue as number,
    MockAddress
  );
  const handleOnMXNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!depositData) return;
    setCurrentValues({
      ...currentValues,
      currentMXNValue: Number(value),
      currentGHOValue:
        Number(value) /
        parseInt(formatEther((depositData as Deposit).conversionRate)),
    });
  };

  const handleOnMakeOrder = () => {
    signalIntentWrite?.();
  };

  useEffect(() => {
    if (isLoadingSignalIntentTxn) {
      toast.loading('Procesando transacción', {
        toastId: 'signal-intent-txn',
        isLoading: true,
      });
    }
    if (isSignalIntentError) {
      toast.update('signal-intent-txn', {
        type: 'error',
        isLoading: false,
        render: 'Error al procesar la transacción',
      });
      if (isSignalIntentTxnSuccess) {
        toast.update('signal-intent-txn', {
          type: 'success',
          isLoading: false,
          render: 'Transacción exitosa',
        });
      }
    }
  }, [isSignalIntentError, isSignalIntentTxnSuccess, isLoadingSignalIntentTxn]);

  console.debug(isPrepareSignalIntentError);

  return (
    <main className="flex flex-col justify-center min-h-screen gap-5 items-center">
      <h3 className="text-6xl font-bold text-krub">Comprar GHO</h3>
      <Card className="min-w-[50vw] max-w-4xl p-5 bg-card-bg">
        <CardHeader className="flex flex-col gap-4 justify-center items-center">
          <div className=" w-full flex flex-row gap-4 justify-center items-center">
            <div className=" h-2 w-2 bg-blue-900 rounded-full" />
            <p className="text-lg font-bold">
              0x34107Bce5EC357cE31739B84454c2c555a677568
            </p>
          </div>
          <div className="w-full flex flex-row justify-center gap-10 items-start">
            <p className="font-semibold text-3xl">{orders} Ordenes</p>
            <span className="text-xl font-semibold text-main">
              <p className=" text-3xl text-black">
                {(depositData as Deposit)?.conversionRate
                  ? totalGHO *
                    parseInt(
                      formatEther((depositData as Deposit).conversionRate)
                    )
                  : null}{' '}
                MXN
              </p>
              Disponibles
            </span>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-5 justify-center items-center">
          <Input
            isRequired
            type="number"
            inputMode="numeric"
            label="Quiero pagar"
            placeholder="0.00"
            onChange={handleOnMXNChange}
            endContent={
              <div className="h-full flex justify-center items-center">
                <p>MXN</p>
              </div>
            }
          />
          <Input
            disabled
            value={
              currentValues.currentGHOValue
                ? currentValues.currentGHOValue.toString()
                : undefined
            }
            label="Recibire"
            placeholder="0.00"
            type="number"
            endContent={
              <div className="h-full flex justify-center items-center">
                <p>GHO</p>
              </div>
            }
          />
        </CardBody>
        <CardFooter className="flex flex-row gap-4 justify-stretch items-center">
          <Button
            onClick={() => navigate('/')}
            className="py-6 w-full bg-secondary font-bold"
            color="danger"
          >
            Cancelar
          </Button>
          <Button
            disabled={isPrepareSignalIntentError || !signalIntentWrite}
            onClick={handleOnMakeOrder}
            className={`${
              isPrepareSignalIntentError || !signalIntentWrite
                ? 'bg-gray-400'
                : 'bg-main'
            } py-6 w-full  text-white font-bold`}
            color="success"
          >
            Comprar
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}

export { MakeIntent };
