import { jsPDF } from 'jspdf'

export function downloadReportPdf(report: string) {
  const pdf = new jsPDF({
    format: 'a4',
    orientation: 'portrait',
    unit: 'mm',
  })

  const margin = 14
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const lineHeight = 6
  const maxLineWidth = pageWidth - margin * 2
  let cursorY = margin

  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(11)

  report.split('\n').forEach((line) => {
    const wrappedLines = pdf.splitTextToSize(line || ' ', maxLineWidth)

    wrappedLines.forEach((wrappedLine: string) => {
      if (cursorY > pageHeight - margin) {
        pdf.addPage()
        cursorY = margin
      }

      pdf.text(wrappedLine, margin, cursorY)
      cursorY += lineHeight
    })
  })

  pdf.save('relatorio-estoque.pdf')
}
