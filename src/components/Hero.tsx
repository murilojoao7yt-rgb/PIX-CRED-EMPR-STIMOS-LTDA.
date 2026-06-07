export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-900/30 py-16 sm:py-24 lg:py-32 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2 flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 text-xs font-bold rounded-full uppercase tracking-widest transition-colors">
              Aprovação em 2 minutos
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter text-slate-900 dark:text-white uppercase transition-colors">
              Crédito<br/><span className="text-blue-600 dark:text-blue-400">Agora.</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-md leading-relaxed mx-auto md:mx-0 transition-colors">
              Empréstimo pessoal rápido, 100% online e sem letras miúdas. Dinheiro na conta em instantes via PIX.
            </p>
          </div>

          <div className="flex gap-6 md:gap-12 items-center justify-center md:justify-start">
            <div className="space-y-1">
              <p className="text-3xl font-black text-slate-900 dark:text-white transition-colors">0.99%</p>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider transition-colors">Taxa Mínima</p>
            </div>
            <div className="h-12 w-px bg-slate-200 dark:bg-slate-800 transition-colors"></div>
            <div className="space-y-1">
              <p className="text-3xl font-black text-slate-900 dark:text-white transition-colors">R$ 900 MIL</p>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider transition-colors">Limite Máximo</p>
            </div>
            <div className="h-12 w-px bg-slate-200 dark:bg-slate-800 transition-colors"></div>
            <div className="space-y-1 text-green-600 dark:text-green-400">
              <p className="text-3xl font-black">REAL</p>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider transition-colors">Consulta CPF</p>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <a href="#consulta" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-black rounded-xl shadow-lg shadow-blue-200 dark:shadow-none hover:bg-blue-700 active:scale-[0.98] transition-all uppercase tracking-widest text-sm text-center">
              Consultar CPF
            </a>
            <a href="#simulador" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-black rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-slate-900 dark:hover:border-slate-100 active:scale-[0.98] transition-all uppercase tracking-widest text-sm text-center">
              Fazer Simulação
            </a>
          </div>

          <div className="pt-4 flex items-center justify-center md:justify-start gap-4 text-slate-400 dark:text-slate-500 transition-colors">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
            <span className="text-xs font-semibold uppercase tracking-widest text-left">Autorizado pelo Banco Central do Brasil</span>
          </div>
        </div>
        <div className="md:w-1/2 relative w-full max-w-lg mx-auto">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-30 animate-pulse"></div>
          <div className="relative bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-gray-150 dark:border-slate-800 transition-colors duration-300">
             <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=600" alt="Pessoa feliz usando o celular" className="rounded-xl object-cover w-full h-[300px] mb-6" />
             <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-950/40 flex items-center justify-center shrink-0 transition-colors">
                     <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                   </div>
                   <div>
                     <h4 className="font-semibold text-gray-900 dark:text-slate-100 transition-colors">Crédito Aprovado</h4>
                     <p className="text-sm text-gray-500 dark:text-slate-400 transition-colors">R$ 5.000,00 liberados na sua conta.</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
