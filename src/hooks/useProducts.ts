import { useEffect, useState } from 'react'
import { defaultProducts, productMigrations } from '../data/defaultProducts'
import type { Product } from '../types'
import { createProductId, parseProducts, sortProducts } from './productUtils'

const PRODUCTS_STORAGE_KEY = 'calculador-estoque:products'
const PRODUCT_MIGRATIONS_STORAGE_KEY = 'calculador-estoque:product-migrations'

const readAppliedMigrations = () => {
  try {
    const stored = localStorage.getItem(PRODUCT_MIGRATIONS_STORAGE_KEY)
    const parsed = stored ? (JSON.parse(stored) as unknown) : []
    return Array.isArray(parsed)
      ? parsed.filter((migration): migration is string => typeof migration === 'string')
      : []
  } catch {
    return []
  }
}

const writeAppliedMigrations = (migrationIds: string[]) => {
  localStorage.setItem(
    PRODUCT_MIGRATIONS_STORAGE_KEY,
    JSON.stringify([...new Set(migrationIds)]),
  )
}

const applyProductMigrations = (products: Product[]) => {
  const appliedMigrationIds = readAppliedMigrations()
  const appliedMigrationSet = new Set(appliedMigrationIds)
  let nextProducts = products

  productMigrations.forEach((migration) => {
    if (appliedMigrationSet.has(migration.id)) {
      return
    }

    const existingProductNames = new Set(
      nextProducts.map((product) => product.name.toLocaleUpperCase('pt-BR')),
    )
    const productsToAdd = migration.productNames
      .filter((productName) => !existingProductNames.has(productName.toLocaleUpperCase('pt-BR')))
      .map((productName, index) => ({
        id: `${migration.id}-${index}`,
        name: productName,
      }))

    nextProducts = [...nextProducts, ...productsToAdd]
    appliedMigrationSet.add(migration.id)
  })

  writeAppliedMigrations([...appliedMigrationSet])
  return nextProducts
}

const readStoredProducts = () => {
  try {
    const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY)
    if (!stored) {
      writeAppliedMigrations(productMigrations.map((migration) => migration.id))
      return sortProducts(defaultProducts)
    }

    const products = parseProducts(JSON.parse(stored) as unknown)
    return products.length
      ? sortProducts(applyProductMigrations(products))
      : sortProducts(defaultProducts)
  } catch {
    return sortProducts(defaultProducts)
  }
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(readStoredProducts)

  useEffect(() => {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products))
  }, [products])

  const addProduct = (name: string) => {
    const normalizedName = name.trim()
    if (!normalizedName) {
      return false
    }

    setProducts((currentProducts) =>
      sortProducts([
        ...currentProducts,
        { id: createProductId(), name: normalizedName },
      ]),
    )
    return true
  }

  const renameProduct = (id: string, name: string) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id ? { ...product, name } : product,
      ),
    )
  }

  const removeProduct = (id: string) => {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== id),
    )
  }

  return {
    addProduct,
    products,
    removeProduct,
    renameProduct,
  }
}
