// Animated-border button — the offset-path runner effect from button-border.tsx.
// Variants: outline | solid | ghost. Sizes: sm | md | lg | icon.
function AbButton({ children, variant = "outline", size = "md", className = "", animate = true, onClick, ...rest }) {
  const sizeCls = {
    sm:  "h-8 px-3 text-[12px] rounded-full",
    md:  "h-10 px-5 text-[13px] rounded-full",
    lg:  "h-12 px-7 text-[14px] rounded-full",
    icon:"h-10 w-10 p-0 rounded-full"
  }[size];
  const variantCls = {
    outline: "border border-[var(--p2)]/70 bg-[var(--p1)]/40 hover:bg-[var(--p2)]/40 text-[var(--ink)]",
    solid:   "bg-[var(--accent)] text-[var(--p0)] hover:brightness-105 border border-transparent",
    ghost:   "bg-transparent text-[var(--ink)]/80 hover:bg-[var(--p2)]/30 border border-transparent"
  }[variant];
  return (
    <button
      onClick={onClick}
      className={`ab-shell inline-flex items-center justify-center gap-2 font-medium tracking-tight select-none transition-colors relative ${sizeCls} ${variantCls} ${className}`}
      {...rest}
    >
      {animate && (
        <span className="ab-border" aria-hidden="true">
          <span className="ab-runner" />
        </span>
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );
}

window.AbButton = AbButton;
