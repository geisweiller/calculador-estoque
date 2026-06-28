import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Input,
  Text,
  Tooltip,
} from '@fluentui/react-components'
import {
  Add24Regular,
  Delete24Regular,
  Dismiss24Regular,
} from '@fluentui/react-icons'
import { makeStyles } from '@griffel/react'
import type { Product } from '../types'

type ProductManagerDialogProps = {
  products: Product[]
  onAddProduct: (name: string) => boolean
  onRemoveProduct: (id: string) => void
  onRenameProduct: (id: string, name: string) => void
}

const useStyles = makeStyles({
  trigger: {
    '@media (max-width: 520px)': {
      minWidth: 0,
    },
  },
  surface: {
    width: 'min(720px, calc(100vw - 32px))',
    maxWidth: '720px',
    '@media (max-width: 520px)': {
      width: 'calc(100vw - 16px)',
      maxWidth: 'calc(100vw - 16px)',
      height: 'calc(100dvh - 16px)',
      maxHeight: 'calc(100dvh - 16px)',
    },
  },
  header: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) auto',
    alignItems: 'start',
    gap: '12px',
    marginBottom: '16px',
  },
  titleGroup: {
    minWidth: 0,
  },
  title: {
    marginBottom: '4px',
  },
  closeButton: {
    minWidth: '40px',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) auto',
    gap: '8px',
    marginBottom: '12px',
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
  list: {
    display: 'grid',
    gap: '8px',
    maxHeight: '50vh',
    overflow: 'auto',
    paddingRight: '2px',
    '@media (max-width: 520px)': {
      maxHeight: 'calc(100dvh - 278px)',
    },
  },
  row: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) auto',
    gap: '8px',
    alignItems: 'center',
    '@media (max-width: 520px)': {
      gridTemplateColumns: '1fr 44px',
    },
  },
  input: {
    width: '100%',
  },
  iconOnlyButton: {
    minWidth: '44px',
  },
})

export function ProductManagerDialog({
  products,
  onAddProduct,
  onRemoveProduct,
  onRenameProduct,
}: ProductManagerDialogProps) {
  const styles = useStyles()
  const [isOpen, setIsOpen] = useState(false)
  const [newProductName, setNewProductName] = useState('')

  const addProduct = () => {
    const wasAdded = onAddProduct(newProductName)
    if (wasAdded) {
      setNewProductName('')
    }
  }

  return (
    <Dialog
      modalType="modal"
      open={isOpen}
      onOpenChange={(_, data) => setIsOpen(data.open)}
    >
      <DialogTrigger disableButtonEnhancement>
        <Button
          appearance={isOpen ? 'primary' : 'secondary'}
          className={styles.trigger}
          icon={<Add24Regular />}
        >
          Produtos
        </Button>
      </DialogTrigger>
      <DialogSurface className={styles.surface}>
        <DialogBody>
          <DialogContent>
            <div className={styles.header}>
              <div className={styles.titleGroup}>
                <DialogTitle className={styles.title}>Produtos</DialogTitle>
                <Text>{products.length} itens</Text>
              </div>
              <Tooltip content="Fechar" relationship="label">
                <Button
                  appearance="subtle"
                  className={styles.closeButton}
                  icon={<Dismiss24Regular />}
                  onClick={() => setIsOpen(false)}
                />
              </Tooltip>
            </div>

            <div className={styles.form}>
              <Input
                aria-label="Nome do novo produto"
                placeholder="Novo produto"
                value={newProductName}
                onChange={(_, input) => setNewProductName(input.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    addProduct()
                  }
                }}
              />
              <Button
                appearance="primary"
                icon={<Add24Regular />}
                onClick={addProduct}
              >
                Adicionar
              </Button>
            </div>

            <div className={styles.list}>
              {products.map((product) => (
                <div className={styles.row} key={product.id}>
                  <Input
                    aria-label={`Nome do produto ${product.name}`}
                    className={styles.input}
                    value={product.name}
                    onChange={(_, input) =>
                      onRenameProduct(product.id, input.value)
                    }
                  />
                  <Tooltip content="Excluir produto" relationship="label">
                    <Button
                      className={styles.iconOnlyButton}
                      icon={<Delete24Regular />}
                      onClick={() => onRemoveProduct(product.id)}
                    />
                  </Tooltip>
                </div>
              ))}
            </div>
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}
