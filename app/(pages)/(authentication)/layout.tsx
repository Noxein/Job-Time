export default function SomeLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <main className="w-full h-screen grid justify-center content-center bg-blue-500 text-white">
          {children}
        </main>

    );
  }
  