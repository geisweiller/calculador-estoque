import { Button, Input, Text, Tooltip } from '@fluentui/react-components'
import {
  ArrowSortDownLines24Regular,
  ArrowSortUpLines24Regular,
  Dismiss24Regular,
  Search24Regular,
} from '@fluentui/react-icons'
import { makeStyles } from '@griffel/react'

type ProductSearchProps = {
  resultCount: number
  search: string
  sortDirection: 'asc' | 'desc'
  totalCount: number
  onSearchChange: (search: string) => void
  onToggleSortDirection: () => void
}

const useStyles = makeStyles({
  wrap: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) auto auto',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
    '@media (max-width: 520px)': {
      gridTemplateColumns: 'minmax(0, 1fr) auto',
      gap: '6px',
    },
  },
  input: {
    width: '100%',
    '@media (max-width: 520px)': {
      gridColumnStart: 1,
      gridColumnEnd: 3,
    },
  },
  result: {
    color: '#386641',
    fontSize: '12px',
    fontWeight: 700,
    whiteSpace: 'nowrap',
    '@media (max-width: 520px)': {
      whiteSpace: 'normal',
    },
  },
  sortButton: {
    minWidth: '44px',
  },
  clearButton: {
    minWidth: '32px',
  },
})

export function ProductSearch({
  resultCount,
  search,
  sortDirection,
  totalCount,
  onSearchChange,
  onToggleSortDirection,
}: ProductSearchProps) {
  const styles = useStyles()

  return (
    <section className={styles.wrap} aria-label="Busca de produtos">
      <Input
        aria-label="Buscar produto"
        className={styles.input}
        contentBefore={<Search24Regular />}
        contentAfter={
          search ? (
            <Tooltip content="Limpar busca" relationship="label">
              <Button
                appearance="transparent"
                className={styles.clearButton}
                icon={<Dismiss24Regular />}
                onClick={() => onSearchChange('')}
              />
            </Tooltip>
          ) : null
        }
        placeholder="Buscar produto"
        value={search}
        onChange={(_, input) => onSearchChange(input.value)}
      />
      <Text className={styles.result}>
        {resultCount} de {totalCount} produtos
      </Text>
      <Tooltip
        content={
          sortDirection === 'asc'
            ? 'Ordenar produtos de Z a A'
            : 'Ordenar produtos de A a Z'
        }
        relationship="label"
      >
        <Button
          className={styles.sortButton}
          icon={
            sortDirection === 'asc' ? (
              <ArrowSortUpLines24Regular />
            ) : (
              <ArrowSortDownLines24Regular />
            )
          }
          onClick={onToggleSortDirection}
        />
      </Tooltip>
    </section>
  )
}
