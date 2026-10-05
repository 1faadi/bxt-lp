'use client';

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type AnimationEvent,
  type CSSProperties,
  type PointerEvent,
} from 'react';
import styles from "./Process.module.css";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

type ArtKind = 'discover' | 'design' | 'build' | 'scale';

type Step = { title: string; text: string; art: ArtKind };

const STEPS: Step[] = [
  {
    title: 'Discover',
    text: 'We align on the business problem, users, constraints, and the outcome worth measuring.',
    art: 'discover',
  },
  {
    title: 'Design',
    text: 'We turn the strategy into flows, prototypes, and a system your team can see and test.',
    art: 'design',
  },
  {
    title: 'Build',
    text: 'Senior product engineers ship in focused increments with quality visible throughout.',
    art: 'build',
  },
  {
    title: 'Scale',
    text: 'We launch, learn from real usage, and strengthen the product as demand grows.',
    art: 'scale',
  },
];

/* ------------------------------------------------------------------ */
/*  Timing (ms)                                                        */
/* ------------------------------------------------------------------ */

const STEP_MS = 1500; // line travel from one step to the next
const HOLD_MS = 1900; // line travel past the last step before looping
const RESET_MS = 450; // gap between loops
const START_RATIO = 0.2; // share of the section visible before it starts

type StepState = 'done' | 'current' | 'upcoming';

/* ------------------------------------------------------------------ */
/*  Isometric geometry for the illustrations (240 x 170 viewBox)       */
/* ------------------------------------------------------------------ */

type Pt = [number, number];
const COS = 0.866;
const SIN = 0.5;
const iso = (x: number, y: number, z: number): Pt => [110 + (x - y) * COS, 110 + (x + y) * SIN - z];
const poly = (...p: Pt[]) => p.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(' ');

const box = (x: number, y: number, z: number, w: number, d: number, h: number) => ({
  top: poly(iso(x, y, z + h), iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x, y + d, z + h)),
  left: poly(iso(x, y + d, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x, y + d, z + h)),
  right: poly(iso(x + w, y, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x + w, y, z + h)),
});

const PLATFORM = box(-45, -45, 0, 90, 90, 8);
const PLATFORM_INSET = poly(iso(-35, -35, 8), iso(35, -35, 8), iso(35, 35, 8), iso(-35, 35, 8));

// Discover: light bulb rays
const RAYS = [-160, -125, -90, -55, -20].map((deg) => {
  const r = (deg * Math.PI) / 180;
  const at = (len: number) => `${(110 + Math.cos(r) * len).toFixed(1)} ${(52 + Math.sin(r) * len).toFixed(1)}`;
  return `M${at(29)}L${at(37)}`;
});

// Design: browser window standing on the platform
const [PANEL_X, PANEL_Y] = iso(-34, -1, 74);
const PANEL_SIDE = poly(iso(30, -6, 8), iso(30, -1, 8), iso(30, -1, 74), iso(30, -6, 74));
const PANEL_TOP = poly(iso(-34, -6, 74), iso(30, -6, 74), iso(30, -1, 74), iso(-34, -1, 74));
const PANEL_SHADOW = poly(iso(-34, -1, 8), iso(30, -1, 8), iso(30, 12, 8), iso(-34, 12, 8));

// Build: stacked layers
const LAYERS = [8, 23, 38].map((z) => box(-26, -26, z, 52, 52, 11));

// Scale: bars rising out of the platform (clipped at their footprint)
const BARS = [18, 28, 40, 54].map((h, i) => {
  const x = -30 + i * 15;
  const y = 16 - i * 15;
  const l = iso(x, y + 12, 8);
  const f = iso(x + 12, y + 12, 8);
  const r = iso(x + 12, y, 8);
  return { h, faces: box(x, y, 8, 12, 12, h), clip: poly([l[0], 0], l, f, r, [r[0], 0]) };
});

