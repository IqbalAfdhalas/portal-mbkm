// src/components/layout/PageHeader.tsx
import Container from "./Container";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Array<{
    name: string;
    href: string;
    current?: boolean;
  }>;
  bgImage?: string;
}

const PageHeader = ({
  title,
  description,
  breadcrumbs,
  bgImage,
}: PageHeaderProps) => {
  return (
    <div
      className={`bg-gradient-to-r from-primary to-primary-light relative py-16 md:py-24 ${
        bgImage ? "bg-cover bg-center bg-no-repeat" : ""
      }`}
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}
    >
      {/* Overlay for background image if present */}
      {bgImage && (
        <div className="absolute inset-0 bg-primary bg-opacity-75"></div>
      )}

      <Container className="relative z-10">
        {breadcrumbs && (
          <nav className="mb-4">
            <ol className="flex items-center space-x-2 text-sm text-gray-300">
              {breadcrumbs.map((item, index) => (
                <li key={item.name} className="flex items-center">
                  {index > 0 && (
                    <svg
                      className="h-4 w-4 mx-1 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <a
                    href={item.href}
                    className={`${
                      item.current
                        ? "text-white font-medium"
                        : "text-gray-300 hover:text-white"
                    }`}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <h1 className="text-3xl md:text-4xl font-bold text-white font-heading mb-4">
          {title}
        </h1>

        {description && (
          <p className="text-gray-200 text-lg max-w-3xl font-body">
            {description}
          </p>
        )}
      </Container>
    </div>
  );
};

export default PageHeader;
