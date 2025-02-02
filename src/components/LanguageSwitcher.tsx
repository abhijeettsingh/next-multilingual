// ./src/components/LanguageSwitcher.tsx

import { PrismicNextLink } from "@prismicio/next";

interface LanguageSwitcherProps {
  locales: {
    lang: string;
    lang_name: string;
    url: string;
  }[];
}

const localeLabels = {
  "en-us": "EN",
  "fr-fr": "FR",
};

export const LanguageSwitcher = ({ locales }: LanguageSwitcherProps) => {
  console.log("locales", locales);
  return (
    <div className="flex flex-wrap gap-3 absolute top-5 right-5">
      <span aria-hidden>🌐</span>
      <ul className="flex flex-wrap gap-3">
        {locales.map((locale) => (
          <li key={locale.lang} className="first:font-semibold">
            <PrismicNextLink
              href={locale.url}
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
