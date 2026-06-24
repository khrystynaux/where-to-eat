/* ============================================================================
   ui.jsx — shared atoms for Where to Eat.
   Loaded as a classic-scope babel script BEFORE app.jsx. Everything here is
   exposed as bare globals (via window) so app.jsx can use them directly.
   NOTE: do not destructure React hooks at top level here — app.jsx already
   declares `const { useState, ... } = React` in the shared script scope.
   ============================================================================*/

/* ---- Line icons (Feather/Lucide weight, per design system) -------------- */
function IcoArrow({ style }) {
  return (
    <svg viewBox="0 0 24 24" style={style} fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
function IcoBack({ style }) {
  return (
    <svg viewBox="0 0 24 24" style={style} fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}
function IcoCheck({ style }) {
  return (
    <svg viewBox="0 0 24 24" style={style} fill="none" stroke="currentColor"
      strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
function IcoRefresh({ style }) {
  return (
    <svg viewBox="0 0 24 24" style={style} fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}
function IcoPin({ style }) {
  return (
    <svg viewBox="0 0 24 24" style={style} width="11" height="11" fill="currentColor">
      <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}
const Ico = { arrow: IcoArrow, back: IcoBack, check: IcoCheck, refresh: IcoRefresh, pin: IcoPin };

/* ---- Stars (supports fractional fill) ----------------------------------- */
function StarGlyph({ fill }) {
  const gid = "sg" + Math.round(fill * 1000) + "-" + Math.floor(Math.random() * 1e6);
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id={gid}>
          <stop offset={(fill * 100) + "%"} stopColor="currentColor" />
          <stop offset={(fill * 100) + "%"} stopColor="currentColor" stopOpacity="0.22" />
        </linearGradient>
      </defs>
      <path fill={"url(#" + gid + ")"}
        d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.9l-5.81 3.06 1.11-6.47L2.6 9.9l6.5-.95z" />
    </svg>
  );
}
function Stars({ rating }) {
  const out = [];
  for (let i = 0; i < 5; i++) out.push(<StarGlyph key={i} fill={Math.max(0, Math.min(1, rating - i))} />);
  return <span className="stars">{out}</span>;
}

/* ---- Price signs -------------------------------------------------------- */
function PriceSigns({ value }) {
  return (
    <React.Fragment>
      {[1, 2, 3].map(i => <span key={i} className={i <= value ? "on" : "off"}>$</span>)}
    </React.Fragment>
  );
}

/* ---- Watercolor food motif (masked corner painting) --------------------- */
function Motif({ src, style }) {
  return <img className="motif" src={src} style={style} alt="" aria-hidden="true" draggable="false" />;
}

/* ---- Restaurant card ---------------------------------------------------- */
function RestaurantCard({ r, onPick, variant, refEl, style, className }) {
  return (
    <button ref={refEl} style={style} onClick={onPick}
      className={"rcard rcard--" + (variant || "frame") + (className ? " " + className : "")}>
      <div className="rframe">
        <span className="rframe__price"><PriceSigns value={r.price} /></span>
        <div className="rframe__inner">
          <img src={r.img} alt={r.dish} loading="eager" draggable="false" />
        </div>
        <span className="rframe__splash" />
      </div>
      <div className="rcard__body">
        <div className="rcard__cuisine">{r.cuisine} · {r.area}</div>
        <h3 className="rcard__name">{r.name}</h3>
        <p className="rcard__dish">{r.dish}</p>
        <div className="rcard__meta">
          <Stars rating={r.rating} />
          <span className="rating-num">{r.rating.toFixed(1)}</span>
          <span className="review-num">({r.reviews})</span>
        </div>
      </div>
    </button>
  );
}

/* ---- Status bar --------------------------------------------------------- */
function StatusBar({ light }) {
  return (
    <div className={"statusbar" + (light ? " statusbar--light" : "")}>
      <span className="statusbar__time">9:41</span>
      <span className="statusbar__right">
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="4.5" y="5" width="3" height="6" rx="1" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>
        <svg width="24" height="11" viewBox="0 0 24 11" fill="none">
          <rect x="0.6" y="0.6" width="19" height="9.8" rx="2.4" stroke="currentColor" strokeOpacity="0.5" />
          <rect x="2" y="2" width="15" height="7" rx="1.4" fill="currentColor" />
          <rect x="21" y="3.4" width="1.6" height="4.2" rx="0.8" fill="currentColor" fillOpacity="0.5" />
        </svg>
      </span>
    </div>
  );
}

Object.assign(window, {
  Ico, Stars, PriceSigns, Motif, RestaurantCard, StatusBar,
});
