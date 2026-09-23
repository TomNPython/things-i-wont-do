import { useEffect, useState } from 'react'
import type { Pledge, PledgeLevel } from '../data/pledges'
import certificateTemplate from '../assets/certificate-template.svg?raw'

type CertificateProps = {
  pledge: Pledge
  selectedLevel: PledgeLevel
  name: string
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function Certificate({
  pledge,
  selectedLevel,
  name,
}: CertificateProps) {
  const [svg, setSvg] = useState('')

  useEffect(() => {
    let result = certificateTemplate

    result = result.replace(
      /\{\{NAME\}\}/g,
      escapeXml(name),
    )

    result = result.replace(
      /\{\{PledgeDescription\}\}/g,
      escapeXml(pledge.title),
    )

    result = result.replace(
      /\{\{EmployeeStatusDescription\}\}/g,
      escapeXml(
        selectedLevel.certificate.employeeStatus,
      ),
    )

    result = result.replace(
      /\{\{SalaryDescription\}\}/g,
      escapeXml(`£${selectedLevel.amount}`),
    )

    result = result.replace(
      /\{\{EmployerStatusDescription\}\}/g,
      escapeXml(
        selectedLevel.certificate.employerStatus,
      ),
    )

    setSvg(result)
  }, [pledge, selectedLevel, name])

  if (!svg) {
    return null
  }

  return (
    <div
      className="certificate"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

export default Certificate