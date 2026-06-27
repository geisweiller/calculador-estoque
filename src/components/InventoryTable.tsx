import { useMemo } from 'react'
import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  tokens,
} from '@fluentui/react-components'
import { makeStyles, shorthands } from '@griffel/react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import type { ProductRow } from '../types'

type InventoryTableProps = {
  data: ProductRow[]
  onSetQuantity: (id: string, value: string) => void
}

const useStyles = makeStyles({
  wrap: {
    overflow: 'auto',
    maxHeight: 'calc(100vh - 260px)',
    backgroundColor: '#ffffff',
    ...shorthands.border('1px', 'solid', '#dfe5da'),
    ...shorthands.borderRadius('8px'),
    '@media (max-width: 720px)': {
      display: 'none',
    },
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: '#eef3e9',
    color: tokens.colorNeutralForeground1,
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0',
    textAlign: 'left',
    textTransform: 'uppercase',
    paddingTop: '12px',
    paddingRight: '14px',
    paddingBottom: '12px',
    paddingLeft: '14px',
    ...shorthands.borderBottom('1px', 'solid', '#d1dacb'),
  },
  td: {
    paddingTop: '8px',
    paddingRight: '14px',
    paddingBottom: '8px',
    paddingLeft: '14px',
    ...shorthands.borderBottom('1px', 'solid', '#edf1ea'),
  },
  productName: {
    fontWeight: 600,
  },
  quantityCell: {
    width: '160px',
  },
  quantityInput: {
    width: '112px',
  },
})

export function InventoryTable({ data, onSetQuantity }: InventoryTableProps) {
  const styles = useStyles()

  const columns = useMemo<ColumnDef<ProductRow>[]>(
    () => [
      {
        accessorKey: 'product',
        header: 'Produtos',
        cell: ({ row }) => (
          <span className={styles.productName}>{row.original.product}</span>
        ),
      },
      {
        accessorKey: 'quantity',
        header: 'Quantidade',
        cell: ({ row }) => (
          <Input
            aria-label={`Quantidade de ${row.original.product}`}
            className={styles.quantityInput}
            inputMode="numeric"
            min={0}
            step={1}
            type="number"
            value={row.original.quantity ? String(row.original.quantity) : ''}
            onChange={(_, input) => onSetQuantity(row.original.id, input.value)}
          />
        ),
      },
    ],
    [onSetQuantity, styles.productName, styles.quantityInput],
  )

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className={styles.wrap}>
      <Table className={styles.table} size="small" aria-label="Produtos">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHeaderCell className={styles.th} key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHeaderCell>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  className={`${styles.td} ${
                    cell.column.id === 'quantity' ? styles.quantityCell : ''
                  }`}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
