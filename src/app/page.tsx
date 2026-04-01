export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Nav */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-zinc-100">
        <span className="text-xl font-bold tracking-tight text-zinc-900">Construction.co</span>
        <nav className="hidden sm:flex gap-8 text-sm text-zinc-600">
          <a href="#services" className="hover:text-zinc-900 transition-colors">Services</a>
          <a href="#projects" className="hover:text-zinc-900 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-zinc-900 transition-colors">Contact</a>
        </nav>
        <a
          href="#contact"
          className="text-sm font-medium bg-zinc-900 text-white px-4 py-2 rounded-full hover:bg-zinc-700 transition-colors"
        >
          Get a Quote
        </a>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32 bg-zinc-50">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900 max-w-3xl leading-tight">
          Building the Future, One Project at a Time
        </h1>
        <p className="mt-6 text-lg text-zinc-500 max-w-xl">
          We deliver high-quality construction services — from residential builds to large commercial developments.
        </p>
        <div className="mt-10 flex gap-4">
          <a
            href="#projects"
            className="bg-zinc-900 text-white px-6 py-3 rounded-full font-medium hover:bg-zinc-700 transition-colors"
          >
            View Our Work
          </a>
          <a
            href="#contact"
            className="border border-zinc-300 text-zinc-900 px-6 py-3 rounded-full font-medium hover:bg-zinc-100 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-8 py-24 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-zinc-900 mb-12 text-center">What We Do</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { title: "Residential", desc: "Custom homes built to spec, on time and on budget." },
            { title: "Commercial", desc: "Office buildings, retail spaces, and mixed-use developments." },
            { title: "Renovation", desc: "Full interior and exterior remodels with minimal disruption." },
          ].map((s) => (
            <div key={s.title} className="p-6 rounded-2xl border border-zinc-100 bg-zinc-50">
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">{s.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-zinc-900 text-white px-8 py-24 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Build?</h2>
        <p className="text-zinc-400 mb-8">Get in touch and we'll put together a free quote for your project.</p>
        <a
          href="mailto:hello@construction.co"
          className="inline-block bg-white text-zinc-900 font-medium px-8 py-3 rounded-full hover:bg-zinc-100 transition-colors"
        >
          hello@construction.co
        </a>
      </section>
    </div>
  );
}
