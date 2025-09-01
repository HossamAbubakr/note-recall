import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "Note Recall AI",
  description: "Your AI-powered note-taking assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
