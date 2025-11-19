import "./globals.css";
import Navbar from "./_components/Navbar";
import { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import AlertBox from "./_components/AlertBox";

const domain = process.env.NEXT_PUBLIC_DOMAIN || "arcade-lab.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${domain}`),
  title: {
    default: "Arcade Lab | Denes Beck - Software Engineer",
    template: "%s | Arcade Lab",
  },
  description: "Personal portfolio and technical blog of Denes Beck, a Software Engineer specializing in full-stack development, DevOps, and cloud infrastructure.",
  keywords: [
    "Denes Beck",
    "Software Engineer",
    "Full Stack Developer",
    "DevOps",
    "AWS",
    "Next.js",
    "React",
    "TypeScript",
    "Golang",
    "Kubernetes",
    "Terraform",
    "Portfolio",
    "Technical Blog",
  ],
  authors: [{ name: "Denes Beck", url: `https://${domain}` }],
  creator: "Denes Beck",
  publisher: "Denes Beck",
  icons: {
    icon: "/logo/arcade_lab_logo_64.png",
    apple: "/logo/arcade_lab_logo_120.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `https://${domain}`,
    siteName: "Arcade Lab",
    title: "Arcade Lab | Denes Beck - Software Engineer",
    description: "Personal portfolio and technical blog of Denes Beck, a Software Engineer specializing in full-stack development, DevOps, and cloud infrastructure.",
    images: [
      {
        url: `/logo/arcade_lab_logo.png`,
        width: 1200,
        height: 630,
        alt: "Arcade Lab Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arcade Lab | Denes Beck - Software Engineer",
    description: "Personal portfolio and technical blog of Denes Beck, a Software Engineer specializing in full-stack development, DevOps, and cloud infrastructure.",
    creator: "@DenesBeck",
    images: [`/logo/arcade_lab_logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Denes Beck",
    url: `https://${domain}`,
    image: `https://${domain}/logo/arcade_lab_logo.png`,
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "SEON",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Budapest",
      addressCountry: "HU",
    },
    sameAs: [
      "https://github.com/denesbeck",
      "https://www.linkedin.com/in/denesbeck",
      "https://x.com/DenesBeck",
      "https://www.credly.com/users/denesbeck",
    ],
    knowsAbout: [
      "Software Engineering",
      "Full Stack Development",
      "DevOps",
      "Cloud Computing",
      "AWS",
      "Next.js",
      "React",
      "TypeScript",
      "Golang",
      "Kubernetes",
      "Docker",
      "Terraform",
      "CI/CD",
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="text-text-dark font-[DepartureMono]">
        <SpeedInsights />
        <Analytics />
        <div className="flex flex-col">
          <div className="fixed top-0 w-dvw h-dvh from-dark-1400 to-dark-1400 via-dark-900 bg-linear-to-r" />
          <div
            style={{
              position: "fixed",
              top: 0,
              zIndex: 10,
              width: "100dvw",
              height: "100dvh",
              backgroundSize: "2rem 2rem",
              backgroundImage:
                "linear-gradient(to right, rgb(26, 26, 36, 0.2) 2px, transparent 2px),linear-gradient(to bottom, rgb(26, 26, 36, 0.2) 2px, transparent 2px)",
            }}
          />
          <div className="flex z-10 flex-col min-h-dvh">
            <Navbar />
            <AlertBox context="global" />
            <div className="flex flex-1 mt-[100px]">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
