import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import PledgePage from './pages/PledgePage'
import { pledges } from './data/pledges'
import './App.css'

function Home() {
  return (
    <main>
      <header className="hero">
        <p className="eyebrow">A PUBLIC SERVICE ANNOUNCEMENT</p>

        <h1>
          THINGS
          <br />
          I WON’T
          <br />
          <span>DO.</span>
        </h1>

        <p className="hero-copy">
          A completely voluntary commitment to not being an absolute bastard.
        </p>

        <div className="hero-stats">
          <div>
            <strong>£8,472</strong>
            <span>moral superiority purchased</span>
          </div>

          <div>
            <strong>3,912</strong>
            <span>people behaving normally</span>
          </div>
        </div>
      </header>

      <section className="pledges">
        <div className="section-heading">
          <p className="eyebrow">SELECT YOUR COMMITMENTS</p>

          <h2>Things I won't do.</h2>

          <p>
            Pick something terrible you promise not to do. The money is
            completely unnecessary, which is why we would quite like it.
          </p>
        </div>

        <div className="pledge-grid">
          {pledges.map((pledge) => (
            <Link
              to={`/pledges/${pledge.id}`}
              className="pledge-card-link"
              key={pledge.id}
            >
              <article className="pledge-card">
                <div className="pledge-icon">{pledge.icon}</div>

                <p className="pledge-amount">£{pledge.amount}</p>

                <h3>I won't {pledge.title.toLowerCase()}.</h3>

                <p className="pledge-description">{pledge.description}</p>

                {pledge.news && (
                  <div className="pledge-story">
                    <span>THE SITUATION</span>

                    <h4>{pledge.news.headline}</h4>

                    <p>{pledge.news.summary}</p>

                    <span className="story-cta">
                      READ THE STORY →
                    </span>
                  </div>
                )}

                <div className="card-button">
                  I WON'T DO IT →
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pledges/:id" element={<PledgePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App