const BADGE_ICONS: Record<ArtKind, string[]> = {
  discover: ['M16.5 10.5a6 6 0 1 1-12 0a6 6 0 1 1 12 0', 'M15 15l5 5'],
  design: ['M4 20l1-4.5L15.5 5a2.1 2.1 0 0 1 3 3L8 18.5 4 20z', 'M13.5 7l3 3'],
  build: ['M8.5 7.5L4 12l4.5 4.5', 'M15.5 7.5L20 12l-4.5 4.5', 'M13.2 5.5l-2.4 13'],
  scale: ['M4 20h16', 'M6 16l4.5-4.5 3 3L19 9', 'M15 9h4v4'],
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Process() {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const sectionRef = useRef<HTMLElement>(null);
  const started = useRef(false);
  const resetTimer = useRef<number | undefined>(undefined);

  // Server render shows every step finished (the full picture); the loop starts on scroll.
  const [active, setActive] = useState(STEPS.length);
  const [inView, setInView] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [picked, setPicked] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= START_RATIO) setInView(true);
        else if (!entry.isIntersecting) setInView(false);
      },
      { threshold: [0, START_RATIO] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (inView && !reduced && !started.current) {
      started.current = true;
      setActive(0);
    }
  }, [inView, reduced]);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  // The progress line is the clock: when it finishes filling, move to the next step.
  const handleLineEnd = useCallback((index: number, e: AnimationEvent<HTMLSpanElement>) => {
    if (e.target !== e.currentTarget) return;
    if (index < STEPS.length - 1) {
      setActive((a) => (a === index ? index + 1 : a));
      return;
    }
    setActive((a) => (a === index ? -1 : a));
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setActive((a) => (a === -1 ? 0 : a)), RESET_MS);
  }, []);

  const goTo = (index: number) => {
    if (reduced) {
      setPicked(index);
      return;
    }
    started.current = true;
    window.clearTimeout(resetTimer.current);
    setActive(index);
  };

  const hoverStep = (index: number) => (e: PointerEvent) => {
    if (reduced || e.pointerType !== 'mouse') return;
    setHovering(true);
    goTo(index);
  };

  const n = STEPS.length;
  const shown = reduced ? n : active;
  // Which card the phone layout shows.
  const stage = reduced ? picked : active >= 0 && active < n ? active : active === -1 ? n - 1 : 0;
  const stateOf = (i: number): StepState => (i < shown ? 'done' : i === shown ? 'current' : 'upcoming');

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} bg-[#f8f5ef] py-24 lg:py-36`}
      aria-labelledby={`${uid}-title`}
    >
      <svg className={styles.decor} viewBox="0 0 560 300" aria-hidden="true">
        <defs>
          <radialGradient id={`${uid}-disc`}>
            <stop offset="0" stopColor="#fbe4cf" stopOpacity="0.7" />
            <stop offset="0.6" stopColor="#fbe4cf" stopOpacity="0.4" />
            <stop offset="1" stopColor="#fbe4cf" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="560" cy="150" r="170" fill={`url(#${uid}-disc)`} />
        <path id={`${uid}-arc`} d="M0 170C120 90 260 24 400 30S560 120 560 240" className={styles.decorArc} />
        <circle r="6" cx={reduced ? 400 : 0} cy={reduced ? 30 : 0} className={styles.decorDot}>
          {!reduced && (
            <animateMotion dur="14s" repeatCount="indefinite" keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="linear">
              <mpath href={`#${uid}-arc`} />
            </animateMotion>
          )}
        </circle>
      </svg>

      <div className={`shell ${styles.inner}`}>
        <p className={styles.eyebrow}>How we work</p>
        <div className={styles.header}>
          <h2 id={`${uid}-title`} className={styles.title}>
            From idea to production.
          </h2>
          <p className={styles.lede}>
            A clear, collaborative process that turns your vision into real, measurable results.
          </p>
        </div>

        <div
          className={styles.flow}
          data-paused={!inView || hovering ? 'true' : 'false'}
          onPointerLeave={() => setHovering(false)}
        >
          <svg className={styles.defs} aria-hidden="true" focusable="false">
            <defs>
              <radialGradient id={`${uid}-glow`}>
                <stop offset="0" stopColor="#f7822f" stopOpacity="0.3" />
                <stop offset="1" stopColor="#f7822f" stopOpacity="0" />
              </radialGradient>
              <radialGradient id={`${uid}-bulb`} cx="0.38" cy="0.3" r="0.8">
                <stop offset="0" stopColor="#ffe3c4" />
                <stop offset="0.55" stopColor="#ffab63" />
                <stop offset="1" stopColor="#f47a22" />
              </radialGradient>
              <filter id={`${uid}-soft`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" />
              </filter>
              {BARS.map((b, i) => (
                <clipPath key={i} id={`${uid}-bar${i}`}>
                  <polygon points={b.clip} />
                </clipPath>
              ))}
            </defs>
          </svg>

          {/* Progress track: numbered nodes, line, chevrons */}
          <div className={styles.track}>
            {STEPS.map((step, i) => {
              const state = stateOf(i);
              return (
                <div
                  key={step.title}
                  className={styles.stop}
                  data-state={state}
                  style={{ '--dur': `${i === n - 1 ? HOLD_MS : STEP_MS}ms` } as CSSProperties}
                  onPointerEnter={hoverStep(i)}
                >
                  <button
                    type="button"
                    className={styles.node}
                    onClick={() => goTo(i)}
                    aria-label={`Step ${i + 1}: ${step.title}`}
                    aria-current={i === stage ? 'step' : undefined}
                  >
                    <span className={styles.nodeNum}>{String(i + 1).padStart(2, '0')}</span>
                  </button>
                  <span className={styles.line} aria-hidden="true">
                    <span className={styles.fill} onAnimationEnd={(e) => handleLineEnd(i, e)} />
                  </span>
                  {i < n - 1 && (
                    <span className={styles.chevron} aria-hidden="true">
                      <svg viewBox="0 0 16 16">
                        <path d="M6.5 4.5L10 8l-3.5 3.5" />
                      </svg>
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Steps: four columns on desktop, one swapping card on phones */}
          <ol className={styles.steps}>
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className={styles.step}
                data-state={stateOf(i)}
                data-stage={i === stage ? 'true' : 'false'}
                onPointerEnter={hoverStep(i)}
              >
                <div className={styles.art} aria-hidden="true">
                  <Art kind={step.art} uid={uid} />
                </div>
                <div className={styles.copy}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepText}>{step.text}</p>
                  <span className={styles.rule} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Illustrations                                                      */
/* ------------------------------------------------------------------ */

function Art({ kind, uid }: { kind: ArtKind; uid: string }) {
  return (
    <svg viewBox="0 0 240 170" className={styles.artSvg}>
      <ellipse cx="110" cy="108" rx="112" ry="64" fill={`url(#${uid}-glow)`} className={styles.glow} />

      {/* Platform */}
      <g className={styles.platform}>
        <polygon points={PLATFORM.left} className={styles.platLeft} />
        <polygon points={PLATFORM.right} className={styles.platRight} />
        <polygon points={PLATFORM.top} className={styles.platTop} />
        <polygon points={PLATFORM_INSET} className={styles.platInset} />
      </g>

      {kind === 'discover' && (
        <g>
          <circle cx="110" cy="52" r="42" fill={`url(#${uid}-glow)`} className={styles.halo} />
          <ellipse cx="110" cy="99" rx="15" ry="5" className={styles.shadow} />
          <path
            d="M110 31A21 21 0 0 1 122.6 68.8C120.2 70.6 118.8 73.2 118.8 76V78H101.2V76C101.2 73.2 99.8 70.6 97.4 68.8A21 21 0 0 1 110 31Z"
            className={styles.bulbOff}
          />
          <path
            d="M110 31A21 21 0 0 1 122.6 68.8C120.2 70.6 118.8 73.2 118.8 76V78H101.2V76C101.2 73.2 99.8 70.6 97.4 68.8A21 21 0 0 1 110 31Z"
            fill={`url(#${uid}-bulb)`}
            className={styles.bulbOn}
          />
          <path d="M100.5 47a10 10 0 0 1 7-8.4" className={styles.shine} />
          <rect x="101.2" y="78" width="17.6" height="12" rx="2.5" className={styles.cap} />
          <path d="M101.5 82.2h17M101.5 86h17" className={styles.capLines} />
          <path d="M104.5 90h11l-1.6 4.5h-7.8z" className={styles.capTip} />
          <g className={styles.rays}>
            {RAYS.map((d, k) => (
              <path key={d} d={d} pathLength={1} style={{ '--i': k } as CSSProperties} />
            ))}
          </g>
        </g>
      )}

      {kind === 'design' && (
        <g>
          <polygon points={PANEL_SHADOW} className={styles.panelShadow} />
          <polygon points={PANEL_SIDE} className={styles.panelSide} />
          <polygon points={PANEL_TOP} className={styles.panelTop} />
          <g transform={`matrix(${COS} ${SIN} 0 1 ${PANEL_X.toFixed(1)} ${PANEL_Y.toFixed(1)})`}>
            <rect width="64" height="66" rx="5" className={styles.panel} />
            <path d="M0 11H64" className={styles.panelRule} />
            <circle cx="6" cy="5.5" r="1.6" className={styles.panelDot} />
            <circle cx="11" cy="5.5" r="1.6" className={styles.panelDot} />
            <circle cx="16" cy="5.5" r="1.6" className={styles.panelDot} />
            {[
              [6, 17, 24, 22],
              [34, 17, 24, 6],
              [34, 27, 17, 6],
              [6, 45, 52, 6],
              [6, 54, 34, 6],
            ].map(([x, y, w, h], k) => (
              <g key={k}>
                <rect x={x} y={y} width={w} height={h} rx="1.6" className={styles.blockOff} />
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height={h}
                  rx="1.6"
                  className={k < 3 ? styles.blockOn : styles.blockSoft}
                  style={{ '--i': k } as CSSProperties}
                />
              </g>
            ))}
          </g>
        </g>
      )}

      {kind === 'build' && (
        <g>
          {LAYERS.map((f, k) => (
            <g key={k} className={k === 0 ? styles.layerBase : styles.layer} style={{ '--i': k } as CSSProperties}>
              <polygon points={f.left} className={k === 0 ? styles.baseLeft : styles.layerLeft} />
              <polygon points={f.right} className={k === 0 ? styles.baseRight : styles.layerRight} />
              <polygon points={f.top} className={k === 0 ? styles.baseTop : styles.layerTop} />
            </g>
          ))}
        </g>
      )}

      {kind === 'scale' && (
        <g>
          {BARS.map((b, k) => (
            <g key={k} clipPath={`url(#${uid}-bar${k})`}>
              <g className={styles.bar} style={{ '--i': k, '--sink': `${(b.h * 0.72).toFixed(1)}px` } as CSSProperties}>
                <polygon points={b.faces.left} className={styles.barLeft} />
                <polygon points={b.faces.right} className={styles.barRight} />
                <polygon points={b.faces.top} className={k === BARS.length - 1 ? styles.barTopHot : styles.barTop} />
              </g>
            </g>
          ))}
          <g className={styles.arrow}>
            <path d="M54 58C88 54 126 40 162 16" pathLength={1} />
            <path d="M151 16.7L162 16L157.1 25.9" pathLength={1} className={styles.arrowHead} />
          </g>
        </g>
      )}

      {/* Badge */}
      <g className={styles.badge}>
        <rect x="167" y="110" width="44" height="44" rx="12" filter={`url(#${uid}-soft)`} className={styles.badgeShadow} />
        <rect x="166" y="104" width="44" height="44" rx="12" className={styles.badgeCard} />
        <g transform="translate(176 114)" className={styles.badgeIcon}>
          {BADGE_ICONS[kind].map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      </g>
    </svg>
  );
}
