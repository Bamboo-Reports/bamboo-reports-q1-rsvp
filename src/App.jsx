import bambooLogo from './assets/bamboo-logo.svg'
import JotFormEmbed from './JotFormEmbed'
import './App.css'

const INSIDE = [
  {
    n: '01',
    text: 'Where new centres are landing, and which cities are pulling ahead',
  },
  {
    n: '02',
    text: 'Which functions are growing, from R&D and engineering to GCC/GIC mandates',
  },
  {
    n: '03',
    text: 'How fast AI and agentic charters are moving from pilot to core',
  },
  {
    n: '04',
    text: 'The signal underneath the growth, and what it means for where your centre stands',
  },
]

function App() {
  return (
    <main className="stage">
      <div className="grain" aria-hidden="true" />
      <div className="reeds" aria-hidden="true" />

      <div className="shell">
        {/* ---------- Left: editorial content ---------- */}
        <section className="content">
          <header className="brand">
            <img
              className="brand-logo"
              src={bambooLogo}
              alt="Bamboo Reports"
              width="160"
              height="69"
            />
          </header>

          <div className="content-body">
            <span className="eyebrow">
              Q1 · FY2026-27 · Publishing early July
            </span>

            <h1 className="headline">
              Be first to get the <br />
              <em>Q1 FY2026-27</em> GCC report.
            </h1>

            <p className="subhead">
              Fresh data on where centres are expanding, which functions are
              growing, and what separates the leaders. Reserve your copy and get
              it the day it publishes in early July.
            </p>

            <div className="inside">
              <div className="inside-head">
                <h2>What&rsquo;s inside</h2>
                <p className="inside-lede">
                  A full quarter of GCC activity, tracked function by function.
                </p>
              </div>
              <ul className="inside-list">
                {INSIDE.map((item) => (
                  <li key={item.n}>
                    <span className="inside-n">{item.n}</span>
                    <span className="inside-text">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <footer className="why">
              <span className="why-label">Why Bamboo Reports</span>
              <p className="why-text">
                We track the GCC sector across{' '}
                <strong>2,400+ multinationals</strong> and{' '}
                <strong>5,800+ centres</strong>, function by function, so leaders
                can see where the sector is heading before it reaches the
                headlines. Much of this is published nowhere else.
              </p>
            </footer>
          </div>
        </section>

        {/* ---------- Right: RSVP form ---------- */}
        <section className="form-panel">
          <div className="form-card">
            <div className="form-head">
              <span className="form-kicker">Reserve your copy</span>
              <p className="form-sub">
                Add your details and we&rsquo;ll send the report the day it
                publishes.
              </p>
            </div>
            <div className="form-frame">
              <JotFormEmbed
                formId="261652081057454"
                title="RSVP - Q1 FY 26-27"
                height="539px"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
