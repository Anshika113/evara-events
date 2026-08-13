// Central content for the whole site — edit this one file to rebrand.

export const business = {
  name: 'Evara Events & Weddings',
  short: 'Evara',
  tagline: 'We plan. You celebrate.',
  intro:
    'A full-service events studio in Mumbai crafting unforgettable weddings, corporate functions and private celebrations — from concept and décor to flawless execution.',
  phoneDisplay: '+91 98200 12345',
  phone: '+919820012345',
  whatsapp: '919820012345',
  email: 'hello@evaraevents.com',
  address: '3rd Floor, Design House, Lower Parel, Mumbai 400013',
  hours: 'Mon–Sat · 10:00 AM – 7:00 PM',
  mapEmbed: 'https://www.google.com/maps?q=Lower%20Parel%20Mumbai&output=embed',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=Lower+Parel+Mumbai',
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
  },
}

export const whatsappLink = (text = "Hi Evara, I'd like to plan an event.") =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`

// Themed stock imagery with graceful fallback: local file → themed → generic → gradient.
const flickr = (kw, lock, w = 900, h = 1100) => `https://loremflickr.com/${w}/${h}/${kw}?lock=${lock}`
const picsum = (seed, w = 900, h = 1100) => `https://picsum.photos/seed/${seed}/${w}/${h}`
const img = (local, kw, lock, seed) => [local, flickr(kw, lock), picsum(seed)]

export const heroImages = {
  main: img('/images/hero/main.jpg', 'wedding,decor,celebration', 31, 'evara-main'),
  a: img('/images/hero/a.jpg', 'wedding,flowers', 32, 'evara-a'),
  b: img('/images/hero/b.jpg', 'party,event', 33, 'evara-b'),
}

export const stats = [
  { value: '500+', label: 'events delivered' },
  { value: '12', label: 'years of experience' },
  { value: '4.9★', label: 'client rating' },
  { value: '50+', label: 'trusted vendors' },
]

// Service-specific pages. Each `slug` becomes /services/<slug>.
export const services = [
  {
    slug: 'weddings',
    icon: '💍',
    title: 'Weddings',
    tagline: 'Big-day planning, décor & coordination',
    excerpt: 'From intimate ceremonies to grand celebrations — planned and styled end to end.',
    priceFrom: 'from ₹1,50,000',
    image: img('/images/services/weddings.jpg', 'wedding,mandap', 41, 'svc-wed'),
    overview:
      'Your wedding should feel effortless — for you. We handle everything from venue and décor to vendors, timelines and on-the-day coordination, so you can be fully present in every moment.',
    highlights: ['Venue & vendor management', 'Theme, décor & floral design', 'Guest & hospitality management', 'Day-of coordination team'],
    process: [
      ['Consultation', 'We understand your vision, guest count and budget.'],
      ['Design & plan', 'Concept, mood board, vendor shortlist and timeline.'],
      ['Coordination', 'We manage every vendor and detail leading up to the day.'],
      ['Celebrate', 'Our team runs the day so you simply enjoy it.'],
    ],
  },
  {
    slug: 'corporate',
    icon: '🏢',
    title: 'Corporate Events',
    tagline: 'Conferences, launches & offsites',
    excerpt: 'Polished, on-brand corporate events that run like clockwork.',
    priceFrom: 'from ₹75,000',
    image: img('/images/services/corporate.jpg', 'conference,corporate,event', 42, 'svc-corp'),
    overview:
      'Product launches, annual days, conferences and team offsites — delivered with precision, on brand and on time. We manage logistics, staging, AV and hospitality end to end.',
    highlights: ['Venue sourcing & logistics', 'Stage, AV & branding', 'Registration & hospitality', 'Vendor & budget management'],
    process: [
      ['Brief', 'We align on goals, audience and brand guidelines.'],
      ['Plan', 'Venue, run-of-show, production and budget.'],
      ['Produce', 'On-site setup, AV and staffing handled by us.'],
      ['Report', 'Smooth execution with a post-event wrap-up.'],
    ],
  },
  {
    slug: 'birthdays',
    icon: '🎉',
    title: 'Birthdays & Parties',
    tagline: 'Milestones & private celebrations',
    excerpt: 'Playful, personal parties for every age and occasion.',
    priceFrom: 'from ₹40,000',
    image: img('/images/services/birthdays.jpg', 'birthday,party,balloons', 43, 'svc-bday'),
    overview:
      'From a child’s themed birthday to a milestone anniversary, we create joyful, personal celebrations — theme, décor, entertainment, cake and catering, all taken care of.',
    highlights: ['Custom themes & décor', 'Entertainment & activities', 'Cake & catering', 'Photography add-ons'],
    process: [
      ['Idea', 'Share the occasion, theme and vibe you love.'],
      ['Design', 'We craft the theme, décor and entertainment plan.'],
      ['Setup', 'We decorate and manage the day.'],
      ['Party', 'You and your guests simply have fun.'],
    ],
  },
]

