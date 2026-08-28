import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import PledgePage from './pages/PledgePage'
import SuccessPage from './pages/SuccessPage'
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
          Some people get paid <strong>a lot of money</strong> to do <strong>terrible things</strong>. 
        </p>

        <p className="hero-copy">
          Whether it's destroying the environment, dealing arms to psychopathic warlords, or firing hundreds of employees with zero notice. 
        </p>

        <p className="hero-copy">
          Personally, I have never done any of these things.
        </p>

        <p className="hero-copy">
          I also have very little money. 
        </p>

        <p className="hero-copy">
          That doesn't feel like how employment should work. 
        </p>

        <p className="hero-copy">
          So here's my idea...
        </p>

        <p className="hero-copy">
         Pay me <strong>very little money</strong> to continue <strong>not doing terrible things</strong>. 
        </p>

        <p className="hero-copy">
          <strong>BE THE BOSS YOU WISH YOU HAD.</strong>
        </p>

        <p className="hero-copy">
          Choose my salary. Choose my (lack of) responsibilities. Become the sort of employer who can help me pay the rent without a drop of blood money.
        </p>

        <p className="hero-copy last">The stats so far...</p>

        <div className="hero-stats">
          <div>
            <strong>£1,472</strong>
            <span>spent on good behaviour</span>
          </div>

          <div>
            <strong>78</strong>
            <span>amazingly moral employers</span>
          </div>
        </div>
        <p className="hero-small">
          (Numbers may be inflated based on hopes and prayers)
        </p>
      </header>

      <section className="pledges">
        <div className="section-heading">
          <h3>SELECT MY COMMITMENTS</h3>

          <p>
            Pick a job you would like me to continue not doing. 
          </p>
          <p>
            For a small one-time salary, I promise to honour my pledge as an employee, making the world a better place through merely staying still. 
          </p>
          <p>
            In addition, I will provide you with a certificate demonstrating to the world what a wonderful boss you are.
          </p>
        </div>

        <div className="pledge-grid">
  {pledges.map((pledge) => (
    <article className="pledge-card" key={pledge.id}>
      <div className="pledge-card-main">
        <h3>
          I WON'T
          <br />
          {pledge.title.toUpperCase()}.
        </h3>

        <div className="pledge-icon">{pledge.icon}</div>


        <p className="pledge-description">
          {pledge.description}
        </p>

      </div>

      <div className="pledge-card-footer">

        <Link
          to={`/pledges/${pledge.id}`}
          className="card-button"
        >
          I WON'T DO IT →
        </Link>
      </div>
    </article>
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
        <Route path="/pledges/:id/success" element={<SuccessPage />}
/>
      </Routes>
    </BrowserRouter>
  )
}

export default App