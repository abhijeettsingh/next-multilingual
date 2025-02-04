// ./src/utils/getLocales.ts

import { Content } from "@prismicio/client";
import { createClient } from "@/prismicio";

export async function getLocales(doc?: Content.AllDocumentTypes) {
  const client = createClient();
  const repository = await client.getRepository();

  if (!doc) {
    // Return all repository languages if no document is provided
    return repository.languages.map((lang) => {
      return {
        lang: lang.id,
        url: "/" + lang.id,
        lang_name: lang.name,
      };
    });
  }

  const altDocs = doc.alternate_languages.length
    ? await client.getAllByIDs(
        doc.alternate_languages.map((altLang) => altLang.id),
        {
          lang: "*",
          // Exclude all fields to speed up the query.
          fetch: `${doc.type}.__nonexistent-field__`,
        }
      )
    : [];

  return [doc, ...altDocs].map((page) => {
    const lang = repository.languages.find((l) => l.id === page.lang);

    return {
      lang: lang?.id || "",
      url: page?.url || "",
      lang_name: lang?.name || "",
    };
  });
}
