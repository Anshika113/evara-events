import { useState } from 'react'
import { business, eventTypes, budgetRanges, faqs, whatsappLink } from '../data.js'
import { submitEnquiry } from '../api.js'

const empty = { name: '', email: '', phone: '', event_type: '', event_date: '', guests: '', budget: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState({ state: 'idle', msg: '' })
  const [errors, setErrors] = useState({})
  const [openFaq, setOpenFaq] = useState(0)

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  async function onSubmit(e) {
    e.preventDefault()
    setStatus({ state: 'loading', msg: '' })
    setErrors({})
    try {
      const res = await submitEnquiry({ ...form, source: 'contact-page' })
      setStatus({ state: 'success', msg: res.message })
      setForm(empty)
    } catch (err) {
      setErrors(err.fieldErrors || {})
      setStatus({ state: 'error', msg: err.message })
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Get in touch</span>
          <h1>Let’s plan your event</h1>
          <p>Share a few details and our team will get back to you within 24 hours with ideas and a quote.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact">
          <div className="card contact__form">
            <h2>Tell us about your event</h2>

            {status.state === 'success' && <div className="alert alert--ok">{status.msg}</div>}
            {status.state === 'error' && <div className="alert alert--err">{status.msg}</div>}

            <form onSubmit={onSubmit} noValidate>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="name">Name *</label>
                  <input id="name" name="name" value={form.name} onChange={update} placeholder="Your name" />
                  {errors.name && <small className="err">{errors.name}</small>}
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone *</label>
                  <input id="phone" name="phone" value={form.phone} onChange={update} placeholder="98xxxxxxxx" />
                  {errors.phone && <small className="err">{errors.phone}</small>}
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" />
                  {errors.email && <small className="err">{errors.email}</small>}
                </div>
                <div className="field">
                  <label htmlFor="event_type">Event type</label>
                  <select id="event_type" name="event_type" value={form.event_type} onChange={update}>
                    <option value="">Select…</option>
                    {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="field-row field-row--3">
                <div className="field">
                  <label htmlFor="event_date">Event date</label>
                  <input id="event_date" name="event_date" type="date" value={form.event_date} onChange={update} />
                </div>
                <div className="field">
                  <label htmlFor="guests">Guests</label>
                  <input id="guests" name="guests" type="number" min="0" value={form.guests} onChange={update} placeholder="e.g. 200" />
                </div>
                <div className="field">
                  <label htmlFor="budget">Budget</label>
                  <select id="budget" name="budget" value={form.budget} onChange={update}>
                    <option value="">Select…</option>
                    {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="message">About your event *</label>
                <textarea id="message" name="message" rows="4" value={form.message} onChange={update} placeholder="Tell us your vision, venue (if any), and anything special…" />
                {errors.message && <small className="err">{errors.message}</small>}
              </div>

              <button className="btn btn--primary" type="submit" disabled={status.state === 'loading'}>
                {status.state === 'loading' ? 'Sending…' : 'Request free consultation'}
              </button>
            </form>
          </div>

          <aside className="contact__info">
            <div className="card">
              <h3>Talk to us</h3>
              <ul className="contact__list">
                <li><a href={`tel:${business.phone}`}>📞 {business.phoneDisplay}</a></li>
                <li><a href={whatsappLink()} target="_blank" rel="noreferrer">💬 Chat on WhatsApp</a></li>
                <li><a href={`mailto:${business.email}`}>✉️ {business.email}</a></li>
                <li>📍 {business.address}</li>
                <li>🕒 {business.hours}</li>
              </ul>
            </div>
            <div className="card map-card">
              <iframe title="Map to Evara Events" src={business.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              <a className="btn btn--sm btn--ghost" href={business.mapLink} target="_blank" rel="noreferrer">Open in Google Maps</a>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container faq">
          <div className="faq__list">
            <div className="section__head" style={{ textAlign: 'left', margin: '0 0 1.5rem', maxWidth: 'none' }}>
              <span className="eyebrow">Good to know</span>
              <h2>Frequently asked questions</h2>
            </div>
            {faqs.map(([q, a], i) => {
              const isOpen = openFaq === i
              return (
                <div className={`faq__item ${isOpen ? 'is-open' : ''}`} key={q}>
                  <button className="faq__q" aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? -1 : i)}>
                    <span>{q}</span>
                    <span className="faq__icon" aria-hidden="true">{isOpen ? '–' : '+'}</span>
                  </button>
                  <div className="faq__a" hidden={!isOpen}><p>{a}</p></div>
                </div>
              )
            })}
          </div>
          <aside className="faq__cta card">
            <h3>Still have a question?</h3>
            <p className="footer__muted">We’re happy to help — reach out and we’ll get right back to you.</p>
            <a className="btn btn--primary btn--block" href={whatsappLink()} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
          </aside>
        </div>
      </section>
    </>
  )
}
