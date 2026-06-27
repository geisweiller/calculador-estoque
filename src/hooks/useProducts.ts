import { useEffect, useState } from 'react'
import { defaultProducts } from '../data/defaultProducts'
import type { Product } from '../types'
import { createProductId, parseProducts, sortProducts } from './productUtils'

const PRODUCTS_STORAGE_KEY = 'calculador-estoque:products'

const readStoredProducts = () => {
  try {
    const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY)
    if (!stored) {
      return sortProducts(defaultProducts)
    }

    const products = parseProducts(JSON.parse(stored) as unknown)
    return products.length ? sortProducts(products) : sortProducts(defaultProducts)
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

  const importProducts = (source: unknown) => {
    const importedProducts = parseProducts(source)
    if (!importedProducts.length) {
      return []
    }

    const sortedProducts = sortProducts(importedProducts)
    setProducts(sortedProducts)
    return sortedProducts
  }

  return {
    addProduct,
    importProducts,
    products,
    removeProduct,
    renameProduct,
  }
}
