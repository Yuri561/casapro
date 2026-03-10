/*************************************************
 * CASA PRO – IMMERSIVE LANDING SECTIONS (FULL)
 * Dark Navy + Cyan Glow System
 *************************************************/

/*************************************************
 * CASA PRO – HOMEOWNER MASTER LANDING SYSTEM
 * Dark Navy + Cyan Glow | Complete Home Control
 *************************************************/


/***********************\
 * 1) FeaturesSection   *
\***********************/
export function FeaturesSection() {
  const features = [
    {
      title: "Whole-Home Inventory Tracking",
      desc: "Track electronics, tools, groceries, appliances, seasonal decor, and valuables in one unified dashboard."
    },
    {
      title: "Room & Zone Mapping",
      desc: "Assign items to Garage, Kitchen, Closet, Basement, or custom zones for instant location clarity."
    },
    {
      title: "Low-Stock & Expiration Alerts",
      desc: "Get proactive reminders when pantry goods, cleaning supplies, or batteries run low."
    },
    {
      title: "Warranty & Serial Storage",
      desc: "Store receipts, serial numbers, purchase dates, and warranty expiration in one secure place."
    },
    {
      title: "Household Budget Awareness",
      desc: "See the real-time financial value of everything inside your home."
    },
    {
      title: "Insurance-Ready Reports",
      desc: "Export organized inventory reports instantly for claims or documentation."
    }
  ];

  return (
    <section className="relative py-40 bg-[#0f172a] text-white overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[160px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Everything in your home.
            <span className="text-cyan-400"> Accounted for.</span>
          </h2>
          <p className="mt-6 text-gray-400 text-lg leading-relaxed">
            CasaPro transforms your house into an organized system.
            No more duplicate purchases. No more lost tools.
            No more forgotten warranties.
          </p>
        </div>

        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-3xl bg-white/5 border border-white/10 p-10 backdrop-blur-xl hover:border-cyan-400/40 transition"
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
 * StatsCounter         *
\***********************/
export function StatsCounter() {
  const stats = [
    { label: "Average items tracked per home", value: "120+" },
    { label: "Duplicate purchases reduced", value: "35%" },
    { label: "Time saved monthly finding items", value: "4 hrs" },
    { label: "Homes prepared for insurance claims", value: "5,000+" }
  ];

  return (
    <section className="relative py-32 bg-black text-white overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold">
          Smart homes operate differently
        </h2>

        <div className="mt-16 grid sm:grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="text-5xl font-bold text-cyan-400">{s.value}</div>
              <div className="mt-4 text-gray-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/***********************\
 * PartnersLogos        *
\***********************/
export function PartnersLogos() {
  const partners = [
    "Family Homes",
    "Apartment Renters",
    "Townhouse Owners",
    "DIY Enthusiasts",
    "Minimalist Households",
    "Growing Families"
  ];

  return (
    <section className="relative py-32 bg-[#0f172a] text-white overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10" />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        
        <p className="text-sm uppercase tracking-widest text-gray-500">
          Used by organized homes everywhere
        </p>

        <h2 className="mt-6 text-4xl md:text-5xl font-bold">
          Built for
          <span className="text-cyan-400"> real households</span>
        </h2>

        <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
          From small apartments to multi-room family homes,
          CasaPro helps people bring clarity to everyday living.
        </p>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
          {partners.map((name, i) => (
            <div
              key={i}
              className="flex items-center justify-center h-20 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
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

/***********************\
 * PricingPlans         *
\***********************/
// export function PricingPlans() {
//   const plans = [
//     {
//       name: "Free",
//       price: "$0",
//       description: "Track essentials and get started.",
//       features: ["100 items", "Room tagging", "Basic exports"]
//     },
//     {
//       name: "Home Pro",
//       price: "$12/mo",
//       description: "Full home control & alerts.",
//       features: [
//         "Unlimited items",
//         "Low-stock alerts",
//         "Warranty tracking",
//         "Cloud backup"
//       ]
//     },
//     {
//       name: "Family Plus",
//       price: "$19/mo",
//       description: "Shared access for households.",
//       features: [
//         "Multi-user access",
//         "Role permissions",
//         "Insurance reports"
//       ]
//     }
//   ];

//   return (
//     <section className="py-40 bg-black text-white">
//       <div className="max-w-7xl mx-auto px-6 text-center">

//         <h2 className="text-5xl font-bold">
//           Simple pricing for
//           <span className="text-cyan-400"> smarter homes</span>
//         </h2>

//         <div className="mt-20 grid md:grid-cols-3 gap-12">
//           {plans.map((p, i) => (
//             <div
//               key={i}
//               className="rounded-3xl bg-white/5 border border-white/10 p-10"
//             >
//               <h3 className="text-2xl font-semibold">{p.name}</h3>
//               <p className="mt-3 text-gray-400 text-sm">{p.description}</p>
//               <div className="mt-6 text-5xl font-bold text-cyan-400">{p.price}</div>

//               <ul className="mt-8 space-y-3 text-gray-400 text-sm">
//                 {p.features.map((f, idx) => (
//                   <li key={idx}>• {f}</li>
//                 ))}
//               </ul>

//               <button className="mt-10 w-full rounded-xl bg-cyan-400 text-black py-3 font-semibold">
//                 Choose Plan
//               </button>
//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }

/***********************\
 * TestimonialsSection  *
\***********************/
export function Testimonials() {
  const testimonials = [
    {
      quote:
        "After tracking our pantry and garage, we stopped buying duplicates. I didn’t realize how much money we were wasting until everything was visible in one place.",
      author: "Melissa R.",
      role: "Homeowner & Parent of 2"
    },
    {
      quote:
        "When a pipe burst in our basement, I had a full list of electronics and tools ready for insurance. That alone made CasaPro worth it.",
      author: "Daniel K.",
      role: "Townhouse Owner"
    },
    {
      quote:
        "I finally know what tools I own and where they are. No more rebuying drills or searching for chargers.",
      author: "Chris M.",
      role: "DIY Enthusiast"
    }
  ];

  return (
    <section className="relative py-40 bg-[#0f172a] text-white overflow-hidden">

      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent" />
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold">
            Trusted by
            <span className="text-cyan-400"> organized homeowners</span>
          </h2>

          <p className="mt-6 text-gray-400 text-lg leading-relaxed">
            CasaPro isn’t just about tracking items.
            It’s about reducing stress, preventing waste,
            and protecting what matters most inside your home.
          </p>
        </div>

        {/* Main Grid */}
        <div className="mt-20 grid lg:grid-cols-4 gap-10">

          {/* Testimonials Cards */}
          <div className="lg:col-span-3 grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="rounded-3xl bg-white/5 border border-white/10 p-10 backdrop-blur-xl hover:border-cyan-400/40 transition"
              >
                <p className="text-gray-300 text-lg leading-relaxed">
                  “{t.quote}”
                </p>

                <div className="mt-8 text-sm text-gray-400">
                  <span className="text-white font-semibold">
                    {t.author}
                  </span>
                  <div>{t.role}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Side Impact Panel */}
          <div className="rounded-3xl bg-white/5 border border-white/10 p-10 backdrop-blur-xl">

            <h3 className="text-xl font-semibold text-cyan-400">
              Home Impact
            </h3>

            <ul className="mt-6 space-y-4 text-gray-300 text-sm leading-relaxed">
              <li>• 30% reduction in duplicate purchases</li>
              <li>• Faster insurance documentation</li>
              <li>• Better grocery and pantry control</li>
              <li>• Reduced household stress</li>
              <li>• More organized living spaces</li>
            </ul>

            <div className="mt-10 p-6 rounded-2xl bg-cyan-400/10 border border-cyan-400/30 text-sm text-gray-300">
              <p>
                When everything in your home is visible,
                you make smarter decisions every day.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

/***********************\
 * FAQSection           *
\***********************/
export function FAQSection() {
  const faqs = [
    {
      q: "Can I track electronics with serial numbers?",
      a: "Yes. Store serial numbers, purchase dates, warranties, and receipts."
    },
    {
      q: "Is this useful for renters?",
      a: "Absolutely. Perfect for tracking valuables and preparing insurance documentation."
    },
    {
      q: "Can I export my home inventory?",
      a: "Yes. Export CSV or PDF reports anytime."
    },
    {
      q: "Is my data secure?",
      a: "All data is encrypted and stored securely in the cloud."
    }
  ];

  return (
    <section className="relative py-36 bg-[#0f172a] text-white overflow-hidden">

      <div className="relative max-w-4xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center">
          Frequently asked
          <span className="text-cyan-400"> questions</span>
        </h2>

        <div className="mt-16 space-y-6">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="rounded-2xl bg-white/5 border border-white/10 p-6"
            >
              <summary className="cursor-pointer font-semibold text-lg">
                {f.q}
              </summary>
              <p className="mt-4 text-gray-400">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/***********************\
 * TrustBadges          *
\***********************/
export function TrustBadges() {
  const badges = [
    "Encrypted Cloud Storage",
    "Insurance-Ready Reports",
    "Multi-User Household Access",
    "Low-Stock Smart Alerts",
    "Secure Data Backup"
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
 * ContactStrip         *
\***********************/
export function ContactStrip() {
  return (
    <section className="relative py-40 bg-[#0f172a] text-white overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <h3 className="text-5xl font-bold leading-tight">
          Bring clarity to your entire home.
        </h3>

        <p className="mt-6 text-gray-400 text-lg">
          Know what you own. Know where it is. Know what it’s worth.
          Reduce waste. Increase control.
        </p>

        <div className="mt-12 flex justify-center gap-6">
          <button className="rounded-xl bg-cyan-400 text-black px-8 py-4 font-semibold">
            Start Free
          </button>
          <button className="rounded-xl border border-white/20 px-8 py-4 hover:bg-white/10 transition">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}

/***********************\
 * 2) Household Benefits *
\***********************/
export function HouseholdBenefits() {
  const benefits = [
    "Stop buying duplicates because you forgot what you already owned.",
    "Quickly find items when you need them — no more searching.",
    "Know the total value of your belongings instantly.",
    "Prepare effortlessly for insurance claims.",
    "Reduce pantry waste and expired goods.",
    "Maintain tools and appliances proactively."
  ];

  return (
    <section className="py-36 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">

        <div>
          <h2 className="text-4xl font-bold">
            Why homeowners choose CasaPro
          </h2>

          <p className="mt-6 text-gray-400 leading-relaxed">
            Home organization isn’t about perfection.
            It’s about clarity, confidence, and control.
          </p>

          <ul className="mt-10 space-y-4 text-gray-300">
            {benefits.map((b, i) => (
              <li key={i}>• {b}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <h3 className="text-lg font-semibold text-cyan-400">
              Financial Awareness
            </h3>
            <p className="mt-4 text-gray-400 text-sm">
              Understand how much your home inventory is worth and make smarter purchase decisions.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <h3 className="text-lg font-semibold text-cyan-400">
              Emergency Preparedness
            </h3>
            <p className="mt-4 text-gray-400 text-sm">
              Whether it’s theft, fire, or natural disaster — your records are secure and accessible.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <h3 className="text-lg font-semibold text-cyan-400">
              Stress Reduction
            </h3>
            <p className="mt-4 text-gray-400 text-sm">
              An organized home reduces mental clutter and daily friction.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}


/***********************\
 * 3) UseCasesSection   *
\***********************/
export function UseCasesSection() {
  const cases = [
    {
      title: "Kitchen & Pantry",
      desc: "Track groceries, expiration dates, bulk goods, and restocking cycles."
    },
    {
      title: "Garage & Tools",
      desc: "Know which tools you own and where they are stored."
    },
    {
      title: "Electronics & Tech",
      desc: "Store model numbers, warranties, and upgrade cycles."
    },
    {
      title: "Seasonal Storage",
      desc: "Rotate holiday decor, outdoor furniture, and equipment efficiently."
    }
  ];

  return (
    <section className="py-36 bg-[#0f172a] text-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center">
          Designed for
          <span className="text-cyan-400"> every room</span>
        </h2>

        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {cases.map((c, i) => (
            <div
              key={i}
              className="rounded-3xl bg-white/5 border border-white/10 p-10"
            >
              <h3 className="text-xl font-semibold">{c.title}</h3>
              <p className="mt-4 text-gray-400 text-sm">{c.desc}</p>
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
      name: "Free",
      price: "$0",
      description: "For small apartments or minimal tracking.",
      features: ["100 items", "Room tracking", "Basic exports"]
    },
    {
      name: "Home Pro",
      price: "$12/mo",
      description: "Complete home control & alerts.",
      features: [
        "Unlimited items",
        "Expiration alerts",
        "Advanced analytics",
        "Cloud backups"
      ]
    },
    {
      name: "Family Plus",
      price: "$19/mo",
      description: "Shared access for multi-person households.",
      features: [
        "Multi-user roles",
        "Insurance-ready reports",
        "Priority support"
      ]
    }
  ];

  return (
    <section className="py-40 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-5xl font-bold">
          Choose your
          <span className="text-cyan-400"> home plan</span>
        </h2>

        <div className="mt-20 grid md:grid-cols-3 gap-12">
          {plans.map((p, i) => (
            <div
              key={i}
              className="rounded-3xl bg-white/5 border border-white/10 p-10"
            >
              <h3 className="text-2xl font-semibold">{p.name}</h3>
              <p className="mt-3 text-gray-400 text-sm">{p.description}</p>
              <div className="mt-6 text-5xl font-bold text-cyan-400">{p.price}</div>

              <ul className="mt-8 space-y-3 text-gray-400 text-sm">
                {p.features.map((f, idx) => (
                  <li key={idx}>• {f}</li>
                ))}
              </ul>

              <button className="mt-10 w-full rounded-xl bg-cyan-400 text-black py-3 font-semibold">
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
 * 5) Final CTA         *
\***********************/
export function FinalCTA() {
  return (
    <section className="relative py-40 bg-[#0f172a] text-white overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20" />

      <div className="relative max-w-4xl mx-auto text-center px-6">
        <h3 className="text-5xl font-bold">
          A more organized home starts today.
        </h3>

        <p className="mt-6 text-gray-400 text-lg">
          Stop guessing. Stop overbuying. Stop losing track.
          Gain clarity over your entire home with CasaPro.
        </p>

        <div className="mt-12 flex justify-center gap-6">
          <button className="rounded-xl bg-cyan-400 text-black px-8 py-4 font-semibold">
            Start Free
          </button>
          <button className="rounded-xl border border-white/20 px-8 py-4 hover:bg-white/10 transition">
            Explore Features
          </button>
        </div>
      </div>
    </section>
  );
}