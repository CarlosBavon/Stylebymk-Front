import React, { useState } from "react";
import "./Catalogue.css";

// --- Edit this data to match your real menu & prices -----------------
const CATEGORIES = [
  { id: "braids", label: "Braids" },
  { id: "twists", label: "Twists" },
  { id: "locs", label: "Locs" },
  { id: "kids", label: "Kids & care" },
];

const STYLES = [
  {
    id: "knotless",
    category: "braids",
    name: "Knotless braids",
    price: 4500,
    duration: "4–6 hrs",
    description:
      "Feed-in technique for a flat, tension-free start and a natural finish.",
    image: "/images/knotless-braids.jpg",
  },
  {
    id: "box-braids",
    category: "braids",
    name: "Box braids",
    price: 4000,
    duration: "4–5 hrs",
    description:
      "The classic protective style — square parting, uniform thickness, any length.",
    image: "/images/box-braids.jpg",
  },
  {
    id: "cornrows",
    category: "braids",
    name: "Cornrows",
    price: 1800,
    duration: "1–2 hrs",
    description:
      "Straight-back or freestyle patterns, cornrowed close to the scalp.",
    image: "/images/cornrows.jpg",
  },
  {
    id: "feedins",
    category: "braids",
    name: "Feed-in cornrows",
    price: 2000,
    duration: "2–3 hrs",
    description:
      "Gradual feed-in for length without bulk at the root, clean lines.",
    image: "/images/feedin-cornrows.jpg",
  },
  {
    id: "senegalese",
    category: "twists",
    name: "Senegalese twists",
    price: 2500,
    duration: "4–6 hrs",
    description: "Smooth, rope-like twists in your choice of length and thickness.",
    image: "/images/senegalese-twists.jpg",
  },
  {
    id: "marley",
    category: "twists",
    name: "Marley twists",
    price: 2500,
    duration: "3–5 hrs",
    description: "Textured, voluminous twists with a soft, natural-hair look.",
    image: "/images/marley-twists.jpg",
  },
  {
    id: "barrel",
    category: "twists",
    name: "Barrel twists",
    price: 2500,
    duration: "2-3 hrs",
    description: "Statement-size twists, wrapped for a defined, glossy curl.",
    image: "/images/barrel-twists.jpg",
  },
  {
    id: "faux-locs",
    category: "locs",
    name: "Faux locs",
    price: 6000,
    duration: "5–7 hrs",
    description: "Wrapped locs for the look, without the long-term commitment.",
    image: "/images/faux-locs.jpg",
  },
  {
    id: "soft-locs",
    category: "locs",
    name: "Soft locs",
    price: 6500,
    duration: "5–7 hrs",
    description: "A lighter, curlier take on faux locs with natural movement.",
    image: "/images/soft-locs.jpg",
  },
  {
    id: "loc-retwist",
    category: "locs",
    name: "Loc retwist",
    price: 2000,
    duration: "1.5–2 hrs",
    description: "Root touch-up and reshaping to keep established locs neat.",
    image: "/images/loc-retwist.jpg",
  },
  {
    id: "kids-braids",
    category: "kids",
    name: "Kids braids",
    price: 1800,
    duration: "1.5–3 hrs",
    description: "Gentle, low-tension styling sized for smaller heads.",
    image: "/images/kids-braids.jpg",
  },
  {
    id: "takedown",
    category: "kids",
    name: "Take-down & wash",
    price: 1500,
    duration: "1–1.5 hrs",
    description: "Careful removal of your previous style, detangling and a wash.",
    image: "/images/takedown-wash.jpg",
  },
];
// -----------------------------------------------------------------------

function formatPrice(value) {
  return `KSh ${value.toLocaleString("en-KE")}`;
}

export default function Catalogue() {
  const [active, setActive] = useState("all");
  const [broken, setBroken] = useState({});

  const visible =
    active === "all" ? STYLES : STYLES.filter((s) => s.category === active);

  const grouped = CATEGORIES.map((cat) => ({
    ...cat,
    items: visible.filter((s) => s.category === cat.id),
  })).filter((cat) => cat.items.length > 0);

  return (
    <section className="catalogue" aria-labelledby="catalogue-heading">
      <header className="catalogue__header">
        <p className="catalogue__eyebrow">Nairobi · By appointment</p>
        <h1 id="catalogue-heading" className="catalogue__title">
          The look book
        </h1>
        <p className="catalogue__intro">
          Braids, twists and locs, priced and ready to book. Prices are
          quoted for shoulder-length natural hair — length, thickness and
          added hair may change the total.
        </p>

        <div className="catalogue__filters" role="tablist" aria-label="Filter by style">
          <button
            type="button"
            className={`catalogue__filter ${active === "all" ? "is-active" : ""}`}
            onClick={() => setActive("all")}
            role="tab"
            aria-selected={active === "all"}
          >
            All styles
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`catalogue__filter ${active === cat.id ? "is-active" : ""}`}
              onClick={() => setActive(cat.id)}
              role="tab"
              aria-selected={active === cat.id}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      {grouped.map((cat) => (
        <div className="catalogue__group" key={cat.id}>
          <h2 className="catalogue__group-title">{cat.label}</h2>
          <ul className="catalogue__list">
            {cat.items.map((item) => (
              <li className="style-row" key={item.id}>
                <div className="style-row__media">
                  {!broken[item.id] ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      onError={() =>
                        setBroken((b) => ({ ...b, [item.id]: true }))
                      }
                    />
                  ) : (
                    <div className="style-row__fallback" aria-hidden="true">
                      <span>{item.name.charAt(0)}</span>
                    </div>
                  )}
                </div>

                <div className="style-row__body">
                  <div className="style-row__top">
                    <h3 className="style-row__name">{item.name}</h3>
                    <span className="style-row__price">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <p className="style-row__description">{item.description}</p>
                  <span className="style-row__duration">{item.duration}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="catalogue__cta">
        <p>Prices are a starting guide — final cost depends on length and hair used.</p>
        <a className="catalogue__book" href="#book">
          Book a style
        </a>
      </div>
    </section>
  );
}
