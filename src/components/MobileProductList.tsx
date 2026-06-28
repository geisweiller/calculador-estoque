import { Input, Text, tokens } from '@fluentui/react-components'
import { makeStyles, shorthands } from '@griffel/react'
import type { ProductRow } from '../types'

type MobileProductListProps = {
  data: ProductRow[]
  productsCount: number
  onSetQuantity: (id: string, value: string) => void
}

const useStyles = makeStyles({
  list: {
    display: 'none',
    '@media (max-width: 720px)': {
      display: 'grid',
      gap: '8px',
      height: '100%',
      minHeight: 0,
      overflow: 'auto',
      overscrollBehavior: 'contain',
      paddingRight: '2px',
    },
  },
  row: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 104px',
    alignItems: 'center',
    gap: '10px',
    minHeight: '62px',
    backgroundColor: '#ffffff',
    ...shorthands.border('1px', 'solid', '#dfe5da'),
    ...shorthands.borderRadius('8px'),
    paddingTop: '10px',
    paddingRight: '10px',
    paddingBottom: '10px',
    paddingLeft: '12px',
  },
  product: {
    minWidth: 0,
    color: tokens.colorNeutralForeground1,
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '1.25',
    overflowWrap: 'anywhere',
  },
  meta: {
    display: 'block',
    marginTop: '3px',
    color: tokens.colorNeutralForeground3,
    fontSize: '11px',
    fontWeight: 600,
  },
  quantityInput: {
    width: '100%',
    '& input': {
      textAlign: 'center',
    },
  },
})

export function MobileProductList({
  data,
  productsCount,
  onSetQuantity,
}: MobileProductListProps) {
  const styles = useStyles()

  return (
    <div className={styles.list} aria-label="Produtos">
      {data.map((row, index) => (
        <div className={styles.row} key={row.id}>
          <div>
            <Text className={styles.product}>{row.product}</Text>
            <Text className={styles.meta}>
              Produto {index + 1} de {productsCount}
            </Text>
          </div>
          <Input
            aria-label={`Quantidade de ${row.product}`}
            className={styles.quantityInput}
            inputMode="numeric"
            min={0}
            step={1}
            type="number"
            value={row.quantity ? String(row.quantity) : ''}
            onChange={(_, input) => onSetQuantity(row.id, input.value)}
          />
        </div>
      ))}
    </div>
  )
}
