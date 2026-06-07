export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-auto transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>© {new Date().getFullYear()} CREDPIX SOLUÇÕES FINANCEIRAS LTDA</div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center text-center md:text-left">
          <span>CNPJ: 12.345.678/0001-90</span>
          <span>POLÍTICA DE PRIVACIDADE</span>
          <span>SAC: 0800 123 4567</span>
        </div>
      </div>
    </footer>
  );
}
