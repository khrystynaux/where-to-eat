/* ============================================================================
   pizza-paint.js — watercolor "paint-in" reveal of a real pizza photo.
   Ported from the Aquarelle DC "Pizza Paint-In" component into a standalone
   class. A soft irregular brush stamps a mask that progressively reveals the
   image like watercolor blooming onto wet paper, with a darker wet leading
   edge that settles as it "dries".

   Usage:
     const p = new PizzaPaint(canvasEl, rootEl, imgEl, { paintDuration: 2.7, sweepStyle: 'bloom' });
     p.start();              // begins once the image is loaded
     p.destroy();            // cleanup
   ============================================================================*/
(function () {
  class PizzaPaint {
    constructor(canvas, root, img, opts) {
      opts = opts || {};
      this.canvas = canvas; this.root = root; this.img = img;
      this.paintDuration = opts.paintDuration != null ? opts.paintDuration : 2.7;
      this.sweepStyle = opts.sweepStyle || "bloom";
      this.wetEdge = opts.wetEdge !== false;
      this.grain = opts.grain != null ? opts.grain : 1;
      this.reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      this.brush = this.makeBrush();
      this.feather = 0.13;
    }
    start() {
      if (this.img && this.img.complete && this.img.naturalWidth) { this.ready = true; this.kick(); }
      else if (this.img) { this.img.addEventListener("load", () => { this.ready = true; this.kick(); }); }
      this._resize = () => { this.needRebuild = true; };
      window.addEventListener("resize", this._resize);
    }
    destroy() {
      this.dead = true;
      if (this.raf) cancelAnimationFrame(this.raf);
      window.removeEventListener("resize", this._resize);
    }
    makeBrush() {
      const S = 160, c = document.createElement("canvas");
      c.width = c.height = S;
      const ctx = c.getContext("2d");
      const lobes = [[0.5, 0.5, 0.46], [0.42, 0.44, 0.30], [0.60, 0.55, 0.28], [0.46, 0.62, 0.24], [0.58, 0.40, 0.22]];
      for (const [lx, ly, lr] of lobes) {
        const g = ctx.createRadialGradient(lx * S, ly * S, 1, lx * S, ly * S, lr * S);
        g.addColorStop(0, "rgba(255,255,255,0.9)");
        g.addColorStop(0.55, "rgba(255,255,255,0.55)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g; ctx.fillRect(0, 0, S, S);
      }
      return c;
    }
    noise(x, y) {
      return Math.sin(x * 6.7 + y * 3.1) * 0.5
        + Math.sin(x * 3.3 - y * 6.2 + 1.7) * 0.32
        + Math.sin((x + y) * 12.0 + 4.2) * 0.18;
    }
    field(style, nx, ny) {
      switch (style) {
        case "ltr": return nx;
        case "ttb": return ny;
        case "bloom": return Math.hypot(nx - 0.5, ny - 0.46) / 0.68;
        default: return nx * 0.62 + ny * 0.62;
      }
    }
    setup() {
      const cv = this.canvas, root = this.root;
      if (!cv || !root || !this.img) return;
      const pr = Math.min(1.6, window.devicePixelRatio || 1);
      const cssW = root.clientWidth, cssH = root.clientHeight;
      const W = Math.max(2, Math.round(cssW * pr));
      const H = Math.max(2, Math.round(cssH * pr));
      cv.width = W; cv.height = H; this.W = W; this.H = H;
      this.vctx = cv.getContext("2d");
      const mk = () => { const c = document.createElement("canvas"); c.width = W; c.height = H; return c; };
      this.maskBaked = mk(); this.maskWork = mk(); this.activeMask = mk(); this.frameC = mk(); this.wetC = mk();

      const iw = this.img.naturalWidth, ih = this.img.naturalHeight;
      const sc = Math.max(W / iw, H / ih);
      this.cover = { dw: iw * sc, dh: ih * sc, dx: (W - iw * sc) / 2, dy: (H - ih * sc) / 2 };

      this.darkImg = document.createElement("canvas");
      this.darkImg.width = iw; this.darkImg.height = ih;
      const dctx = this.darkImg.getContext("2d");
      dctx.filter = "saturate(1.45) brightness(0.84)";
      dctx.drawImage(this.img, 0, 0);

      const minD = Math.min(W, H);
      this.r = minD * (0.060 / Math.sqrt(Math.max(0.4, this.grain)));
      const r = this.r, sp = r * 0.72;
      const style = this.sweepStyle;
      const dabs = [];
      let mn = Infinity, mx = -Infinity;
      for (let y = sp * 0.5; y < H + sp; y += sp) {
        for (let x = sp * 0.5; x < W + sp; x += sp) {
          const jx = x + (Math.random() - 0.5) * sp * 0.8;
          const jy = y + (Math.random() - 0.5) * sp * 0.8;
          const nx = jx / W, ny = jy / H;
          const o = this.field(style, nx, ny) + this.noise(nx, ny) * 0.16;
          if (o < mn) mn = o; if (o > mx) mx = o;
          dabs.push({ x: jx, y: jy, o, rot: Math.random() * Math.PI * 2, sc: 0.78 + Math.random() * 0.7, baked: false });
        }
      }
      const span = (mx - mn) || 1;
      for (const d of dabs) d.o = (d.o - mn) / span;
      this.dabs = dabs;
    }
    kick() {
      if (this.looping || !this.ready) return;
      this.looping = true;
      this.setup();
      this.playStart = performance.now();
      this.finished = false;
      const loop = (now) => {
        if (this.dead) return;
        if (this.needRebuild) { this.needRebuild = false; this.setup(); this.finished = false; this.playStart = performance.now(); }
        this.frame(now);
        this.raf = requestAnimationFrame(loop);
      };
      this.raf = requestAnimationFrame(loop);
    }
    stampOn(ctx, d, alpha) {
      ctx.globalAlpha = alpha;
      ctx.save();
      ctx.translate(d.x, d.y);
      ctx.rotate(d.rot);
      const s = this.r * d.sc;
      ctx.drawImage(this.brush, -s, -s, s * 2, s * 2);
      ctx.restore();
      ctx.globalAlpha = 1;
    }
    drawCover(ctx, src) {
      const c = this.cover;
      ctx.drawImage(src, c.dx, c.dy, c.dw, c.dh);
    }
    frame(now) {
      if (!this.dabs || !this.vctx || this.finished) return;
      const dur = (this.reduced ? 0 : this.paintDuration) * 1000;
      let p = dur <= 0 ? 1 : Math.min(1, (now - this.playStart) / dur);
      const pp = p * (1 + this.feather);
      const fe = this.feather;
      const wet = this.wetEdge;

      const mbCtx = this.maskBaked.getContext("2d");
      const mwCtx = this.maskWork.getContext("2d");
      const amCtx = this.activeMask.getContext("2d");
      const fCtx = this.frameC.getContext("2d");

      mwCtx.clearRect(0, 0, this.W, this.H);
      amCtx.clearRect(0, 0, this.W, this.H);
      mwCtx.drawImage(this.maskBaked, 0, 0);

      let anyActive = false;
      for (const d of this.dabs) {
        const a = (pp - d.o) / fe;
        if (a <= 0) continue;
        if (a >= 1) {
          if (!d.baked) { this.stampOn(mbCtx, d, 1); d.baked = true; }
        } else {
          anyActive = true;
          const e = a * a * (3 - 2 * a);
          this.stampOn(mwCtx, d, e);
          if (wet) this.stampOn(amCtx, d, (1 - e) * 0.85);
        }
      }
      mwCtx.drawImage(this.maskBaked, 0, 0);

      fCtx.clearRect(0, 0, this.W, this.H);
      this.drawCover(fCtx, this.img);
      fCtx.globalCompositeOperation = "destination-in";
      fCtx.drawImage(this.maskWork, 0, 0);
      fCtx.globalCompositeOperation = "source-over";

      if (wet && anyActive) {
        const wCtx = this.wetC.getContext("2d");
        wCtx.clearRect(0, 0, this.W, this.H);
        this.drawCover(wCtx, this.darkImg);
        wCtx.globalCompositeOperation = "destination-in";
        wCtx.drawImage(this.activeMask, 0, 0);
        wCtx.globalCompositeOperation = "source-over";
        fCtx.globalCompositeOperation = "source-atop";
        fCtx.globalAlpha = 0.55;
        fCtx.drawImage(this.wetC, 0, 0);
        fCtx.globalAlpha = 1;
        fCtx.globalCompositeOperation = "source-over";
      }

      this.vctx.clearRect(0, 0, this.W, this.H);
      this.vctx.drawImage(this.frameC, 0, 0);

      if (p >= 1) {
        this.vctx.clearRect(0, 0, this.W, this.H);
        this.drawCover(this.vctx, this.img);
        this.finished = true;
      }
    }
  }
  window.PizzaPaint = PizzaPaint;
})();