// Décor & styling and catering are offered as add-ons within the above services
// (not standalone pages). They remain selectable in the enquiry form.
export const addOns = ['Décor & styling', 'Catering', 'Photography & video']

export const serviceBySlug = (slug) => services.find((s) => s.slug === slug)

// Advanced, filterable portfolio.
export const portfolioCategories = ['All', 'Weddings', 'Corporate', 'Birthdays', 'Décor']
export const portfolio = [
  { label: 'Beachside Wedding', category: 'Weddings', img: img('/images/portfolio/p1.jpg', 'wedding,beach', 51, 'pf1') },
  { label: 'Product Launch', category: 'Corporate', img: img('/images/portfolio/p2.jpg', 'corporate,stage', 52, 'pf2') },
  { label: 'Kids Birthday', category: 'Birthdays', img: img('/images/portfolio/p3.jpg', 'birthday,kids', 53, 'pf3') },
  { label: 'Floral Mandap', category: 'Décor', img: img('/images/portfolio/p4.jpg', 'floral,mandap', 54, 'pf4') },
  { label: 'Sangeet Night', category: 'Weddings', img: img('/images/portfolio/p5.jpg', 'wedding,dance', 55, 'pf5') },
  { label: 'Annual Conference', category: 'Corporate', img: img('/images/portfolio/p6.jpg', 'conference,audience', 56, 'pf6') },
  { label: 'Anniversary Gala', category: 'Birthdays', img: img('/images/portfolio/p7.jpg', 'party,gala', 57, 'pf7') },
  { label: 'Stage Backdrop', category: 'Décor', img: img('/images/portfolio/p8.jpg', 'stage,lights,decor', 58, 'pf8') },
  { label: 'Palace Wedding', category: 'Weddings', img: img('/images/portfolio/p9.jpg', 'wedding,palace', 59, 'pf9') },
]

export const testimonials = [
  { name: 'Riya & Aarav', role: 'Wedding, Udaipur', text: 'Evara made our wedding effortless. Every detail was perfect and we actually got to enjoy our own day.' },
  { name: 'Nikhil Mehta', role: 'Product Launch, Infinite Tech', text: 'The most organised event partner we’ve worked with. On brand, on time, zero stress.' },
  { name: 'Sonia Kapoor', role: '50th Birthday', text: 'They turned my idea into something far more beautiful than I imagined. Guests are still talking about it.' },
  { name: 'The Sharma Family', role: 'Sangeet & Reception', text: 'From décor to catering, everything was seamless. Truly a team you can trust with your biggest day.' },
]

export const faqs = [
  ['How far in advance should we book?', 'For weddings we recommend 4–6 months ahead; for corporate and private events, 3–6 weeks is usually enough. That said, reach out anytime — we also take on shorter timelines.'],
  ['Do you work within a set budget?', 'Yes. We plan around your budget and are transparent about costs at every step. Share a rough figure and we’ll show you what’s possible.'],
  ['Which cities do you cover?', 'We’re based in Mumbai and regularly plan destination events across India. Travel and logistics are handled by our team.'],
  ['Can we customise packages?', 'Absolutely — every event is bespoke. Pick full-service planning or just the pieces you need (décor only, catering only, and so on).'],
  ['Do you handle vendors and coordination on the day?', 'Yes. We manage all vendors and provide an on-the-day coordination team so you never have to chase anyone.'],
  ['How do we get started?', 'Send us an enquiry or message us on WhatsApp. We’ll set up a free consultation to understand your vision.'],
]

// Advanced enquiry form options.
export const eventTypes = ['Wedding', 'Corporate Event', 'Birthday / Party', 'Décor only', 'Catering only', 'Other']
export const budgetRanges = ['Under ₹1 lakh', '₹1–3 lakh', '₹3–7 lakh', '₹7–15 lakh', '₹15 lakh+']
