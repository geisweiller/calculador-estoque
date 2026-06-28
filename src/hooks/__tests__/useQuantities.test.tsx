import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { useQuantities } from '../useQuantities'

describe('useQuantities', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('sets, clears and removes quantities', () => {
    const { result } = renderHook(() => useQuantities())

    act(() => result.current.setQuantity('glue', '4'))
    expect(result.current.quantities).toEqual({ glue: 4 })

    act(() => result.current.removeQuantity('glue'))
    expect(result.current.quantities).toEqual({})

    act(() => result.current.setQuantity('foam', '2'))
    act(() => result.current.clearQuantities())
    expect(result.current.quantities).toEqual({})
  })

  it('ignores invalid or non-positive values', () => {
    const { result } = renderHook(() => useQuantities())

    act(() => result.current.setQuantity('glue', '-1'))
    act(() => result.current.setQuantity('foam', 'banana'))

    expect(result.current.quantities).toEqual({ glue: 0, foam: 0 })
  })
})
