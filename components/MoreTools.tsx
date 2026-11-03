
const tools = [
  {
    number: "01",
    name: "Stamp Maker",
    description:
      "Design professional business stamps with custom text, shapes, colors, and your own logo.",
    label: "Design your stamp",
    href: "#stamp-maker",
    icon: "stamp",
    featured: true,
  },
  {
    number: "02",
    name: "QR Code Generator",
    description:
      "Generate custom QR codes for websites, contact details, and links. Download and share instantly.",
    label: "Generate QR code",
    href: "/qr-code-generator",
    icon: "qr",
    featured: false,
  },
  {
    number: "03",
    name: "Invoice Generator",
    description:
      "Create clean, professional invoices with editable details, automatic calculations, and easy exports.",
    label: "Create an invoice",
    href: "/invoice-generator",
    icon: "invoice",
    featured: false,
  },
];

function ToolIcon({ type }: { type: string }) {
  if (type === "stamp") {
    return (
      <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9">
        <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
        <path d="M17 24h14M24 17v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  if (type === "qr") {
    return (
      <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9">
        <rect x="6" y="6" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2.5" />
        <rect x="10" y="10" width="6" height="6" fill="currentColor" />
        <rect x="28" y="6" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2.5" />
        <rect x="32" y="10" width="6" height="6" fill="currentColor" />
        <rect x="6" y="28" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2.5" />
        <rect x="10" y="32" width="6" height="6" fill="currentColor" />
        <path d="M28 28h5v5h-5zM37 28h5v5h-5zM28 37h5v5h-5zM37 37h5v5h-5z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9">
      <path d="M12 5h17l9 9v29H12V5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M29 5v10h9M18 23h14M18 29h14M18 35h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="m29 36 3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MoreTools() {
  return (
    <section className="relative overflow-hidden bg-[#f4f8fc] px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2484C0]/15 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#2484C0]">
            <span className="h-2 w-2 rounded-full bg-[#20A0F0]" />
            More tools, more possibilities
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#142B45] sm:text-4xl lg:text-[42px]">
            Everything You Need,{" "}
            <span className="text-[#2484C0]">All in One Place</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            From designing custom stamps to generating QR codes and
            creating invoices, simplify your everyday tasks with our
            easy-to-use online tools.
          </p>

        </div>

        {/* Tools */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

          {tools.map((tool) => (
            <article
              key={tool.number}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(36,132,192,0.10)] sm:p-8 ${
                tool.featured
                  ? "border-[#2484C0]/30 bg-white"
                  : "border-[#dce8f2] bg-white"
              }`}
            >

              {/* Top */}
              <div className="mb-9 flex items-center justify-between">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf5fd] text-[#2484C0] transition-colors duration-300 group-hover:bg-[#2484C0] group-hover:text-white">
                  <ToolIcon type={tool.icon} />
                </div>

                <span className="text-sm font-semibold tracking-widest text-slate-300">
                  {tool.number}
                </span>

              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-[#142B45] sm:text-2xl">
                {tool.name}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                {tool.description}
              </p>

              {/* Action */}
              <a
                href={tool.href}
                className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#2484C0] transition-all duration-300 group-hover:gap-3"
              >
                {tool.label}
                <span aria-hidden="true">→</span>
              </a>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[#0A62A0] to-[#20A0F0] transition-all duration-500 group-hover:w-full" />

            </article>
          ))}

        </div>

        {/* Bottom note */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e1f2fc] text-[#2484C0]">
            ✓
          </span>
          <p className="text-sm text-slate-500">
            Simple tools. Professional results. No complicated setup.
          </p>
        </div>

      </div>
    </section>
  );
}
