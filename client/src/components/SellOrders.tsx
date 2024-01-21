import {
  Button,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue
} from '@nextui-org/react'
import { useMemo, useState } from 'react'

const mockData = [
  {
    id: 1,
    quantity: 100,
    rest: 78,
    openOrders: 3,
    available: 70
  },
  {
    id: 2,
    quantity: 90,
    rest: 72,
    openOrders: 4,
    available: 0
  },
  {
    id: 3,
    quantity: 110,
    rest: 84,
    openOrders: 2,
    available: 75
  },
  {
    id: 4,
    quantity: 95,
    rest: 75,
    openOrders: 5,
    available: 67
  },
  {
    id: 5,
    quantity: 105,
    rest: 79,
    openOrders: 4,
    available: 0
  },
  {
    id: 6,
    quantity: 98,
    rest: 71,
    openOrders: 3,
    available: 69
  },
  {
    id: 7,
    quantity: 115,
    rest: 90,
    openOrders: 1,
    available: 0
  },
  {
    id: 8,
    quantity: 92,
    rest: 70,
    openOrders: 4,
    available: 66
  },
  {
    id: 9,
    quantity: 108,
    rest: 82,
    openOrders: 2,
    available: 73
  },
  {
    id: 10,
    quantity: 97,
    rest: 76,
    openOrders: 3,
    available: 71
  }
]

function SellOrders () {
  const [page, setPage] = useState(1)
  const rowsPerPage = 6

  const pages = Math.ceil(mockData.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return mockData.slice(start, end)
  }, [page, mockData])

  const handleOnWithdraw = (id: number) => {
    console.log(id)
  }

  return (
    <Table
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
      aria-label='Example static collection table'
      classNames={{
        base: 'max-h-[60vh] w-[80vw] overflow-scroll',
        th: 'bg-secondary text-white font-bold',
        wrapper: ' bg-card-bg'
      }}
    >
      <TableHeader>
        <TableColumn key='quantity'>Cantidad</TableColumn>
        <TableColumn key='rest'>Restante</TableColumn>
        <TableColumn key='openOrders'>Ordenes abiertas</TableColumn>
        <TableColumn key='available'>Disponibles</TableColumn>
        <TableColumn key='action'>Acción</TableColumn>
      </TableHeader>
      <TableBody items={items} loadingContent={<Spinner />}>
        {item => (
          <TableRow key={item.id} accessKey={item.id.toString()}>
            {columnKey => {
              if (columnKey === 'action' && item.available > 0) {
                return (
                  <TableCell>
                    <Button
                      onClick={() => handleOnWithdraw(item.id)}
                      className='bg-main w-full text-white font-bold'
                    >
                      Retirar
                    </Button>
                  </TableCell>
                )
              }
              if (columnKey === 'quantity') {
                return <TableCell>{getKeyValue(item, columnKey)} GHO</TableCell>
              }
              if (columnKey === 'rest') {
                return <TableCell>{getKeyValue(item, columnKey)} GHO</TableCell>
              }

              if (columnKey === 'available') {
                return <TableCell>{getKeyValue(item, columnKey)} GHO</TableCell>
              }

              return <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export { SellOrders }
