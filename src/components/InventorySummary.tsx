import { Text, tokens } from '@fluentui/react-components'
import { makeStyles, shorthands } from '@griffel/react'

type InventorySummaryProps = {
  filledProducts: number
  productsCount: number
  totalQuantity: number
}

const useStyles = makeStyles({
  summary: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '12px',
    marginBottom: '18px',
    '@media (max-width: 520px)': {
      gap: '8px',
      marginBottom: '12px',
    },
  },
  stat: {
    backgroundColor: '#ffffff',
    ...shorthands.border('1px', 'solid', '#dfe5da'),
    ...shorthands.borderRadius('8px'),
    paddingTop: '14px',
    paddingRight: '16px',
    paddingBottom: '14px',
    paddingLeft: '16px',
    '@media (max-width: 520px)': {
      paddingTop: '10px',
      paddingRight: '8px',
      paddingBottom: '10px',
      paddingLeft: '8px',
    },
  },
  label: {
    display: 'block',
    color: tokens.colorNeutralForeground3,
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase',
    '@media (max-width: 520px)': {
      fontSize: '10px',
      lineHeight: '1.15',
    },
  },
  value: {
    display: 'block',
    marginTop: '4px',
    color: tokens.colorNeutralForeground1,
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '1.1',
    '@media (max-width: 520px)': {
      fontSize: '20px',
    },
  },
})

export function InventorySummary({
  filledProducts,
  productsCount,
  totalQuantity,
}: InventorySummaryProps) {
  const styles = useStyles()

  return (
    <section className={styles.summary} aria-label="Resumo do estoque">
      <div className={styles.stat}>
        <Text className={styles.label}>Cadastrados</Text>
        <Text className={styles.value}>{productsCount}</Text>
      </div>
      <div className={styles.stat}>
        <Text className={styles.label}>Preenchidos</Text>
        <Text className={styles.value}>{filledProducts}</Text>
      </div>
      <div className={styles.stat}>
        <Text className={styles.label}>Total</Text>
        <Text className={styles.value}>{totalQuantity}</Text>
      </div>
    </section>
  )
}
