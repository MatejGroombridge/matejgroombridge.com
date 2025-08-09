// Using untyped load to avoid dependency on generated $types during initial sync
export const load = async ({ fetch }: any) => {
  // fetch list of slugs
  const slugsRes = await fetch('/booknotes/book-slugs.json');
  if (!slugsRes.ok) {
    return { slugs: [], books: [] };
  }
  const slugs: string[] = await slugsRes.json();

  // fetch book data in parallel
  const books = await Promise.all(
    slugs.map(async (slug) => {
      try {
        const res = await fetch(`/booknotes/book-data/${slug}.json`);
        if (!res.ok) return { slug, missing: true } as any;
        const data = await res.json();
        return data;
      } catch {
        return { slug, missing: true } as any;
      }
    })
  );

  return { slugs, books };
};
