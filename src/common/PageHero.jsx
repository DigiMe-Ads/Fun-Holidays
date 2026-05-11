import { Link } from "react-router-dom";

const PageHero = ({ title, breadcrumbs, image }) => {
  return (
    <section className="relative w-full h-[320px] sm:h-[380px] overflow-hidden">
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Subtle dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Text — bottom left */}
      <div className="absolute bottom-10 left-8 sm:left-14">
        <h1 className="text-white text-3xl sm:text-4xl font-semibold mb-2 drop-shadow">
          {title}
        </h1>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/80">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-white/50 text-xs">•</span>}
              {crumb.href ? (
                <Link
                  to={crumb.href}
                  className="hover:text-white transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white font-medium">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default PageHero;