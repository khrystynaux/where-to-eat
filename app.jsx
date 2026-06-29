/* app.jsx — screens + state machine + tweaks.  Uses globals from ui.jsx. */
const { useState, useEffect, useRef, useMemo } = React;
const { CITIES, CUISINES, DIETS, BUDGETS, buildPool } = window.WTE_DATA;
const { Button, Tag } = window.AquarelleDesignSystem_32d3c3;

/* =========================================================================
   Welcome
   ========================================================================= */
function Welcome({ onStart }) {
  return (
    <div className="screen">
      <Motif src="assets/wc-katsu.jpg" style={{ width: 310, height: 310, top: -22, left: "50%", transform: "translateX(-50%) rotate(-6deg)", opacity: .92 }} />
      <Motif src="assets/wc-cake.jpg" style={{ width: 300, height: 300, bottom: 24, right: -26, transform: "rotate(8deg)" }} />
      <div className="pad" style={{ position: "relative", zIndex: 2, minHeight: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ marginTop: 225, textAlign: "center" }}>
          <h1 className="display" style={{ fontSize: 60, marginTop: 16, lineHeight: 0.92 }}>
            <i className="bloom-text">Where<br />to Eat?</i>
          </h1>
          <p className="lead" style={{ marginTop: 18, maxWidth: 300, marginLeft: "auto", marginRight: "auto", fontSize: 16, fontWeight: 700 }}>Restaurant bracket game to help making next dinner choice for you!

          </p>
        </div>
        <div style={{ marginTop: "auto", paddingTop: 28, paddingBottom: 56 }}>
          <Button variant="primary" size="lg" className="u-block" onClick={onStart}
          iconRight={<Ico.arrow style={{ width: 19, height: 19 }} />}>
            Start picking
          </Button>
        </div>
      </div>
    </div>);

}

/* =========================================================================
   Preferences
   ========================================================================= */
function Preferences({ prefs, setPrefs, onBack, onSubmit }) {
  const city = CITIES.find((c) => c.id === prefs.city);
  const cityCuisines = city ? city.cuisines : [];
  const motifFor = { london: "assets/city-london.png", newyork: "assets/city-newyork.png", tokyo: "assets/city-tokyo.png" };
  const [step, setStep] = useState(0);

  function toggleCuisine(c) {
    const has = prefs.cuisines.includes(c);
    setPrefs({ ...prefs, cuisines: has ? prefs.cuisines.filter((x) => x !== c) : [...prefs.cuisines, c] });
  }
  function pickCity(id) {
    // reset cuisines that don't belong to the new city
    const valid = CITIES.find((c) => c.id === id).cuisines;
    setPrefs({ ...prefs, city: id, cuisines: prefs.cuisines.filter((c) => valid.includes(c)) });
  }

  const STEPS = [
  { eyebrow: "Location", title: "What city are you in?" },
  { eyebrow: "Cravings", title: "What are you in the mood for?" },
  { eyebrow: "Budget", title: "What's the budget?" },
  { eyebrow: "Needs", title: "Any dietary needs?" }];

  const canNext = step !== 0 || !!prefs.city; // only city is required
  const isLast = step === STEPS.length - 1;
  function back() {step === 0 ? onBack() : setStep(step - 1);}
  function next() {isLast ? onSubmit() : setStep(step + 1);}

  return (
    <div className="screen">
      <div className="pad" style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
        <Button variant="ghost" size="sm" onClick={back} style={{ marginBottom: 14, alignSelf: "flex-start" }}
        iconLeft={<Ico.back style={{ width: 16, height: 16 }} />}>
          Back
        </Button>

        {/* progress */}
        <div className="wprogress">
          {STEPS.map((_, i) =>
          <span key={i} className={"wprogress__seg" + (i <= step ? " is-done" : "")} />
          )}
        </div>

        <div className="wstep" key={step}>
          <h2 className="display" style={{ fontSize: 32, marginTop: 8, lineHeight: 1.02 }}>{STEPS[step].title}</h2>

          {/* Step 1 — City */}
          {step === 0 &&
          <div className="field" style={{ marginTop: 22 }}>
            <p className="lead" style={{ fontSize: 14, marginTop: -8, marginBottom: 16 }}>More cities coming soon.</p>
            <div className="citygrid">
              {CITIES.map((c) =>
              <button key={c.id} type="button"
              className={"citycard" + (prefs.city === c.id ? " is-on" : "")}
              onClick={() => pickCity(c.id)}>
                  <img className="citycard__motif" src={motifFor[c.id]} alt="" aria-hidden="true" />
                  <span className="citycard__check"><Ico.check style={{ width: 14, height: 14 }} /></span>
                  <span className="citycard__name">{c.name}</span>
                  <span className="citycard__sub">{c.country}</span>
                </button>
              )}
            </div>
          </div>
          }

          {/* Step 2 — Cuisine mood */}
          {step === 1 &&
          <div className="field" style={{ marginTop: 22 }}>
            <p className="lead" style={{ fontSize: 14, marginBottom: 16 }}>For best results, pick at least 3.

            </p>
            <div className="chips">
              {cityCuisines.map((c) =>
              <Tag key={c} active={prefs.cuisines.includes(c)} className="gchip"
              onClick={() => toggleCuisine(c)}>{c}</Tag>
              )}
            </div>
          </div>
          }

          {/* Step 3 — Budget */}
          {step === 2 &&
          <div className="field" style={{ marginTop: 22 }}>
            <div className="budgetrow">
              {BUDGETS.map((b) =>
              <button key={b.id} type="button"
              className={"budget" + (prefs.budget === b.id ? " is-on" : "")}
              onClick={() => setPrefs({ ...prefs, budget: b.id })}>
                  <span className="budget__signs">
                    {b.id === "any" ?
                  <span className="on" style={{ fontSize: 22, lineHeight: 1 }}>∞</span> :
                  <span className="on">{"$".repeat(b.signs)}</span>}
                  </span>
                  <span className="budget__label">{b.label}</span>
                </button>
              )}
            </div>
          </div>
          }

          {/* Step 4 — Dietary */}
          {step === 3 &&
          <div className="field" style={{ marginTop: 22 }}>
            <div className="chips">
              {DIETS.map((d) =>
              <Tag key={d.id} active={prefs.diet === d.id} className="gchip"
              onClick={() => setPrefs({ ...prefs, diet: d.id })}>{d.label}</Tag>
              )}
            </div>
          </div>
          }
        </div>

        <div className="sheetfoot" style={{ marginTop: "auto" }}>
          <Button variant="primary" size="lg" className="u-block" disabled={!canNext} onClick={next}
          iconRight={<Ico.arrow style={{ width: 19, height: 19 }} />}>
            {isLast ? "Pour the matchups" : "Continue"}
          </Button>
        </div>
      </div>
    </div>);

}

