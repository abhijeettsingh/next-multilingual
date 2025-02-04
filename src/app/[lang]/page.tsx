import { createClient } from "@/prismicio";
// import { LanguageSwitcher } from "@/components/LanguageSwitcher";
// import { getLocales } from "@/utils/getLocale";
import Link from "next/link";

interface HomeProps {
  params: Promise<{ lang: string }>;
}

export default async function Home(props: HomeProps) {
  const { lang } = await props.params;
  const client = createClient();
  const homePage = await client.getSingle("homepage", { lang });

  // const locales = await getLocales(homePage);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>{homePage.data.title}</h1>
      {/* <LanguageSwitcher locales={locales} /> */}
      <Link href={`${"/" + lang}/blog-2`}>blog-2</Link>
    </div>
  );
}
