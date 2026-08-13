import { Link } from 'react-router-dom'
import { services, addOns, whatsappLink } from '../data.js'
import SmartImage from '../components/SmartImage.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Services() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Our services</span>
          <h1>Full-service event planning</h1>
          <p>
            Pick full-service planning or just the pieces you need. Every service below has its own
            page with details, process and pricing.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container service-list">
          {services.map((s, i) => (
            <Reveal className={`svc-row ${i % 2 ? 'svc-row--rev' : ''}`} key={s.slug} delay={40}>
              <div className="svc-row__media">
                <SmartImage src={s.image} alt={s.title} className="svc-row__img" />
              </div>
              <div className="svc-row__body">
                <span className="svc-row__icon">{s.icon}</span>
                <h2>{s.title}</h2>
                <p className="svc-row__tag">{s.tagline}</p>
                <p>{s.overview}</p>
                <ul className="chips">
                  {s.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
                <div className="svc-row__foot">
                  <span className="svc__price">{s.priceFrom}</span>
                  <div className="svc-row__actions">
                    <Link className="btn btn--sm btn--dark" to={`/services/${s.slug}`}>Details</Link>
                    <a className="btn btn--sm btn--primary" href={whatsappLink(`Hi, I'd like to enquire about ${s.title}.`)} target="_blank" rel="noreferrer">Enquire</a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="container">
          <Reveal className="addons">
            <span className="eyebrow">Also available</span>
            <h3>Add-ons for any event</h3>
            <ul className="chips chips--center">
              {addOns.map((a) => <li key={a}>{a}</li>)}
            </ul>
            <a className="btn btn--sm btn--ghost" href={whatsappLink('Hi, I’d like to add on décor / catering to my event.')} target="_blank" rel="noreferrer">Ask about add-ons</a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
