import { cookies, headers } from "next/headers";

import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE, type Locale } from "./i18n";

/**
 * Server-only locale resolution (reads next/headers, so it must never be
 * imported by a client component). An explicit cookie set by the language
 * toggle wins; otherwise the browser's Accept-Language first preference;
 * otherwise the default (English).
 */
export function resolveLocale(): Locale {
  const cookieLocale = cookies().get(LOCALE_COOKIE)?.value;
  if (isLocale(cookieLocale)) return cookieLocale;

  const accept = headers().get("accept-language")?.toLowerCase() ?? "";
  const first = accept.split(",")[0]?.split(";")[0]?.trim() ?? "";
  return first.startsWith("zh") ? "zh" : DEFAULT_LOCALE;
}
