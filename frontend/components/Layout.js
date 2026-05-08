import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen text-slate-100">
      <div className="fixed inset-0 -z-10 soft-grid opacity-20" />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <Navbar />
          <main className="flex-1 px-4 py-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
