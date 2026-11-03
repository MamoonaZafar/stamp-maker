
import Link from "next/link";

const benefits = [
  {
    number: "01",
    title: "Multiple Stamp Styles",
    description: "Create round, oval and rectangular business stamps.",
  },
  {
    number: "02",
    title: "Personalized Design",
    description: "Customize stamp text, fonts, borders, colors and logos.",
  },
  {
    number: "03",
    title: "Ready-to-Use Files",
    description: "Export your custom stamp design in PNG, SVG and PDF.",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f4f8fc] px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">

        {/* Left Content */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0A62A0] shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#1B9DF0]" />
            Free Online Stamp Design Tool
          </div>

          <h1 className="max-w-2xl text-4xl font-semibold leading-[1.13] tracking-tight text-[#14283b] sm:text-5xl lg:text-[58px]">
            Create Your Own
            <span className="mt-1 block text-[#0A62A0]">
              Custom Stamp Online
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Design a professional custom stamp online with ImprintStudio.
            Create personalized company seals, office stamps, approved
            stamps and business marks. Choose your shape, add custom text
            or a logo, and download your design in just a few clicks.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/stamp-maker"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#0A62A0] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-900/15 transition hover:-translate-y-1 hover:bg-[#084f82]"
            >
              Start Creating Your Stamp
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>

            <span className="text-sm text-slate-500">
              No design experience required
            </span>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <span className="text-[#0A62A0]">✓</span>
              Easy to customize
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[#0A62A0]">✓</span>
              Transparent exports
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[#0A62A0]">✓</span>
              No software installation
            </span>
          </div>
        </div>

        {/* Right Benefits */}
        <div className="relative">
          <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-blue-100/70 to-sky-50/30 blur-2xl" />

          <div className="relative rounded-[2rem] border border-white bg-white/80 p-5 shadow-[0_25px_70px_rgba(15,65,105,0.10)] backdrop-blur-xl sm:p-8">

            <div className="mb-7 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0A62A0]">
                  Your Design Workspace
                </p>
                <h2 className="mt-2 text-xl font-semibold text-[#14283b]">
                  Everything in one place
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#0A62A0]">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="5.5" />
                  <path d="M8.5 12h7M12 8.5v7" />
                </svg>
              </div>
            </div>

            <div className="space-y-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit.number}
                  className="group flex gap-4 rounded-2xl border border-slate-100 bg-white p-5 transition hover:border-blue-200 hover:bg-blue-50/50"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf4fc] text-sm font-bold text-[#0A62A0] transition group-hover:bg-[#0A62A0] group-hover:text-white">
                    {benefit.number}
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#14283b]">
                      {benefit.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-slate-500">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#0A62A0] px-5 py-4 text-white">
              <div>
                <p className="text-sm font-semibold">
                  Ready to make your stamp?
                </p>
                <p className="mt-1 text-xs text-blue-100">
                  Start with a blank design or template.
                </p>
              </div>
              <Link
                href="/stamp-maker"
                aria-label="Open stamp maker"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
              >
                <span className="text-xl">↗</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
