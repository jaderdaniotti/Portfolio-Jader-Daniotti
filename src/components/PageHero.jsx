import { Link } from "react-router-dom";

const PageHero = ({
  eyebrow,
  title,
  description,
  keywords = [],
  actions = [],
}) => {
  const isExternalHref = (href) =>
    href.startsWith("http://") || 
    href.startsWith("https://") || 
    href.startsWith("tel:") || 
    href.startsWith("mailto:");

  return (
    <section className="relative isolate overflow-hidden border-b border-white/12 bg-scuro-2 pb-18 pt-38 sm:pb-24">
      {/* Orbs decorativi */}
      <div className="pointer-events-none absolute -left-36 top-28 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="pointer-events-none absolute -right-32 top-20 h-64 w-64 rounded-full bg-white/8 blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1.6s' }} />
      
      {/* Grid pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-35" 
           style={{
             backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
             backgroundSize: '50px 50px'
           }} 
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl" data-aos="fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-bianco/55">
            {eyebrow}
          </p>
          <h1 className="mt-5 text-5xl font-medium leading-[0.98] tracking-tight text-bianco sm:text-6xl lg:text-[5.25rem]">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-bianco/76 sm:text-lg font-normal">
            {description}
          </p>

          {keywords.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3">
              {keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full font-medium border border-white/14 bg-black/25 px-3 py-2 text-[10px] uppercase tracking-[0.24em] text-bianco/72 backdrop-blur-sm sm:px-4 sm:text-xs sm:tracking-[0.28em]"
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}

          {actions.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-4">
              {actions.map((action) =>
                isExternalHref(action.href) ? (
                  <a
                    key={`${action.href}-${action.label}`}
                    href={action.href}
                    target={action.href.startsWith("http") ? "_blank" : undefined}
                    rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={
                      action.variant === "secondary"
                        ? "inline-flex items-center gap-2 rounded-sm border border-white/18 px-7 py-3.5 text-sm font-semibold text-bianco/88 transition-all hover:border-white/40 hover:bg-white/6"
                        : "inline-flex items-center gap-2 rounded-sm bg-bianco px-7 py-3.5 text-sm font-semibold text-scuro shadow-lg shadow-black/25 transition-all hover:-translate-y-0.5 hover:bg-bianco/92"
                    }
                  >
                    {action.label}
                  </a>
                ) : (
                  <Link
                    key={`${action.href}-${action.label}`}
                    to={action.href}
                    className={
                      action.variant === "secondary"
                        ? "inline-flex items-center gap-2 rounded-sm border border-white/18 px-7 py-3.5 text-sm font-semibold text-bianco/88 transition-all hover:border-white/40 hover:bg-white/6"
                        : "inline-flex items-center gap-2 rounded-sm bg-bianco px-7 py-3.5 text-sm font-semibold text-scuro shadow-lg shadow-black/25 transition-all hover:-translate-y-0.5 hover:bg-bianco/92"
                    }
                  >
                    {action.label}
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default PageHero;