/* =========================================================================
/* =========================================================================
   Loader — watercolor pizza "paint-in" (canvas brush-mask reveal)
   ========================================================================= */
const LOADER_LINES = ["Gathering 8 contenders", "Pairing them up", "Seeding the bracket", "Almost ready"];
const LOADER_DUR = 6.0; // seconds to paint in

function Loader({ onDone }) {
  const [line, setLine] = useState(0);
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  useEffect(() => {
    const iv = setInterval(() => setLine((l) => (l + 1) % LOADER_LINES.length), 880);
    const t = setTimeout(onDone, LOADER_DUR * 1000 + 850);
    let painter;
    if (window.PizzaPaint && rootRef.current && canvasRef.current && imgRef.current) {
      painter = new window.PizzaPaint(canvasRef.current, rootRef.current, imgRef.current, {
        paintDuration: LOADER_DUR, sweepStyle: "bloom", wetEdge: true
      });
      painter.start();
    }
    return () => {clearInterval(iv);clearTimeout(t);if (painter) painter.destroy();};
  }, []);
  return (
    <div className="loader">
      <div className="paintwrap">
        <div className="paintdisc" ref={rootRef}>
          <img ref={imgRef} src="assets/pizza-real.jpg" alt="" crossOrigin="anonymous"
          style={{ display: "none" }} />
          <canvas ref={canvasRef} className="paintcanvas" />
        </div>
      </div>
      <div className="loader__label">
        <div className="loader__title">Setting the table</div>
        <div className="loader__status">{LOADER_LINES[line]}…</div>
      </div>
    </div>);

}

/* =========================================================================
   Game — single-elimination bracket
   ========================================================================= */
function roundLabel(n, roundNo, total) {
  if (n === 2) return "Final";
  if (n === 4) return roundNo === 0 ? "Semi-finals" : "Final";
  return roundNo === total - 1 ? "Final" : roundNo === total - 2 ? "Semi-finals" : "Round " + (roundNo + 1);
}

