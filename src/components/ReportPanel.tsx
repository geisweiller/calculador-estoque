import { Text, tokens } from '@fluentui/react-components'
import { makeStyles, shorthands } from '@griffel/react'

type ReportPanelProps = {
  report: string
}

const useStyles = makeStyles({
  report: {
    backgroundColor: '#ffffff',
    ...shorthands.border('1px', 'solid', '#dfe5da'),
    ...shorthands.borderRadius('8px'),
    paddingTop: '16px',
    paddingRight: '16px',
    paddingBottom: '16px',
    paddingLeft: '16px',
    '@media (max-width: 720px)': {
      marginTop: '4px',
      paddingTop: '12px',
      paddingRight: '12px',
      paddingBottom: '12px',
      paddingLeft: '12px',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    marginBottom: '12px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 700,
  },
  text: {
    minHeight: '360px',
    maxHeight: 'calc(100vh - 330px)',
    overflow: 'auto',
    whiteSpace: 'pre-wrap',
    backgroundColor: '#f7f8f5',
    color: tokens.colorNeutralForeground1,
    fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace',
    fontSize: '13px',
    lineHeight: '1.55',
    ...shorthands.border('1px', 'solid', '#dfe5da'),
    ...shorthands.borderRadius('6px'),
    paddingTop: '12px',
    paddingRight: '12px',
    paddingBottom: '12px',
    paddingLeft: '12px',
    '@media (max-width: 720px)': {
      minHeight: '180px',
      maxHeight: '280px',
      fontSize: '12px',
    },
  },
})

export function ReportPanel({ report }: ReportPanelProps) {
  const styles = useStyles()

  return (
    <aside className={styles.report} aria-label="Relatório gerado">
      <div className={styles.header}>
        <Text className={styles.title}>Relatório</Text>
      </div>
      <div className={styles.text}>{report}</div>
    </aside>
  )
}
