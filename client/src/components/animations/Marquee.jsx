import { cn } from '@/lib/utils';

/**
 * Marquee — infinite horizontal scroll of any content.
 * CSS-based for best performance. Content is duplicated for seamless looping.
 *
 * Usage:
 *   <Marquee speed={30} gap={16} pauseOnHover>
 *     <span>React</span>
 *     <span>Node.js</span>
 *     <span>Python</span>
 *   </Marquee>
 *
 * @param {number}  speed        - seconds for one full pass (default 30)
 * @param {'left'|'right'} direction
 * @param {number}  gap          - gap between items in px (default 24)
 * @param {boolean} pauseOnHover
 * @param {boolean} fade         - fade edges (subtle, not heavy) (default true)
 */
export function Marquee({
  children,
  speed = 30,
  direction = 'left',
  gap = 24,
  pauseOnHover = true,
  fade = true,
  className,
  itemClassName,
  ...props
}) {
  return (
    <div
      className={cn('relative overflow-hidden', className)}
      {...props}
      style={{
        maskImage: fade
          ? 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
          : undefined,
        WebkitMaskImage: fade
          ? 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
          : undefined,
      }}
    >
      <div
        className={cn(
          'flex w-max',
          pauseOnHover && '[&:hover>*]:animation-play-state-paused'
        )}
      >
        {/* First pass */}
        <MarqueeTrack speed={speed} direction={direction} gap={gap} pauseOnHover={pauseOnHover} className={itemClassName}>
          {children}
        </MarqueeTrack>
        {/* Duplicate for seamless loop */}
        <MarqueeTrack speed={speed} direction={direction} gap={gap} pauseOnHover={pauseOnHover} aria-hidden className={itemClassName}>
          {children}
        </MarqueeTrack>
      </div>
    </div>
  );
}

function MarqueeTrack({ children, speed, direction, gap, pauseOnHover, className, ...props }) {
  return (
    <div
      className={cn('flex shrink-0', pauseOnHover && 'hover:[animation-play-state:paused]')}
      style={{
        gap: `${gap}px`,
        animation: `marquee-scroll ${speed}s linear infinite`,
        animationDirection: direction === 'right' ? 'reverse' : 'normal',
      }}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * InfiniteScroller — alias for Marquee with item-wrapping convenience.
 * Wraps each child in a styled container automatically.
 *
 * Usage:
 *   <InfiniteScroller items={['React', 'Node.js', 'Python']} />
 */
export function InfiniteScroller({ items = [], speed = 25, direction = 'left', className }) {
  const children = items.map((item, i) => (
    <span
      key={i}
      className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground-secondary whitespace-nowrap"
    >
      {item}
    </span>
  ));

  return (
    <Marquee speed={speed} direction={direction} gap={16} className={className}>
      {children}
    </Marquee>
  );
}
