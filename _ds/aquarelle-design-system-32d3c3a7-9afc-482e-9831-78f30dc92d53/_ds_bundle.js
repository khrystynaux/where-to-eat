/* @ds-bundle: {"format":3,"namespace":"AquarelleDesignSystem_32d3c3","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"IconButton","sourcePath":"components/actions/IconButton.jsx"},{"name":"Avatar","sourcePath":"components/display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"Tag","sourcePath":"components/display/Tag.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"}]} */

(() => {

const __ds_ns = (window.AquarelleDesignSystem_32d3c3 = window.AquarelleDesignSystem_32d3c3 || {});
const __ds_scope = {};
(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = 'aq-button-styles';
function ensureStyles() {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = `
  .aqBtn {
    --_pad-y: 0.7em; --_pad-x: 1.4em; --_fs: var(--text-sm);
    display: inline-flex; align-items: center; justify-content: center;
    gap: 0.55em; box-sizing: border-box;
    font-family: var(--font-sans); font-size: var(--_fs);
    font-weight: var(--w-bold); line-height: 1; letter-spacing: 0.01em;
    padding: var(--_pad-y) var(--_pad-x);
    border-radius: var(--radius-pill); border: 1.5px solid transparent;
    cursor: pointer; text-decoration: none; white-space: nowrap;
    transition: transform var(--dur-fast) var(--ease-water),
                box-shadow var(--dur-base) var(--ease-water),
                background-color var(--dur-base) var(--ease-water),
                filter var(--dur-base) var(--ease-water);
  }
  .aqBtn:active { transform: translateY(1px) scale(0.98); }
  .aqBtn:disabled, .aqBtn[aria-disabled="true"] {
    opacity: 0.45; cursor: not-allowed; transform: none; box-shadow: none; filter: none;
  }
  .aqBtn--sm { --_pad-y: 0.55em; --_pad-x: 1.05em; --_fs: var(--text-xs); }
  .aqBtn--lg { --_pad-y: 0.85em; --_pad-x: 1.9em;  --_fs: var(--text-base); }
  .aqBtn--primary { background: var(--bloom); color: var(--text-on-bloom);
    box-shadow: var(--shadow-rose); }
  .aqBtn--primary:hover { filter: saturate(1.06) brightness(1.03);
    box-shadow: 0 18px 44px -10px rgba(226,30,120,0.5); transform: translateY(-1px); }
  .aqBtn--solid { background: var(--brand); color: var(--text-on-brand);
    box-shadow: var(--shadow-sm); }
  .aqBtn--solid:hover { background: var(--brand-strong); transform: translateY(-1px); }
  .aqBtn--secondary { background: var(--surface-card); color: var(--text-strong);
    border-color: var(--border); box-shadow: var(--shadow-xs); }
  .aqBtn--secondary:hover { border-color: var(--brand); color: var(--brand-ink);
    background: var(--brand-soft); }
  .aqBtn--ghost { background: transparent; color: var(--text-strong); }
  .aqBtn--ghost:hover { background: var(--surface-sunk); }
  .aqBtn__ico { display: inline-flex; width: 1.15em; height: 1.15em; }
  .aqBtn__ico svg { width: 100%; height: 100%; }
  `;
  document.head.appendChild(el);
}
function Button({ children, variant = 'primary', size = 'md', iconLeft = null, iconRight = null, disabled = false, as = 'button', className = '', ...rest }) {
  ensureStyles();
  const Tag = as;
  const cls = ['aqBtn', `aqBtn--${variant}`, size !== 'md' ? `aqBtn--${size}` : '', className].filter(Boolean).join(' ');
  return React.createElement(Tag, _extends({ className: cls, disabled: Tag === 'button' ? disabled : undefined, 'aria-disabled': disabled || undefined }, rest),
    iconLeft && React.createElement('span', { className: 'aqBtn__ico' }, iconLeft),
    children,
    iconRight && React.createElement('span', { className: 'aqBtn__ico' }, iconRight));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: 'components/actions/Button.jsx', error: String((e && e.message) || e) }); }

// components/actions/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = 'aq-iconbutton-styles';
function ensureStyles() {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = `
  .aqIconBtn { --_size: 2.75rem; display: inline-flex; align-items: center; justify-content: center;
    width: var(--_size); height: var(--_size); padding: 0;
    border-radius: var(--radius-pill); border: 1.5px solid transparent;
    cursor: pointer; color: var(--text-strong); background: transparent;
    transition: transform var(--dur-fast) var(--ease-water),
                background-color var(--dur-base) var(--ease-water),
                box-shadow var(--dur-base) var(--ease-water),
                color var(--dur-base) var(--ease-water); }
  .aqIconBtn svg { width: 1.25em; height: 1.25em; }
  .aqIconBtn:active { transform: scale(0.92); }
  .aqIconBtn:disabled { opacity: 0.4; cursor: not-allowed; }
  .aqIconBtn--sm { --_size: 2.25rem; font-size: var(--text-sm); }
  .aqIconBtn--lg { --_size: 3.25rem; font-size: var(--text-lg); }
  .aqIconBtn--ghost:hover { background: var(--surface-sunk); }
  .aqIconBtn--soft { background: var(--brand-soft); color: var(--brand-ink); }
  .aqIconBtn--soft:hover { background: var(--rose-100); transform: translateY(-1px); }
  .aqIconBtn--solid { background: var(--brand); color: var(--text-on-brand); box-shadow: var(--shadow-sm); }
  .aqIconBtn--solid:hover { background: var(--brand-strong); transform: translateY(-1px); }
  .aqIconBtn--outline { border-color: var(--border); }
  .aqIconBtn--outline:hover { border-color: var(--brand); color: var(--brand-ink); background: var(--brand-soft); }
  `;
  document.head.appendChild(el);
}
function IconButton({ icon, label, variant = 'ghost', size = 'md', disabled = false, className = '', ...rest }) {
  ensureStyles();
  const cls = ['aqIconBtn', `aqIconBtn--${variant}`, size !== 'md' ? `aqIconBtn--${size}` : '', className].filter(Boolean).join(' ');
  return React.createElement('button', _extends({ className: cls, 'aria-label': label, title: label, disabled }, rest), icon);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: 'components/actions/IconButton.jsx', error: String((e && e.message) || e) }); }

