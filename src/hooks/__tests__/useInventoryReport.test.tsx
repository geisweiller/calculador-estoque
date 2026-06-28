import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useInventoryReport } from '../useInventoryReport'

describe('useInventoryReport', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('builds rows, totals and a text report from products and quantities', () => {
    vi.setSystemTime(new Date('2026-06-27T12:00:00-03:00'))

    const { result } = renderHook(() =>
      useInventoryReport(
        [
          { id: 'glue', name: 'COLA' },
          { id: 'foam', name: 'ESPUMA D28 REAL' },
        ],
        { glue: 2, foam: 3 },
      ),
    )

    expect(result.current.data).toEqual([
      { id: 'glue', product: 'COLA', quantity: 2 },
      { id: 'foam', product: 'ESPUMA D28 REAL', quantity: 3 },
    ])
    expect(result.current.filledRows).toHaveLength(2)
    expect(result.current.totalQuantity).toBe(5)
    expect(result.current.weekdayLabel).toBe('Sábado')
    expect(result.current.report).toContain('RELATÓRIO DE ESTOQUE')
    expect(result.current.report).toContain('Dia da semana: Sábado')
    expect(result.current.report).toContain('Produtos preenchidos: 2')
    expect(result.current.report).toContain('Quantidade total: 5')
    expect(result.current.report).toContain('   2  COLA')
  })

  it('shows an empty state when no quantities are filled', () => {
    const { result } = renderHook(() =>
      useInventoryReport([{ id: 'glue', name: 'COLA' }], {}),
    )

    expect(result.current.filledRows).toHaveLength(0)
    expect(result.current.totalQuantity).toBe(0)
    expect(result.current.report).toContain('Nenhum produto preenchido.')
  })
})
