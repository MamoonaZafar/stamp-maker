
"use client";

import { useEffect, useRef, useState } from "react";
const [isDownloading, setIsDownloading] = useState(false);

type InvoiceItem = {
  id: number;
  description: string;
  quantity: number;
  rate: number;
};

type InvoiceData = {
  title: string;
  number: string;
  issueDate: string;
  dueDate: string;
  company: string;
  companyAddress: string;
  companyEmail: string;
  client: string;
  clientAddress: string;
  tax: number;
  currency: string;
  notes: string;
  bank: string;
  signature: string;
  accent: string;
  background: string;
  logo: string;
};

const initialInvoice: InvoiceData = {
  title: "Untitled invoice",
  number: "INV-0001",
  issueDate: new Date().toISOString().slice(0, 10),
  dueDate: "",
  company: "Your Company",
  companyAddress: "Your Business Address",
  companyEmail: "hello@company.com",
  client: "Client Name",
  clientAddress: "Client Address",
  tax: 10,
  currency: "USD",
  notes:
    "Payment is due within 14 days of the invoice date. Late payments may be subject to a fee.",
  bank: "Bank Name: Example Bank\nAccount No: 00000000\nBank Account: 00000000",
  signature: "Authorized Signature",
  accent: "#2484C0",
  background: "#ffffff",
  logo: "",
};

const initialItems: InvoiceItem[] = [
  { id: 1, description: "Website design", quantity: 1, rate: 1200 },
  { id: 2, description: "Hosting (annual)", quantity: 1, rate: 180 },
  { id: 3, description: "Maintenance", quantity: 3, rate: 150 },
];

const tabs = [
  { id: "templates", label: "Templates", icon: "▦" },
  { id: "text", label: "Text", icon: "T" },
  { id: "blocks", label: "Blocks", icon: "▤" },
  { id: "elements", label: "Elements", icon: "△" },
  { id: "icons", label: "Icons", icon: "◇" },
  { id: "uploads", label: "Uploads", icon: "↑" },
  { id: "marks", label: "Marks", icon: "✎" },
  { id: "background", label: "Background", icon: "◐" },
];

const templates = [
  { name: "Professional", color: "#2484C0", style: "professional" },
  { name: "Modern Blue", color: "#176DAA", style: "modern" },
  { name: "Minimal", color: "#334155", style: "minimal" },
  { name: "Classic", color: "#0F766E", style: "classic" },
  { name: "Elegant", color: "#7C3AED", style: "elegant" },
  { name: "Business", color: "#142B45", style: "business" },
];

