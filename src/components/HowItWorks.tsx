import { Clock, MousePointerClick, ShieldCheck } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <MousePointerClick className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "1. Faça a simulação",
      description: "Escolha o valor e número de parcelas desejado. É rápido e sem compromisso."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "2. Análise em tempo real",
      description: "Nossa inteligência artificial analisa seu perfil de crédito em segundos."
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "3. Dinheiro na conta",
      description: "Após a aprovação, o dinheiro cai na sua conta em até 24 horas via PIX."
    }
  ];

  return (
    <section id="como-funciona" className="py-32 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-12 max-w-5xl">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter uppercase transition-colors">Como Funciona</h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto transition-colors">Um processo moderno, 100% digital e desenhado para facilitar a sua vida num momento em que você precisa.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative">
           {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-0.5 bg-slate-100 dark:bg-slate-800 z-0 transition-colors"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center px-4">
              <div className="w-24 h-24 rounded-3xl bg-blue-50 dark:bg-slate-905 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950/20 flex items-center justify-center mb-8 border border-blue-100 dark:border-slate-850 dark:border-indigo-900/30 shadow-sm transition-all duration-300">
                 {step.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight transition-colors">{step.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-[280px] transition-colors">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
