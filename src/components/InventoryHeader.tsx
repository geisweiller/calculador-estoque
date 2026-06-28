import {
  Button,
  Text,
  Tooltip,
} from '@fluentui/react-components'
import {
  ClipboardTextLtr24Regular,
  Dismiss24Regular,
  DocumentPdf24Regular,
} from '@fluentui/react-icons'
import { makeStyles } from '@griffel/react'
import type { Product } from '../types'
import { downloadReportPdf } from '../utils/reportPdf'
import { ProductManagerDialog } from './ProductManagerDialog'

type InventoryHeaderProps = {
  products: Product[]
  report: string
  onAddProduct: (name: string) => boolean
  onClearQuantities: () => void
  onRemoveProduct: (id: string) => void
  onRenameProduct: (id: string, name: string) => void
}

const useStyles = makeStyles({
  header: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) auto',
    alignItems: 'end',
    gap: '20px',
    marginBottom: '20px',
    '@media (max-width: 760px)': {
      gridTemplateColumns: '1fr',
      alignItems: 'start',
    },
  },
  eyebrow: {
    color: '#386641',
    fontWeight: 700,
    letterSpacing: '0',
    textTransform: 'uppercase',
  },
  title: {
    marginTop: '4px',
    marginBottom: '0',
    lineHeight: '1.05',
    '@media (max-width: 520px)': {
      fontSize: '28px',
    },
  },
  actions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    '@media (max-width: 760px)': {
      justifyContent: 'flex-start',
    },
    '@media (max-width: 520px)': {
      width: '100%',
    },
  },
  actionButton: {
    '@media (max-width: 520px)': {
      minWidth: 0,
    },
  },
})

export function InventoryHeader({
  products,
  report,
  onAddProduct,
  onClearQuantities,
  onRemoveProduct,
  onRenameProduct,
}: InventoryHeaderProps) {
  const styles = useStyles()

  const copyReport = async () => {
    await navigator.clipboard.writeText(report)
  }

  return (
    <header className={styles.header}>
      <div>
        <Text className={styles.eyebrow}>Controle de estoque</Text>
      </div>
      <div className={styles.actions}>
        <ProductManagerDialog
          products={products}
          onAddProduct={onAddProduct}
          onRemoveProduct={onRemoveProduct}
          onRenameProduct={onRenameProduct}
        />
        <Tooltip content="Copiar relatório" relationship="label">
          <Button
            appearance="secondary"
            className={styles.actionButton}
            icon={<ClipboardTextLtr24Regular />}
            onClick={copyReport}
          >
            Copiar
          </Button>
        </Tooltip>
        <Tooltip content="Baixar relatório em PDF" relationship="label">
          <Button
            appearance="primary"
            className={styles.actionButton}
            icon={<DocumentPdf24Regular />}
            onClick={() => downloadReportPdf(report)}
          >
            PDF
          </Button>
        </Tooltip>
        <Tooltip content="Limpar quantidades" relationship="label">
          <Button
            className={styles.actionButton}
            icon={<Dismiss24Regular />}
            onClick={onClearQuantities}
          >
            Limpar
          </Button>
        </Tooltip>
      </div>
    </header>
  )
}
