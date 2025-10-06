import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SaaS Starter',
  description: 'A minimal SaaS starter template with Next.js, Tailwind CSS, and TypeScript',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
