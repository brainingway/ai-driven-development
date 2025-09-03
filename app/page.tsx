import Header from '@/components/layout/Header';
import Feed from '@/components/Feed';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Feed />
    </main>
  );
}