function Game({ pool, tweaks, onDone }) {
  const total = Math.log2(pool.length);
  const [contenders, setContenders] = useState(pool);
  const [winners, setWinners] = useState([]);
  const [roundNo, setRoundNo] = useState(0);
  const [matchIndex, setMatchIndex] = useState(0);
  const [picked, setPicked] = useState(null); // index 0/1 of chosen lane
  const [busy, setBusy] = useState(false);

  const a = contenders[matchIndex * 2];
  const b = contenders[matchIndex * 2 + 1];
  const matchesThisRound = contenders.length / 2;

  function choose(side) {
    if (busy) return;
    setBusy(true);
    setPicked(side);
    const winner = side === 0 ? a : b;
    setTimeout(() => {
      const nextWinners = [...winners, winner];
      if (matchIndex + 1 < matchesThisRound) {
        setWinners(nextWinners);
        setMatchIndex(matchIndex + 1);
      } else if (nextWinners.length === 1) {
        onDone(nextWinners[0]);
        return;
      } else {
        setContenders(nextWinners);
        setWinners([]);
        setRoundNo(roundNo + 1);
        setMatchIndex(0);
      }
      setPicked(null);
      setBusy(false);
    }, 720);
  }

  const label = roundLabel(pool.length, roundNo, total);
  const cardProps = { variant: tweaks.cardStyle };
  const splashOn = tweaks.bloomSplash;

  return (
    <div className="screen">
      <div className="gamescene" aria-hidden="true" />
      <div className="pad--game" style={{ position: "relative", zIndex: 1 }}>
        <div className="gamehead">
          <span className="roundpill">Round {pool.length - contenders.length + matchIndex + 1}/{pool.length - 1}</span>
          <h2 className="gameprompt">Which one <i>wins?</i></h2>
        </div>

        <div className="arena arena--in" key={roundNo + "-" + matchIndex}>
          <div className={"lane" + (picked === 0 ? " is-winner" : picked === 1 ? " is-loser" : "")}>
            {splashOn && <span className="winsplash" />}
            <RestaurantCard r={a} onPick={() => choose(0)} {...cardProps} />
          </div>
          <div className={"lane" + (picked === 1 ? " is-winner" : picked === 0 ? " is-loser" : "")}>
            {splashOn && <span className="winsplash" />}
            <RestaurantCard r={b} onPick={() => choose(1)} {...cardProps} />
          </div>
          <div className="arena__vs"><span>vs</span></div>
        </div>

      </div>
    </div>);

}

/* =========================================================================
   Reveal
   ========================================================================= */
const PIGMENTS = ["#e21e78", "#f26a4b", "#f6953b", "#fbd230", "#e84588", "#f072a3"];
function Reveal({ winner, poolSize, onAgain, onRestart }) {
  const dots = useMemo(() => Array.from({ length: 16 }).map((_, i) => ({
    left: 8 + Math.random() * 84,
    size: 6 + Math.random() * 12,
    color: PIGMENTS[i % PIGMENTS.length],
    delay: Math.random() * 500,
    dur: 1100 + Math.random() * 700
  })), []);

  return (
    <div className="screen">
      <div className="reveal pad" style={{ paddingTop: 60 }}>
        <span className="reveal__splash" />
        <h2 className="reveal__headline">Looks like we're <span className="bloom-text">going to...</span></h2>
        {dots.map((d, i) =>
        <span key={i} className="pigment" style={{
          left: d.left + "%", top: 40, width: d.size, height: d.size,
          background: d.color, animationDelay: d.delay + "ms", animationDuration: d.dur + "ms"
        }} />
        )}

        <div className="reveal__card">
          <div className={"rcard rcard--frame"} style={{ pointerEvents: "none", boxShadow: "var(--shadow-lg)" }}>
            <div className="rframe">
              <span className="rframe__price"><PriceSigns value={winner.price} /></span>
              <div className="rframe__inner" style={{ aspectRatio: "4 / 3" }}>
                <img src={winner.img} alt={winner.dish} />
              </div>
              <span className="rframe__splash" />
            </div>
          </div>
        </div>

        <div className="reveal__details">
          <div className="rcard__cuisine" style={{ textAlign: "center", marginTop: 16 }}>{winner.cuisine} · {winner.area} · {winner.cityName}</div>
          <h2 className="reveal__name">{winner.name}</h2>
          <p className="reveal__dish">Recommended dish: {winner.dish}</p>

          <div className="reveal__statrow">
            <div className="stat"><div className="stat__v">{winner.rating.toFixed(1)}★</div><div className="stat__k">Rating</div></div>
            <div className="stat"><div className="stat__v">{"$".repeat(winner.price)}</div><div className="stat__k">Price</div></div>
            <div className="stat"><div className="stat__v">{winner.reviews}</div><div className="stat__k">Reviews</div></div>
          </div>

          <div className="reveal__actions">
            <Button variant="primary" size="lg" className="u-block" onClick={onRestart}
            iconLeft={<Ico.refresh style={{ width: 16, height: 16 }} />}>
              Play again
            </Button>
          </div>
        </div>
      </div>
    </div>);

}

/* =========================================================================
   App
   ========================================================================= */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "cardStyle": "bleed",
  "bloomSplash": false,
  "palette": ["#f26a4b", "#f6953b", "#fbd230"]
} /*EDITMODE-END*/;

