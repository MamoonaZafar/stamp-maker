
"use client";

import { useState } from "react";

type Shape = "round" | "oval" | "rectangle";
type Tab = "All" | "Text" | "Borders" | "Image";

const swatches = [
  "#111111",
  "#2458E8",
  "#E5232E",
  "#148044",
  "#F47716",
  "#8B45B5",
];

export default function Home() {
  const [shape, setShape] = useState<Shape>("round");
  const [tab, setTab] = useState<Tab>("All");
  const [company, setCompany] = useState("YOUR COMPANY");
  const [center, setCenter] = useState("OFFICIAL");
  const [bottom, setBottom] = useState("EST. 2020");
  const [color, setColor] = useState("#111111");
  const [border, setBorder] = useState(3);
  const [radius, setRadius] = useState(120);
  const [textSize, setTextSize] = useState(12);
  const [showGrid, setShowGrid] = useState(true);
  const [logo, setLogo] = useState("");
  const [layers, setLayers] = useState([
    "Outer border",
    "Inner border",
    "Company name",
    "Center text",
    "Bottom text",
  ]);
  const [activeLayer, setActiveLayer] = useState(0);

  const field =
    "mt-2 w-full rounded-xl border border-[#DCE6EE] bg-white px-3.5 py-3 text-sm text-[#172B3A] outline-none transition placeholder:text-gray-400 focus:border-[#1B9DF0] focus:ring-4 focus:ring-[#1B9DF0]/10";

  function exportStamp(type: "svg" | "png") {
    const original = document.getElementById("stamp-art");
    if (!original) return;

    const svg = original.cloneNode(true) as SVGSVGElement;
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "1200");
    svg.setAttribute("height", "1200");

    const source = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([source], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    if (type === "svg") {
      link.href = url;
      link.download = "my-stamp.svg";
      link.click();
      URL.revokeObjectURL(url);
      return;
    }

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 1200;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(image, 0, 0, 1200, 1200);
        canvas.toBlob((png) => {
          if (!png) return;
          const pngUrl = URL.createObjectURL(png);
          link.href = pngUrl;
          link.download = "my-stamp.png";
          link.click();
          URL.revokeObjectURL(pngUrl);
        }, "image/png");
      }
      URL.revokeObjectURL(url);
    };
    image.onerror = () => URL.revokeObjectURL(url);
    image.src = url;
  }

  function reset() {
    setShape("round");
    setTab("All");
    setCompany("YOUR COMPANY");
    setCenter("OFFICIAL");
    setBottom("EST. 2020");
    setColor("#111111");
    setBorder(3);
    setRadius(120);
    setTextSize(12);
    setLogo("");
    setLayers([
      "Outer border",
      "Inner border",
      "Company name",
      "Center text",
      "Bottom text",
    ]);
    setActiveLayer(0);
    setShowGrid(true);
  }

  function chooseTab(next: Tab) {
    setTab(next);
  }

  const isRound = shape === "round";
  const isOval = shape === "oval";

  return (
    <main className="min-h-screen bg-[#F4F7FA] text-[#172B3A]">
      <header className="sticky top-0 z-20 border-b border-[#DCE6EE] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1800px] flex-wrap items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#0A62A0] text-2xl text-white shadow-lg shadow-[#0A62A0]/20">
              <span>✳</span>
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight">
                Imprint<span className="text-[#1B9DF0]">Studio</span>
              </h1>
              <p className="text-[10px] font-semibold uppercase tracking-[2px] text-gray-400">
                Online design workspace
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-1 rounded-full bg-[#F4F7FA] p-1 md:flex">
            {["Stamp Maker", "Invoice Maker", "Quotation", "Signature"].map(
              (item, i) => (
                <button
                  key={item}
                  className={`rounded-full px-4 py-2.5 text-xs font-semibold transition ${
                    i === 0
                      ? "bg-white text-[#0A62A0] shadow-sm"
                      : "text-gray-500 hover:text-[#172B3A]"
                  }`}
                >
                  {item}
                </button>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={reset}
              className="rounded-xl border border-[#DCE6EE] bg-white px-3.5 py-2.5 text-xs font-semibold transition hover:bg-[#F4F7FA] sm:px-4"
            >
              Reset
            </button>
            <button
              onClick={() => exportStamp("svg")}
              className="rounded-xl bg-[#0A62A0] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-[#0A62A0]/20 transition hover:bg-[#084F82] sm:px-5"
            >
              Export design <span className="ml-1">↓</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1800px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[2px] text-[#0A62A0]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1B9DF0]" />
              Stamp design studio
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Create your custom stamp
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              Customize the shape, typography and ink. Preview every change
              before exporting your design.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-2 text-xs font-medium text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Live preview enabled
          </div>
        </div>

        <div className="grid items-start gap-5 xl:grid-cols-[280px_minmax(380px,1fr)_310px]">
          {/* LEFT PANEL */}
          <aside className="overflow-hidden rounded-2xl border border-[#DCE6EE] bg-white shadow-sm">
            <div className="border-b border-[#EAF0F5] px-5 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold">Design elements</h3>
                <span className="rounded-lg bg-[#F4F7FA] px-2 py-1 text-[10px] font-semibold text-gray-500">
                  {layers.length} layers
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-400">
                Organize your stamp components
              </p>
            </div>

            <div className="grid grid-cols-4 border-b border-[#EAF0F5] px-2 pt-2">
              {(["All", "Text", "Borders", "Image"] as Tab[]).map((item) => (
                <button
                  key={item}
                  onClick={() => chooseTab(item)}
                  className={`border-b-2 px-1 py-3 text-[11px] font-semibold transition ${
                    tab === item
                      ? "border-[#0A62A0] text-[#0A62A0]"
                      : "border-transparent text-gray-400 hover:text-[#172B3A]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {tab === "Image" ? (
              <div className="p-5">
                <label className="block rounded-2xl border-2 border-dashed border-[#DCE6EE] p-6 text-center transition hover:border-[#1B9DF0]">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#EAF3FA] text-xl text-[#0A62A0]">
                    ↑
                  </span>
                  <span className="mt-3 block text-sm font-bold">
                    Upload a logo
                  </span>
                  <span className="mt-1 block text-xs text-gray-400">
                    PNG, JPG or SVG image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-4 block w-full text-xs"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = () => setLogo(String(reader.result));
                      reader.readAsDataURL(file);
                    }}
                  />
                </label>
                {logo && (
                  <button
                    onClick={() => setLogo("")}
                    className="mt-3 w-full rounded-xl border border-[#DCE6EE] py-2 text-xs font-semibold"
                  >
                    Remove logo
                  </button>
                )}
              </div>
            ) : (
              <div className="p-3">
                {layers.map((layer, index) => {
                  const textLayer = index >= 2;
                  const visible =
                    tab === "All" ||
                    (tab === "Text" && textLayer) ||
                    (tab === "Borders" && !textLayer);

                  if (!visible) return null;

                  return (
                    <button
                      key={`${layer}-${index}`}
                      onClick={() => setActiveLayer(index)}
                      className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                        activeLayer === index
                          ? "bg-[#F4F7FA] ring-1 ring-[#1B9DF0]/20"
                          : "hover:bg-[#F4F7FA]"
                      }`}
                    >
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm ${
                          activeLayer === index
                            ? "bg-[#EAF3FA] text-[#0A62A0]"
                            : "bg-[#F4F7FA] text-gray-500"
                        }`}
                      >
                        {textLayer ? "T" : "◎"}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-semibold">
                          {layer}
                        </span>
                        <span className="mt-1 block text-[10px] text-gray-400">
                          {textLayer ? "Text element" : "Border element"}
                        </span>
                      </span>
                      {activeLayer === index && (
                        <span className="h-2 w-2 rounded-full bg-[#1B9DF0]" />
                      )}
                    </button>
                  );
                })}
                <button
                  onClick={() =>
                    setLayers((old) => [...old, `New layer ${old.length + 1}`])
                  }
                  className="mt-2 w-full rounded-xl border border-dashed border-[#DCE6EE] py-3 text-xs font-semibold text-gray-500 transition hover:border-[#1B9DF0] hover:text-[#0A62A0]"
                >
                  + Add layer
                </button>
              </div>
            )}

            <div className="border-t border-[#EAF0F5] bg-[#F4F7FA]/70 p-4">
              <div className="flex items-start gap-2.5">
                <span className="text-[#1B9DF0]">✦</span>
                <div>
                  <p className="text-xs font-bold">Design tip</p>
                  <p className="mt-1 text-[11px] leading-5 text-gray-500">
                    Keep curved text short for a clean, professional seal.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* CENTER PREVIEW */}
          <section className="min-w-0 overflow-hidden rounded-2xl border border-[#DCE6EE] bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EAF0F5] px-5 py-4">
              <div>
                <h3 className="text-sm font-bold">Live preview</h3>
                <p className="mt-1 text-xs text-gray-400">
                  Your design updates instantly
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowGrid((v) => !v)}
                  className={`rounded-lg px-3 py-2 text-[11px] font-semibold ${
                    showGrid
                      ? "bg-[#EAF3FA] text-[#0A62A0]"
                      : "bg-[#F4F7FA] text-gray-500"
                  }`}
                >
                  ▦ Grid {showGrid ? "On" : "Off"}
                </button>
                <span className="rounded-lg border border-[#DCE6EE] px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-gray-500">
                  {shape}
                </span>
              </div>
            </div>

            <div
              className="flex min-h-[420px] items-center justify-center p-5 sm:min-h-[570px] sm:p-8"
              style={
                showGrid
                  ? {
                      backgroundColor: "#F4F7FA",
                      backgroundImage:
                        "linear-gradient(#DCE6EE 1px,transparent 1px),linear-gradient(90deg,#DCE6EE 1px,transparent 1px),linear-gradient(#EAF0F5 1px,transparent 1px),linear-gradient(90deg,#EAF0F5 1px,transparent 1px)",
                      backgroundSize:
                        "60px 60px,60px 60px,12px 12px,12px 12px",
                    }
                  : { backgroundColor: "#F4F7FA" }
              }
            >
              <div className="w-full max-w-[480px] rounded-2xl border border-[#DCE6EE]/80 bg-white/70 p-3 shadow-sm sm:p-5">
                <svg
                  id="stamp-art"
                  viewBox="0 0 300 300"
                  className="block h-auto w-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <path
                      id="company-arc"
                      d="M 38 150 A 112 112 0 0 1 262 150"
                    />
                    <path
                      id="bottom-arc"
                      d="M 38 150 A 112 112 0 0 0 262 150"
                    />
                  </defs>

                  
{isRound && (
  <>
    {/* ONLY TWO CIRCLES */}
    <circle
      cx="150"
      cy="150"
      r="132"
      fill="none"
      stroke={color}
      strokeWidth={border}
    />

    <circle
      cx="150"
      cy="150"
      r="91"
      fill="none"
      stroke={color}
      strokeWidth={border}
    />

    {/* TOP CURVED TEXT — BETWEEN THE TWO CIRCLES */}
    <defs>
      <path
        id="company-arc"
        d="M 35 150 A 115 115 0 0 1 265 150"
      />
      <path
        id="bottom-arc"
        d="M 35 150 A 115 115 0 0 0 265 150"
      />
    </defs>

    <text
      fill={color}
      fontSize={textSize}
      fontWeight="800"
      letterSpacing="1.5"
      textAnchor="middle"
    >
      <textPath href="#company-arc" startOffset="50%">
        {company.toUpperCase()}
      </textPath>
    </text>

    <text
      fill={color}
      fontSize={textSize}
      fontWeight="800"
      letterSpacing="1"
      textAnchor="middle"
    >
      <textPath href="#bottom-arc" startOffset="50%">
        {bottom.toUpperCase()}
      </textPath>
    </text>

    {/* CENTER CONTENT — INSIDE INNER CIRCLE */}
    <text
      x="150"
      y="132"
      textAnchor="middle"
      fill={color}
      fontSize="10"
      fontWeight="600"
    >
      {center === "OFFICIAL" ? "OFFICIAL SEAL" : ""}
    </text>

    <text
      x="150"
      y="157"
      textAnchor="middle"
      fill={color}
      fontSize="14"
      fontWeight="900"
    >
      {center.toUpperCase()}
    </text>

    {logo && (
      <image
        href={logo}
        x="130"
        y="175"
        width="40"
        height="25"
        preserveAspectRatio="xMidYMid meet"
      />
    )}
  </>
)}


                  {isOval && (
                    <>
                      <ellipse
                        cx="150"
                        cy="150"
                        rx="132"
                        ry="95"
                        fill="none"
                        stroke={color}
                        strokeWidth={border}
                      />
                      <ellipse
                        cx="150"
                        cy="150"
                        rx="120"
                        ry="83"
                        fill="none"
                        stroke={color}
                        strokeWidth={border * 0.65}
                      />
                      <text
                        x="150"
                        y="130"
                        textAnchor="middle"
                        fill={color}
                        fontSize={textSize + 3}
                        fontWeight="900"
                      >
                        {company.toUpperCase()}
                      </text>
                      <text
                        x="150"
                        y="158"
                        textAnchor="middle"
                        fill={color}
                        fontSize={textSize}
                        fontWeight="800"
                      >
                        {center.toUpperCase()}
                      </text>
                      <text
                        x="150"
                        y="185"
                        textAnchor="middle"
                        fill={color}
                        fontSize={textSize - 1}
                        fontWeight="700"
                      >
                        {bottom.toUpperCase()}
                      </text>
                      {logo && (
                        <image
                          href={logo}
                          x="132"
                          y="190"
                          width="36"
                          height="24"
                          preserveAspectRatio="xMidYMid meet"
                        />
                      )}
                    </>
                  )}

                  {shape === "rectangle" && (
                    <>
                      <rect
                        x="12"
                        y="76"
                        width="276"
                        height="148"
                        rx="5"
                        fill="none"
                        stroke={color}
                        strokeWidth={border}
                      />
                      <rect
                        x="22"
                        y="86"
                        width="256"
                        height="128"
                        rx="3"
                        fill="none"
                        stroke={color}
                        strokeWidth={border * 0.65}
                      />
                      <text
                        x="150"
                        y="125"
                        textAnchor="middle"
                        fill={color}
                        fontSize={textSize + 4}
                        fontWeight="900"
                      >
                        {company.toUpperCase()}
                      </text>
                      <text
                        x="150"
                        y="157"
                        textAnchor="middle"
                        fill={color}
                        fontSize={textSize + 1}
                        fontWeight="800"
                      >
                        {center.toUpperCase()}
                      </text>
                      <text
                        x="150"
                        y="185"
                        textAnchor="middle"
                        fill={color}
                        fontSize={textSize}
                        fontWeight="700"
                      >
                        {bottom.toUpperCase()}
                      </text>
                      {logo && (
                        <image
                          href={logo}
                          x="132"
                          y="190"
                          width="36"
                          height="24"
                          preserveAspectRatio="xMidYMid meet"
                        />
                      )}
                    </>
                  )}
                </svg>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#EAF0F5] px-5 py-4">
              <div>
                <p className="text-xs font-bold">Custom stamp artwork</p>
                <p className="mt-1 text-[11px] text-gray-400">
                  Vector preview · Transparent export
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => exportStamp("svg")}
                  className="rounded-xl border border-[#DCE6EE] px-4 py-2.5 text-xs font-bold transition hover:bg-[#F4F7FA]"
                >
                  ↓ SVG
                </button>
                <button
                  onClick={() => exportStamp("png")}
                  className="rounded-xl bg-[#0A62A0] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#084F82]"
                >
                  ↓ PNG
                </button>
              </div>
            </div>
          </section>

          {/* RIGHT SETTINGS */}
          <aside className="overflow-hidden rounded-2xl border border-[#DCE6EE] bg-white shadow-sm">
            <div className="border-b border-[#EAF0F5] px-5 py-4">
              <h3 className="text-sm font-bold">Stamp properties</h3>
              <p className="mt-1 text-xs text-gray-400">
                Fine-tune the appearance
              </p>
            </div>

            <div className="space-y-6 p-5">
              <section>
                <h4 className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-gray-400">
                  Shape
                </h4>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {(["round", "oval", "rectangle"] as Shape[]).map((item) => (
                    <button
                      key={item}
                      onClick={() => setShape(item)}
                      className={`rounded-xl border px-2 py-3 text-xs font-semibold capitalize transition ${
                        shape === item
                          ? "border-[#1B9DF0] bg-[#F4F7FA] text-[#0A62A0] ring-1 ring-[#1B9DF0]/30"
                          : "border-[#DCE6EE] text-gray-500 hover:border-[#1B9DF0]"
                      }`}
                    >
                      <span className="mb-1 block text-xl">
                        {item === "round" ? "◯" : item === "oval" ? "⬭" : "▱"}
                      </span>
                      {item}
                    </button>
                  ))}
                </div>
              </section>

              <section className="space-y-5">
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-600">
                      Outer radius
                    </label>
                    <span className="rounded-md bg-[#F4F7FA] px-2 py-1 text-[11px] font-bold">
                      {radius}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="105"
                    max="130"
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))}
                    className="mt-3 w-full accent-[#0A62A0]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-600">
                      Border thickness
                    </label>
                    <span className="rounded-md bg-[#F4F7FA] px-2 py-1 text-[11px] font-bold">
                      {border}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    step="0.5"
                    value={border}
                    onChange={(e) => setBorder(Number(e.target.value))}
                    className="mt-3 w-full accent-[#0A62A0]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-600">
                      Curved text size
                    </label>
                    <span className="rounded-md bg-[#F4F7FA] px-2 py-1 text-[11px] font-bold">
                      {textSize}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="15"
                    value={textSize}
                    onChange={(e) => setTextSize(Number(e.target.value))}
                    className="mt-3 w-full accent-[#0A62A0]"
                  />
                </div>
              </section>

              <section className="border-t border-[#EAF0F5] pt-5">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-gray-400">
                    Ink color
                  </h4>
                  <span className="font-mono text-[10px] text-gray-400">
                    {color.toUpperCase()}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {swatches.map((swatch) => (
                    <button
                      key={swatch}
                      aria-label={`Choose ${swatch}`}
                      title={swatch}
                      onClick={() => setColor(swatch)}
                      className={`h-8 w-8 rounded-full border border-black/5 transition ${
                        color === swatch
                          ? "ring-2 ring-[#1B9DF0] ring-offset-2"
                          : "hover:scale-110"
                      }`}
                      style={{ backgroundColor: swatch }}
                    />
                  ))}
                  <label
                    title="Custom ink color"
                    className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-[#DCE6EE] text-lg text-gray-600 hover:border-[#1B9DF0]"
                  >
                    +
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="sr-only"
                    />
                  </label>
                </div>
              </section>

              <section className="border-t border-[#EAF0F5] pt-5">
                <h4 className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-gray-400">
                  Stamp text
                </h4>
                <label className="mt-4 block text-xs font-semibold">
                  Company name
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    maxLength={35}
                    className={field}
                  />
                </label>
                <label className="mt-4 block text-xs font-semibold">
                  Center text
                  <input
                    value={center}
                    onChange={(e) => setCenter(e.target.value)}
                    maxLength={24}
                    className={field}
                  />
                </label>
                <label className="mt-4 block text-xs font-semibold">
                  Bottom text
                  <input
                    value={bottom}
                    onChange={(e) => setBottom(e.target.value)}
                    maxLength={35}
                    className={field}
                  />
                </label>
              </section>

              <div className="rounded-xl bg-[#EAF3FA] p-4">
                <p className="text-xs font-bold text-[#0A62A0]">
                  Ready to export?
                </p>
                <p className="mt-1 text-[11px] leading-5 text-[#0A62A0]/75">
                  Download an SVG for scalable artwork or a transparent PNG
                  for everyday use.
                </p>
              </div>
            </div>
          </aside>
        </div>

        <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 px-1 py-3 text-[11px] text-gray-400">
          <span>Imprint Studio · Custom stamp designer</span>
          <span>Designed for clarity. Built for your workflow.</span>
        </footer>
      </div>
    </main>
  );
}
