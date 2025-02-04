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

interface GetCleanPathnameProps {
  locales: {
    lang: string;
    lang_name: string;
    url: string;
  }[];
  pathname: string;
}

const localeLabels = {
  "en-us": "EN",
  "fr-fr": "FR",
};

function getCleanPathname({ pathname, locales }: GetCleanPathnameProps) {
  console.log("locales", locales);

  for (const locale of locales) {
    if (pathname.startsWith(locale.url)) {
      return pathname.replace(locale.url, "") || "/";
    }
  }
  return pathname;
}

export const LanguageSwitcher = ({ locales, lang }: LanguageSwitcherProps) => {
  console.log("locales", locales);

  const pathname = usePathname(); // Get pathname first
  const cleanPathname = getCleanPathname({ pathname, locales }); // Pass as an object

  console.log("cleanPathname", cleanPathname);

  return (
    <div className="flex flex-wrap gap-3 absolute top-5 right-5">
      <span aria-hidden>🌐</span>
      <ul className="flex flex-wrap gap-3">
        {locales.map((locale, index) => (
          <li
            key={locale.lang}
            className={`${lang === locale.lang && "font-bold"}`}
          >
            <PrismicNextLink
              href={locale.url + cleanPathname}
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
