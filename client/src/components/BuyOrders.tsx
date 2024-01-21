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
    price: 17.5,
    totalOrder: 1774,
    seller: '0x34107Bce5EC357cE31739B84454c2c555a677568',
    state: 'Pendiente'
  },
  {
    id: 2,
    quantity: 110,
    price: 16.8,
    totalOrder: 1848,
    seller: '0x6Df92F8351a0A1Df31dFb2F4D0fD14dE2fC29fA1',
    state: 'Completado'
  },
  {
    id: 3,
    quantity: 90,
    price: 18.2,
    totalOrder: 1638,
    seller: '0x892B8e384678b693bF67406aa2A8f7A793b4B472',
    state: 'Pendiente'
  },
  {
    id: 4,
    quantity: 105,
    price: 17.0,
    totalOrder: 1785,
    seller: '0x45F8e51aDd647ab4E92D873C81D42E09Ea1c8497',
    state: 'Completado'
  },
  {
    id: 5,
    quantity: 120,
    price: 15.5,
    totalOrder: 1860,
    seller: '0x20D4B6c8E91E342Ef7d29f33fE978a7Ef2912D6b',
    state: 'Pendiente'
  },
  {
    id: 6,
    quantity: 95,
    price: 16.7,
    totalOrder: 1586.5,
    seller: '0x754Cc872e43E2Fc65fE4f446dF238A7611eD2C8C',
    state: 'Completado'
  },
  {
    id: 7,
    quantity: 130,
    price: 15.0,
    totalOrder: 1950,
    seller: '0x98b7A2a1F89fA08a8aE8b3b70C3a6D3e45D78502',
    state: 'Pendiente'
  },
  {
    id: 8,
    quantity: 85,
    price: 18.5,
    totalOrder: 1572.5,
    seller: '0x573Ad1dF4E0a17D98eBac59956eC823f8Ea15548',
    state: 'Completado'
  },
  {
    id: 9,
    quantity: 115,
    price: 16.3,
    totalOrder: 1874.5,
    seller: '0x1Aa4f86ADc2B25A6D6DcEb8B08Bb4e50682c85a1',
    state: 'Pendiente'
  },
  {
    id: 10,
    quantity: 105,
    price: 17.0,
    totalOrder: 1785,
    seller: '0x672dDEcb2e59eDAaFE0EAd7A548804fe8D24B168',
    state: 'Completado'
  }
]

function BuyOrders () {
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
        <TableColumn key='price'>Precio</TableColumn>
        <TableColumn key='totalOrder'>Total orden</TableColumn>
        <TableColumn key='seller'>Vendedor</TableColumn>
        <TableColumn key='state'>Estado</TableColumn>
        <TableColumn key='action'>Acción</TableColumn>
      </TableHeader>
      <TableBody items={items} loadingContent={<Spinner />}>
        {item => (
          <TableRow key={item.id} accessKey={item.id.toString()}>
            {columnKey => {
              if (columnKey === 'action' && item.state === 'Pendiente') {
                return (
                  <TableCell>
                    <Button
                      onClick={() => handleOnWithdraw(item.id)}
                      className='w-full bg-main text-white font-bold'
                    >
                      Verificar
                    </Button>
                  </TableCell>
                )
              }
              if (columnKey === 'quantity') {
                return <TableCell>{item.quantity} GHO</TableCell>
              }
              if (columnKey === 'price') {
                return <TableCell>${item.price} MXN</TableCell>
              }
              if (columnKey === 'totalOrder') {
                return <TableCell>${item.totalOrder} MXN</TableCell>
              }
              if (columnKey === 'state') {
                return <TableCell className='font-bold'>{item.state}</TableCell>
              }

              return <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export { BuyOrders }
