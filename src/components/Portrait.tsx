import Image from "next/image";

type PortraitProps = {
  photo: string;
  name: string;
  caption: string;
};

function initials(name: string): string {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "—"
  );
}

/** Captioned portrait frame. Falls back to a designed monogram when no photo is set. */
export function Portrait({ photo, name, caption }: PortraitProps) {
  return (
    <figure className="relative">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-line-strong bg-surface-2">
        {photo ? (
          <Image
            src={photo}
            alt={`Portrait of ${name}`}
            fill
            sizes="(min-width: 1024px) 34vw, (min-width: 640px) 60vw, 90vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center">
            {/* Blueprint grid so the empty frame reads as a deliberate design object. */}
            <span className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgb(var(--c-ink)/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--c-ink)/0.05)_1px,transparent_1px)] [background-size:28px_28px]" />
            <span
              aria-hidden="true"
              className="relative font-display text-[6rem] font-medium tracking-tight text-ink/20"
            >
              {initials(name)}
            </span>
            <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
              Portrait
            </span>
            <span className="sr-only">Portrait placeholder</span>
          </div>
        )}
        {/* Corner accent tick — small Swiss registration mark. */}
        <span
          aria-hidden="true"
          className="absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-accent"
        />
      </div>
      <figcaption className="mt-2.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
        <span>{name}</span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}
