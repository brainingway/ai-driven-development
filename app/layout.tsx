import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Art Gallery - 커뮤니티 기반 AI 이미지 생성 서비스",
  description: "AI와 함께 창작하는 새로운 경험을 제공하는 커뮤니티 기반 이미지 생성 서비스입니다.",
  keywords: ["AI", "이미지 생성", "커뮤니티", "아트", "창작"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
