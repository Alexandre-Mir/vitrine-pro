import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              {isLast ? (
                <span
                  className="first-letter:uppercase line-clamp-1 text-sm text-primary"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="first-letter:uppercase line-clamp-1 text-sm text-primary hover:underline"
                  >
                    {item.label}
                  </Link>
                  <ChevronRight size={12} />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
