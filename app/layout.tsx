import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "iTechSmart Core | Autonomous IT Operations (UAIO) — AI-Powered Automation",
  description:
    "iTechSmart UAIO platform autonomously detects, fixes, and cryptographically proves every IT action. Reduce MTTR by 85%. Self-healing infrastructure for enterprise, healthcare, government, and MSPs. 131 containers, zero human intervention.",
  alternates: {
    canonical: "https://www.getitechsmart.com",
  },
  keywords: [
    "autonomous IT operations", "UAIO", "AIOps", "ITSM", "IT automation",
    "self-healing infrastructure", "cloud-native IT automation",
    "AI IT operations management", "real-time IT anomaly detection",
    "IT incident management", "cryptographic proof", "ProofLink",
    "DevOps automation", "enterprise IT management", "healthcare IT",
    "government IT", "MSP automation", "SDVOSB",
  ],
  icons: {
    icon: "/itechsmart_icon.png",
    apple: "/itechsmart_icon.png",
  },
  openGraph: {
    title: "iTechSmart | Autonomous IT Operations (UAIO) Platform",
    description: "AI-powered self-healing infrastructure with cryptographic proof of every action. Detect, fix, prove — automatically.",
    url: "https://www.getitechsmart.com",
    siteName: "iTechSmart",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iTechSmart | UAIO Platform — Self-Healing IT Operations",
    description: "Autonomous IT operations with cryptographic proof. 131 containers, zero human intervention. Reduce MTTR by 85%.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "iTechSmart Inc.",
          "description": "Unified Autonomous IT Operations \u2014 detect, fix, and cryptographically prove infrastructure issue resolution in under 20 seconds.",
          "url": "https://itechsmart.dev",
          "logo": "https://itechsmart.dev/itechsmart_icon.png",
          "foundingDate": "2022",
          "areaServed": "US",
          "slogan": "Stop Triaging. Start Executing.",
          "sameAs": [
            "https://www.linkedin.com/company/itechsmart.dev",
            "https://x.com/itechsmartdev",
            "https://youtube.com/@itechsmart-inc",
            "https://www.instagram.com/itechsmartdev/",
            "https://www.facebook.com/p/Itechsmartdev-61578925821334/",
            "https://www.tiktok.com/@itechsmartdev",
            "https://www.crunchbase.com/organization/itechsmart",
            "https://www.f6s.com/itechsmart-inc",
            "https://www.g2.com/products/itechsmart",
            "https://app.qwoted.com/sources/djuane-jackson"
          ],
          "memberOf": {"@type": "Organization", "name": "NVIDIA Inception Program"},
          "award": "F6S #6 Globally out of 2M+ AI startups",
          "identifier": [
            {"@type": "PropertyValue", "name": "CAGE", "value": "172W2"},
            {"@type": "PropertyValue", "name": "UEI", "value": "ZCPFX4N86G36"}
          ],
          "contactPoint": {"@type": "ContactPoint", "email": "info@itechsmart.dev", "contactType": "sales"}
        })}} />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#050510", color: "#e8e0ff" }}>
        {children}
      </body>
    </html>
  );
}
