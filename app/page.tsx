import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import AppearanceSection from "@/components/AppearanceSection";
import ShortcutsSection from "@/components/ShortcutsSection";
import PrivacySection from "@/components/PrivacySection";
import FaqSection from "@/components/FaqSection";
import DownloadSection from "@/components/DownloadSection";
import RevealObserver from "@/components/RevealObserver";
import { getLatestRelease } from "@/lib/github";

export default async function Home() {
  const release = await getLatestRelease();

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        background:
          "radial-gradient(900px 600px at 85% -10%, rgba(92,84,190,0.30), transparent 60%), radial-gradient(700px 500px at 10% 30%, rgba(40,70,130,0.18), transparent 60%), #0d0f14",
      }}
    >
      <RevealObserver />
      <Nav />
      <Hero release={release} />
      <FeaturesSection />
      <AppearanceSection />
      <ShortcutsSection />
      <PrivacySection />
      <FaqSection />
      <DownloadSection release={release} />
    </div>
  );
}
