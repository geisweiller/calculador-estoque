import { useMemo } from 'react'
import type { Product, ProductRow } from '../types'

const capitalize = (value: string) =>
  value ? `${value.charAt(0).toLocaleUpperCase('pt-BR')}${value.slice(1)}` : ''

export function useInventoryReport(
  products: Product[],
  quantities: Record<string, number>,
) {
  const data = useMemo<ProductRow[]>(
    () =>
      products.map((product) => ({
        id: product.id,
        product: product.name,
        quantity: quantities[product.id] ?? 0,
      })),
    [products, quantities],
  )

  const filledRows = data.filter((row) => row.quantity > 0)
  const totalQuantity = filledRows.reduce((total, row) => total + row.quantity, 0)
  const today = new Date()
  const weekdayLabel = capitalize(
    new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(today),
  )
  const dateLabel = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
  }).format(today)

  const report = useMemo(() => {
    const generatedAt = new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date())

    const lines = filledRows.map(
      (row) => `${String(row.quantity).padStart(4, ' ')}  ${row.product}`,
    )

    return [
      'RELATÓRIO DE ESTOQUE',
      `Gerado em: ${generatedAt}`,
      `Dia da semana: ${weekdayLabel}`,
      '',
      `Produtos preenchidos: ${filledRows.length}`,
      `Quantidade total: ${totalQuantity}`,
      '',
      lines.length ? lines.join('\n') : 'Nenhum produto preenchido.',
    ].join('\n')
  }, [filledRows, totalQuantity, weekdayLabel])

  return {
    data,
    dateLabel,
    filledRows,
    report,
    totalQuantity,
    weekdayLabel,
  }
}
