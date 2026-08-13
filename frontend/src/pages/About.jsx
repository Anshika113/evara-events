import { Link } from 'react-router-dom'
import { business, stats, whatsappLink } from '../data.js'
import Reveal from '../components/Reveal.jsx'

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">About us</span>
          <h1>The team behind the magic</h1>
          <p>{business.intro}</p>
        </div>
      </section>

      <section className="section">
        <div className="container about">
          <Reveal className="about__text">
            <h2>Our story</h2>
            <p>
              {business.name} began in 2012 with a simple belief: your celebration should feel
              effortless. Over 500 events later — from palace weddings to product launches — that
              belief still guides everything we do.
            </p>
            <p>
              We’re a close-knit team of planners, designers and coordinators who obsess over the
              details so you don’t have to. We listen first, plan meticulously, and execute with calm
              precision on the day.
            </p>

            <h2>Why couples &amp; companies choose us</h2>
            <ul className="ticks">
              <li>A single point of contact from first call to final toast</li>
              <li>In-house design &amp; décor team for a seamless look</li>
              <li>Transparent budgets — no surprises</li>
              <li>A trusted network of 50+ vendors</li>
              <li>On-the-day coordination so you can be fully present</li>
            </ul>

            <div className="hero__actions">
              <Link className="btn btn--primary" to="/contact">Work with us</Link>
              <a className="btn btn--ghost" href={whatsappLink()} target="_blank" rel="noreferrer">WhatsApp us</a>
            </div>
          </Reveal>

          <Reveal as="aside" className="about__side card" delay={100}>
            <h3>By the numbers</h3>
            <dl className="stats-grid">
              {stats.map((s) => (
                <div key={s.label}><dt>{s.value}</dt><dd>{s.label}</dd></div>
              ))}
            </dl>
            <p className="footer__muted">{business.address}</p>
            <p className="footer__muted">{business.hours}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
