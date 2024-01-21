import React from 'react'
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
  Card,
  CardBody,
  Button
} from '@nextui-org/react'
import { useAsyncList } from '@react-stately/data'
import { useNavigate } from 'react-router-dom'

const mockData = [
  {
    id: 1,
    depositor: '0x34107Bce5EC357cE31739B84454c2c555a677568',
    depositAmount: 100,
    remainingDeposits: 78,
    conversionRate: 17.75,
    outstandingIntentAmount: 70
  },
  {
    id: 2,
    depositor: '0x34107Bce5EC357cE31739B84454c2c555a677568',
    depositAmount: 100,
    remainingDeposits: 78,
    conversionRate: 17.75,
    outstandingIntentAmount: 70
  },
  {
    id: 3,
    depositor: '0x34107Bce5EC357cE31739B84454c2c555a677568',
    depositAmount: 100,
    remainingDeposits: 78,
    conversionRate: 17.75,
    outstandingIntentAmount: 70
  },
  {
    id: 4,
    depositor: '0x34107Bce5EC357cE31739B84454c2c555a677568',
    depositAmount: 100,
    remainingDeposits: 78,
    conversionRate: 17.75,
    outstandingIntentAmount: 70
  },
  {
    id: 5,
    depositor: '0x34107Bce5EC357cE31739B84454c2c555a677568',
    depositAmount: 100,
    remainingDeposits: 78,
    conversionRate: 17.75,
    outstandingIntentAmount: 70
  },
  {
    id: 6,
    depositor: '0x34107Bce5EC357cE31739B84454c2c555a677568',
    depositAmount: 100,
    remainingDeposits: 78,
    conversionRate: 17.75,
    outstandingIntentAmount: 70
  },
  {
    id: 7,
    depositor: '0x34107Bce5EC357cE31739B84454c2c555a677568',
    depositAmount: 100,
    remainingDeposits: 78,
    conversionRate: 17.75,
    outstandingIntentAmount: 70
  },
  {
    id: 8,
    depositor: '0x34107Bce5EC357cE31739B84454c2c555a677568',
    depositAmount: 100,
    remainingDeposits: 78,
    conversionRate: 17.75,
    outstandingIntentAmount: 70
  },
  {
    id: 9,
    depositor: '0x34107Bce5EC357cE31739B84454c2c555a677568',
    depositAmount: 100,
    remainingDeposits: 78,
    conversionRate: 17.75,
    outstandingIntentAmount: 70
  },
  {
    id: 10,
    depositor: '0x34107Bce5EC357cE31739B84454c2c555a677568',
    depositAmount: 100,
    remainingDeposits: 78,
    conversionRate: 17.75,
    outstandingIntentAmount: 70
  },
  {
    id: 11,
    depositor: '0x34107Bce5EC357cE31739B84454c2c555a677568',
    depositAmount: 100,
    remainingDeposits: 78,
    conversionRate: 17.75,
    outstandingIntentAmount: 70
  },
  {
    id: 12,
    depositor: '0x34107Bce5EC357cE31739B84454c2c555a677568',
    depositAmount: 100,
    remainingDeposits: 78,
    conversionRate: 17.75,
    outstandingIntentAmount: 70
  }
]

function Home () {
  const [page, setPage] = React.useState(1)
  const rowsPerPage = 10
  const navigate = useNavigate()

  const pages = Math.ceil(mockData.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return mockData.slice(start, end)
  }, [page, mockData])

  const handleOnClickButton = (id: number) => {
    navigate(`/make-intent/${id}`)
  }

  return (
    <main className='flex flex-col justify-center min-h-screen gap-5 items-center'>
      <Table
        className='w-[80vw]'
        isHeaderSticky
        aria-label='Órdenes top'
        bottomContent={
          <div className='flex w-full justify-center'>
            <Pagination
              isCompact
              showControls
              showShadow
              color='secondary'
              page={page}
              total={pages}
              onChange={page => setPage(page)}
            />
          </div>
        }
        classNames={{
          base: 'max-h-[820px] overflow-scroll',
          table: 'max-h-[60vh]',
          th: 'bg-secondary text-white font-bold',
          wrapper: ' bg-card-bg'
        }}
      >
        <TableHeader>
          <TableColumn key='conversionRate'>PRECIO</TableColumn>
          <TableColumn key='remainingDeposits'>DISPONIBLE</TableColumn>
          <TableColumn key='depositor'>VENDEDOR</TableColumn>
          <TableColumn key='outstandingIntentAmount'>
            ÓRDENES EXITOSAS
          </TableColumn>
          <TableColumn key='action'>ACCIÓN</TableColumn>
        </TableHeader>
        <TableBody items={items} loadingContent={<Spinner color='black' />}>
          {item => (
            <TableRow key={item.id} accessKey={item.id.toString()}>
              {columnKey => {
                if (columnKey === 'action') {
                  return (
                    <TableCell>
                      <Button
                        onClick={() => handleOnClickButton(item.id)}
                        className='bg-main text-white font-bold'
                      >
                        Comprar
                      </Button>
                    </TableCell>
                  )
                }

                return <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </main>
  )
}

export { Home }
