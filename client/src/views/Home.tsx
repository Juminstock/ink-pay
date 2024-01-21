import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  getKeyValue,
  Button,
} from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useGetDepositsWithMinimumBalance } from '@/hooks';
import { formatEther } from 'viem';

export type Deposit = {
  depositId: bigint | number;
  depositor: `0x${string}`;
  depositAmount: bigint;
  remainingDeposits: bigint;
  outstandingIntentAmount: bigint;
  conversionRate: bigint;
  intentHashes: `0x${string}`[];
};

const mockData = [
  {
    id: 1,
    depositor: '0x34107Bce5EC357cE31739B84454c2c555a677568' as `0x${string}`,
    depositAmount: 100,
    remainingDeposits: 78,
    conversionRate: 17.75,
    outstandingIntentAmount: 70,
    intentHashes: [],
  },
  {
    id: 2,
    depositor: '0x34107Bce5EC357cE31739B84454c2c555a677568' as `0x${string}`,
    depositAmount: 100,
    remainingDeposits: 78,
    conversionRate: 17.75,
    outstandingIntentAmount: 70,
    intentHashes: [],
  },
  {
    id: 3,
    depositor: '0x34107Bce5EC357cE31739B84454c2c555a677568' as `0x${string}`,
    depositAmount: 100,
    remainingDeposits: 78,
    conversionRate: 17.75,
    outstandingIntentAmount: 70,
    intentHashes: [],
  },
  {
    id: 4,
    depositor: '0x34107Bce5EC357cE31739B84454c2c555a677568' as `0x${string}`,
    depositAmount: 100,
    remainingDeposits: 78,
    conversionRate: 17.75,
    outstandingIntentAmount: 70,
    intentHashes: [],
  },
  {
    id: 5,
    depositor: '0x34107Bce5EC357cE31739B84454c2c555a677568' as `0x${string}`,
    depositAmount: 100,
    remainingDeposits: 78,
    conversionRate: 17.75,
    outstandingIntentAmount: 70,
    intentHashes: [],
  },
  {
    id: 6,
    depositor: '0x34107Bce5EC357cE31739B84454c2c555a677568' as `0x${string}`,
    depositAmount: 100,
    remainingDeposits: 78,
    conversionRate: 17.75,
    outstandingIntentAmount: 70,
    intentHashes: [],
  },
  {
    id: 7,
    depositor: '0x34107Bce5EC357cE31739B84454c2c555a677568' as `0x${string}`,
    depositAmount: 100,
    remainingDeposits: 78,
    conversionRate: 17.75,
    outstandingIntentAmount: 70,
    intentHashes: [],
  },
  {
    id: 8,
    depositor: '0x34107Bce5EC357cE31739B84454c2c555a677568' as `0x${string}`,
    depositAmount: 100,
    remainingDeposits: 78,
    conversionRate: 17.75,
    outstandingIntentAmount: 70,
    intentHashes: [],
  },
  {
    id: 9,
    depositor: '0x34107Bce5EC357cE31739B84454c2c555a677568' as `0x${string}`,
    depositAmount: 100,
    remainingDeposits: 78,
    conversionRate: 17.75,
    outstandingIntentAmount: 70,
    intentHashes: [],
  },
  {
    id: 10,
    depositor: '0x34107Bce5EC357cE31739B84454c2c555a677568' as `0x${string}`,
    depositAmount: 100,
    remainingDeposits: 78,
    conversionRate: 17.75,
    outstandingIntentAmount: 70,
    intentHashes: [],
  },
  {
    id: 11,
    depositor: '0x34107Bce5EC357cE31739B84454c2c555a677568' as `0x${string}`,
    depositAmount: 100,
    remainingDeposits: 78,
    conversionRate: 17.75,
    outstandingIntentAmount: 70,
    intentHashes: [],
  },
  {
    id: 12,
    depositor: '0x34107Bce5EC357cE31739B84454c2c555a677568' as `0x${string}`,
    depositAmount: 100,
    remainingDeposits: 78,
    conversionRate: 17.75,
    outstandingIntentAmount: 70,
    intentHashes: [],
  },
];

function Home() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  const pages = Math.ceil(mockData.length / rowsPerPage);

  const { getDepositsWithMinimumBalanceData } =
    useGetDepositsWithMinimumBalance();

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    if (!getDepositsWithMinimumBalanceData) return mockData.slice(start, end);
    console.log(getDepositsWithMinimumBalanceData as Deposit[]);
    return (getDepositsWithMinimumBalanceData as Deposit[])
      .map((deposit) => {
        return {
          id: parseInt(formatEther(deposit.depositId as bigint)),
          depositor: deposit.depositor,
          depositAmount: parseInt(formatEther(deposit.depositAmount)),
          remainingDeposits: parseInt(formatEther(deposit.remainingDeposits)),
          outstandingIntentAmount: parseInt(
            formatEther(deposit.outstandingIntentAmount)
          ),
          conversionRate: parseInt(formatEther(deposit.conversionRate)),
          intentHashes: deposit.intentHashes,
        };
      })
      .slice(start, end);
  }, [page, getDepositsWithMinimumBalanceData]);

  // console.log(getDepositsWithMinimumBalanceData);

  const handleOnClickButton = (id: number) => {
    navigate(`/make-intent/${id}`);
  };

  return (
    <main className="flex flex-col justify-center min-h-screen gap-5 items-center">
      <Table
        className="w-[80vw]"
        isHeaderSticky
        aria-label="Órdenes top"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          base: 'max-h-[820px] overflow-scroll',
          table: 'max-h-[60vh]',
          th: 'bg-secondary text-white font-bold',
          wrapper: ' bg-card-bg',
        }}
      >
        <TableHeader>
          <TableColumn key="conversionRate">PRECIO</TableColumn>
          <TableColumn key="remainingDeposits">DISPONIBLE</TableColumn>
          <TableColumn key="depositor">VENDEDOR</TableColumn>
          <TableColumn key="outstandingIntentAmount">
            ÓRDENES EXITOSAS
          </TableColumn>
          <TableColumn key="action">ACCIÓN</TableColumn>
        </TableHeader>
        <TableBody items={items} loadingContent={<Spinner />}>
          {(item) => (
            <TableRow key={item.id} accessKey={item.id.toString()}>
              {(columnKey) => {
                if (columnKey === 'action') {
                  return (
                    <TableCell>
                      <Button
                        onClick={() => handleOnClickButton(item.id)}
                        className="w-full bg-main text-white font-bold"
                      >
                        Comprar
                      </Button>
                    </TableCell>
                  );
                }
                if (columnKey === 'conversionRate') {
                  return <TableCell>${item[columnKey]} MXN</TableCell>;
                }

                if (columnKey === 'remainingDeposits') {
                  return <TableCell>{item[columnKey]} GHO</TableCell>;
                }

                return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </main>
  );
}

export { Home };
