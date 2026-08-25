import { Link, useParams } from 'react-router-dom'
import { pledges } from '../data/pledges'

function PledgePage() {
  const { id } = useParams()
  const pledge = pledges.find((item) => item.id === id)

  if (!pledge) {
    return (
      <main className="not-found">
        <p className="eyebrow">ERROR 404</p>
        <h1>YOU HAVEN'T PROMISED NOT TO DO THIS YET.</h1>
        <Link to="/" className="back-link">
          ← Back to all pledges
        </Link>
      </main>
    )
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
        <div className="pledge-detail-icon">{pledge.icon}</div>

        <p className="eyebrow">YOUR SELECTED COMMITMENT</p>

        <h1>
          I WON'T
          <br />
          <span>{pledge.title.toUpperCase()}.</span>
        </h1>

        <p className="pledge-lead">{pledge.description}</p>

        {pledge.news && (
          <article className="news-story">
            <div className="news-label">
              <span>THE EVIDENCE</span>
              <span>{pledge.news.publication}</span>
            </div>

            <h2>{pledge.news.headline}</h2>

            <p className="news-date">{pledge.news.publishedAt}</p>

            <p className="news-summary">{pledge.news.summary}</p>

            <a
              href={pledge.news.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="source-link"
            >
              {pledge.news.sourceLabel} ↗
            </a>
          </article>
        )}

        <section className="pledge-checkout">
          <p className="eyebrow">THE FINANCIAL CONSEQUENCES OF DECENCY</p>

          <div className="price-row">
            <div>
              <h2>Don't do it.</h2>
              <p>
                Contribute a tiny amount of money to formally demonstrate that
                you are capable of not doing this.
              </p>
            </div>

            <strong>£{pledge.amount}</strong>
          </div>

          <button className="pledge-button">
            PLEDGE £{pledge.amount} →
          </button>

          <p className="checkout-note">
            Payment will be powered by Stripe. We are not currently accepting
            moral support.
          </p>
        </section>
      </section>
    </main>
  )
}

export default PledgePage