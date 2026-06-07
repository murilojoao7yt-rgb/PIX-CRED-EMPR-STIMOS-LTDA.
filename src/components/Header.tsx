import { Wallet, Sun, Moon } from "lucide-react";

interface HeaderProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export default function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/90 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-12 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black">
            <Wallet className="h-4 w-4" />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase transition-colors">
            Cred<span className="text-blue-600 dark:text-blue-400">Pix</span> Empréstimos
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500 dark:text-slate-400">
          <a href="#como-funciona" className="hover:text-slate-900 dark:hover:text-white transition-colors">Como funciona</a>
          <a href="#painel-animado" className="hover:text-slate-900 dark:hover:text-white transition-colors">Painel Live</a>
          <a href="#simulador" className="hover:text-slate-900 dark:hover:text-white transition-colors">Simulador</a>
          <a href="#consulta" className="hover:text-slate-900 dark:hover:text-white transition-colors">Quero meu crédito</a>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Theme switcher toggle button */}
          <button
            onClick={onToggleTheme}
            id="theme-toggler"
            aria-label="Alternar tema"
            className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 cursor-pointer"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-500" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" />
            )}
          </button>

          <button className="hidden md:block px-6 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-bold rounded-full hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors cursor-pointer">
            Área do Cliente
          </button>

          <button className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
