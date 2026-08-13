import { Link } from 'react-router-dom'
import { business, services, portfolio, testimonials, stats, whatsappLink, heroImages } from '../data.js'
import SmartImage from '../components/SmartImage.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__text">
            <span className="eyebrow">Mumbai · Est. 2012</span>
            <h1>Unforgettable events, <span className="accent">beautifully planned.</span></h1>
            <p>{business.intro}</p>
            <div className="hero__actions">
              <Link className="btn btn--primary" to="/contact">Plan your event</Link>
              <a className="btn btn--ghost" href={whatsappLink()} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
            </div>
            <div className="hero__stats">
              {stats.map((s) => (
                <div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>
              ))}
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__panel hero__panel--main">
              <SmartImage src={heroImages.main} alt="A beautifully styled event" className="hero__img" />
            </div>
            <div className="hero__panel hero__panel--a">
              <SmartImage src={heroImages.a} alt="Wedding florals" className="hero__img" />
            </div>
            <div className="hero__panel hero__panel--b">
              <SmartImage src={heroImages.b} alt="Celebration" className="hero__img" />
            </div>
            <div className="hero__chip"><strong>4.9 ★★★★★</strong><span>500+ events delivered</span></div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section section--tint">
        <div className="container">
          <Reveal className="section__head">
            <span className="eyebrow">What we do</span>
            <h2>Every occasion, expertly handled</h2>
            <p className="section__lead">Full-service planning across weddings, corporate events and private celebrations.</p>
          </Reveal>
          <div className="grid grid--3">
            {services.map((s, i) => (
              <Reveal as="article" className="card svc" key={s.slug} delay={i * 60}>
                <div className="svc__media">
                  <SmartImage src={s.image} alt={s.title} className="svc__img" />
                  <span className="svc__icon">{s.icon}</span>
                </div>
                <div className="svc__body">
                  <h3>{s.title}</h3>
                  <p>{s.excerpt}</p>
                  <div className="svc__foot">
                    <span className="svc__price">{s.priceFrom}</span>
                    <Link className="link-arrow" to={`/services/${s.slug}`}>Learn more →</Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="container">
          <Reveal className="section__head">
            <span className="eyebrow">How it works</span>
            <h2>Stress-free, from first call to final toast</h2>
          </Reveal>
          <div className="steps">
            {[['01', 'Consult', 'We learn your vision, guest count and budget.'],
              ['02', 'Design', 'A concept, mood board and detailed plan.'],
              ['03', 'Coordinate', 'We manage every vendor and timeline.'],
              ['04', 'Celebrate', 'Our team runs the day — you enjoy it.']].map(([n, t, d], i) => (
              <Reveal className="step" key={n} delay={i * 80}>
                <span className="step__no">{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio preview */}
      <section className="section section--tint">
        <div className="container">
          <Reveal className="section__head">
            <span className="eyebrow">Recent work</span>
            <h2>A glimpse of our events</h2>
          </Reveal>
          <div className="masonry">
            {portfolio.slice(0, 6).map((p, i) => (
              <figure className={`shot shot--${(i % 3) + 1}`} key={p.label}>
                <SmartImage src={p.img} alt={p.label} className="shot__img" />
                <figcaption>{p.label}<span>{p.category}</span></figcaption>
              </figure>
            ))}
          </div>
          <div className="section__cta"><Link className="btn btn--dark" to="/portfolio">View full portfolio</Link></div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <Reveal className="section__head">
            <span className="eyebrow">Kind words</span>
            <h2>Loved by our clients</h2>
          </Reveal>
          <div className="grid grid--2">
            {testimonials.slice(0, 4).map((t, i) => (
              <Reveal as="blockquote" className="card quote" key={t.name} delay={i * 60}>
                <span className="quote__stars">★★★★★</span>
                <p>“{t.text}”</p>
                <cite>{t.name}<span>{t.role}</span></cite>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container cta-band__inner">
          <span className="eyebrow eyebrow--gold">Let’s begin</span>
          <h2>Ready to plan something special?</h2>
          <p>Tell us about your event and get a free consultation within 24 hours.</p>
          <div className="hero__actions">
            <Link className="btn btn--gold" to="/contact">Get a free consultation</Link>
            <a className="btn btn--outline-light" href={`tel:${business.phone}`}>Call {business.phoneDisplay}</a>
          </div>
        </div>
      </section>
    </>
  )
}
