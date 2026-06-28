import { useEffect, useState } from 'react'

const QUANTITIES_STORAGE_KEY = 'calculador-estoque:quantities'

const readStoredQuantities = () => {
  try {
    const stored = localStorage.getItem(QUANTITIES_STORAGE_KEY)
    if (!stored) {
      return {}
    }

    const parsed = JSON.parse(stored) as unknown
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {}
    }

    return Object.entries(parsed as Record<string, unknown>).reduce<
      Record<string, number>
    >((quantities, [id, value]) => {
      const quantity = Number(value)
      if (Number.isFinite(quantity) && quantity > 0) {
        quantities[id] = quantity
      }

      return quantities
    }, {})
  } catch {
    return {}
  }
}

export function useQuantities() {
  const [quantities, setQuantities] =
    useState<Record<string, number>>(readStoredQuantities)

  useEffect(() => {
    localStorage.setItem(QUANTITIES_STORAGE_KEY, JSON.stringify(quantities))
  }, [quantities])

  const setQuantity = (id: string, value: string) => {
    const parsed = Number(value)
    setQuantities((currentQuantities) => ({
      ...currentQuantities,
      [id]: Number.isFinite(parsed) && parsed > 0 ? parsed : 0,
    }))
  }

  const clearQuantities = () => setQuantities({})

  const removeQuantity = (id: string) => {
    setQuantities((currentQuantities) => {
      const nextQuantities = { ...currentQuantities }
      delete nextQuantities[id]
      return nextQuantities
    })
  }

  return {
    clearQuantities,
    quantities,
    removeQuantity,
    setQuantity,
  }
}