// components/display/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = 'aq-avatar-styles';
function ensureStyles() {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = `
  .aqAvatar { --_size: 2.75rem; display: inline-flex; align-items: center; justify-content: center;
    width: var(--_size); height: var(--_size); flex: none;
    border-radius: 50%; overflow: hidden; position: relative;
    font-family: var(--font-sans); font-weight: var(--w-bold);
    font-size: calc(var(--_size) * 0.38); color: var(--text-on-bloom);
    background: var(--bloom); user-select: none;
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.25); }
  .aqAvatar--xs { --_size: 1.75rem; }
  .aqAvatar--sm { --_size: 2.25rem; }
  .aqAvatar--lg { --_size: 3.5rem; }
  .aqAvatar--xl { --_size: 5rem; }
  .aqAvatar img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .aqAvatar--ring { box-shadow: 0 0 0 2px var(--surface-card), 0 0 0 4px var(--brand); }
  `;
  document.head.appendChild(el);
}
function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0] || '').join('').toUpperCase();
}
function Avatar({ src, name = '', size = 'md', ring = false, className = '', ...rest }) {
  ensureStyles();
  const cls = ['aqAvatar', size !== 'md' ? `aqAvatar--${size}` : '', ring ? 'aqAvatar--ring' : '', className].filter(Boolean).join(' ');
  return React.createElement('span', _extends({ className: cls, title: name || undefined }, rest),
    src ? React.createElement('img', { src, alt: name }) : initials(name));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: 'components/display/Avatar.jsx', error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = 'aq-badge-styles';
function ensureStyles() {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = `
  .aqBadge { display: inline-flex; align-items: center; gap: 0.4em;
    font-family: var(--font-sans); font-size: var(--text-xs);
    font-weight: var(--w-bold); line-height: 1; letter-spacing: 0.02em;
    padding: 0.42em 0.7em; border-radius: var(--radius-pill);
    border: 1px solid transparent; white-space: nowrap; }
  .aqBadge__dot { width: 0.5em; height: 0.5em; border-radius: 50%; background: currentColor; }
  .aqBadge--brand   { background: var(--brand-soft); color: var(--brand-ink); }
  .aqBadge--bloom   { background: var(--bloom); color: var(--text-on-bloom); }
  .aqBadge--neutral { background: var(--surface-sunk); color: var(--text-body); }
  .aqBadge--success { background: var(--success-soft); color: var(--success); }
  .aqBadge--warning { background: var(--warning-soft); color: var(--warning); }
  .aqBadge--danger  { background: var(--danger-soft); color: var(--danger); }
  .aqBadge--outline { background: transparent; border-color: var(--border); color: var(--text-body); }
  `;
  document.head.appendChild(el);
}
function Badge({ children, tone = 'brand', dot = false, className = '', ...rest }) {
  ensureStyles();
  return React.createElement('span', _extends({ className: ['aqBadge', `aqBadge--${tone}`, className].filter(Boolean).join(' ') }, rest),
    dot && React.createElement('span', { className: 'aqBadge__dot' }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: 'components/display/Badge.jsx', error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = 'aq-card-styles';
function ensureStyles() {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = `
  .aqCard { display: flex; flex-direction: column; box-sizing: border-box;
    background: var(--surface-card); border: 1px solid var(--border-soft);
    border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-sm);
    transition: transform var(--dur-base) var(--ease-water), box-shadow var(--dur-base) var(--ease-water); }
  .aqCard--pad { padding: var(--space-5); }
  .aqCard--hover { cursor: pointer; }
  .aqCard--hover:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); }
  .aqCard--bloom { border: none; position: relative; color: var(--text-on-bloom); }
  .aqCard--bloom::before { content: ''; position: absolute; inset: 0; background: var(--bloom); z-index: 0; }
  .aqCard--bloom > * { position: relative; z-index: 1; }
  .aqCard--wash { background: var(--surface-wash); border-color: transparent; }
  .aqCard__media { display: block; width: 100%; object-fit: cover; }
  `;
  document.head.appendChild(el);
}
function Card({ children, variant = 'paper', padded = true, hover = false, media = null, as = 'div', className = '', ...rest }) {
  ensureStyles();
  const Tag = as;
  const cls = ['aqCard', variant === 'bloom' ? 'aqCard--bloom' : '', variant === 'wash' ? 'aqCard--wash' : '',
    padded && !media ? 'aqCard--pad' : '', hover ? 'aqCard--hover' : '', className].filter(Boolean).join(' ');
  return React.createElement(Tag, _extends({ className: cls }, rest),
    media && React.createElement('img', { className: 'aqCard__media', src: media, alt: '' }),
    media && padded ? React.createElement('div', { style: { padding: 'var(--space-5)' } }, children) : children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: 'components/display/Card.jsx', error: String((e && e.message) || e) }); }

// components/display/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = 'aq-tag-styles';
function ensureStyles() {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = `
  .aqTag { display: inline-flex; align-items: center; gap: 0.45em;
    font-family: var(--font-sans); font-size: var(--text-sm); font-weight: var(--w-semibold);
    color: var(--text-body); background: var(--surface-raised);
    border: 1px solid var(--border-soft); border-radius: var(--radius-sm);
    padding: 0.34em 0.7em; line-height: 1.1;
    transition: border-color var(--dur-base) var(--ease-water), background var(--dur-base) var(--ease-water); }
  .aqTag--interactive { cursor: pointer; }
  .aqTag--interactive:hover { border-color: var(--brand); color: var(--brand-ink); background: var(--brand-soft); }
  .aqTag--active { background: var(--brand-soft); border-color: var(--brand); color: var(--brand-ink); }
  .aqTag__x { display: inline-flex; width: 1em; height: 1em; cursor: pointer;
    border-radius: 50%; color: var(--text-muted); margin-right: -0.15em; }
  .aqTag__x:hover { color: var(--danger); }
  .aqTag__x svg { width: 100%; height: 100%; }
  `;
  document.head.appendChild(el);
}
function Tag({ children, active = false, onRemove, onClick, className = '', ...rest }) {
  ensureStyles();
  const interactive = !!onClick;
  return React.createElement('span',
    _extends({ className: ['aqTag', interactive ? 'aqTag--interactive' : '', active ? 'aqTag--active' : '', className].filter(Boolean).join(' '), onClick }, rest),
    children,
    onRemove && React.createElement('span', { className: 'aqTag__x', role: 'button', 'aria-label': 'Remove',
      onClick: e => { e.stopPropagation(); onRemove(e); } },
      React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2.4', strokeLinecap: 'round' },
        React.createElement('line', { x1: '6', y1: '6', x2: '18', y2: '18' }),
        React.createElement('line', { x1: '18', y1: '6', x2: '6', y2: '18' }))));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: 'components/display/Tag.jsx', error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = 'aq-checkbox-styles';
function ensureStyles() {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = `
  .aqCheck { display: inline-flex; align-items: center; gap: 10px;
    font-family: var(--font-sans); font-size: var(--text-sm);
    color: var(--text-strong); cursor: pointer; user-select: none; }
  .aqCheck input { position: absolute; opacity: 0; width: 0; height: 0; }
  .aqCheck__box { position: relative; width: 22px; height: 22px; flex: none;
    background: var(--surface-card); border: 1.5px solid var(--border-strong);
    border-radius: var(--radius-xs);
    transition: background var(--dur-base) var(--ease-water), border-color var(--dur-base) var(--ease-water); }
  .aqCheck__box svg { position: absolute; inset: 0; width: 100%; height: 100%;
    stroke: var(--text-on-brand); stroke-width: 3; fill: none;
    stroke-linecap: round; stroke-linejoin: round;
    opacity: 0; transform: scale(0.6);
    transition: opacity var(--dur-fast) var(--ease-water), transform var(--dur-base) var(--ease-bloom); }
  .aqCheck input:checked + .aqCheck__box { background: var(--brand); border-color: transparent; }
  .aqCheck input:checked + .aqCheck__box svg { opacity: 1; transform: scale(1); }
  .aqCheck input:focus-visible + .aqCheck__box { box-shadow: 0 0 0 3px var(--ring-brand); }
  .aqCheck input:disabled + .aqCheck__box { opacity: 0.5; }
  .aqCheck--disabled { cursor: not-allowed; color: var(--text-faint); }
  `;
  document.head.appendChild(el);
}
function Checkbox({ checked, defaultChecked, onChange, label, disabled, id, ...rest }) {
  ensureStyles();
  return React.createElement('label', { className: ['aqCheck', disabled ? 'aqCheck--disabled' : ''].filter(Boolean).join(' ') },
    React.createElement('input', _extends({ type: 'checkbox', id, checked, defaultChecked, onChange, disabled }, rest)),
    React.createElement('span', { className: 'aqCheck__box' },
      React.createElement('svg', { viewBox: '0 0 24 24' }, React.createElement('polyline', { points: '20 6 9 17 4 12' }))),
    label && React.createElement('span', null, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: 'components/forms/Checkbox.jsx', error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = 'aq-input-styles';
function ensureStyles() {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = `
  .aqField { display: flex; flex-direction: column; gap: 6px; font-family: var(--font-sans); }
  .aqField__label { font-size: var(--text-sm); font-weight: var(--w-semibold); color: var(--text-strong); }
  .aqField__hint { font-size: var(--text-xs); color: var(--text-muted); }
  .aqField__hint--err { color: var(--danger); }
  .aqInputWrap { position: relative; display: flex; align-items: center; }
  .aqInputWrap__ico { position: absolute; left: 14px; display: inline-flex;
    width: 1.1em; height: 1.1em; color: var(--text-muted); pointer-events: none; }
  .aqInputWrap__ico svg { width: 100%; height: 100%; }
  .aqInput { width: 100%; box-sizing: border-box; font-family: var(--font-sans);
    font-size: var(--text-base); color: var(--text-strong);
    background: var(--surface-card); border: 1.5px solid var(--border);
    border-radius: var(--radius-md); padding: 0.72em 0.95em;
    transition: border-color var(--dur-base) var(--ease-water), box-shadow var(--dur-base) var(--ease-water), background-color var(--dur-base) var(--ease-water); }
  .aqInput--hasIco { padding-left: 2.5em; }
  .aqInput::placeholder { color: var(--text-faint); }
  .aqInput:hover { border-color: var(--border-strong); }
  .aqInput:focus { outline: none; border-color: var(--brand); box-shadow: 0 0 0 3px var(--ring-brand); background: var(--paper-0); }
  .aqInput:disabled { background: var(--surface-sunk); color: var(--text-faint); cursor: not-allowed; }
  .aqInput--err { border-color: var(--danger); }
  .aqInput--err:focus { box-shadow: 0 0 0 3px var(--danger-soft); }
  `;
  document.head.appendChild(el);
}
function Input({ label, hint, error, icon = null, id, className = '', ...rest }) {
  ensureStyles();
  const fieldId = id || (label ? `aq-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return React.createElement('div', { className: ['aqField', className].filter(Boolean).join(' ') },
    label && React.createElement('label', { className: 'aqField__label', htmlFor: fieldId }, label),
    React.createElement('div', { className: 'aqInputWrap' },
      icon && React.createElement('span', { className: 'aqInputWrap__ico' }, icon),
      React.createElement('input', _extends({ id: fieldId, className: ['aqInput', icon ? 'aqInput--hasIco' : '', error ? 'aqInput--err' : ''].filter(Boolean).join(' '), 'aria-invalid': error ? 'true' : undefined }, rest))),
    error ? React.createElement('span', { className: 'aqField__hint aqField__hint--err' }, error)
      : hint && React.createElement('span', { className: 'aqField__hint' }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: 'components/forms/Input.jsx', error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = 'aq-switch-styles';
function ensureStyles() {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = `
  .aqSwitch { display: inline-flex; align-items: center; gap: 10px;
    font-family: var(--font-sans); font-size: var(--text-sm);
    color: var(--text-strong); cursor: pointer; user-select: none; }
  .aqSwitch input { position: absolute; opacity: 0; width: 0; height: 0; }
  .aqSwitch__track { position: relative; width: 44px; height: 26px; flex: none;
    background: var(--surface-sunk); border: 1.5px solid var(--border);
    border-radius: var(--radius-pill);
    transition: background var(--dur-base) var(--ease-water), border-color var(--dur-base) var(--ease-water); }
  .aqSwitch__thumb { position: absolute; top: 2px; left: 2px; width: 19px; height: 19px;
    background: var(--paper-0); border-radius: 50%; box-shadow: var(--shadow-sm);
    transition: transform var(--dur-base) var(--ease-bloom); }
  .aqSwitch input:checked + .aqSwitch__track { background: var(--bloom); border-color: transparent; }
  .aqSwitch input:checked + .aqSwitch__track .aqSwitch__thumb { transform: translateX(18px); }
  .aqSwitch input:focus-visible + .aqSwitch__track { box-shadow: 0 0 0 3px var(--ring-brand); }
  .aqSwitch input:disabled + .aqSwitch__track { opacity: 0.5; }
  .aqSwitch--disabled { cursor: not-allowed; color: var(--text-faint); }
  `;
  document.head.appendChild(el);
}
function Switch({ checked, defaultChecked, onChange, label, disabled, id, ...rest }) {
  ensureStyles();
  return React.createElement('label', { className: ['aqSwitch', disabled ? 'aqSwitch--disabled' : ''].filter(Boolean).join(' ') },
    React.createElement('input', _extends({ type: 'checkbox', role: 'switch', id, checked, defaultChecked, onChange, disabled }, rest)),
    React.createElement('span', { className: 'aqSwitch__track' }, React.createElement('span', { className: 'aqSwitch__thumb' })),
    label && React.createElement('span', null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: 'components/forms/Switch.jsx', error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;
__ds_ns.IconButton = __ds_scope.IconButton;
__ds_ns.Avatar = __ds_scope.Avatar;
__ds_ns.Badge = __ds_scope.Badge;
__ds_ns.Card = __ds_scope.Card;
__ds_ns.Tag = __ds_scope.Tag;
__ds_ns.Checkbox = __ds_scope.Checkbox;
__ds_ns.Input = __ds_scope.Input;
__ds_ns.Switch = __ds_scope.Switch;

})();
