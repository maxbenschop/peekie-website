// Regenerates .github/banner.png (the README banner) with next/og.
// Run with: node scripts/generate-banner.mjs

import { ImageResponse } from "next/og.js";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.join(import.meta.dirname, "..");

function h(type, props, ...children) {
  return { type, key: null, props: { ...props, children: children.flat() } };
}

async function loadFont(file) {
  return readFile(path.join(root, "assets/fonts", file));
}

const pills = ["Next.js", "TypeScript", "Vercel", "Live release data"];

async function main() {
  const [black, semiBold, regular, iconBuf] = await Promise.all([
    loadFont("Nunito-Black.ttf"),
    loadFont("Nunito-SemiBold.ttf"),
    loadFont("Nunito-Regular.ttf"),
    readFile(path.join(root, "assets/reference/app-icon.png")),
  ]);
  const iconSrc = `data:image/png;base64,${iconBuf.toString("base64")}`;

  const bokeh = [
    { top: 160, left: 2430, size: 92 },
    { top: 1040, left: 1616, size: 60 },
    { top: 1088, left: 2480, size: 128 },
    { top: 100, left: 1800, size: 40 },
  ].map((c, i) =>
    h(
      "div",
      {
        key: `bokeh-${i}`,
        style: {
          position: "absolute",
          top: c.top,
          left: c.left,
          width: c.size,
          height: c.size,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.14)",
          display: "flex",
        },
      }
    )
  );

  const chips = pills.map((p) =>
    h(
      "div",
      {
        key: p,
        style: {
          display: "flex",
          padding: "13px 22px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.22)",
          color: "rgba(255,255,255,0.9)",
          fontSize: 22,
          fontWeight: 600,
        },
      },
      p
    )
  );

  const tree = h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background:
          "radial-gradient(1300px 900px at 78% 22%, rgba(59,130,246,0.36), transparent 60%), radial-gradient(1000px 800px at 95% 62%, rgba(139,92,246,0.3), transparent 60%), radial-gradient(700px 600px at 60% 8%, rgba(255,159,10,0.14), transparent 60%), #14171e",
        fontFamily: "Nunito",
        overflow: "hidden",
      },
    },
    ...bokeh,
    h(
      "div",
      {
        style: {
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 0 0 176px",
          width: "62%",
          height: "100%",
        },
      },
      h("div", { style: { display: "flex", fontSize: 150, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" } }, "Peekie"),
      h(
        "div",
        { style: { display: "flex", marginTop: 4, fontSize: 40, fontWeight: 600, color: "rgba(255,255,255,0.78)" } },
        "A translucent scratchpad for your Mac."
      ),
      h(
        "div",
        { style: { display: "flex", marginTop: 6, fontSize: 27, fontWeight: 400, color: "rgba(255,255,255,0.5)" } },
        "The marketing site, built with Next.js."
      ),
      h("div", { style: { display: "flex", gap: 12, marginTop: 46 } }, ...chips),
      h(
        "div",
        { style: { display: "flex", marginTop: 46, fontSize: 22, fontWeight: 600, color: "rgba(255,255,255,0.42)" } },
        "Open source · MIT · peekie.app"
      )
    ),
    h(
      "div",
      {
        style: {
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "38%",
          height: "100%",
        },
      },
      h(
        "div",
        { style: { display: "flex", padding: 160, filter: "drop-shadow(0 40px 70px rgba(0,0,0,0.55))" } },
        h("img", { src: iconSrc, width: 860, height: 860, style: { display: "flex" } })
      )
    )
  );

  const response = new ImageResponse(tree, {
    width: 2560,
    height: 1280,
    fonts: [
      { name: "Nunito", data: black, weight: 900, style: "normal" },
      { name: "Nunito", data: semiBold, weight: 600, style: "normal" },
      { name: "Nunito", data: regular, weight: 400, style: "normal" },
    ],
  });

  const buffer = Buffer.from(await response.arrayBuffer());
  const outPath = path.join(root, ".github/banner.png");
  await writeFile(outPath, buffer);
  console.log(`Wrote ${outPath} (${buffer.length} bytes)`);
}

main();
