import { describe, expect, it } from 'vitest'
import { parseProducts, sortProducts } from '../productUtils'

describe('productUtils', () => {
  it('sorts products alphabetically using pt-BR rules', () => {
    const sorted = sortProducts([
      { id: '3', name: 'ZIPER PRETO' },
      { id: '1', name: 'ALÇA BOX' },
      { id: '2', name: 'MANTA 60' },
    ])

    expect(sorted.map((product) => product.name)).toEqual([
      'ALÇA BOX',
      'MANTA 60',
      'ZIPER PRETO',
    ])
  })

  it('parses product arrays and ignores invalid entries', () => {
    const parsedProducts = parseProducts([
      'COLA',
      { id: 'wood', name: 'MADEIRA 5X1' },
      { id: 'blank', name: '   ' },
      null,
    ])

    expect(parsedProducts).toEqual([
      expect.objectContaining({ name: 'COLA' }),
      { id: 'wood', name: 'MADEIRA 5X1' },
    ])
  })

  it('parses objects with a products collection', () => {
    expect(parseProducts({ products: ['TNT 40'] })).toEqual([
      expect.objectContaining({ name: 'TNT 40' }),
    ])
  })
})
