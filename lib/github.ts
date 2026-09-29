const REPO = "maxbenschop/peekie";

export type LatestRelease = {
  version: string;
  tag: string;
  url: string;
  highlight: string;
};

const FALLBACK: LatestRelease = {
  version: "1.0.1",
  tag: "v1.0.1",
  url: `https://github.com/${REPO}/releases/latest`,
  highlight: "New app icon and menu bar icon",
};

function extractHighlight(body: string | null): string | null {
  if (!body) return null;

  const section = body.split(/^##\s*What's new/im)[1];
  if (!section) return null;

  const bullets = [...section.matchAll(/^- \*\*(.+?):?\*\*/gm)].map((m) => m[1].trim());
  if (bullets.length === 0) return null;

  const picked = bullets.slice(0, 2).map((b) => b.replace(/\.$/, ""));
  const [first, second] = picked;
  const sentence = second ? `${first} and ${second.charAt(0).toLowerCase()}${second.slice(1)}` : first;
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

export async function getLatestRelease(): Promise<LatestRelease> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return FALLBACK;

    const data = await res.json();
    const tag: string = data.tag_name ?? FALLBACK.tag;
    const version = tag.replace(/^v/i, "");
    const highlight = extractHighlight(data.body) ?? FALLBACK.highlight;

    return {
      version,
      tag,
      url: data.html_url ?? FALLBACK.url,
      highlight,
    };
  } catch {
    return FALLBACK;
  }
}
