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
    minHeight: '100vh',
    backgroundColor: '#f7f8f5',
    color: tokens.colorNeutralForeground1,
  },
  shell: {
    width: 'min(1180px, calc(100% - 32px))',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingTop: '28px',
    paddingBottom: '32px',
  },
  workArea: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(300px, 380px)',
    gap: '16px',
    alignItems: 'start',
    '@media (max-width: 980px)': {
      gridTemplateColumns: '1fr',
    },
  },
})

function App() {
  const styles = useStyles()
  const {
    addProduct,
    importProducts,
    products,
    removeProduct,
    renameProduct,
  } = useProducts()
  const {
    clearQuantities,
    keepOnlyQuantities,
    quantities,
    removeQuantity,
    setQuantity,
  } = useQuantities()
  const { data, filledRows, report, totalQuantity } = useInventoryReport(
    products,
    quantities,
  )

  const importProductsAndSyncQuantities = (source: unknown) => {
    const importedProducts = importProducts(source)
    keepOnlyQuantities(importedProducts.map((product) => product.id))
    return importedProducts
  }

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
            onImportProducts={importProductsAndSyncQuantities}
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
