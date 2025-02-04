import { createClient } from "@/prismicio";
// import { getLocales } from "@/utils/getLocale";
// import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Image from "next/image";

interface BlogPostProps {
  params: Promise<{ lang: string; uid: string }>;
}

export default async function BlogPost(props: BlogPostProps) {
  const { lang, uid } = await props.params;
  const client = createClient();
  const blogPage = await client.getByUID("blog", uid, {
    lang: lang,
  });

  // const locales = await getLocales(blogPage);

  return (
    <>
      {/* <LanguageSwitcher locales={locales} /> */}
      <div className="p-5 flex gap-5">
        <h2>{blogPage.data.blog_title}</h2>
        <Image
          src={blogPage.data.blog_image.url || ""}
          alt={blogPage.data.blog_image.alt || "Blog Image"}
          width={500}
          height={500}
        />
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const client = createClient();

  // Fetching all blog pages in all languages
  const pages = await client.getAllByType("blog", {
    lang: "*",
  });

  return pages.map((page) => ({ uid: page.uid, lang: page.lang }));
}
