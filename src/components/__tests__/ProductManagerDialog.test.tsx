import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ProductManagerDialog } from '../ProductManagerDialog'

const renderDialog = () => {
  const props = {
    products: [
      { id: 'glue', name: 'COLA' },
      { id: 'foam', name: 'ESPUMA D28 REAL' },
    ],
    onAddProduct: vi.fn(() => true),
    onRemoveProduct: vi.fn(),
    onRenameProduct: vi.fn(),
  }

  render(
    <FluentProvider theme={webLightTheme}>
      <ProductManagerDialog {...props} />
    </FluentProvider>,
  )

  return props
}

describe('ProductManagerDialog', () => {
  it('adds a product from the modal form', async () => {
    const user = userEvent.setup()
    const props = renderDialog()

    await user.click(screen.getByRole('button', { name: 'Produtos' }))
    await waitFor(() =>
      expect(screen.getByText('Adicionar')).toBeInTheDocument(),
    )
    await user.type(screen.getByLabelText('Nome do novo produto'), 'MANTA 100')
    await user.click(screen.getByText('Adicionar'))

    expect(props.onAddProduct).toHaveBeenCalledWith('MANTA 100')
  })

  it('removes a product from its row', async () => {
    const user = userEvent.setup()
    const props = renderDialog()

    await user.click(screen.getByRole('button', { name: 'Produtos' }))
    const glueInput = await screen.findByDisplayValue('COLA')
    const row = glueInput.closest('div')

    expect(row).not.toBeNull()
    await user.click(within(row!).getByRole('button'))

    expect(props.onRemoveProduct).toHaveBeenCalledWith('glue')
  })
})
