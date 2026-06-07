import React, { useState, useEffect } from "react";
import axios from "axios";

export default function LoanSimulator() {
  const [amount, setAmount] = useState<number>(150000);
  const [installments, setInstallments] = useState<number>(12);
  const [simulation, setSimulation] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const calculate = async () => {
      setLoading(true);
      try {
         const res = await axios.post("/api/simulate-loan", { amount, installments });
         setSimulation(res.data);
      } catch (e) {
         console.error("Simulation error", e);
      } finally {
         setLoading(false);
      }
    };
    
    // Auto-calculate with a simple debounce pattern to avoid too many requests
    const timeoutId = setTimeout(() => {
       calculate();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [amount, installments]);

  useEffect(() => {
    localStorage.setItem("simulated_amount", amount.toString());
    localStorage.setItem("simulated_installments", installments.toString());
  }, [amount, installments]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  }

  const formatCurrency = (val: number | string) => {
    return Number(val).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  return (
    <section id="simulador" className="py-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-12 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter uppercase transition-colors">Simule o seu empréstimo</h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto transition-colors">Ajuste os valores abaixo para encontrar a parcela que cabe no seu bolso. Taxas transparentes e sem surpresas.</p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/40 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-xl grid md:grid-cols-5 gap-12 items-center transition-colors duration-300">
          <div className="md:col-span-3 space-y-12">
            
            <div>
              <label className="flex justify-between items-end mb-4">
                <span className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider transition-colors">De quanto você precisa?</span>
                <span className="text-3xl font-black text-blue-600 dark:text-blue-400 transition-colors">{formatCurrency(amount)}</span>
              </label>
              <input 
                type="range" 
                 min="5000" 
                 max="900000" 
                 step="5000" 
                 value={amount} 
                 onChange={handleAmountChange}
                 className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-600 dark:accent-blue-400 transition-all"
              />
              <div className="flex justify-between text-xs font-bold text-slate-400 dark:text-slate-500 mt-3 uppercase tracking-widest transition-colors">
                <span>R$ 5.000</span>
                <span>R$ 900.000</span>
              </div>
            </div>

            <div>
              <label className="flex justify-between items-end mb-4">
                <span className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider transition-colors">Em quantas vezes?</span>
                <span className="text-3xl font-black text-slate-900 dark:text-white transition-colors">{installments}x</span>
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[2, 3, 6, 12, 24, 36].map((num) => {
                  const isActive = installments === num;
                  const buttonClass = isActive
                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:border-slate-500';
                  
                  return (
                    <button
                      key={num}
                      onClick={() => setInstallments(num)}
                      className={["py-3 rounded-xl border-2 font-black text-lg transition-colors cursor-pointer", buttonClass].join(" ")}
                    >
                      {num}x
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-850 shadow-sm flex flex-col justify-center space-y-8 transition-colors duration-300">
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Valor da Parcela Estimada</p>
              <div className="text-5xl font-black text-slate-900 dark:text-white transition-colors">
                {loading ? <span className="animate-pulse text-slate-300 dark:text-slate-700">...</span> : simulation ? formatCurrency(simulation.monthlyPayment) : '---'}
              </div>
            </div>

            <div className="space-y-4 text-sm font-semibold text-slate-600 dark:text-slate-400 transition-colors">
                 <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <span>Total a pagar</span>
                    <span className="font-black text-slate-900 dark:text-white transition-colors">{simulation ? formatCurrency(simulation.totalPayment) : '---'}</span>
                 </div>
                 <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <span>Taxa de juros (mês)</span>
                    <span className="font-black text-slate-900 dark:text-white transition-colors">{simulation ? simulation.interestRate + '%' : '---'}</span>
                 </div>
            </div>

            <div className="pt-4">
              <a href="#consulta" className="block w-full py-5 text-center bg-blue-600 hover:bg-blue-700 text-white font-black text-xl rounded-xl shadow-lg shadow-blue-200 dark:shadow-none active:scale-[0.98] transition-all uppercase">
                SOLICITAR AGORA
              </a>
              <p className="mt-4 text-[10px] text-center text-slate-400 dark:text-slate-500 leading-tight px-2 uppercase font-bold tracking-wider transition-colors">
                Ao continuar, você concorda com nossos termos e autoriza a consulta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
