// Menubar — custom implementation in the visual style of the provided shadcn/radix menubar.
// Supports nested submenus, separators, checkbox + radio items, shortcuts, "inset" items.

const MenubarCtx = React.createContext(null);

function Menubar({ children, className = "" }) {
  const [openIdx, setOpenIdx] = React.useState(null);
  return (
    <MenubarCtx.Provider value={{ openIdx, setOpenIdx }}>
      <div
        data-slot="menubar"
        className={
          "relative flex h-10 items-center gap-0.5 rounded-full border border-[var(--p2)]/60 " +
          "bg-[var(--p1)]/70 backdrop-blur-xl p-1 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] " +
          className
        }
      >
        {React.Children.map(children, (child, i) =>
          React.isValidElement(child) ? React.cloneElement(child, { __idx: i }) : child
        )}
      </div>
    </MenubarCtx.Provider>
  );
}

function MenubarMenu({ children, __idx }) {
  const ctx = React.useContext(MenubarCtx);
  const open = ctx.openIdx === __idx;
  const triggerRef = React.useRef(null);
  const setOpen = (v) => ctx.setOpenIdx(v ? __idx : null);
  // Enter while hovering any trigger if any menu is open ⇒ switch
  const onEnter = () => { if (ctx.openIdx !== null) ctx.setOpenIdx(__idx); };
  return (
    <div className="relative" onMouseEnter={onEnter}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        if (child.type === MenubarTrigger) return React.cloneElement(child, { __open: open, __setOpen: setOpen, __triggerRef: triggerRef });
        if (child.type === MenubarContent) return open ? React.cloneElement(child, { __close: () => setOpen(false) }) : null;
        return child;
      })}
    </div>
  );
}

function MenubarTrigger({ children, className = "", __open, __setOpen, __triggerRef }) {
  return (
    <button
      ref={__triggerRef}
      data-state={__open ? "open" : "closed"}
      onClick={() => __setOpen(!__open)}
      className={
        "flex cursor-pointer select-none items-center rounded-full px-3 py-1.5 text-[13px] font-medium tracking-tight outline-none " +
        "text-[var(--ink)]/85 hover:text-[var(--ink)] " +
        "data-[state=open]:bg-[var(--p2)]/40 data-[state=open]:text-[var(--ink)] " +
        "transition-colors " +
        className
      }
    >
      {children}
    </button>
  );
}

function MenubarContent({ children, __close, align = "start" }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target) && !e.target.closest('[data-slot="menubar"]')) __close && __close(); }
    function onEsc(e)  { if (e.key === "Escape") __close && __close(); }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onEsc); };
  }, [__close]);
  return (
    <div
      ref={ref}
      data-state="open"
      className={
        "absolute z-50 mt-2 min-w-[14rem] space-y-0.5 overflow-visible rounded-2xl border border-[var(--p2)]/60 " +
        "bg-[var(--p1)]/95 backdrop-blur-2xl p-2 text-[var(--ink)] shadow-2xl shadow-black/40 " +
        "animate-[mb-in_.18s_ease-out] " +
        (align === "end" ? "right-0" : "left-0")
      }
      style={{
        animation: "mb-in .18s cubic-bezier(.2,.7,.2,1)"
      }}
    >
      {children}
    </div>
  );
}

function MenubarItem({ children, inset, disabled, shortcut, onClick, className = "" }) {
  return (
    <button
      onClick={(e) => { if (disabled) return; onClick && onClick(e); }}
      data-disabled={disabled ? "" : undefined}
      className={
        "group relative flex w-full cursor-default select-none items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] outline-none text-left " +
        "text-[var(--ink)]/90 hover:bg-[var(--p2)]/40 hover:text-[var(--ink)] " +
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-40 " +
        (inset ? "ps-8 " : "") + className
      }
    >
      <span className="flex-1">{children}</span>
      {shortcut && <span className="ml-auto text-[11px] font-mono tracking-widest text-[var(--ink)]/45">{shortcut}</span>}
    </button>
  );
}

function MenubarSeparator() {
  return <div className="-mx-2 my-1 h-px bg-[var(--p2)]/50" />;
}

function MenubarCheckboxItem({ children, checked, onChange }) {
  return (
    <button
      onClick={() => onChange && onChange(!checked)}
      className="relative flex w-full cursor-default select-none items-center rounded-lg py-1.5 ps-8 pe-2 text-[13px] outline-none text-[var(--ink)]/90 hover:bg-[var(--p2)]/40 text-left"
    >
      <span className="absolute start-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && <IcCheck size={14} className="text-[var(--accent)]" />}
      </span>
      {children}
    </button>
  );
}

function MenubarRadioGroup({ value, onChange, children }) {
  return (
    <div role="radiogroup">
      {React.Children.map(children, (c) =>
        React.isValidElement(c) ? React.cloneElement(c, { __selected: c.props.value === value, __select: () => onChange && onChange(c.props.value) }) : c
      )}
    </div>
  );
}

function MenubarRadioItem({ children, __selected, __select }) {
  return (
    <button
      onClick={__select}
      className="relative flex w-full cursor-default select-none items-center rounded-lg py-1.5 ps-8 pe-2 text-[13px] outline-none text-[var(--ink)]/90 hover:bg-[var(--p2)]/40 text-left"
    >
      <span className="absolute start-2.5 flex h-2.5 w-2.5 items-center justify-center">
        {__selected && <span className="block h-2 w-2 rounded-full bg-[var(--accent)]" />}
      </span>
      {children}
    </button>
  );
}

function MenubarSub({ children }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {React.Children.map(children, (c) => {
        if (!React.isValidElement(c)) return c;
        if (c.type === MenubarSubTrigger) return React.cloneElement(c, { __open: open });
        if (c.type === MenubarSubContent) return open ? c : null;
        return c;
      })}
    </div>
  );
}

function MenubarSubTrigger({ children, __open }) {
  return (
    <div
      data-state={__open ? "open" : "closed"}
      className="flex cursor-default select-none items-center rounded-lg px-2 py-1.5 text-[13px] outline-none text-[var(--ink)]/90 hover:bg-[var(--p2)]/40 data-[state=open]:bg-[var(--p2)]/40"
    >
      <span className="flex-1">{children}</span>
      <IcChevron size={14} className="ml-auto opacity-60" />
    </div>
  );
}

function MenubarSubContent({ children }) {
  return (
    <div className="absolute left-full top-0 ml-1 min-w-[12rem] space-y-0.5 rounded-2xl border border-[var(--p2)]/60 bg-[var(--p1)]/95 backdrop-blur-2xl p-2 text-[var(--ink)] shadow-2xl shadow-black/40 z-50"
         style={{ animation: "mb-in .18s cubic-bezier(.2,.7,.2,1)" }}
    >
      {children}
    </div>
  );
}

// inject keyframes once
(function injectMb() {
  if (document.getElementById("mb-kf")) return;
  const s = document.createElement("style");
  s.id = "mb-kf";
  s.textContent = "@keyframes mb-in {0%{opacity:0;transform:translateY(-6px) scale(.97)}100%{opacity:1;transform:translateY(0) scale(1)}}";
  document.head.appendChild(s);
})();

Object.assign(window, {
  Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem,
  MenubarSeparator, MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem,
  MenubarSub, MenubarSubTrigger, MenubarSubContent
});
