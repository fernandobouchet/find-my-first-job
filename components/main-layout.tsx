import { Footer } from "./footer";
import { Header } from "./header";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export { MainLayout };
