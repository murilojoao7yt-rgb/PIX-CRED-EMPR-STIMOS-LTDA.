import React, { useState } from "react";
import axios from "axios";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import ContractingModal from "./ContractingModal";

export default function CPFConsultation() {
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const getSimulatedAmount = (): number => {
    const val = localStorage.getItem("simulated_amount");
    return val ? parseInt(val) : 5000;
  };

  const getSimulatedInstallments = (): number => {
    const val = localStorage.getItem("simulated_installments");
    return val ? parseInt(val) : 12;
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(formatCPF(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cpf.length < 14) return;
    
    setLoading(true);
    setResult(null);
    
    try {
      const res = await axios.post("/api/check-cpf", { cpf });
      setResult(res.data);
    } catch (e: any) {
      setResult({ status: "error", message: e.response?.data?.message || "Erro ao consultar CPF. Tente novamente." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="consulta" className="py-24 bg-slate-50 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter uppercase transition-colors">Consulta de Crédito</h2>
        <p className="text-xl text-slate-500 dark:text-slate-400 font-medium mb-12 transition-colors">
          Informe seu CPF para verificarmos instantaneamente suas taxas personalizadas e limites pré-aprovados. Não afeta seu score.
        </p>

        <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800/80 transition-colors duration-300">
          <form onSubmit={handleSubmit} className="space-y-8 text-left">
              <div className="text-center">
                <label htmlFor="cpf" className="block text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-4 transition-colors">Digite seu CPF</label>
                <input
                  id="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={handleCpfChange}
                  maxLength={14}
                  required
                  className="w-full px-6 py-5 bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-xl font-black text-3xl text-slate-900 dark:text-white text-center focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-950/50 transition-all placeholder:text-slate-200 dark:placeholder:text-slate-800 tracking-widest"
                />
              </div>
              <button
                type="submit"
                disabled={loading || cpf.length < 14}
                className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white font-black text-xl rounded-xl shadow-lg shadow-blue-200 dark:shadow-none active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
              >
                {loading ? <><Loader2 className="animate-spin w-6 h-6"/> Consultando...</> : "VERIFICAR MEU LIMITE"}
              </button>
          </form>

          {result && (
            <div className={["mt-12 p-8 rounded-3xl text-left border-2 transition-all duration-300",
               result.status === 'approved' ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900/30' :
               result.status === 'denied' ? 'bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-900/30' :
               'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900/30'
            ].join(" ")}>
                <div className="flex items-start gap-6">
                   {result.status === 'approved' ? (
                      <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400 shrink-0 mt-1" />
                   ) : (
                      <AlertCircle className={["w-10 h-10 shrink-0 mt-1", result.status === 'denied' ? 'text-orange-500 dark:text-orange-400' : 'text-red-500 dark:text-red-400'].join(" ")}/>
                   )}
                   
                   <div className="flex-1">
                     <h3 className={["text-2xl font-black mb-2 uppercase tracking-tight transition-colors",
                        result.status === 'approved' ? 'text-green-800 dark:text-green-400' :
                        result.status === 'denied' ? 'text-orange-800 dark:text-orange-400' :
                        'text-red-800 dark:text-red-400'
                     ].join(" ")}>
                       {result.status === 'approved' ? 'Parabéns!' : result.status === 'denied' ? 'Atenção' : 'Erro'}
                     </h3>
                     <p className={["mb-6 font-medium transition-colors",
                        result.status === 'approved' ? 'text-green-700 dark:text-green-300' :
                        result.status === 'denied' ? 'text-orange-700 dark:text-orange-300' :
                        'text-red-700 dark:text-red-300'
                     ].join(" ")}>{result.message}</p>
                     
                     {result.status === 'approved' && result.limit > 0 && (
                       <div className="bg-white dark:bg-slate-950 px-6 py-4 rounded-xl border-2 border-green-100 dark:border-green-900/20 mb-6 inline-block transition-colors">
                          <span className="block text-xs uppercase tracking-widest text-green-600 dark:text-green-400 font-bold mb-1">Limite Pré-Aprovado</span>
                          <span className="block text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                            {Number(result.limit).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </span>
                       </div>
                     )}

                     {result.status === 'approved' && (
                        <button 
                          onClick={() => setModalOpen(true)}
                          className="w-full py-5 bg-green-600 text-white font-black text-xl rounded-xl shadow-lg shadow-green-200 dark:shadow-none hover:bg-green-700 active:scale-[0.98] transition-all uppercase tracking-wider cursor-pointer"
                        >
                          Continuar Contratação
                        </button>
                     )}
                   </div>
                </div>
            </div>
          )}
        </div>
        
        <p className="mt-6 text-xs text-gray-400 dark:text-slate-500 transition-colors">
          Seus dados estão seguros. Utilizamos criptografia de ponta a ponta e seguimos todas as normas da LGPD.
        </p>
      </div>

      {result && result.status === 'approved' && (
        <ContractingModal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
          approvedLimit={result.limit} 
          cpf={cpf}
          initialAmount={getSimulatedAmount()}
          initialInstallments={getSimulatedInstallments()}
        />
      )}
    </section>
  );
}
