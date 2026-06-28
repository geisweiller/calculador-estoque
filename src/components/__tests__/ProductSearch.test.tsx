import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ProductSearch } from '../ProductSearch'

describe('ProductSearch', () => {
  it('emits search changes and displays result counts', async () => {
    const user = userEvent.setup()
    const onSearchChange = vi.fn()

    function SearchHarness() {
      const [search, setSearch] = useState('')
      const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

      return (
        <ProductSearch
          resultCount={2}
          search={search}
          sortDirection={sortDirection}
          totalCount={10}
          onSearchChange={(nextSearch) => {
            setSearch(nextSearch)
            onSearchChange(nextSearch)
          }}
          onToggleSortDirection={() =>
            setSortDirection((currentDirection) =>
              currentDirection === 'asc' ? 'desc' : 'asc',
            )
          }
        />
      )
    }

    render(<SearchHarness />)

    expect(screen.getByText('2 de 10 produtos')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Ordenar produtos de Z a A' }),
    ).toBeInTheDocument()

    await user.type(screen.getByLabelText('Buscar produto'), 'cola')

    expect(onSearchChange).toHaveBeenLastCalledWith('cola')

    await user.click(screen.getByRole('button', { name: 'Limpar busca' }))

    expect(onSearchChange).toHaveBeenLastCalledWith('')

    await user.click(
      screen.getByRole('button', { name: 'Ordenar produtos de Z a A' }),
    )

    expect(
      screen.getByRole('button', { name: 'Ordenar produtos de A a Z' }),
    ).toBeInTheDocument()
  })
})
