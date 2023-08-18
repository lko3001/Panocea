import Navbar from "@/components/layout/Navbar";
import Shortcut from "@/components/layout/Shortcut";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="w-full h-0 grow pb-12">
        <Shortcut />
        {children}
      </main>
    </div>
  );
}
