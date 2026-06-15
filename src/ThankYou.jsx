import './App.css'
import './ThankYou.css'

function ThankYou() {
  return (
    <main className="stage stage--center">
      <div className="grain" aria-hidden="true" />
      <div className="reeds" aria-hidden="true" />

      <section className="thanks">
        <div className="thanks-badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12.5l4.2 4.2L19 7"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <span className="eyebrow thanks-eyebrow">RSVP confirmed</span>

        <h1 className="thanks-title">
          You&rsquo;re on the <em>list</em>.
        </h1>

        <p className="thanks-text">
          Thanks for reserving your copy of the Q1 FY2026-27 GCC report.
          We&rsquo;ll send it straight to your inbox the day it publishes in
          early July.
        </p>

        <div className="thanks-actions">
          <a
            className="btn btn-primary"
            href="https://www.bambooreports.com/"
          >
            Explore Bamboo Reports
          </a>
        </div>
      </section>
    </main>
  )
}

export default ThankYou