const PALETTES = {
  "#e21e78": { bloom: "linear-gradient(105deg,#e21e78 0%,#f26a4b 42%,#f6953b 72%,#fbd230 100%)", brand: "#e21e78", strong: "#c2155f", ink: "#9b1149", soft: "#fdeaf2" },
  "#f26a4b": { bloom: "linear-gradient(105deg,#f26a4b 0%,#f6953b 45%,#fbd230 100%)", brand: "#d8512f", strong: "#bf3f1f", ink: "#9a3217", soft: "#fde6dd" },
  "#b5179e": { bloom: "linear-gradient(105deg,#b5179e 0%,#e21e78 50%,#f072a3 100%)", brand: "#b5179e", strong: "#950f81", ink: "#7a0d6a", soft: "#fbe6f6" }
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [phase, setPhase] = useState("welcome");
  const [prefs, setPrefs] = useState({ city: "", cuisines: [], budget: "any", diet: "none" });
  const [result, setResult] = useState(null); // {picks, toppedUp, size}
  const [winner, setWinner] = useState(null);
  const [toast, setToast] = useState("");
  const [runKey, setRunKey] = useState(0);

  // apply palette tweak to CSS vars
  const paletteKey = Array.isArray(t.palette) ? t.palette[0] : t.palette;
  useEffect(() => {
    const p = PALETTES[paletteKey] || PALETTES["#e21e78"];
    const r = document.documentElement;
    r.style.setProperty("--bloom", p.bloom);
    r.style.setProperty("--brand", p.brand);
    r.style.setProperty("--brand-strong", p.strong);
    r.style.setProperty("--brand-ink", p.ink);
    r.style.setProperty("--brand-soft", p.soft);
  }, [paletteKey]);

  function startGame() {
    const res = buildPool(prefs, 8);
    setResult(res);
    setPhase("loading");
    if (res.toppedUp) {
      setTimeout(() => setToast("Not enough exact matches — we added a few nearby favourites."), 3200);
      setTimeout(() => setToast(""), 7500);
    }
  }
  function afterLoad() {setRunKey((k) => k + 1);setPhase("game");}
  function finish(w) {setWinner(w);setPhase("reveal");}
  function playAgain() {
    const res = buildPool(prefs, 8);setResult(res);setWinner(null);
    setRunKey((k) => k + 1);setPhase("game");
  }

  const light = phase === "welcome" ? false : false;

  return (
    <div className="stage">
      <div className="stage__scale" id="scale">
        <div className="device">
          <div className="device__island" />
          <div className="device__screen">
            <StatusBar light={light} />
            {phase === "welcome" && <Welcome onStart={() => setPhase("prefs")} />}
            {phase === "prefs" &&
            <Preferences prefs={prefs} setPrefs={setPrefs}
            onBack={() => setPhase("welcome")} onSubmit={startGame} />
            }
            {phase === "loading" && <Loader onDone={afterLoad} />}
            {phase === "game" && result &&
            <Game key={runKey} pool={result.picks} tweaks={t} onDone={finish} />
            }
            {phase === "reveal" && winner &&
            <Reveal winner={winner} poolSize={result.size}
            onAgain={playAgain} onRestart={() => setPhase("prefs")} />
            }
            <div className={"homebar" + (light ? " homebar--light" : "")} />
            {toast && phase !== "reveal" && <div className="toast">{toast}</div>}
          </div>
        </div>
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Card design" />
        <TweakRadio label="Style" value={t.cardStyle}
        options={["frame", "polaroid", "bleed"]}
        onChange={(v) => setTweak("cardStyle", v)} />
        <TweakSection label="Selection feel" />
        <TweakToggle label="Bloom splash on pick" value={t.bloomSplash}
        onChange={(v) => setTweak("bloomSplash", v)} />
        <TweakSection label="Palette" />
        <TweakColor label="Pigment" value={t.palette}
        options={[
        ["#e21e78", "#f26a4b", "#f6953b", "#fbd230"],
        ["#f26a4b", "#f6953b", "#fbd230"],
        ["#b5179e", "#e21e78", "#f072a3"]]}
        onChange={(v) => setTweak("palette", v)} />
      </TweaksPanel>
    </div>);

}

/* ---- scale device to viewport ------------------------------------------ */
function fitScale() {
  const el = document.getElementById("scale");
  if (!el) return;
  const pad = 24;
  const vp = window.visualViewport;
  const vw = vp ? vp.width  : window.innerWidth;
  const vh = vp ? vp.height : window.innerHeight;
  const s = Math.min((vw - pad) / 390, (vh - pad) / 844, 1.18);
  el.style.transform = "scale(" + s + ")";
}
window.addEventListener("resize", fitScale);
window.addEventListener("orientationchange", () => setTimeout(fitScale, 300));
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", fitScale);
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
setTimeout(fitScale, 60);
setTimeout(fitScale, 600);
