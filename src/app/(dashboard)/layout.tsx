import NavigationBar from "@/components/navigation/NavigationBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavigationBar />
      <main className="flex h-full flex-col items-center justify-between py-10">
        {children}
      </main>
    </div>
  );
}
