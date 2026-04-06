import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get iTechSmart | Stop Fighting IT Fires. Start Preventing Them.",
  description:
    "iTechSmart uses AI to detect, fix, and prove IT issues automatically — before they impact your business. Reduce MTTR by 85%. Full audit-proof receipts for every action.",
  keywords: "autonomous IT operations, UAIO, AIOps, ITSM, IT automation, self-healing infrastructure",
  icons: {
    icon: "/itechsmart_icon.png",
    apple: "/itechsmart_icon.png",
  },
  openGraph: {
    title: "Get iTechSmart | Autonomous IT Operations",
    description: "Stop fighting IT fires. Detect, fix, and prove issues automatically.",
    url: "https://getitechsmart.com",
    siteName: "iTechSmart",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get iTechSmart | Autonomous IT Operations",
    description: "Stop fighting IT fires. Detect, fix, and prove issues automatically.",
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
      </head>
      <body style={{ margin: 0, padding: 0, background: "#050510", color: "#e8e0ff" }}>
        {children}
      </body>
    </html>
  );
}
