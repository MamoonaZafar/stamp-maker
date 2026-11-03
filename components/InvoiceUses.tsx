
const invoiceUses = [
  {
    number: "01",
    title: "Freelance work",
    description:
      "Bill clients for design, development, writing, consulting, and other independent services.",
    icon: "↗",
  },
  {
    number: "02",
    title: "Trades and callouts",
    description:
      "Itemise labour, materials, travel, and callout charges for completed jobs.",
    icon: "⌁",
  },
  {
    number: "03",
    title: "Small business billing",
    description:
      "Send clear, professional invoices for products, services, and everyday business sales.",
    icon: "▤",
  },
  {
    number: "04",
    title: "A receipt after payment",
    description:
      "Give customers a simple record of what they paid and when the payment was received.",
    icon: "✓",
  },
  {
    number: "05",
    title: "Overseas clients",
    description:
      "Set out charges, currency details, and payment terms for clients in other countries.",
    icon: "◎",
  },
  {
    number: "06",
    title: "A quote before the work",
    description:
      "Outline expected costs and services before a project or job gets underway.",
    icon: "≋",
  },
];

export default function InvoiceUses() {
  return (
    <section className="relative overflow-hidden bg-[#f4f8fc] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">

      <div className="mx-auto max-w-7xl">

        {/* Section Introduction */}
        <div className="mb-12 max-w-3xl sm:mb-16">

          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#2484C0]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2484C0]">
              What people bill for
            </span>
          </div>

          <h2 className="max-w-2xl text-3xl font-bold leading-[1.2] tracking-tight text-[#142B45] sm:text-4xl lg:text-[46px]">
            An invoice is a request for money,{" "}
            <span className="text-[#2484C0]">
              written down.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Who it is from, who it is to, what was supplied, what it costs
            and when payment is due. Everything else is presentation —
            and presentation is what makes it look like it came from a
            business rather than an afterthought.
          </p>

        </div>

        {/* Invoice Use Cases */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {invoiceUses.map((item) => (
            <article
              key={item.number}
              className="group relative flex min-h-[225px] flex-col overflow-hidden rounded-2xl border border-[#dce8f2] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#2484C0]/40 hover:shadow-[0_14px_35px_rgba(36,132,192,0.09)] sm:p-7"
            >

              {/* Card Top */}
              <div className="mb-7 flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf5fd] text-xl font-medium text-[#2484C0] transition-all duration-300 group-hover:bg-[#2484C0] group-hover:text-white">
                  {item.icon}
                </div>

                <span className="text-xs font-semibold tracking-[0.15em] text-slate-300">
                  {item.number}
                </span>

              </div>

              {/* Card Content */}
              <h3 className="text-lg font-bold tracking-tight text-[#142B45]">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                {item.description}
              </p>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[#0A62A0] to-[#20A0F0] transition-all duration-500 group-hover:w-full" />

            </article>
          ))}

        </div>

      </div>
    </section>
  );
}
