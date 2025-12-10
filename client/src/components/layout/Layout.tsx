import { Link, useLocation } from "wouter";
import { Home, Stethoscope, Pill, Heart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/doctor", label: "Book Doctor", icon: Stethoscope },
    { href: "/medicine", label: "Order Medicine", icon: Pill },
    { href: "/tips", label: "Health Tips", icon: Heart },
    { href: "/ai-helper", label: "AI Helper", icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl md:text-3xl font-bold cursor-pointer hover:opacity-90 transition-opacity">
              Senior Healthcare Helpdesk
            </h1>
          </Link>
          {/* Mobile Menu Button Placeholder - keeping it simple for now as requested "simple navigation" */}
        </div>
        
        {/* Main Navigation Bar */}
        <nav className="bg-white border-b border-slate-200 overflow-x-auto">
          <div className="container mx-auto px-4">
            <div className="flex space-x-1 min-w-max">
              {navItems.map((item) => {
                const isActive = location === item.href;
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <div className={cn(
                      "flex items-center gap-2 px-4 py-4 md:py-5 text-lg md:text-xl font-medium transition-colors border-b-4 whitespace-nowrap cursor-pointer",
                      isActive 
                        ? "border-primary text-primary bg-blue-50" 
                        : "border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}>
                      <Icon className={cn("w-6 h-6 md:w-7 md:h-7", isActive ? "stroke-2" : "stroke-[1.5]")} />
                      {item.label}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        {children}
      </main>

      <footer className="bg-slate-900 text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg opacity-80">© 2024 Senior Healthcare Helpdesk – India</p>
          <p className="text-base opacity-60 mt-2">Simple • Secure • Senior-Friendly</p>
        </div>
      </footer>
    </div>
  );
}
