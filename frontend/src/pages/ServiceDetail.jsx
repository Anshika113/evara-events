import { useParams, Link, Navigate } from 'react-router-dom'
import { services, serviceBySlug, whatsappLink } from '../data.js'
import SmartImage from '../components/SmartImage.jsx'
import Reveal from '../components/Reveal.jsx'

export default function ServiceDetail() {
  const { slug } = useParams()
  const s = serviceBySlug(slug)
  if (!s) return <Navigate to="/services" replace />

  const others = services.filter((x) => x.slug !== s.slug).slice(0, 3)

  return (
    <>
      <section className="detail-hero">
        <div className="detail-hero__media">
          <SmartImage src={s.image} alt={s.title} className="detail-hero__img" />
        </div>
        <div className="detail-hero__overlay">
          <div className="container">
            <nav className="crumbs"><Link to="/services">Services</Link> <span>/</span> {s.title}</nav>
            <span className="svc__icon svc__icon--lg">{s.icon}</span>
            <h1>{s.title}</h1>
            <p>{s.tagline}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container detail">
          <Reveal className="detail__main">
            <h2>Overview</h2>
            <p>{s.overview}</p>

            <h2>What’s included</h2>
            <ul className="ticks ticks--2col">
              {s.highlights.map((h) => <li key={h}>{h}</li>)}
            </ul>

            <h2>How we do it</h2>
            <div className="proc">
              {s.process.map(([t, d], i) => (
                <div className="proc__step" key={t}>
                  <span className="proc__no">{i + 1}</span>
                  <div><h4>{t}</h4><p>{d}</p></div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal as="aside" className="detail__side card" delay={100}>
            <span className="detail__price">{s.priceFrom}</span>
            <p className="footer__muted">Every event is bespoke — final pricing depends on scale, venue and requirements.</p>
            <Link className="btn btn--primary btn--block" to="/contact">Request a quote</Link>
            <a className="btn btn--ghost btn--block" href={whatsappLink(`Hi, I'd like to enquire about ${s.title}.`)} target="_blank" rel="noreferrer">Ask on WhatsApp</a>
          </Reveal>
        </div>

        <div className="container">
          <div className="section__head" style={{ marginTop: '1rem' }}>
            <span className="eyebrow">Explore more</span>
            <h2>Other services</h2>
          </div>
          <div className="grid grid--3">
            {others.map((o) => (
              <Link className="card svc svc--link" to={`/services/${o.slug}`} key={o.slug}>
                <div className="svc__media">
                  <SmartImage src={o.image} alt={o.title} className="svc__img" />
                  <span className="svc__icon">{o.icon}</span>
                </div>
                <div className="svc__body">
                  <h3>{o.title}</h3>
                  <p>{o.excerpt}</p>
                  <span className="link-arrow">Learn more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
