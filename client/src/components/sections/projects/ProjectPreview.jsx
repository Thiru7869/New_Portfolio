import { cn } from '@/lib/utils';

/* ─── Project mock UIs ───────────────────────────────────────────────────── */

function EcommerceMockup() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden" style={{ background: '#0b0e14' }}>
      {/* Top nav */}
      <div
        className="flex h-8 items-center justify-between border-b px-3"
        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded" style={{ background: 'rgba(96,165,250,0.5)' }} />
          <span className="text-[9px] font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>EcomStore</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-1.5 w-12 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <div className="flex h-5 items-center gap-1 rounded px-1.5" style={{ background: 'rgba(96,165,250,0.15)', border: '1px solid rgba(96,165,250,0.25)' }}>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgba(96,165,250,0.9)" strokeWidth="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            <span className="text-[8px] font-bold" style={{ color: 'rgba(96,165,250,0.9)' }}>3</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 gap-0 overflow-hidden">
        {/* Sidebar */}
        <div className="w-14 shrink-0 border-r p-2 space-y-1" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
          {['All', 'New', 'Sale', 'Tech'].map((c, i) => (
            <div
              key={c}
              className="rounded px-1.5 py-1 text-[8px]"
              style={{
                background: i === 0 ? 'rgba(96,165,250,0.12)' : 'transparent',
                color: i === 0 ? 'rgba(96,165,250,0.9)' : 'rgba(255,255,255,0.25)',
              }}
            >
              {c}
            </div>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid flex-1 grid-cols-3 gap-1.5 p-2">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="flex flex-col overflow-hidden rounded-md" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="aspect-square w-full" style={{ background: i === 0 ? 'rgba(96,165,250,0.12)' : 'rgba(255,255,255,0.05)' }} />
              <div className="p-1 space-y-0.5">
                <div className="h-1 w-3/4 rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }} />
                <div className="h-1 w-1/2 rounded-full" style={{ background: 'rgba(96,165,250,0.4)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TaskBoardMockup() {
  const cols = [
    { label: 'Backlog', cards: 2, accent: false },
    { label: 'In Progress', cards: 2, accent: true },
    { label: 'Review', cards: 1, accent: false },
    { label: 'Done', cards: 3, accent: false },
  ];

  return (
    <div className="flex flex-1 flex-col overflow-hidden" style={{ background: '#0d0b14' }}>
      {/* Top nav */}
      <div
        className="flex h-8 items-center justify-between border-b px-3"
        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <span className="text-[9px] font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>TaskBoard</span>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            {[0.4, 0.55, 0.35].map((o, i) => (
              <div key={i} className="h-3.5 w-3.5 rounded-full border" style={{ background: `rgba(167,139,250,${o})`, borderColor: '#0d0b14' }} />
            ))}
          </div>
          <div
            className="rounded px-1.5 py-0.5 text-[8px] font-medium"
            style={{ background: 'rgba(167,139,250,0.15)', color: 'rgba(167,139,250,0.9)' }}
          >
            + New
          </div>
        </div>
      </div>

      {/* Kanban columns */}
      <div className="flex flex-1 gap-1.5 overflow-hidden p-2">
        {cols.map(({ label, cards, accent }) => (
          <div key={label} className="flex flex-1 min-w-0 flex-col gap-1.5">
            <div className="text-[7px] font-semibold uppercase tracking-widest px-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
              {label}
            </div>
            {Array.from({ length: cards }, (_, i) => (
              <div
                key={i}
                className="rounded-md p-1.5 space-y-1"
                style={{
                  background: accent && i === 0 ? 'rgba(167,139,250,0.08)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${accent && i === 0 ? 'rgba(167,139,250,0.25)' : 'rgba(255,255,255,0.04)'}`,
                }}
              >
                <div className="h-1 rounded-full" style={{ width: i === 0 ? '80%' : '60%', background: 'rgba(255,255,255,0.15)' }} />
                <div className="h-1 rounded-full" style={{ width: '40%', background: 'rgba(255,255,255,0.07)' }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsMockup() {
  const barHeights = [28, 45, 38, 62, 52, 78, 65, 85, 72, 80, 68, 92];

  return (
    <div className="flex flex-1 flex-col overflow-hidden" style={{ background: '#0a0f0c' }}>
      {/* Top nav */}
      <div
        className="flex h-8 items-center justify-between border-b px-3"
        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <span className="text-[9px] font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>Analytics</span>
        <div className="flex items-center gap-1">
          {['7D', '30D', '90D'].map((r, i) => (
            <div
              key={r}
              className="rounded px-1.5 py-0.5 text-[8px]"
              style={{
                background: i === 1 ? 'rgba(52,211,153,0.12)' : 'transparent',
                color: i === 1 ? 'rgba(52,211,153,0.9)' : 'rgba(255,255,255,0.25)',
              }}
            >
              {r}
            </div>
          ))}
        </div>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-3 gap-1.5 p-2 pb-0">
        {[['24.5K', 'Users'], ['1.8K', 'Sales'], ['94%', 'Retention']].map(([val, label]) => (
          <div key={label} className="rounded-md p-1.5" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <div className="text-xs font-bold leading-none" style={{ color: 'rgba(255,255,255,0.8)' }}>{val}</div>
            <div className="mt-0.5 text-[7px]" style={{ color: 'rgba(255,255,255,0.25)' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="relative flex-1 overflow-hidden p-2 pt-1.5">
        <div className="relative h-full overflow-hidden rounded-md" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <div className="absolute inset-x-0 bottom-0 flex items-end gap-0.5 px-1.5 pb-1.5">
            {barHeights.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${h}%`,
                  background:
                    i === barHeights.length - 1
                      ? 'rgba(52,211,153,0.75)'
                      : `rgba(52,211,153,${0.1 + i * 0.018})`,
                }}
              />
            ))}
          </div>
          {/* Horizontal grid lines */}
          {[25, 50, 75].map(y => (
            <div
              key={y}
              className="absolute inset-x-0"
              style={{
                bottom: `${y}%`,
                borderTop: '1px solid rgba(255,255,255,0.04)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Frame wrapper ──────────────────────────────────────────────────────── */

const MOCK_UI = {
  ecommerce:   EcommerceMockup,
  taskmanager: TaskBoardMockup,
  analytics:   AnalyticsMockup,
};

const CHROME_URLS = {
  ecommerce:   'localhost:3000 — EcomStore',
  taskmanager: 'localhost:3000 — TaskBoard',
  analytics:   'localhost:5000 — Analytics',
};

export function ProjectPreviewFrame({ projectId, className }) {
  const MockUI = MOCK_UI[projectId];
  if (!MockUI) return null;

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-xl',
        'border shadow-[0_32px_80px_rgba(0,0,0,0.6)]',
        className,
      )}
      style={{ background: '#0a0a0c', borderColor: 'rgba(255,255,255,0.08)' }}
    >
      {/* Browser chrome */}
      <div
        className="flex h-7 shrink-0 items-center gap-1.5 border-b px-3"
        style={{ background: 'rgba(0,0,0,0.4)', borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#ff5f57' }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#febc2e' }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#28c840' }} />
        <span
          className="mx-auto max-w-[140px] truncate rounded px-2 py-0.5 font-mono text-[8px]"
          style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.2)' }}
        >
          {CHROME_URLS[projectId]}
        </span>
      </div>

      {/* Mock UI */}
      <div className="flex flex-1">
        <MockUI />
      </div>
    </div>
  );
}
