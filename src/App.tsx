import { FluentProvider, tokens, webLightTheme } from '@fluentui/react-components'
import { makeStyles } from '@griffel/react'
import { InventoryHeader } from './components/InventoryHeader'
import { InventorySummary } from './components/InventorySummary'
import { InventoryTable } from './components/InventoryTable'
import { MobileProductList } from './components/MobileProductList'
import { ReportPanel } from './components/ReportPanel'
import { useInventoryReport } from './hooks/useInventoryReport'
import { useProducts } from './hooks/useProducts'
import { useQuantities } from './hooks/useQuantities'

const useStyles = makeStyles({
  app: {
    height: '100dvh',
    overflow: 'hidden',
    backgroundColor: '#f7f8f5',
    color: tokens.colorNeutralForeground1,
  },
  shell: {
    display: 'flex',
    flexDirection: 'column',
    width: 'min(1180px, calc(100% - 32px))',
    height: '100%',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingTop: '28px',
    paddingBottom: '32px',
    minHeight: 0,
    '@media (max-width: 720px)': {
      width: 'calc(100% - 20px)',
      paddingTop: '14px',
      paddingBottom: '12px',
    },
  },
  workArea: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(300px, 380px)',
    gap: '16px',
    flex: 1,
    alignItems: 'start',
    minHeight: 0,
    overflow: 'hidden',
    '@media (max-width: 980px)': {
      gridTemplateColumns: '1fr',
    },
    '@media (max-width: 720px)': {
      gridTemplateRows: 'minmax(0, 1fr) auto',
      alignItems: 'stretch',
      gap: '10px',
    },
  },
})

function App() {
  const styles = useStyles()
  const {
    addProduct,
    products,
    removeProduct,
    renameProduct,
  } = useProducts()
  const {
    clearQuantities,
    quantities,
    removeQuantity,
    setQuantity,
  } = useQuantities()
  const { data, filledRows, report, totalQuantity } = useInventoryReport(
    products,
    quantities,
  )

  const removeProductAndQuantity = (id: string) => {
    removeProduct(id)
    removeQuantity(id)
  }

  return (
    <FluentProvider theme={webLightTheme}>
      <main className={styles.app}>
        <div className={styles.shell}>
          <InventoryHeader
            products={products}
            report={report}
            onAddProduct={addProduct}
            onClearQuantities={clearQuantities}
            onRemoveProduct={removeProductAndQuantity}
            onRenameProduct={renameProduct}
          />

          <InventorySummary
            filledProducts={filledRows.length}
            productsCount={products.length}
            totalQuantity={totalQuantity}
          />

          <section className={styles.workArea}>
            <InventoryTable data={data} onSetQuantity={setQuantity} />
            <MobileProductList
              data={data}
              productsCount={products.length}
              onSetQuantity={setQuantity}
            />
            <ReportPanel report={report} />
          </section>
        </div>
      </main>
    </FluentProvider>
  )
}

export default App
