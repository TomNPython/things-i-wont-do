import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { jsPDF } from 'jspdf'
import { pledges } from '../data/pledges'

type PaymentDetails = {
  pledgeId: string
  levelId: string
  levelName: string
  certificateTitle: string
  amount: number
  currency: string
}

function SuccessPage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()

  const [payment, setPayment] =
    useState<PaymentDetails | null>(null)

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const sessionId = searchParams.get('session_id')

  const pledge = pledges.find(
    (item) => item.id === id,
  )

  useEffect(() => {
    if (!sessionId) {
      setError('No payment session was provided.')
      setIsLoading(false)
      return
    }

    const loadPayment = async () => {
      try {
        const response = await fetch(
          `/.netlify/functions/get-checkout-session?session_id=${encodeURIComponent(sessionId)}`
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.error || 'Unable to verify payment'
          )
        }

        setPayment(data)
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Unable to verify payment'
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadPayment()
  }, [sessionId])

  if (!pledge) {
    return (
      <main className="not-found">
        <p className="eyebrow">ERROR 404</p>
        <h1>THIS EMPLOYMENT DOES NOT EXIST.</h1>

        <Link to="/" className="back-link">
          ← BACK TO ALL PLEDGES
        </Link>
      </main>
    )
  }

  if (isLoading) {
    return (
      <main className="success-page">
        <p className="eyebrow">
          VERIFYING EMPLOYMENT STATUS
        </p>

        <h1>
          CHECKING THAT YOU
          <br />
          <span>PAID NOT TO.</span>
        </h1>
      </main>
    )
  }

  if (error || !payment) {
    return (
      <main className="success-page">
        <p className="eyebrow">PAYMENT VERIFICATION</p>

        <h1>
          SOMETHING WENT
          <br />
          <span>WRONG.</span>
        </h1>

        <p className="success-lead">
          {error || 'We could not verify your payment.'}
        </p>

        <Link to="/" className="back-link">
          ← BACK TO ALL PLEDGES
        </Link>
      </main>
    )
  }

  const amount = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: payment.currency || 'GBP',
  }).format((payment.amount || 0) / 100)

  const shareText =
    `I am now officially a good boss. I paid someone not to destroy the ocean. ${amount} well spent.`

  const downloadCertificate = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    })

    const width = 297
    const height = 210

    doc.setLineWidth(1)
    doc.rect(15, 15, width - 30, height - 30)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text(
      'THINGS I WON’T DO.',
      width / 2,
      35,
      { align: 'center' },
    )

    doc.setFontSize(28)
    doc.setFont('helvetica', 'bold')
    doc.text(
      'CERTIFICATE OF GOOD EMPLOYMENT',
      width / 2,
      60,
      { align: 'center' },
    )

    doc.setFontSize(14)
    doc.setFont('helvetica', 'normal')
    doc.text(
      'This certifies that the bearer has employed me',
      width / 2,
      82,
      { align: 'center' },
    )

    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.text(
      `NOT TO ${pledge.title.toUpperCase()}`,
      width / 2,
      105,
      { align: 'center' },
    )

    doc.setFontSize(13)
    doc.setFont('helvetica', 'normal')
    doc.text(
      `Employer status: ${payment.levelName}`,
      width / 2,
      125,
      { align: 'center' },
    )

    doc.text(
      `Salary: ${amount}`,
      width / 2,
      137,
      { align: 'center' },
    )

    doc.text(
      payment.certificateTitle,
      width / 2,
      151,
      { align: 'center' },
    )

    doc.setFontSize(9)
    doc.text(
      'Issued in recognition of unusually ethical management.',
      width / 2,
      178,
      { align: 'center' },
    )

    doc.save(
      `things-i-wont-do-${pledge.id}.pdf`,
    )
  }

  return (
    <main className="success-page">
      <nav className="pledge-nav">
        <Link to="/" className="logo-link">
          THINGS I WON'T DO.
        </Link>

        <Link
          to={`/pledges/${pledge.id}`}
          className="back-link"
        >
          ← BACK TO THE JOB
        </Link>
      </nav>

      <section className="success-content">
        <p className="eyebrow">
          EMPLOYMENT CONFIRMED
        </p>

        <h1>
          YOU'RE A
          <br />
          <span>GOOD BOSS.</span>
        </h1>

        <p className="success-lead">
          Congratulations. You have successfully paid me
          not to do something terrible.
        </p>

        <div className="success-card">
          <div className="success-icon">
            {pledge.icon}
          </div>

          <p className="eyebrow">
            YOUR EMPLOYEE WILL NOT
          </p>

          <h2>
            {pledge.title.toUpperCase()}.
          </h2>

          <div className="success-details">
            <div>
              <span>EMPLOYER STATUS</span>
              <strong>{payment.levelName}</strong>
            </div>

            <div>
              <span>SALARY</span>
              <strong>{amount}</strong>
            </div>

            <div>
              <span>CERTIFICATION</span>
              <strong>
                {payment.certificateTitle}
              </strong>
            </div>
          </div>
        </div>

        <section className="certificate-section">
          <p className="eyebrow">
            YOUR PAPERWORK
          </p>

          <h2>
            PROOF THAT YOU'RE
            <br />
            <span>A DECENT BOSS.</span>
          </h2>

          <p>
            Download your official certificate and
            display it somewhere people can see that
            you are, at least once, an unusually good
            employer.
          </p>

          <button
            className="pledge-button"
            onClick={downloadCertificate}
          >
            DOWNLOAD YOUR CERTIFICATE →
          </button>
        </section>

        <section className="share-section">
          <p className="eyebrow">
            TELL YOUR COLLEAGUES
          </p>

          <h2>
            LET EVERYONE KNOW
            <br />
            YOU'RE A GOOD BOSS.
          </h2>

          <div className="social-links">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                shareText,
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              X / TWITTER ↗
            </a>

            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                window.location.origin +
                  `/pledges/${pledge.id}/success`,
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              LINKEDIN ↗
            </a>

            <button
              type="button"
              onClick={() =>
                navigator.clipboard.writeText(
                  window.location.href,
                )
              }
            >
              COPY LINK
            </button>
          </div>
        </section>

        <Link
          to="/"
          className="success-next"
        >
          HIRE ME NOT TO DO SOMETHING ELSE →
        </Link>
      </section>
    </main>
  )
}

export default SuccessPage