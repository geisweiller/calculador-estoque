import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { useProducts } from '../useProducts'

describe('useProducts', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('starts with default products sorted alphabetically', () => {
    const { result } = renderHook(() => useProducts())

    expect(result.current.products[0].name).toBe('ALÇA BOX')
    expect(result.current.products.length).toBeGreaterThan(1)
  })

  it('adds products in alphabetical order', () => {
    const { result } = renderHook(() => useProducts())

    act(() => {
      expect(result.current.addProduct('ABRAÇADEIRA')).toBe(true)
    })

    expect(result.current.products[0].name).toBe('ABRAÇADEIRA')
  })

  it('adds pending default product migrations to stored product lists', () => {
    localStorage.setItem(
      'calculador-estoque:products',
      JSON.stringify([{ id: 'glue', name: 'COLA' }]),
    )

    const { result } = renderHook(() => useProducts())

    expect(result.current.products.map((product) => product.name)).toEqual(
      expect.arrayContaining([
        'COLA',
        'SUED HOLLAND BEGE CASTOR',
        'SUED HOLLAND BICUBA',
        'SUED HOLLAND CONCE',
        'SUED HOLLAND JET BLACK',
        'SUED HOLLAND LUCY',
      ]),
    )
  })

  it('renames and removes products', () => {
    const { result } = renderHook(() => useProducts())
    const firstProductId = result.current.products[0].id

    act(() => result.current.renameProduct(firstProductId, 'NOVO NOME'))
    expect(result.current.products[0].name).toBe('NOVO NOME')

    act(() => result.current.removeProduct(firstProductId))
    expect(
      result.current.products.some((product) => product.id === firstProductId),
    ).toBe(false)
  })
})
