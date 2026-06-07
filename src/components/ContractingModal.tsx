import { useState, useEffect } from "react";
import axios from "axios";
import { Check, X, Shield, Lock, CreditCard, ChevronRight, Sparkles, Loader2, Landmark } from "lucide-react";

interface ContractingModalProps {
  isOpen: boolean;
  onClose: () => void;
  approvedLimit: number;
  cpf: string;
  initialAmount: number;
  initialInstallments: number;
}

export default function ContractingModal({
  isOpen,
  onClose,
  approvedLimit,
  cpf,
  initialAmount,
  initialInstallments,
}: ContractingModalProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1 Form Data
  const [amount, setAmount] = useState(Math.min(initialAmount, approvedLimit));
  const [installments, setInstallments] = useState(initialInstallments);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Step 2 Form Data
  const [pixType, setPixType] = useState("cpf");
  const [pixKey, setPixKey] = useState("");
  const [bankName, setBankName] = useState("");

  // Step 3 Form Data
  const [signature, setSignature] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Step 4 Simulation/Receipt data
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");
  const [receipt, setReceipt] = useState<any>(null);

  // Sync state if initial simulation value is higher than approved limit
  useEffect(() => {
    if (isOpen) {
      setAmount(Math.min(initialAmount, approvedLimit));
      setInstallments(initialInstallments);
      // Auto-fill PIX Key with CPF if selected
      if (pixType === "cpf") {
        setPixKey(cpf);
      }
    }
  }, [isOpen, initialAmount, approvedLimit, cpf, initialInstallments]);

  // Autofill CPF PIX
  useEffect(() => {
    if (pixType === "cpf") {
      setPixKey(cpf);
    } else {
      setPixKey("");
    }
  }, [pixType, cpf]);

  if (!isOpen) return null;

  const handleNextStep = () => {
    setError("");
    if (step === 1) {
      if (!name.trim() || !email.trim() || !phone.trim()) {
        setError("Por favor, preencha todos os campos do seu perfil.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!pixKey.trim() || !bankName.trim()) {
        setError("Por favor, informe sua Chave PIX e o Banco de destino.");
        return;
      }
      setStep(3);
    }
  };

  const handleBackStep = () => {
    setError("");
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSignContract = async () => {
    setError("");
    if (!agreeTerms) {
      setError("Você precisa concordar com as cláusulas contratuais.");
      return;
    }
    if (signature.trim().toLowerCase() !== name.trim().toLowerCase()) {
      setError("A assinatura digital deve coincidir exatamente com o seu Nome Completo preenchido.");
      return;
    }

    setStep(4);
    setLoading(true);
    setProgress(5);
    setProgressText("Iniciando emissão do contrato digital...");

    // Start a progress simulation for transfer
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        const next = prev + 15;
        if (next < 30) setProgressText("Validando assinatura com criptografia de ponta a ponta...");
        else if (next < 55) setProgressText("Registrando Cédula de Crédito Bancário no Banco Central...");
        else if (next < 75) setProgressText("Emitindo TED/PIX via correspondente bancário digital...");
        else if (next < 95) setProgressText("Aguardando confirmação de liquidação bancária...");
        else setProgressText("Dinheiro transferido com sucesso!");

        return next > 100 ? 100 : next;
      });
    }, 450);

    try {
      const res = await axios.post("/api/finalize-contract", {
        name,
        email,
        phone,
        pixType,
        pixKey,
        bankName,
        amount,
        installments,
        cpf,
      });

      // Let the progress complete smoothly for premium feedback
      setTimeout(() => {
        setReceipt(res.data);
        setLoading(false);
      }, 3500);

    } catch (e: any) {
      clearInterval(interval);
      setError(e.response?.data?.error || "Ocorreu um erro ao emitir o contrato. Tente novamente.");
      setStep(3);
      setLoading(false);
    }
  };

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const banks = [
    "Itaú Unibanco S.A.", "Banco do Brasil S.A.", "Banco Bradesco S.A.", 
    "Caixa Econômica Federal", "Banco Santander (Brasil) S.A.", 
    "Nu Pagamentos S.A. (Nubank)", "Banco Inter S.A.", "C6 Bank", "PicPay"
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col relative max-h-[90vh] transition-colors duration-300">
        
        {/* Header decoration */}
        <div className="bg-slate-900 px-8 py-6 text-white flex justify-between items-center shrink-0">
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-blue-400">Canal Seguro</span>
            <h3 className="text-xl font-black tracking-tighter uppercase">Contratação de Crédito</h3>
          </div>
          {step < 4 && (
            <button 
              onClick={onClose}
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Progress Tracker Bar */}
        {step < 4 && (
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 flex shrink-0 transition-colors">
            <div className={`h-full transition-all duration-300 ${step >= 1 ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`} style={{ width: '33.33%' }}></div>
            <div className={`h-full transition-all duration-300 ${step >= 2 ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`} style={{ width: '33.33%' }}></div>
            <div className={`h-full transition-all duration-300 ${step >= 3 ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`} style={{ width: '33.34%' }}></div>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-grow p-8 overflow-y-auto space-y-6">
          
          {error && (
            <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-900/30 p-4 rounded-xl text-red-800 dark:text-red-400 text-sm font-semibold uppercase tracking-wide transition-colors">
              {error}
            </div>
          )}

          {/* STEP 1: PERSONAL FORM & CHOOSE CUSTOM loan values (capped by approved limit) */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-100 dark:border-blue-900/20 p-6 rounded-2xl flex items-center justify-between transition-colors">
                <div>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">Seu Limite Atribuído</span>
                  <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors">{formatCurrency(approvedLimit)}</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-xl text-blue-600 dark:text-blue-400 transition-colors hidden sm:block">
                  <Shield className="w-8 h-8" />
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-6 transition-colors">
                <h4 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider transition-colors">Ajuste o valor para transferência</h4>
                
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider transition-colors">O valor que deseja transferir</span>
                    <span className="text-2xl font-black text-blue-600 dark:text-blue-400 transition-colors">{formatCurrency(amount)}</span>
                  </div>
                  <input 
                    type="range" 
                    min={5000} 
                    max={approvedLimit} 
                    step={approvedLimit > 100000 ? 5000 : 100} 
                    value={amount} 
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-600 dark:accent-blue-400 transition-all"
                  />
                  <div className="flex justify-between text-[10px] font-black text-slate-400 dark:text-slate-500 mt-2 tracking-wider transition-colors">
                    <span>R$ 5.000</span>
                    <span>{formatCurrency(approvedLimit)}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider transition-colors">Quantidade de Parcelas</span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white transition-colors">{installments}x</span>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {[2, 3, 6, 12, 24, 36].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setInstallments(num)}
                        className={`py-2 rounded-lg border-2 font-black text-xs transition-colors cursor-pointer ${
                          installments === num 
                            ? 'bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100' 
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {num}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-4 transition-colors">
                <h4 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider transition-colors">Seus dados pessoais</h4>
                
                <div>
                  <label className="block text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-2 transition-colors">Nome Completo</label>
                  <input 
                    type="text" 
                    placeholder="Como consta no documento oficial"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-xl font-bold text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition-all placeholder:text-slate-350"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-2 transition-colors">E-mail</label>
                    <input 
                      type="email" 
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-xl font-bold text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition-all placeholder:text-slate-350"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-2 transition-colors">Celular / WhatsApp</label>
                    <input 
                      type="text" 
                      placeholder="(00) 90000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-xl font-bold text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition-all placeholder:text-slate-350"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PIX RECEIVING ACCOUNT */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-850 mb-2 transition-colors">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1 transition-colors">Destinação do PIX</h4>
                <p className="text-xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">O empréstimo de {formatCurrency(amount)} será enviado via PIX</p>
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider transition-colors">Tipo de Chave PIX</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: "cpf", label: "CPF" },
                    { id: "email", label: "E-mail" },
                    { id: "phone", label: "Celular" },
                    { id: "random", label: "Chave Aleatória" },
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setPixType(type.id)}
                      className={`py-2 px-1 rounded-lg border-2 font-black text-xs transition-colors cursor-pointer ${
                        pixType === type.id 
                          ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-600 dark:border-blue-600' 
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-2 transition-colors">Chave PIX</label>
                <input 
                  type="text" 
                  placeholder={pixType === 'cpf' ? cpf : "Digite sua chave PIX"}
                  value={pixKey}
                  readOnly={pixType === 'cpf'}
                  onChange={(e) => setPixKey(e.target.value)}
                  className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-955 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-xl font-black text-lg text-slate-700 dark:text-slate-300 focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition-all tracking-wider"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-2 transition-colors">Instituição Bancária</label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-4 py-4 bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-xl font-bold text-slate-750 text-slate-700 dark:text-slate-300 focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition-all text-sm cursor-pointer"
                >
                  <option value="">Selecione seu banco de destino</option>
                  {banks.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div className="bg-yellow-50 dark:bg-amber-950/20 border-2 border-yellow-200 dark:border-amber-900/30 p-4 rounded-xl flex gap-3 text-yellow-800 dark:text-amber-200 text-xs font-medium leading-relaxed transition-colors">
                <Lock className="w-5 h-5 shrink-0 text-yellow-600 dark:text-amber-500 mt-0.5" />
                <span>Garanta que a chave PIX informada pertença ao mesmo titular do CPF analisado ({cpf}). Transferências para contas de terceiros serão recusadas automaticamente por medidas contra fraudes.</span>
              </div>
            </div>
          )}

          {/* STEP 3: DIGITAL SIGNATURE & CONTRACT */}
          {step === 3 && (
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">Cédula de Crédito Bancário Digital (CCB)</h4>
              
              {/* Fake Document Scroll Panel */}
              <div className="bg-slate-900 text-slate-300 font-mono text-[11px] p-6 rounded-2xl h-48 overflow-y-auto border border-slate-800 leading-relaxed shadow-inner">
                <p className="font-extrabold text-white text-center text-[12px] mb-4 uppercase tracking-wider">CÉDULA DE CRÉDITO BANCÁRIO - CREDPIX Nº {Math.floor(100000 + Math.random() * 900000)}</p>
                <p className="mb-2"><strong>CREDOR:</strong> CREDPIX Soluções Financeiras Ltda, correspondente autorizado do Banco Central do Brasil.</p>
                <p className="mb-2"><strong>EMITENTE / DEVEDOR:</strong> {name.toUpperCase()} | Inscrito no CPF sob o nº {cpf}.</p>
                <p className="mb-2"><strong>OPERAÇÃO:</strong> Empréstimo Pessoal na modalidade Crédito Direto ao Consumidor (CDC).</p>
                <p className="mb-4"><strong>CONDIÇÕES FINANCEIRAS:</strong></p>
                <ul className="list-disc pl-4 mb-4 space-y-1">
                  <li>Valor líquido financiado: {formatCurrency(amount)}</li>
                  <li>Quantidade de amortizações: {installments} parcelas consecutivas</li>
                  <li>Custo Efetivo Total (CET): 2,99% ao mês | 42,57% ao ano</li>
                  <li>Garantia: Fidejussória (Isento)</li>
                </ul>
                <p className="mb-4">Ao assinar digitalmente este instrumento, o Emitente reconhece a dívida líquida e imediata e autoriza o faturamento e débito ou liquidação em favor do Credor. O atraso do pagamento incorrerá em multa moratória de 2% (dois por cento) sobre o saldo devedor acrescido de juros de mora pro-rata-die.</p>
                <p className="text-center text-slate-500">[ FIM DO CONTRATO DE CRÉDITO DIRETO ]</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <input 
                    id="agree"
                    type="checkbox" 
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1 w-5 h-5 accent-blue-600 rounded cursor-pointer"
                  />
                  <label htmlFor="agree" className="text-xs font-bold text-slate-600 dark:text-slate-400 select-none cursor-pointer uppercase tracking-wide leading-relaxed transition-colors">
                    Declaro que li e concordo com todos os termos, condições e taxas da Cédula de Crédito Bancário descrita acima.
                  </label>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                  <label className="block text-[11px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-2 transition-colors">Para assinar, digite seu nome completo exatamente por extenso:</label>
                  <input 
                    type="text" 
                    placeholder={name}
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-xl font-bold text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: PROGRESS OVERLAY / TRANSFER CONFIRMATION */}
          {step === 4 && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-8">
              
              {loading ? (
                <div className="space-y-6">
                  {/* Premium customized progress visual */}
                  <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
                    <div className="text-2xl font-black text-slate-900 tracking-tighter">
                      {progress}%
                    </div>
                  </div>

                  <div className="space-y-2 max-w-sm mx-auto">
                    <p className="text-lg font-black text-slate-900 uppercase tracking-tight">{progressText}</p>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Não saia desta tela. O preenchimento da TED/PIX é imediato.</p>
                  </div>
                </div>
              ) : receipt ? (
                <div className="space-y-6 animate-scale-up w-full">
                  
                  {/* Success Circle */}
                  <div className="w-24 h-24 rounded-full bg-green-100 border-2 border-green-200 flex items-center justify-center mx-auto text-green-600 shadow-lg shadow-green-50">
                    <Check className="w-12 h-12 stroke-[3]" />
                  </div>

                  <div className="space-y-2">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 text-xs font-extrabold rounded-full uppercase tracking-widest transition-colors">
                      Transferência PIX Concluída
                    </span>
                    <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tighter uppercase leading-tight transition-colors">DINHEIRO NA CONTA!</h2>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-md mx-auto transition-colors">
                      O depósito de <strong>{formatCurrency(receipt.amount)}</strong> foi realizado com sucesso para o titular <strong>{receipt.name}</strong>. Veja os dados do comprovante oficial abaixo:
                    </p>
                  </div>

                  {/* Copy-paste proof slice */}
                  <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 p-6 md:p-8 rounded-3xl max-w-md mx-auto text-left font-mono text-xs space-y-3 shadow-md relative overflow-hidden transition-colors">
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-green-500/10 rounded-full blur-xl animate-pulse"></div>
                    <div className="flex items-center justify-between border-b border-dashed border-slate-200 dark:border-slate-800 pb-3 text-[10px] text-slate-400 dark:text-slate-500 transition-colors">
                      <span>COMPROVANTE DE TRANSFERÊNCIA</span>
                      <span>{new Date(receipt.timestamp).toLocaleDateString('pt-BR')}</span>
                    </div>

                    <div className="space-y-2 text-slate-700 dark:text-slate-300 transition-colors">
                      <p className="flex justify-between"><strong>Favorecido:</strong> <span className="text-right">{receipt.name.toUpperCase()}</span></p>
                      <p className="flex justify-between"><strong>Chave PIX:</strong> <span className="text-right">{receipt.pixKey}</span></p>
                      <p className="flex justify-between"><strong>Banco:</strong> <span className="text-right">{receipt.bankName}</span></p>
                      <p className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-2"><strong>Valor Recebido:</strong> <span className="text-right font-black text-slate-950 dark:text-white transition-colors">{formatCurrency(receipt.amount)}</span></p>
                      <p className="flex justify-between"><strong>Amortização:</strong> <span className="text-right">{receipt.installments} parcelas mensais</span></p>
                      <p className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-2"><strong>Nº de Controle:</strong> <span className="text-right">{receipt.transactionId}</span></p>
                      <p className="flex justify-between"><strong>Autenticação CCB:</strong> <span className="text-right">{receipt.contractId}</span></p>
                    </div>

                    <div className="pt-2 text-center text-[10px] text-slate-400 uppercase tracking-widest font-sans font-bold">
                      Autorizado eletronicamente pelo SFN
                    </div>
                  </div>

                  <div className="pt-4 max-w-sm mx-auto">
                    <button 
                      onClick={() => {
                        onClose();
                        setStep(1);
                        setReceipt(null);
                        setSignature("");
                        setAgreeTerms(false);
                      }}
                      className="w-full py-4 bg-slate-950 text-white font-black text-md rounded-xl hover:bg-slate-800 transition active:scale-[0.98] uppercase tracking-wider shadow-md"
                    >
                      Voltar ao Início
                    </button>
                  </div>
                </div>
              ) : null}

            </div>
          )}

        </div>

        {/* Modal Footer (only for Steps 1, 2, 3) */}
        {step < 4 && (
          <div className="bg-slate-50 dark:bg-slate-900 px-8 py-5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0 transition-colors duration-300">
            {step > 1 ? (
              <button 
                type="button" 
                onClick={handleBackStep}
                className="px-6 py-3 border-2 border-slate-200 dark:border-slate-705 text-slate-600 dark:text-slate-400 font-extrabold text-xs rounded-xl hover:border-slate-400 dark:hover:border-slate-500 transition uppercase tracking-wider cursor-pointer"
              >
                Voltar
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button 
                type="button" 
                onClick={handleNextStep}
                className="px-6 py-3 bg-blue-600 text-white font-extrabold text-xs rounded-xl hover:bg-blue-700 transition uppercase tracking-widest flex items-center gap-1 shadow-md shadow-blue-100 dark:shadow-none cursor-pointer"
              >
                Continuar <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                type="button" 
                onClick={handleSignContract}
                className="px-8 py-3.5 bg-green-600 text-white font-black text-sm rounded-xl hover:bg-green-700 transition uppercase tracking-widest flex items-center gap-1 shadow-md shadow-green-100 dark:shadow-none cursor-pointer"
              >
                Assinar e Receber PIX
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
