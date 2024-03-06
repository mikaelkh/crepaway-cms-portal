import Sidebar from "@/components/sidebar/Sidebar";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex h-full flex-col items-center justify-between">
        {children}
      </main>
    </div>
  );
}
