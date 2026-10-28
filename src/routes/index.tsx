import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { toast } from "sonner";
import {
  Globe, Bot, LayoutTemplate, Menu, X, Moon, Sun, MessageCircle, Send, Instagram, Github,
  ArrowUp, ChevronLeft, ChevronRight, MapPin, Languages, Timer, Check, Download, ExternalLink,
} from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ramazon | Web & Telegram Bot Developer" },
      { name: "description", content: "Freelance web development, Telegram bots and frontend UI by Ramazon. Fast websites, smart bots, pixel-perfect interfaces." },
      { property: "og:title", content: "Ramazon | Web & Telegram Bot Developer" },
      { property: "og:description", content: "Freelance web development, Telegram bots and frontend UI by Ramazon." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = ["About", "Services", "Projects", "Process", "Contact"];
const scrollTo = (id: string) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (el.classList.add("in"), io.disconnect()), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function Magnetic({ children, onClick, className = "", href }: { children: ReactNode; onClick?: () => void; className?: string; href?: string }) {
  const ref = useRef<HTMLElement>(null);
  const move = (e: MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px) scale(1.05)`;
  };
  const leave = () => (ref.current!.style.transform = "");
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-transform duration-200 ${className}`;
  if (href)
    return <a ref={ref as never} href={href} target="_blank" rel="noreferrer" onMouseMove={move} onMouseLeave={leave} className={cls}>{children}</a>;
  return <button ref={ref as never} type="button" onClick={onClick} onMouseMove={move} onMouseLeave={leave} className={cls}>{children}</button>;
}

const primaryBtn = "bg-gradient-brand text-primary-foreground shadow-glow";
const ghostBtn = "glass text-foreground hover:bg-secondary";

function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const m = (e: globalThis.MouseEvent) => {
      if (!dot.current) return;
      const big = (e.target as HTMLElement).closest("a,button");
      dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%) scale(${big ? 2.2 : 1})`;
      dot.current.style.opacity = "1";
    };
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, []);
  return <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-5 w-5 rounded-full border-2 border-cyan opacity-0 transition-transform duration-150 md:block" />;
}

function Typing() {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = site.typing[i % site.typing.length];
    const t = setTimeout(() => {
      if (!del && txt === word) return setDel(true);
      if (del && txt === "") { setDel(false); return setI(i + 1); }
      setTxt(del ? word.slice(0, txt.length - 1) : word.slice(0, txt.length + 1));
    }, !del && txt === word ? 1400 : del ? 40 : 80);
    return () => clearTimeout(t);
  }, [txt, del, i]);
  return <p className="font-mono text-lg text-cyan">&gt; {txt}<span className="animate-pulse">▍</span></p>;
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let c = 0;
      const id = setInterval(() => { c++; setN(Math.round((value * c) / 40)); if (c >= 40) clearInterval(id); }, 30);
    });
    ref.current && io.observe(ref.current);
    return () => io.disconnect();
  }, [value]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function Navbar({ light, toggle }: { light: boolean; toggle: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  const go = (n: string) => { setOpen(false); scrollTo(n); };
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled || open ? "glass border-x-0 border-t-0" : ""}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3" aria-label="Back to top">
          <span className="font-display text-2xl font-bold">R<span className="text-pink">.</span></span>
          <span className="hidden items-center gap-2 rounded-full border px-3 py-1 text-xs sm:flex">
            <span className="h-2 w-2 animate-pulse-ring rounded-full bg-online" /> Available for projects
          </span>
        </button>
        <div className="hidden items-center gap-6 md:flex">
          {NAV.map((n) => <button key={n} onClick={() => go(n)} className="text-sm text-muted-foreground hover:text-foreground">{n}</button>)}
          <button onClick={toggle} aria-label="Toggle theme" className="glass rounded-full p-2">{light ? <Moon size={16} /> : <Sun size={16} />}</button>
          <Magnetic onClick={() => go("Contact")} className={`${primaryBtn} px-5 py-2 text-sm`}>Hire Me</Magnetic>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <button onClick={toggle} aria-label="Toggle theme" className="glass rounded-full p-2">{light ? <Moon size={16} /> : <Sun size={16} />}</button>
          <button onClick={() => setOpen(!open)} aria-label="Menu" className="glass rounded-full p-2">{open ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </nav>
      {open && (
        <div className="flex flex-col gap-1 px-5 pb-5 md:hidden">
          {NAV.map((n) => <button key={n} onClick={() => go(n)} className="rounded-xl px-3 py-3 text-left hover:bg-secondary">{n}</button>)}
          <button onClick={() => go("Contact")} className={`mt-2 rounded-full py-3 font-semibold ${primaryBtn}`}>Hire Me</button>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-32 md:grid-cols-2 md:pt-40">
      <Reveal>
        <span className="glass inline-block rounded-full px-4 py-1.5 text-sm">Hey there! I'm Ramazon 👋</span>
        <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
          Crafting <span className="text-gradient">High-Converting</span> Digital Experiences
        </h1>
        <p className="mt-5 max-w-md text-muted-foreground">Websites that sell. Bots that work while you sleep. Interfaces people love.</p>
        <div className="mt-4"><Typing /></div>
        <div className="mt-8 flex flex-wrap gap-4">
          <Magnetic onClick={() => scrollTo("projects")} className={primaryBtn}>See My Work</Magnetic>
          <Magnetic onClick={() => scrollTo("contact")} className={ghostBtn}>Let's Talk</Magnetic>
        </div>
        <div className="mt-10 flex gap-8">
          {site.stats.map((s) => (
            <div key={s.label}><div className="font-display text-3xl font-bold text-gradient"><Counter value={s.value} suffix={s.suffix} /></div><div className="text-xs text-muted-foreground">{s.label}</div></div>
          ))}
        </div>
      </Reveal>
      <Reveal className="glass rounded-3xl p-5 shadow-glow">
        <div className="mb-4 flex gap-2"><span className="h-3 w-3 rounded-full bg-destructive" /><span className="h-3 w-3 rounded-full bg-sun" /><span className="h-3 w-3 rounded-full bg-online" /></div>
        <pre className="overflow-x-auto font-mono text-sm leading-6"><span className="text-pink">const</span> bot = <span className="text-cyan">new</span> Telegraf(token);{"\n"}bot.start(ctx =&gt; ctx.reply(<span className="text-sun">"Hi! 👋"</span>));{"\n"}bot.launch(); <span className="text-muted-foreground">// 🚀 live</span></pre>
        <div className="mt-5 space-y-3 text-sm">
          <div className="ml-auto w-fit rounded-2xl rounded-br-sm bg-primary px-4 py-2 text-primary-foreground">/start</div>
          <div className="w-fit animate-bob rounded-2xl rounded-bl-sm bg-secondary px-4 py-2">Hi! 👋 How can I help you today?</div>
          <div className="ml-auto w-fit rounded-2xl rounded-br-sm bg-primary px-4 py-2 text-primary-foreground">I need a website 🔥</div>
        </div>
      </Reveal>
    </section>
  );
}

function Marquee() {
  const items = [...site.tech, ...site.tech];
  return (
    <div className="overflow-hidden border-y py-5">
      <div className="flex w-max animate-marquee gap-10">
        {items.map((t, i) => <span key={i} className="font-mono text-lg text-muted-foreground">✦ {t}</span>)}
      </div>
    </div>
  );
}

function Section({ id, label, title, children }: { id: string; label: string; title: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
      <Reveal>
        <p className="font-mono text-sm text-cyan">// {label}</p>
        <h2 className="mt-2 text-3xl font-bold md:text-5xl">{title}</h2>
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  );
}

function About() {
  const chips = [
    { icon: MapPin, k: "Location", v: "Tajikistan / Remote Worldwide" },
    { icon: Languages, k: "Languages", v: "Tajik, Russian, English" },
    { icon: Timer, k: "Turnaround", v: "1-3 week sprints" },
  ];
  return (
    <Section id="about" label="about" title={<>A bit <span className="text-gradient">about me</span></>}>
      <div className="grid gap-10 md:grid-cols-2">
        <Reveal>
          <p className="text-lg text-muted-foreground">Full-cycle developer with hands-on experience building fast websites, Telegram bots, and automation tools. I turn complex logic into smooth user experiences.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {chips.map((c) => <div key={c.k} className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm"><c.icon size={16} className="text-pink" /><b>{c.k}:</b> {c.v}</div>)}
          </div>
        </Reveal>
        <Reveal className="space-y-5">
          {site.skills.map((s) => <Skill key={s.name} {...s} />)}
        </Reveal>
      </div>
    </Section>
  );
}

function Skill({ name, level }: { name: string; level: number }) {
  const [w, setW] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setW(level));
    ref.current && io.observe(ref.current);
    return () => io.disconnect();
  }, [level]);
  return (
    <div ref={ref}>
      <div className="mb-2 flex justify-between text-sm"><span>{name}</span><span className="font-mono">{level}%</span></div>
      <div className="h-2.5 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-gradient-brand transition-all duration-1000" style={{ width: `${w}%` }} /></div>
    </div>
  );
}

const icons = { globe: Globe, bot: Bot, layout: LayoutTemplate };

function Services() {
  return (
    <Section id="services" label="services" title={<>What I can <span className="text-gradient">build for you</span></>}>
      <div className="grid gap-6 md:grid-cols-3">
        {site.services.map((s) => {
          const I = icons[s.icon as keyof typeof icons];
          return (
            <Reveal key={s.title} className="glass relative flex flex-col rounded-3xl p-7 transition-transform hover:-translate-y-2">
              {s.hot && <span className="absolute right-5 top-5 rounded-full bg-sun px-3 py-1 text-xs font-bold text-background">High Demand</span>}
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground"><I /></div>
              <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{s.desc}</p>
              <p className="mt-4 font-mono text-sm text-cyan">{s.price}</p>
              <button onClick={() => scrollTo("contact")} className="mt-5 rounded-full border py-2.5 text-sm font-semibold hover:bg-secondary">Request this service</button>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function TiltCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        ref.current!.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
      }}
      onMouseLeave={() => (ref.current!.style.transform = "")}
      className="group glass overflow-hidden rounded-3xl transition-transform duration-200"
    >{children}</div>
  );
}

function Projects() {
  const [f, setF] = useState("All");
  const [open, setOpen] = useState<(typeof site.projects)[number] | null>(null);
  const list = site.projects.filter((p) => f === "All" || p.category === f);
  return (
    <Section id="projects" label="projects" title={<>Recent <span className="text-gradient">work</span></>}>
      <div className="mb-8 flex flex-wrap gap-2">
        {["All", "Websites", "Bots", "Frontend"].map((t) => (
          <button key={t} onClick={() => setF(t)} className={`rounded-full px-5 py-2 text-sm ${f === t ? primaryBtn : ghostBtn}`}>{t}</button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {list.map((p, i) => (
          <TiltCard key={p.title}>
            <div className="relative h-52 overflow-hidden">
              <div className="h-full w-full bg-gradient-brand transition-transform duration-500 group-hover:scale-110" style={{ filter: `hue-rotate(${i * 50}deg)` }} role="img" aria-label={`${p.title} preview`} />
              <span className="absolute left-4 top-4 rounded-full bg-background/70 px-3 py-1 text-xs">{p.category}</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="rounded-full bg-secondary px-3 py-1 font-mono text-xs">{t}</span>)}</div>
              <button onClick={() => setOpen(p)} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan hover:underline">View Case <ExternalLink size={14} /></button>
            </div>
          </TiltCard>
        ))}
      </div>
      {open && (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-background/80 p-5 backdrop-blur" onClick={() => setOpen(null)}>
          <div className="glass w-full max-w-lg rounded-3xl bg-card p-7" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal>
            <div className="flex items-start justify-between"><h3 className="text-2xl font-bold">{open.title}</h3><button onClick={() => setOpen(null)} aria-label="Close"><X /></button></div>
            <p className="mt-1 text-sm text-cyan">{open.category}</p>
            <p className="mt-4 text-muted-foreground">{open.desc} Full case study coming soon — ask me for details!</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => { setOpen(null); scrollTo("contact"); }} className={`rounded-full px-5 py-2.5 text-sm font-semibold ${primaryBtn}`}>Want something similar?</button>
              {open.url !== "#" && <a href={open.url} target="_blank" rel="noreferrer" className={`rounded-full px-5 py-2.5 text-sm ${ghostBtn}`}>Open live</a>}
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}

function Process() {
  return (
    <Section id="process" label="process" title={<>How we'll <span className="text-gradient">work</span></>}>
      <div className="relative grid gap-8 md:grid-cols-4">
        <div className="absolute left-0 right-0 top-7 hidden h-1 rounded-full bg-gradient-brand md:block" />
        {site.process.map((s) => (
          <Reveal key={s.n} className="relative">
            <div className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-brand font-mono font-bold text-primary-foreground shadow-glow">{s.n}</div>
            <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            <p className="mt-2 font-mono text-xs text-sun">{s.time}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Pricing() {
  return (
    <Section id="pricing" label="pricing" title={<>Simple <span className="text-gradient">pricing</span></>}>
      <div className="grid gap-6 md:grid-cols-3">
        {site.pricing.map((p) => (
          <Reveal key={p.name} className={`glass relative flex flex-col rounded-3xl p-7 ${p.popular ? "border-primary shadow-glow md:-translate-y-4" : ""}`}>
            {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-brand px-4 py-1 text-xs font-bold text-primary-foreground">Most Popular</span>}
            <h3 className="text-xl font-bold">{p.name}</h3>
            <p className="mt-3 font-display text-4xl font-bold">{p.price}</p>
            <ul className="mt-6 flex-1 space-y-3 text-sm">{p.features.map((f) => <li key={f} className="flex gap-2"><Check size={18} className="text-online" />{f}</li>)}</ul>
            <button onClick={() => scrollTo("contact")} className={`mt-7 rounded-full py-3 font-semibold ${p.popular ? primaryBtn : ghostBtn}`}>Get started</button>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  const n = site.testimonials.length;
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % n), 5000); return () => clearInterval(t); }, [n, i]);
  const t = site.testimonials[i];
  return (
    <Section id="testimonials" label="testimonials" title={<>Kind <span className="text-gradient">words</span></>}>
      <div className="glass mx-auto max-w-2xl rounded-3xl p-8 text-center">
        <p key={i} className="animate-in fade-in text-lg">“{t.text}”</p>
        <p className="mt-5 font-bold">{t.name}</p><p className="text-sm text-muted-foreground">{t.role}</p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <button onClick={() => setI((i - 1 + n) % n)} aria-label="Previous" className="glass rounded-full p-2"><ChevronLeft /></button>
          {site.testimonials.map((_, k) => <button key={k} onClick={() => setI(k)} aria-label={`Slide ${k + 1}`} className={`h-2.5 rounded-full transition-all ${k === i ? "w-8 bg-gradient-brand" : "w-2.5 bg-muted-foreground/40"}`} />)}
          <button onClick={() => setI((i + 1) % n)} aria-label="Next" className="glass rounded-full p-2"><ChevronRight /></button>
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", type: site.projectTypes[0], budget: site.budgets[0], message: "" });
  const set = (k: keyof typeof form, v: string) => setForm({ ...form, [k]: v });
  const waText = () => encodeURIComponent(`Hi Ramazon! I'm ${form.name || "—"} (${form.email || "—"}).\nProject: ${form.type}\nBudget: ${form.budget}\n\n${form.message}`);
  const channels = [
    { icon: MessageCircle, name: "WhatsApp", ...site.contacts.whatsapp },
    { icon: Send, name: "Telegram", ...site.contacts.telegram },
    { icon: Instagram, name: "Instagram", ...site.contacts.instagram },
  ];
  const field = "w-full rounded-2xl border bg-input/30 px-4 py-3 outline-none focus:border-ring";
  return (
    <Section id="contact" label="contact" title={<>Let's Build Something <span className="text-gradient">Exceptional</span> Together</>}>
      <p className="-mt-6 mb-10 max-w-xl text-muted-foreground">Got an idea? Tell me about it. I usually reply within a few hours.</p>
      <div className="grid gap-8 md:grid-cols-5">
        <div className="space-y-4 md:col-span-2">
          {channels.map((c) => (
            <a key={c.name} href={c.href} target="_blank" rel="noreferrer" className="glass flex items-center gap-4 rounded-3xl p-5 transition hover:-translate-y-1 hover:shadow-glow">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground"><c.icon /></div>
              <div><p className="font-bold">{c.name}</p><p className="text-sm text-muted-foreground">{c.label}</p></div>
            </a>
          ))}
        </div>
        <form
          className="glass space-y-4 rounded-3xl p-6 md:col-span-3"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Message received! 🎉", { description: `Thanks ${form.name}, I'll get back to you soon.` });
            setForm({ ...form, name: "", email: "", message: "" });
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input required className={field} placeholder="Your name" aria-label="Name" value={form.name} onChange={(e) => set("name", e.target.value)} />
            <input required type="email" className={field} placeholder="Email" aria-label="Email" value={form.email} onChange={(e) => set("email", e.target.value)} />
          </div>
          <select className={field} aria-label="Project type" value={form.type} onChange={(e) => set("type", e.target.value)}>
            {site.projectTypes.map((t) => <option key={t} className="bg-card">{t}</option>)}
          </select>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Budget">
            {site.budgets.map((b) => <button type="button" key={b} onClick={() => set("budget", b)} className={`rounded-full px-4 py-2 text-sm ${form.budget === b ? primaryBtn : ghostBtn}`}>{b}</button>)}
          </div>
          <textarea required rows={5} className={field} placeholder="Tell me about your project" aria-label="Message" value={form.message} onChange={(e) => set("message", e.target.value)} />
          <div className="flex flex-wrap gap-3">
            <button type="submit" className={`rounded-full px-6 py-3 font-semibold ${primaryBtn}`}>Send Message</button>
            <a href={`https://wa.me/${site.whatsappNumber}?text=${waText()}`} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold ${ghostBtn}`}><MessageCircle size={18} /> Send via WhatsApp</a>
          </div>
        </form>
      </div>
    </Section>
  );
}

function Footer() {
  const socials = [
    { icon: MessageCircle, href: site.contacts.whatsapp.href, l: "WhatsApp" },
    { icon: Send, href: site.contacts.telegram.href, l: "Telegram" },
    { icon: Instagram, href: site.contacts.instagram.href, l: "Instagram" },
    { icon: Github, href: site.contacts.github.href, l: "GitHub" },
  ];
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 md:flex-row">
        <span className="font-display text-2xl font-bold">R<span className="text-pink">.</span></span>
        <p className="text-sm text-muted-foreground">© 2026 Ramazon. Crafted with precision & code.</p>
        <div className="flex items-center gap-3">
          {socials.map((s) => <a key={s.l} href={s.href} target="_blank" rel="noreferrer" aria-label={s.l} className="glass rounded-full p-2.5 hover:text-cyan"><s.icon size={16} /></a>)}
          <a href={site.resumeUrl} onClick={(e) => { if (site.resumeUrl === "#") { e.preventDefault(); toast("Resume coming soon 📄"); } }} className="glass inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm"><Download size={14} /> Resume</a>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" className="rounded-full bg-gradient-brand p-2.5 text-primary-foreground"><ArrowUp size={16} className="animate-bob" /></button>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  const [light, setLight] = useState(false);
  useEffect(() => { document.documentElement.classList.toggle("light", light); }, [light]);
  return (
    <div className="relative">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 top-10 h-96 w-96 animate-blob rounded-full bg-primary opacity-30 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 animate-blob rounded-full bg-pink opacity-20 blur-3xl [animation-delay:-6s]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 animate-blob rounded-full bg-cyan opacity-20 blur-3xl [animation-delay:-12s]" />
      </div>
      <Cursor />
      <Navbar light={light} toggle={() => setLight(!light)} />
      <main>
        <Hero /><Marquee /><About /><Services /><Projects /><Process /><Pricing /><Testimonials /><Contact />
      </main>
      <Footer />
      <a href={site.contacts.whatsapp.href} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-6 right-6 z-50 flex animate-pulse-ring items-center gap-2 rounded-full bg-online px-5 py-3 font-semibold text-background">
        <MessageCircle size={20} /> <span className="hidden sm:inline">Chat on WhatsApp</span>
      </a>
      <Toaster position="top-center" />
    </div>
  );
}
