
/***********************\
 * 1) FeaturesSection   *
\***********************/
export function FeaturesSection() {
  const features = [
    {
      title: "Real-time Tracking",
      desc: "Monitor stock and budget changes the moment they happen.",
    },
    {
      title: "One-Click Actions",
      desc: "Add, update, or reconcile items without leaving the dashboard.",
    },
    {
      title: "Role-based Security",
      desc: "Granular permissions keep your data safe and tidy.",
    },
    {
      title: "Export & Reports",
      desc: "Download summaries for audits, investors, or team standups.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Powerful features, simple workflow</h2>
        <p className="mt-3 text-gray-600">Everything you need to run inventory and budgets without the busywork.</p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/***********************\
 * 2) Testimonials      *
\***********************/
export function Testimonials() {
  const items = [
    {
      quote:
        "CasaPro saved us 8 hours/week on stock checks. The alerts are clutch.",
      author: "Maya K.",
      role: "Ops Lead, FreshBites",
    },
    {
      quote:
        "Our budget overruns dropped to zero last quarter. It just works.",
      author: "Olu A.",
      role: "Founder, BlueCrate",
    },
    {
      quote:
        "Setup took minutes, and the team adopted it instantly.",
      author: "Eric D.",
      role: "Warehouse Manager, Lumi",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold">What customers say</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <figure key={i} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
              <blockquote className="text-gray-800">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm text-gray-600">
                <span className="font-medium text-gray-900">{t.author}</span> · {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/***********************\
 * 3) PricingPlans      *
\***********************/
export function PricingPlans() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      period: "/mo",
      features: ["100 items", "Basic analytics", "Email support"],
      cta: "Get started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$29",
      period: "/mo",
      features: ["Unlimited items", "Advanced reports", "Priority support"],
      cta: "Go Pro",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      features: ["SLA & SSO", "Dedicated success", "Custom integrations"],
      cta: "Talk to sales",
      highlighted: false,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold">Fair, flexible pricing</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <div
              key={i}
              className={`rounded-2xl border p-6 shadow-sm ${
                p.highlighted ? "border-black ring-2 ring-black" : "border-gray-200"
              }`}
            >
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <div className="mt-3 flex items-end gap-1">
                <span className="text-4xl font-bold">{p.price}</span>
                <span className="text-gray-600">{p.period}</span>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-gray-700">
                {p.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span aria-hidden>•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full rounded-xl bg-black text-white py-2.5 font-medium hover:opacity-90">
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/***********************\
 * 4) FAQSection        *
\***********************/
export function FAQSection() {
  const faqs = [
    {
      q: "Can I import existing inventory?",
      a: "Yes, upload CSVs or use the API to sync from your current system.",
    },
    {
      q: "Do you offer a free trial?",
      a: "The Starter plan is free forever; Pro has a 14‑day trial.",
    },
    {
      q: "How does budgeting work?",
      a: "Set per‑category caps and receive alerts before you overspend.",
    },
    {
      q: "Is my data secure?",
      a: "We use encryption at rest and in transit, with role‑based access.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold">Frequently asked questions</h2>
        <div className="mt-8 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
          {faqs.map((f, i) => (
            <details key={i} className="group p-6">
              <summary className="flex cursor-pointer items-center justify-between font-medium">
                {f.q}
                <span className="ml-4 text-gray-400 group-open:rotate-180 transition">▾</span>
              </summary>
              <p className="mt-3 text-gray-700 text-sm leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/***********************\
 * 5) PartnersLogos     *
\***********************/
export function PartnersLogos() {
  const logos = ["Acme", "Kairo", "Nova", "Pulse", "Atlas", "Vertex"];
  return (
    <section className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-gray-600 text-sm">Trusted by teams at</p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {logos.map((name, i) => (
            <div key={i} className="flex items-center justify-center h-12 rounded-xl border border-gray-200 bg-gray-50">
              <span className="text-gray-700 text-sm font-medium">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/***********************\
 * 6) CallToActionBanner*
\***********************/
export function CallToActionBanner() {
  return (
    <section className="py-16 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold">Ready to streamline CasaPro workflows?</h2>
          <p className="mt-2 text-white/80">Start free, upgrade anytime. No credit card required.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none rounded-xl bg-white text-black py-2.5 px-5 font-medium hover:opacity-90">Create account</button>
          <button className="flex-1 md:flex-none rounded-xl border border-white/30 py-2.5 px-5 font-medium hover:bg-white/10">Book a demo</button>
        </div>
      </div>
    </section>
  );
}

/***********************\
 * 7) StatsCounter      *
\***********************/
export function StatsCounter() {
  const stats = [
    { label: "Active items tracked", value: "18k+" },
    { label: "Budget alerts prevented", value: "2,300+" },
    { label: "Avg. setup time", value: "7 min" },
  ];
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="rounded-2xl bg-white border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold">{s.value}</div>
            <div className="mt-1 text-gray-600 text-sm">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/***********************\
 * 8) BlogPreview       *
\***********************/
export function BlogPreview() {
  const posts = [
    {
      title: "5 mistakes to avoid in inventory ops",
      excerpt: "From over‑counting to stale SKUs, here’s how to keep operations clean.",
    },
    {
      title: "How to set category budgets that actually stick",
      excerpt: "A simple framework for forecasting usage and avoiding surprise spend.",
    },
    {
      title: "Migrating from spreadsheets in one afternoon",
      excerpt: "You don’t need a week. Here’s the 90‑minute plan we recommend.",
    },
  ];
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold">From the CasaPro journal</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <article key={i} className="rounded-2xl border border-gray-200 p-6 hover:shadow-sm">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">{p.excerpt}</p>
              <button className="mt-4 text-sm font-medium underline">Read more</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/***********************\
 * 9) TrustBadges       *
\***********************/
export function TrustBadges() {
  const badges = [
    "ISO‑27001 Ready",
    "99.9% Uptime",
    "GDPR Aligned",
    "Role‑Based Access",
  ];
  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap items-center gap-3">
          {badges.map((b, i) => (
            <span key={i} className="rounded-full bg-white border border-gray-200 px-4 py-2 text-sm text-gray-700">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/***********************\
 * 10) DemoVideo        *
\***********************/
export function DemoVideo() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-gray-200 bg-black">
          {/* Replace src with your demo video URL */}
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="CasaPro Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}

/***********************\
 * 11) ContactStrip     *
\***********************/
export function ContactStrip() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">Questions? We’re here to help.</h3>
          <p className="text-gray-600 text-sm">Chat with support or email us and we’ll get back within a day.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <a href="#" className="flex-1 md:flex-none rounded-xl border border-gray-300 py-2.5 px-5 text-center hover:bg-gray-50">support@casapro.app</a>
          <a href="#" className="flex-1 md:flex-none rounded-xl bg-black text-white py-2.5 px-5 text-center hover:opacity-90">Open chat</a>
        </div>
      </div>
    </section>
  );
}

