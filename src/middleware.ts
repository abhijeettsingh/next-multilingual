// ./src/middleware.ts

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/prismicio";

export async function middleware(request: NextRequest) {
  const client = createClient();
  const repository = await client.getRepository();

  const locales = repository.languages.map((lang) => lang.id);
  const defaultLocale = locales[0];

  // Extract the Accept-Language header from the request
  const acceptLanguage = request.headers.get("accept-language");
  console.log("accept-language:", acceptLanguage);

  const userLocale = acceptLanguage
    ? acceptLanguage.split(",")[0].split(";")[0]?.toLowerCase()
    : defaultLocale;

  // Find the best match from supported locales
  const matchedLocale = locales.includes(userLocale)
    ? userLocale
    : defaultLocale;

  // Get the current pathname
  const { pathname } = request.nextUrl;

  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect to the appropriate locale if the locale is missing
  if (pathnameIsMissingLocale && matchedLocale !== defaultLocale) {
    return NextResponse.redirect(
      new URL(`/${matchedLocale}${pathname}`, request.url)
    );
  }

  // If locale is already in the pathname or user preference is defaultLocale , continue
  return NextResponse.next();
}

export const config = {
  // Don’t change the URL of Next.js assets starting with _next
  matcher: ["/((?!_next).*)"],
};
