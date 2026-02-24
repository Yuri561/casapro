/*************************************************
 * CASA PRO – IMMERSIVE LANDING SECTIONS (FULL)
 * Dark Navy + Cyan Glow System
 *************************************************/


/***********************\
 * 1) FeaturesSection   *
\***********************/
export function FeaturesSection() {
  const features = [
    {
      title: "Real-time Tracking",
      desc: "Monitor stock levels and budget shifts instantly across all categories. No refresh. No delay. Just clarity."
    },
    {
      title: "One-Click Actions",
      desc: "Add, update, or reconcile items in seconds without breaking your workflow."
    },
    {
      title: "Role-based Security",
      desc: "Granular access controls ensure the right people see the right data."
    },
    {
      title: "Export & Smart Reports",
      desc: "Generate professional-grade reports for audits, reviews, or leadership updates."
    }
  ];

  return (
    <section className="relative py-36 bg-[#0f172a] text-white overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[160px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Powerful features.
            <span className="text-cyan-400"> Zero friction.</span>
          </h2>

          <p className="mt-6 text-gray-400 text-lg">
            CasaPro eliminates spreadsheet chaos and disconnected systems. 
            Every feature is designed to reduce cognitive load and increase operational visibility.
          </p>
        </div>

        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-3xl bg-white/5 border border-white/10 p-10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-3 hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]"
            >
              <h3 className="text-xl font-semibold">{f.title}</h3>
              <p className="mt-4 text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/***********************\
 * 2) StatsCounter      *
\***********************/
export function StatsCounter() {
  const stats = [
    { label: "Active items tracked globally", value: "18k+" },
    { label: "Budget alerts prevented", value: "2,300+" },
    { label: "Average onboarding time", value: "7 min" }
  ];

  return (
    <section className="relative py-32 bg-black text-white overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold">
          Built for performance at scale
        </h2>

        <div className="mt-16 grid sm:grid-cols-3 gap-12">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="text-5xl font-bold text-cyan-400">{s.value}</div>
              <div className="mt-4 text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/***********************\
 * 3) Testimonials      *
\***********************/
export function Testimonials() {
  const items = [
    {
      quote: "CasaPro reduced our weekly inventory workload by 40%.",
      author: "Maya K.",
      role: "Operations Lead"
    },
    {
      quote: "We eliminated budget overruns entirely within one quarter.",
      author: "Olu A.",
      role: "Founder"
    },
    {
      quote: "The clarity this gives our team is unreal.",
      author: "Eric D.",
      role: "Warehouse Manager"
    }
  ];

  return (
    <section className="relative py-36 bg-[#0f172a] text-white overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold">
          Trusted by
          <span className="text-cyan-400"> modern operators</span>
        </h2>

        <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
          From startups to scaling enterprises, CasaPro helps teams gain control without complexity.
        </p>

        <div className="mt-20 grid md:grid-cols-3 gap-10">
          {items.map((t, i) => (
            <div
              key={i}
              className="rounded-3xl bg-white/5 border border-white/10 p-10 backdrop-blur-xl hover:border-cyan-400/40 transition"
            >
              <p className="text-gray-300 text-lg leading-relaxed">“{t.quote}”</p>
              <div className="mt-8 text-sm text-gray-400">
                <span className="text-white font-semibold">{t.author}</span>
                <div>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/***********************\
 * 4) PricingPlans      *
\***********************/
export function PricingPlans() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      description: "Perfect for individuals and small teams.",
      features: ["Up to 100 items", "Basic analytics", "Email support"],
      highlight: false
    },
    {
      name: "Pro",
      price: "$29",
      description: "For growing teams that need control.",
      features: ["Unlimited items", "Advanced reports", "Priority support"],
      highlight: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large-scale operations.",
      features: ["SSO & SLA", "Dedicated success manager", "Custom integrations"],
      highlight: false
    }
  ];

  return (
    <section className="relative py-36 bg-black text-white overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10" />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold">
          Simple pricing.
          <span className="text-cyan-400"> No surprises.</span>
        </h2>

        <div className="mt-20 grid md:grid-cols-3 gap-10">
          {plans.map((p, i) => (
            <div
              key={i}
              className={`rounded-3xl p-10 border backdrop-blur-xl transition-all duration-300 ${
                p.highlight
                  ? "bg-cyan-400/10 border-cyan-400 shadow-[0_0_50px_rgba(34,211,238,0.3)] scale-105"
                  : "bg-white/5 border-white/10 hover:border-cyan-400/40"
              }`}
            >
              <h3 className="text-2xl font-semibold">{p.name}</h3>
              <p className="mt-2 text-gray-400 text-sm">{p.description}</p>

              <div className="mt-6 text-5xl font-bold">{p.price}</div>

              <ul className="mt-8 space-y-3 text-gray-400">
                {p.features.map((f, idx) => (
                  <li key={idx}>• {f}</li>
                ))}
              </ul>

              <button className="mt-10 w-full rounded-xl bg-white text-black py-3 font-semibold">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/***********************\
 * 5) FAQSection        *
\***********************/
export function FAQSection() {
  const faqs = [
    {
      q: "Can I import my existing inventory?",
      a: "Yes. Upload CSV files or connect directly through API integrations."
    },
    {
      q: "Is there a free version?",
      a: "Yes. The Starter plan is free forever."
    },
    {
      q: "How secure is my data?",
      a: "We use encryption at rest and in transit with role-based access control."
    }
  ];

  return (
    <section className="relative py-36 bg-[#0f172a] text-white overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center">
          Frequently asked
          <span className="text-cyan-400"> questions</span>
        </h2>

        <div className="mt-16 space-y-6">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:border-cyan-400/40 transition"
            >
              <summary className="cursor-pointer font-semibold text-lg">
                {f.q}
              </summary>
              <p className="mt-4 text-gray-400 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}


/***********************\
 * 6) TrustBadges       *
\***********************/
export function TrustBadges() {
  const badges = [
    "ISO-27001 Ready",
    "99.9% Uptime",
    "GDPR Compliant",
    "Role-Based Access Control"
  ];

  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-6">
        {badges.map((b, i) => (
          <span
            key={i}
            className="rounded-full bg-white/5 border border-white/10 px-6 py-3 text-sm text-gray-300"
          >
            {b}
          </span>
        ))}
      </div>
    </section>
  );
}


/***********************\
 * 7) ContactStrip      *
\***********************/
export function ContactStrip() {
  return (
    <section className="relative py-40 bg-[#0f172a] text-white overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[160px]" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <h3 className="text-5xl font-bold leading-tight">
          Ready to simplify your operations?
        </h3>

        <p className="mt-6 text-gray-400 text-lg">
          Join teams worldwide who rely on CasaPro to stay organized, proactive, and efficient.
        </p>

        <div className="mt-12 flex justify-center gap-6">
          <button className="rounded-xl bg-cyan-400 text-black px-8 py-4 font-semibold shadow-lg shadow-cyan-400/30">
            Start Free
          </button>
          <button className="rounded-xl border border-white/20 px-8 py-4 hover:bg-white/10 transition">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
}
/***********************\
 * 6) PartnersLogos     *
\***********************/
export function PartnersLogos() {
  const logos = [
    "Acme Corp",
    "Kairo Systems",
    "Nova Logistics",
    "Pulse Retail",
    "Atlas Supply",
    "Vertex Labs"
  ];

  return (
    <section className="relative py-32 bg-[#0f172a] text-white overflow-hidden">
      
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10" />
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        
        <p className="text-sm uppercase tracking-widest text-gray-500">
          Trusted by teams worldwide
        </p>

        <h2 className="mt-6 text-4xl md:text-5xl font-bold">
          Powering operations for
          <span className="text-cyan-400"> modern companies</span>
        </h2>

        <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
          From retail operations to warehouse logistics, CasaPro helps organizations
          gain clarity and control across their inventory ecosystems.
        </p>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
          {logos.map((name, i) => (
            <div
              key={i}
              className="flex items-center justify-center h-20 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl transition hover:border-cyan-400/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]"
            >
              <span className="text-gray-300 text-sm font-medium tracking-wide">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}