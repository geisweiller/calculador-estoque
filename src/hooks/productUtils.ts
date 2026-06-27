import type { Product } from '../types'

export const createProductId = () =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`

export const sortProducts = (products: Product[]) =>
  [...products].sort((firstProduct, secondProduct) =>
    firstProduct.name.localeCompare(secondProduct.name, 'pt-BR', {
      numeric: true,
      sensitivity: 'base',
    }),
  )

export const parseProducts = (source: unknown) => {
  const items = Array.isArray(source)
    ? source
    : source &&
        typeof source === 'object' &&
        Array.isArray((source as { products?: unknown }).products)
      ? (source as { products: unknown[] }).products
      : []

  return items
    .map((item, index) => {
      if (typeof item === 'string') {
        const name = item.trim()
        return name ? { id: createProductId(), name } : null
      }

      if (!item || typeof item !== 'object') {
        return null
      }

      const product = item as Partial<Product>
      const name = typeof product.name === 'string' ? product.name.trim() : ''
      const id =
        typeof product.id === 'string' && product.id.trim()
          ? product.id
          : `imported-${index}-${createProductId()}`

      return name ? { id, name } : null
    })
    .filter((product): product is Product => Boolean(product))
}
