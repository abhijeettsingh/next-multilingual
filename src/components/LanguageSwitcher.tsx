// ./src/components/LanguageSwitcher.tsx
"use client";

import { PrismicNextLink } from "@prismicio/next";
import { usePathname } from "next/navigation";

interface LanguageSwitcherProps {
  locales: {
    lang: string;
    lang_name: string;
    url: string;
  }[];
  lang: string;
}

const localeLabels = {
  "en-us": "EN",
  "fr-fr": "FR",
};

export const LanguageSwitcher = ({ locales, lang }: LanguageSwitcherProps) => {
  const pathName = usePathname();
  return (
    <div className="flex flex-wrap gap-3 absolute top-5 right-5">
      <span aria-hidden>🌐</span>
      <ul className="flex flex-wrap gap-3">
        {locales.map((locale) => (
          <li
            key={locale.lang}
            className={`${lang === locale.lang && "font-bold"}`}
          >
            <PrismicNextLink
              href={locale.url + pathName}
              locale={locale.lang}
              aria-label={`Change language to ${locale.lang_name}`}
            >
              {localeLabels[locale.lang as keyof typeof localeLabels] ||
                locale.lang}
            </PrismicNextLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
