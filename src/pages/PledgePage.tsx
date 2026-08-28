import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { pledges } from '../data/pledges'

function PledgePage() {
const { id } = useParams()

const pledge = pledges.find((item) => item.id === id)

const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState('')
const [selectedLevelId, setSelectedLevelId] = useState(
  pledge?.levels[0]?.id
)

  if (!pledge) {
    return (
      <main className="not-found">
        <p className="eyebrow">ERROR 404</p>

        <h1>
          YOU HAVEN'T PROMISED
          <br />
          NOT TO DO THIS YET.
        </h1>

        <Link to="/" className="back-link">
          ← BACK TO ALL PLEDGES
        </Link>
      </main>
    )
  }

    const selectedLevel = pledge.levels.find(
    (level) => level.id === selectedLevelId
  ) ?? pledge.levels[0]

  const handleCheckout = async () => {
  if (!selectedLevel) {
    setError('Please select a pledge level')
    return
  }

  setIsLoading(true)
  setError('')

  try {

const response = await fetch(
  '/.netlify/functions/create-checkout',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pledgeId: pledge.id,
      levelId: selectedLevel.id,
    }),
  }
)

    const responseText = await response.text()

console.log('Checkout response:', {
  status: response.status,
  statusText: response.statusText,
  body: responseText,
})

let data: {
  error?: string
  checkoutUrl?: string
}

try {
  data = responseText
    ? JSON.parse(responseText)
    : {}
} catch {
  throw new Error(
    `Checkout returned invalid JSON (${response.status}): ${responseText || 'empty response'}`
  )
}

if (!response.ok) {
  throw new Error(
    data.error || `Unable to start checkout (${response.status})`
  )
}

if (!data.checkoutUrl) {
  throw new Error('Stripe did not return a checkout URL')
}

window.location.href = data.checkoutUrl

    if (!data.checkoutUrl) {
      throw new Error('Stripe did not return a checkout URL')
    }

    window.location.href = data.checkoutUrl
  } catch (error) {
    setError(
      error instanceof Error
        ? error.message
        : 'Something went wrong'
    )

    setIsLoading(false)
  }
}

  return (
    <main className="pledge-page">
      <nav className="pledge-nav">
        <Link to="/" className="logo-link">
          THINGS I WON'T DO.
        </Link>

        <Link to="/" className="back-link">
          ← ALL PLEDGES
        </Link>
      </nav>

      <section className="pledge-detail">
  <div className="pledge-header">
    <div className="pledge-information">
      <div className="pledge-detail-icon">{pledge.icon}</div>

      <p className="eyebrow">YOUR SELECTED COMMITMENT</p>

      <h1>
        I WON'T
        <br />
        <span>{pledge.title.toUpperCase()}.</span>
      </h1>

      <div className="pledge-copy">
        <p className="pledge-lead">{pledge.description}</p>

        
      {pledge.news && (
        <div className="pledge-story">
          <p className="pledge-story-label"><em>But who would do such a thing?</em></p>

          <h4>{pledge.news.headline}</h4>

          <p className="pledge-story-meta">
            {pledge.news.publication} · {pledge.news.publishedAt}
          </p>

          <p>{pledge.news.summary}</p>

          <a
            href={pledge.news.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="story-cta"
          >
            {pledge.news.sourceLabel} →
          </a>
          <p className="pledge-story-label">And they got paid how much?</p>
          <p>{pledge.news.payouts}</p>
          <p className="pledge-story-label last">Doesn't paying me sound like better value for money?</p>
        </div>

      )}
      </div>
    </div>

    <div className="pledge-selection">
      <p className="eyebrow">CHOOSE MY SALARY</p>

      <h2>
        Be the boss
        <br />
        you wish you had.
      </h2>

      <p className="salary-intro">
        How much would you like to pay me to keep up my commitment towards not doing this?
      </p>

      <div className="pledge-levels">
      {pledge.levels.map((level) => (
        <button
          key={level.id}
          type="button"
          className={`pledge-level ${
            selectedLevelId === level.id
              ? 'is-selected'
              : ''
          }`}
          onClick={() => setSelectedLevelId(level.id)}
          aria-pressed={selectedLevelId === level.id}
        >
            <span className="pledge-level-amount">
              £{level.amount}
            </span>

            <span className="pledge-level-name">
              {level.name}
            </span>

            <span className="pledge-level-tagline">
              {level.tagline}
            </span>

            <span className="pledge-level-certificate">
              Certificate: {level.certificateTitle}
            </span>
          </button>
        ))}
      </div>

      <button
        className="pledge-button"
        onClick={handleCheckout}
        disabled={isLoading}
      >
        {isLoading
          ? 'PROCESSING YOUR MORAL SUPERIORITY...'
          : `BECOME MY BOSS FOR £${selectedLevel.amount} →`}
      </button>

      {error && (
        <p className="checkout-error">
          {error}
        </p>
      )}

      <p className="checkout-note">
        One small salary. One serious commitment.
      </p>
    </div>
  </div>
</section>
    </main>
  )
}

export default PledgePage