export default function InvoiceMaker() {
  const [activeTab, setActiveTab] = useState("templates");
  const [invoice, setInvoice] = useState(initialInvoice);
  const [items, setItems] = useState(initialItems);
  const [zoom, setZoom] = useState(55);
  const [pageSize, setPageSize] = useState("A4");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [saved, setSaved] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState("");
  const [template, setTemplate] = useState("professional");
  const [isDownloading, setIsDownloading] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const [history, setHistory] = useState<
    { invoice: InvoiceData; items: InvoiceItem[] }[]
  >([]);

  const [future, setFuture] = useState<
    { invoice: InvoiceData; items: InvoiceItem[] }[]
  >([]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0
  );

  const taxAmount = subtotal * (invoice.tax / 100);
  const total = subtotal + taxAmount;

  const money = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: invoice.currency,
    }).format(value);

  const updateInvoice = (
    field: keyof InvoiceData,
    value: string | number
  ) => {
    setHistory((prev) => [
      ...prev.slice(-29),
      { invoice, items },
    ]);

    setFuture([]);
    setInvoice((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const updateItems = (next: InvoiceItem[]) => {
    setHistory((prev) => [
      ...prev.slice(-29),
      { invoice, items },
    ]);

    setFuture([]);
    setItems(next);
    setSaved(false);
  };

  const undo = () => {
    if (!history.length) return;

    const previous = history[history.length - 1];

    setFuture((prev) => [...prev, { invoice, items }]);
    setInvoice(previous.invoice);
    setItems(previous.items);
    setHistory((prev) => prev.slice(0, -1));
  };

  const redo = () => {
    if (!future.length) return;

    const next = future[future.length - 1];

    setHistory((prev) => [...prev, { invoice, items }]);
    setInvoice(next.invoice);
    setItems(next.items);
    setFuture((prev) => prev.slice(0, -1));
  };

  const addItem = () => {
    updateItems([
      ...items,
      {
        id: Date.now(),
        description: "New service or product",
        quantity: 1,
        rate: 0,
      },
    ]);
  };

  const updateItem = (
    id: number,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );

    setSaved(false);
  };

  const deleteItem = (id: number) => {
    updateItems(items.filter((item) => item.id !== id));
  };

  const addBlock = (block: string) => {
    setSelectedBlock(block);

    if (block === "item") addItem();

    if (block === "heading") {
      updateInvoice("title", "New Invoice Heading");
    }

    if (block === "notes") {
      updateInvoice("notes", "Add your payment terms and notes here.");
    }

    if (block === "signature") {
      updateInvoice("signature", "Authorized Signature");
    }
  };

  const handleLogo = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();

    reader.onload = () => {
      updateInvoice("logo", String(reader.result));
    };

    reader.readAsDataURL(file);
  };

  const saveInvoice = () => {
    try {
      localStorage.setItem(
        "invoice-maker-data",
        JSON.stringify({ invoice, items, template, pageSize })
      );

      setSaved(true);
    } catch {
      alert("Unable to save this invoice in your browser.");
    }
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem("invoice-maker-data");

      if (stored) {
        const data = JSON.parse(stored);

        setInvoice(data.invoice ?? initialInvoice);
        setItems(data.items ?? initialItems);
        setTemplate(data.template ?? "professional");
        setPageSize(data.pageSize ?? "A4");
      }
    } catch {
      // Keep default invoice if saved data cannot be loaded.
    }
  }, []);

  const changeTemplate = (item: (typeof templates)[number]) => {
    setTemplate(item.style);
    updateInvoice("accent", item.color);
  };

  const dateFormat = (date: string) => {
    if (!date) return "Not specified";

    return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const inputClass =
    "w-full min-w-0 bg-transparent outline-none placeholder:text-slate-300 focus:bg-blue-50/50";

  const panelButton =
    "w-full rounded-xl border border-slate-200 bg-white p-3 text-left text-sm transition hover:border-[#2484C0] hover:bg-blue-50";

  // DIRECT PDF DOWNLOAD
  const downloadPDF = async () => {
    const page = pageRef.current;

    if (!page || isDownloading) return;

    setIsDownloading(true);

    const originalTransform = page.style.transform;
    const originalMargin = page.style.marginBottom;

    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      // Temporarily remove editor zoom.
      page.style.transform = "none";
      page.style.marginBottom = "0";

      await document.fonts.ready;

      // Wait for uploaded images to load.
      const images = Array.from(page.querySelectorAll("img"));

      await Promise.all(
        images.map((img) => {
          if (img.complete) return Promise.resolve();

          return new Promise<void>((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          });
        })
      );

      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: invoice.background,
        logging: false,
        width: page.offsetWidth,
        height: page.scrollHeight,
        windowWidth: page.offsetWidth,
      });

      const image = canvas.toDataURL("image/jpeg", 0.98);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: pageSize.toLowerCase(),
        compress: true,
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(
        image,
        "JPEG",
        0,
        0,
        pdfWidth,
        pdfHeight,
        undefined,
        "FAST"
      );

      const fileName = `${(invoice.number || "invoice")
        .replace(/[^a-zA-Z0-9-_]/g, "_")}.pdf`;

      pdf.save(fileName);
    } catch (error) {
      console.error("PDF download failed:", error);
      alert("Unable to generate PDF. Please try again.");
    } finally {
      page.style.transform = originalTransform;
      page.style.marginBottom = originalMargin;

      setIsDownloading(false);
    }
  };

  return (
    <section className="invoice-maker relative overflow-hidden bg-[#f4f8fc] text-[#142B45]">

      {/* TOP TOOLBAR */}
      <div className="invoice-toolbar sticky top-0 z-40 flex min-h-[58px] flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-2 lg:px-6">

        <input
          className="w-36 bg-transparent text-sm font-semibold outline-none sm:w-48"
          value={invoice.title}
          onChange={(e) => updateInvoice("title", e.target.value)}
          aria-label="Invoice document name"
        />

        <div className="flex items-center gap-2 sm:gap-3">

          <button
            onClick={undo}
            disabled={!history.length}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
            title="Undo"
          >
            ↶
          </button>

          <button
            onClick={redo}
            disabled={!future.length}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
            title="Redo"
          >
            ↷
          </button>

          <span className="hidden h-6 w-px bg-slate-200 sm:block" />

          <button
            onClick={() => setZoom((z) => Math.max(30, z - 5))}
            className="rounded-lg px-2 py-1 hover:bg-slate-100"
            title="Zoom out"
          >
            −
          </button>

          <span className="min-w-10 text-center text-sm font-medium tabular-nums">
            {zoom}%
          </span>

          <button
            onClick={() => setZoom((z) => Math.min(100, z + 5))}
            className="rounded-lg px-2 py-1 hover:bg-slate-100"
            title="Zoom in"
          >
            +
          </button>

          <button
            onClick={() => setZoom(55)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            title="Reset zoom"
          >
            ⛶
          </button>

          <select
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value)}
            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium outline-none"
          >
            <option value="A4">A4 · Portrait</option>
            <option value="Letter">Letter · Portrait</option>
          </select>

          <button
            onClick={saveInvoice}
            className="hidden rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold hover:bg-slate-50 sm:block"
          >
            {saved ? "✓ Saved" : "▣ Save"}
          </button>

          <button
            onClick={downloadPDF}
            disabled={isDownloading}
            className="inline-flex items-center gap-2 rounded-full bg-[#2484C0] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#176DAA] disabled:cursor-wait disabled:opacity-60"
          >
            {isDownloading ? (
              <>
                <span className="animate-spin">◌</span>
                Generating PDF...
              </>
            ) : (
              <>↓ Download PDF</>
            )}
          </button>

        </div>
      </div>

      {/* EDITOR BODY */}
      <div className="flex min-h-[760px] flex-col lg:flex-row">

        {/* LEFT NAVIGATION */}
        <aside className="invoice-navigation flex shrink-0 flex-row overflow-x-auto border-b border-slate-200 bg-white lg:w-[86px] lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r">

          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSidebarOpen(true);
              }}
              className={`flex min-w-[76px] flex-col items-center justify-center gap-2 px-2 py-4 text-[10px] font-medium transition lg:min-h-[76px] ${
                activeTab === tab.id
                  ? "bg-blue-50 text-[#2484C0]"
                  : "text-slate-500 hover:bg-slate-50 hover:text-[#2484C0]"
              }`}
            >
              <span className="text-[23px] leading-none">{tab.icon}</span>
              {tab.label}
            </button>
          ))}

        </aside>

        {/* SIDE PANEL */}
        {sidebarOpen && (
          <aside className="invoice-panel relative z-10 w-full shrink-0 border-b border-slate-200 bg-white lg:w-[280px] lg:border-b-0 lg:border-r">

            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                {tabs.find((tab) => tab.id === activeTab)?.label}
              </h3>

              <button
                onClick={() => setSidebarOpen(false)}
                className="rounded-lg px-2 py-1 text-slate-400 hover:bg-slate-100"
                aria-label="Close panel"
              >
                ×
              </button>
            </div>

            <div className="max-h-[470px] space-y-3 overflow-y-auto p-4 lg:max-h-[650px]">

              {/* TEMPLATES */}
              {activeTab === "templates" && (
                <>
                  <p className="mb-4 text-xs text-slate-500">
                    Choose a design to style your invoice.
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {templates.map((item) => (
                      <button
                        key={item.style}
                        onClick={() => changeTemplate(item)}
                        className={`rounded-xl border p-3 text-left transition ${
                          template === item.style
                            ? "border-[#2484C0] bg-blue-50"
                            : "border-slate-200 hover:border-blue-300"
                        }`}
                      >
                        <div className="mb-3 flex h-24 flex-col gap-2 overflow-hidden rounded-md border border-slate-100 bg-white p-2">
                          <div
                            className="h-3 w-1/2"
                            style={{ background: item.color }}
                          />
                          <div className="h-px w-full bg-slate-200" />
                          <div className="h-1 w-3/4 bg-slate-200" />
                          <div className="h-1 w-full bg-slate-200" />
                          <div
                            className="mt-auto h-3 w-full"
                            style={{ background: item.color }}
                          />
                        </div>
                        <span className="text-xs font-semibold">
                          {item.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* TEXT */}
              {activeTab === "text" && (
                <>
                  <p className="text-xs text-slate-500">
                    Add or edit text on your invoice.
                  </p>

                  {[
                    ["Heading", "heading", "Largest text on the page"],
                    ["Subheading", "subheading", "Section titles and labels"],
                    ["Paragraph", "notes", "Notes and payment terms"],
                  ].map(([label, key, desc]) => (
                    <button
                      key={key}
                      className={panelButton}
                      onClick={() => addBlock(key)}
                    >
                      <strong className="block text-base text-[#142B45]">
                        {label}
                      </strong>
                      <span className="text-xs text-slate-400">{desc}</span>
                    </button>
                  ))}

                  <label className="block pt-3 text-xs font-semibold text-slate-500">
                    Invoice heading
                    <input
                      className="mt-2 w-full rounded-lg border border-slate-200 p-3 text-sm"
                      value={invoice.title}
                      onChange={(e) => updateInvoice("title", e.target.value)}
                    />
                  </label>

                  <label className="block text-xs font-semibold text-slate-500">
                    Payment notes
                    <textarea
                      className="mt-2 min-h-24 w-full rounded-lg border border-slate-200 p-3 text-sm"
                      value={invoice.notes}
                      onChange={(e) => updateInvoice("notes", e.target.value)}
                    />
                  </label>
                </>
              )}

              {/* BLOCKS */}
              {activeTab === "blocks" && (
                <>
                  <p className="text-xs text-slate-500">
                    Add common invoice sections.
                  </p>

                  {[
                    ["Company details", "company"],
                    ["Client information", "client"],
                    ["Invoice items", "item"],
                    ["Payment totals", "totals"],
                    ["Payment notes", "notes"],
                    ["Signature area", "signature"],
                  ].map(([label, key]) => (
                    <button
                      key={key}
                      onClick={() => addBlock(key)}
                      className={panelButton}
                    >
                      <span className="font-semibold">{label}</span>
                      <span className="float-right text-[#2484C0]">+</span>
                    </button>
                  ))}

                  <p className="text-xs leading-5 text-slate-400">
                    Your invoice already includes the main sections.
                    Adding items creates new editable rows.
                  </p>
                </>
              )}

              {/* ELEMENTS */}
              {activeTab === "elements" && (
                <>
                  <p className="text-xs text-slate-500">
                    Customize the appearance.
                  </p>

                  <label className="block text-xs font-semibold text-slate-600">
                    Divider and accent color
                    <input
                      type="color"
                      value={invoice.accent}
                      onChange={(e) => updateInvoice("accent", e.target.value)}
                      className="mt-2 h-12 w-full cursor-pointer rounded-lg border border-slate-200 p-1"
                    />
                  </label>

                  <button
                    className={panelButton}
                    onClick={() => setSelectedBlock("divider")}
                  >
                    ━ Add divider
                  </button>

                  <button
                    className={panelButton}
                    onClick={() => setSelectedBlock("shape")}
                  >
                    ▱ Add decorative shape
                  </button>

                  <p className="text-xs text-slate-400">
                    Select a decorative option to show it in your invoice.
                  </p>
                </>
              )}

              {/* ICONS */}
              {activeTab === "icons" && (
                <>
                  <p className="text-xs text-slate-500">
                    Choose an icon for your invoice.
                  </p>

                  <div className="grid grid-cols-4 gap-2">
                    {["✉", "☎", "⌖", "✓", "◆", "★", "●", "▣"].map((icon) => (
                      <button
                        key={icon}
                        onClick={() => setSelectedBlock(icon)}
                        className={`flex h-12 items-center justify-center rounded-lg border text-xl hover:border-[#2484C0] hover:bg-blue-50 ${
                          selectedBlock === icon
                            ? "border-[#2484C0] bg-blue-50"
                            : "border-slate-200"
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* UPLOADS */}
              {activeTab === "uploads" && (
                <>
                  <p className="text-xs text-slate-500">
                    Upload your company logo.
                  </p>

                  <button
                    onClick={() => fileRef.current?.click()}
                    className="flex min-h-36 w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500 hover:border-[#2484C0]"
                  >
                    <span className="text-3xl text-[#2484C0]">↑</span>
                    Click to upload logo
                    <span className="text-xs">PNG, JPG or SVG</span>
                  </button>

                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleLogo(e.target.files?.[0])}
                  />

                  {invoice.logo && (
                    <button
                      onClick={() => updateInvoice("logo", "")}
                      className="w-full rounded-lg border border-red-100 p-3 text-xs text-red-500"
                    >
                      Remove uploaded logo
                    </button>
                  )}
                </>
              )}

              {/* MARKS */}
              {activeTab === "marks" && (
                <>
                  <p className="text-xs text-slate-500">
                    Add your signature details.
                  </p>

                  <label className="block text-xs font-semibold text-slate-600">
                    Signature label
                    <input
                      className="mt-2 w-full rounded-lg border border-slate-200 p-3 text-sm"
                      value={invoice.signature}
                      onChange={(e) =>
                        updateInvoice("signature", e.target.value)
                      }
                    />
                  </label>

                  <button
                    onClick={() => addBlock("signature")}
                    className={panelButton}
                  >
                    + Add signature area
                  </button>
                </>
              )}

              {/* BACKGROUND */}
              {activeTab === "background" && (
                <>
                  <p className="text-xs text-slate-500">
                    Customize your invoice page.
                  </p>

                  <label className="block text-xs font-semibold text-slate-600">
                    Page background
                    <input
                      type="color"
                      value={invoice.background}
                      onChange={(e) =>
                        updateInvoice("background", e.target.value)
                      }
                      className="mt-2 h-12 w-full rounded-lg border border-slate-200 p-1"
                    />
                  </label>

                  <div className="grid grid-cols-4 gap-2">
                    {["#ffffff", "#f8fafc", "#eff6ff", "#f0fdfa"].map(
                      (color) => (
                        <button
                          key={color}
                          onClick={() =>
                            updateInvoice("background", color)
                          }
                          style={{ background: color }}
                          className="h-10 rounded-lg border border-slate-200"
                          aria-label={`Set background ${color}`}
                        />
                      )
                    )}
                  </div>
                </>
              )}

            </div>
          </aside>
        )}

        {/* PREVIEW WORKSPACE */}
        <main className="invoice-workspace relative min-w-0 flex-1 overflow-auto bg-[#f1f3f6] p-5 sm:p-8 lg:p-12">

          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="absolute left-3 top-4 z-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm"
            >
              ☰ Tools
            </button>
          )}

          <div className="flex min-w-max justify-center pb-10">

            <div
              ref={pageRef}
              id="invoice-print-page"
              className="invoice-paper relative flex flex-col overflow-hidden shadow-[0_10px_35px_rgba(15,23,42,0.12)]"
              style={{
                width: pageSize === "A4" ? "794px" : "816px",
                minHeight: pageSize === "A4" ? "1123px" : "1056px",
                background: invoice.background,
                transform: `scale(${zoom / 100})`,
                transformOrigin: "top center",
                marginBottom: `${(zoom / 100 - 1) * 1123}px`,
              }}
            >

              {/* DECORATIVE TOP */}
              <div
                className="relative flex items-start justify-between px-[9%] pb-7 pt-12"
                style={{
                  borderBottom: `2px solid ${invoice.accent}`,
                }}
              >
                <div className="flex flex-col gap-3">
                  <h1
                    className="text-4xl font-extrabold tracking-tight"
                    style={{ color: invoice.accent }}
                  >
                    INVOICE
                  </h1>

                  <span className="text-[10px] font-medium uppercase tracking-widest text-slate-400">
                    {template === "minimal"
                      ? "Invoice document"
                      : "Professional billing"}
                  </span>
                </div>

                {invoice.logo ? (
                  <img
                    src={invoice.logo}
                    alt="Company logo"
                    className="max-h-20 max-w-36 object-contain"
                  />
                ) : (
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold text-white"
                    style={{ background: invoice.accent }}
                  >
                    {invoice.company.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* TOP ACCENT */}
              {template !== "minimal" && (
                <div
                  className="absolute left-0 top-0 h-3 w-full"
                  style={{ background: invoice.accent }}
                />
              )}

              {/* INVOICE DETAILS */}
              <div className="px-[9%] pt-9">

                <div className="grid grid-cols-2 gap-8">

                  <div>
                    <label
                      className="mb-2 block text-[10px] font-bold uppercase tracking-widest"
                      style={{ color: invoice.accent }}
                    >
                      From
                    </label>

                    <input
                      className={`${inputClass} mb-1 text-sm font-bold`}
                      value={invoice.company}
                      onChange={(e) =>
                        updateInvoice("company", e.target.value)
                      }
                    />

                    <textarea
                      className={`${inputClass} min-h-12 resize-none text-xs leading-5 text-slate-500`}
                      value={invoice.companyAddress}
                      onChange={(e) =>
                        updateInvoice("companyAddress", e.target.value)
                      }
                    />

                    <input
                      className={`${inputClass} mt-1 text-xs text-slate-500`}
                      value={invoice.companyEmail}
                      onChange={(e) =>
                        updateInvoice("companyEmail", e.target.value)
                      }
                    />
                  </div>

                  <div className="text-right">
                    <label
                      className="mb-2 block text-[10px] font-bold uppercase tracking-widest"
                      style={{ color: invoice.accent }}
                    >
                      Invoice details
                    </label>

                    <div className="mb-2 text-xs text-slate-500">
                      Invoice #
                      <input
                        className="ml-1 w-24 text-right font-semibold text-slate-700"
                        value={invoice.number}
                        onChange={(e) =>
                          updateInvoice("number", e.target.value)
                        }
                      />
                    </div>

                    <div className="mb-2 text-xs text-slate-500">
                      Issue date: {dateFormat(invoice.issueDate)}
                    </div>

                    <div className="text-xs text-slate-500">
                      Due date: {dateFormat(invoice.dueDate)}
                    </div>
                  </div>

                </div>

                {/* EDITABLE DATES */}
                <div className="mt-5 flex flex-wrap gap-4 border-b border-slate-100 pb-5">
                  <label className="text-[10px] text-slate-500">
                    Issue date
                    <input
                      type="date"
                      value={invoice.issueDate}
                      onChange={(e) =>
                        updateInvoice("issueDate", e.target.value)
                      }
                      className="ml-2 rounded border border-slate-200 p-1 text-xs"
                    />
                  </label>

                  <label className="text-[10px] text-slate-500">
                    Due date
                    <input
                      type="date"
                      value={invoice.dueDate}
                      onChange={(e) =>
                        updateInvoice("dueDate", e.target.value)
                      }
                      className="ml-2 rounded border border-slate-200 p-1 text-xs"
                    />
                  </label>
                </div>

                {/* CLIENT */}
                <div className="my-8">
                  <label
                    className="mb-2 block text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: invoice.accent }}
                  >
                    Bill to
                  </label>

                  <input
                    className={`${inputClass} mb-1 text-sm font-bold`}
                    value={invoice.client}
                    onChange={(e) =>
                      updateInvoice("client", e.target.value)
                    }
                  />

                  <textarea
                    className={`${inputClass} min-h-12 resize-none text-xs leading-5 text-slate-500`}
                    value={invoice.clientAddress}
                    onChange={(e) =>
                      updateInvoice("clientAddress", e.target.value)
                    }
                  />
                </div>

                {/* LINE ITEMS */}
                <div className="overflow-hidden rounded-sm">

                  <div
                    className="grid grid-cols-[1fr_55px_90px_100px] gap-2 px-3 py-3 text-[10px] font-bold text-white"
                    style={{ background: invoice.accent }}
                  >
                    <span>Description</span>
                    <span className="text-center">Qty</span>
                    <span className="text-right">Rate</span>
                    <span className="text-right">Amount</span>
                  </div>

                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="group grid grid-cols-[1fr_55px_90px_100px] items-center gap-2 border-b border-slate-100 px-3 py-3 text-xs"
                    >
                      <input
                        className={`${inputClass} text-xs`}
                        value={item.description}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "description",
                            e.target.value
                          )
                        }
                      />

                      <input
                        type="number"
                        min="0"
                        className="w-full text-center outline-none"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "quantity",
                            Number(e.target.value)
                          )
                        }
                      />

                      <input
                        type="number"
                        min="0"
                        className="w-full text-right outline-none"
                        value={item.rate}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "rate",
                            Number(e.target.value)
                          )
                        }
                      />

                      <div className="flex items-center justify-end gap-1 whitespace-nowrap font-medium">
                        {money(item.quantity * item.rate)}

                        <button
                          onClick={() => deleteItem(item.id)}
                          className="ml-1 hidden text-red-400 hover:text-red-600 group-hover:inline"
                          title="Delete item"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}

                </div>

                <button
                  onClick={addItem}
                  className="mt-3 rounded-lg border border-dashed border-[#2484C0]/40 px-3 py-2 text-xs font-semibold text-[#2484C0] hover:bg-blue-50"
                >
                  + Add line item
                </button>

                {/* TOTALS */}
                <div className="ml-auto mt-8 max-w-[270px] space-y-3 text-xs">

                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal</span>
                    <span className="font-medium text-slate-700">
                      {money(subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-500">
                    <span className="flex items-center gap-2">
                      Tax
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className="w-12 rounded border border-slate-200 p-1 text-center"
                        value={invoice.tax}
                        onChange={(e) =>
                          updateInvoice("tax", Number(e.target.value))
                        }
                      />
                      %
                    </span>

                    <span>{money(taxAmount)}</span>
                  </div>

                  <div
                    className="flex justify-between border-t-2 py-3 text-sm font-extrabold"
                    style={{
                      borderColor: invoice.accent,
                      color: invoice.accent,
                    }}
                  >
                    <span>TOTAL</span>
                    <span>{money(total)}</span>
                  </div>

                </div>

                {/* NOTES */}
                <div className="mt-14 grid grid-cols-2 gap-8">

                  <div>
                    <h3
                      className="mb-3 text-xs font-bold"
                      style={{ color: invoice.accent }}
                    >
                      Payment information
                    </h3>

                    <textarea
                      className={`${inputClass} min-h-24 resize-none text-[10px] leading-5 text-slate-500`}
                      value={invoice.bank}
                      onChange={(e) =>
                        updateInvoice("bank", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <h3
                      className="mb-3 text-xs font-bold"
                      style={{ color: invoice.accent }}
                    >
                      Notes & payment terms
                    </h3>

                    <textarea
                      className={`${inputClass} min-h-24 resize-none text-[10px] leading-5 text-slate-500`}
                      value={invoice.notes}
                      onChange={(e) =>
                        updateInvoice("notes", e.target.value)
                      }
                    />
                  </div>

                </div>

                {/* SIGNATURE */}
                <div className="mt-10 flex justify-end">
                  <div className="w-44 border-b border-slate-200 pb-2">
                    <div
                      className="mb-2 text-2xl italic"
                      style={{ color: invoice.accent }}
                    >
                      {selectedBlock === "signature"
                        ? "Your Signature"
                        : " "}
                    </div>

                    <p className="text-[9px] text-slate-400">
                      {invoice.signature}
                    </p>
                  </div>
                </div>

              </div>

              {/* FOOTER */}
              <div className="mt-auto pt-12">
                <div
                  className="h-2 w-full"
                  style={{ background: invoice.accent }}
                />

                <div className="flex justify-between px-[9%] py-4 text-[9px] text-slate-400">
                  <span>{invoice.company}</span>
                  <span>Thank you for your business!</span>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>

      {/* STATUS BAR */}
      <div className="invoice-status flex items-center justify-between border-t border-slate-200 bg-white px-4 py-2 text-[11px] text-slate-500">
        <span>{items.length + 8} elements · Page 1 of 1</span>

        <span>
          {pageSize === "A4" ? "210 × 297 mm" : "216 × 279 mm"} · Live preview
        </span>
      </div>

    </section>
  );
}
