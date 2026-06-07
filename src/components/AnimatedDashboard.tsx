import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Activity, 
  DollarSign, 
  Zap, 
  ArrowUpRight, 
  LineChart, 
  HeartHandshake
} from "lucide-react";

interface Transaction {
  id: string;
  name: string;
  city: string;
  amount: number;
  installments: number;
  timeAgo: string;
  status: "approved" | "processing";
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: "1", name: "Guilherme S.", city: "São Paulo - SP", amount: 12000, installments: 12, timeAgo: "há 1 min", status: "approved" },
  { id: "2", name: "Letícia M.", city: "Belo Horizonte - MG", amount: 45000, installments: 24, timeAgo: "há 3 min", status: "approved" },
  { id: "3", name: "Arthur F.", city: "Curitiba - PR", amount: 8000, installments: 6, timeAgo: "há 5 min", status: "approved" },
  { id: "4", name: "Juliana K.", city: "Recife - PE", amount: 85000, installments: 36, timeAgo: "há 8 min", status: "approved" },
  { id: "5", name: "Marcos T.", city: "Goiânia - GO", amount: 15000, installments: 12, timeAgo: "há 12 min", status: "approved" }
];

const CITIES = [
  "Rio de Janeiro - RJ", "Salvador - BA", "Fortaleza - CE", "Brasília - DF", 
  "Manaus - AM", "Porto Alegre - RS", "Belém - PA", "Florianópolis - SC",
  "Campinas - SP", "Vitória - ES", "Natal - RN", "São Luís - MA"
];

const FIRST_NAMES = [
  "Rodrigo", "Amanda", "Bruno", "Camila", "Daniel", "Gabriela", "Felipe", "Natália",
  "Gustavo", "Larissa", "Leonardo", "Fernanda", "Thiago", "Beatriz", "Ricardo", "Aline"
];

const LAST_INITIALS = ["A.", "B.", "C.", "D.", "F.", "G.", "L.", "M.", "N.", "P.", "R.", "S.", "T.", "V."];

const SCORE_CLASSES = [
  { 
    id: "bronze", 
    title: "Score Regular", 
    range: "300 - 500", 
    limitEst: "R$ 5.000 - R$ 15.000", 
    chance: "Média", 
    fee: "2.99% a.m.",
    color: "from-amber-500 to-amber-600 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    points: [40, 50, 45, 60, 55, 75]
  },
  { 
    id: "silver", 
    title: "Score Bom", 
    range: "501 - 700", 
    limitEst: "R$ 15.000 - R$ 150.000", 
    chance: "Alta", 
    fee: "1.89% a.m.",
    color: "from-slate-400 to-slate-500 bg-slate-400/10 text-slate-650 dark:text-slate-350",
    points: [60, 75, 70, 95, 85, 115]
  },
  { 
    id: "gold", 
    title: "Score Excelente", 
    range: "701 - 1000", 
    limitEst: "R$ 150.000 - R$ 900.000", 
    chance: "Instantânea", 
    fee: "0.99% a.m.",
    color: "from-blue-600 to-indigo-600 bg-blue-600/10 text-blue-600 dark:text-blue-450",
    points: [90, 110, 125, 160, 180, 240]
  }
];

export default function AnimatedDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [totalDisbursed, setTotalDisbursed] = useState(1248500);
  const [activeUsers, setActiveUsers] = useState(148);
  const [selectedScore, setSelectedScore] = useState("silver");

  // Dynamic values incrementing over time
  useEffect(() => {
    const disbursedInterval = setInterval(() => {
      // Add random small amount to simulation
      const addition = Math.floor(Math.random() * 4500) + 1500;
      setTotalDisbursed((prev) => prev + addition);
      
      // Flash active user count slightly
      setActiveUsers((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const newVal = prev + delta;
        return newVal > 130 && newVal < 180 ? newVal : prev;
      });
    }, 4000);

    return () => clearInterval(disbursedInterval);
  }, []);

  // Rolling feed animation adding items
  useEffect(() => {
    const feedInterval = setInterval(() => {
      const randomName = `${FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]} ${LAST_INITIALS[Math.floor(Math.random() * LAST_INITIALS.length)]}`;
      const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
      const randomAmount = (Math.floor(Math.random() * 15) + 2) * 2500; // Multiples between 5k and 40k
      const randomInstallments = [6, 12, 24, 36][Math.floor(Math.random() * 4)];
      
      const newTx: Transaction = {
        id: Math.random().toString(),
        name: randomName,
        city: randomCity,
        amount: randomAmount,
        installments: randomInstallments,
        timeAgo: "agora mesmo",
        status: "approved"
      };

      setTransactions((prev) => {
        // Limit history feed size to 5
        const copy = [newTx, ...prev];
        if (copy.length > 5) {
          copy.pop();
        }
        return copy;
      });
    }, 6000);

    return () => clearInterval(feedInterval);
  }, []);

  const getActiveScoreData = () => {
    return SCORE_CLASSES.find((sc) => sc.id === selectedScore) || SCORE_CLASSES[1];
  };

  const formatCurrency = (val: number) => {
    return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const currentScoreData = getActiveScoreData();

  return (
    <section id="painel-animado" className="py-24 bg-slate-50 dark:bg-slate-900/10 border-t border-b border-slate-200 dark:border-slate-850 transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-4 md:px-12 max-w-5xl">
        
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-bold rounded-full uppercase tracking-widest mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
            Monitor em Tempo Real
          </div>
          <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter uppercase transition-colors">
            Painel CredPix Live
          </h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto transition-colors">
            Acompanhe a liberação de crédito instantâneo em todo o Brasil e veja os limites projetados conforme a pontuação do CPF.
          </p>
        </div>

        {/* Global Live Statistics Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Stat 1: Total Volume */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Crédito Liberado Hoje</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1 font-mono tracking-tight transition-colors">
                {formatCurrency(totalDisbursed)}
              </h3>
            </div>
          </div>

          {/* Stat 2: Instant Payout Delay */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/40 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Média de Envio via Pix</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1 tracking-tight transition-colors">
                27 segundos
              </h3>
            </div>
          </div>

          {/* Stat 3: Processing Speed */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-950/40 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Simuladores Ativos</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1 transition-colors">
                {activeUsers} pessoas agora
              </h3>
            </div>
          </div>
        </div>

        {/* Dashboard Main Visual Content */}
        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
          
          {/* Column 1: Live Simulation Feed (AnimatePresence) (lg:col-span-2) */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-850 p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Fila de Liberação Rápida</span>
                <span className="flex items-center gap-1.5 px-2 py-0.5 bg-green-100 dark:bg-green-950/40 text-[10px] text-green-700 dark:text-green-400 font-extrabold rounded-md uppercase tracking-wider transition-colors">
                  <Activity className="w-3 h-3 animate-pulse" /> Pix Ativo
                </span>
              </div>

              {/* Transactions Stack Container */}
              <div id="live-payouts-feed" className="space-y-4 min-h-[310px]">
                <AnimatePresence initial={false}>
                  {transactions.map((tx) => (
                    <motion.div
                      key={tx.id}
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="p-4 bg-slate-50 dark:bg-slate-950/80 rounded-xl border border-slate-100 dark:border-slate-850/60 flex items-center justify-between gap-3 text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-105 bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold text-xs">
                          {tx.name.substring(0, 2)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white transition-colors">{tx.name}</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-semibold tracking-wider transition-colors">{tx.city}</p>
                        </div>
                      </div>
                      
                      <div className="text-right shrink-0">
                        <p className="font-mono font-black text-blue-600 dark:text-blue-400 transition-colors">
                          {formatCurrency(tx.amount)}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider transition-colors">
                          {tx.installments} parcelas • {tx.timeAgo}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom micro notice */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-6 text-center text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider transition-colors">
              *Valores reais simulação de formalização instantânea ocorrendo agora.
            </div>
          </div>

          {/* Column 2: Interactive SVG Projection Map (lg:col-span-3) */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-850 p-6 md:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Estimativa de Limite</span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1 uppercase tracking-tight transition-colors">Evolução por Score</h3>
                </div>
                
                {/* Score Switcher Pills */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-950/80 rounded-xl border border-slate-205 dark:border-slate-850">
                  {SCORE_CLASSES.map((sc) => (
                    <button
                      key={sc.id}
                      onClick={() => setSelectedScore(sc.id)}
                      className={["px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer",
                        selectedScore === sc.id 
                          ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-extrabold" 
                          : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      ].join(" ")}
                    >
                      {sc.id.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Graphical Projection Box */}
              <div className="bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-850/60 p-6 mb-6">
                
                {/* Simulated Graph SVG */}
                <div className="relative h-44 w-full flex items-end">
                  <svg className="absolute inset-0 w-full h-full overflow-visible" strokeWidth="3" fill="none">
                    <defs>
                      <linearGradient id="gradient-area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2"/>
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    
                    {/* Horizontal Guideline */}
                    <line x1="0" y1="33%" x2="100%" y2="33%" stroke="#e2e8f0" strokeDasharray="4 4" className="dark:stroke-slate-800 transition-colors" />
                    <line x1="0" y1="66%" x2="100%" y2="66%" stroke="#e2e8f0" strokeDasharray="4 4" className="dark:stroke-slate-800 transition-colors" />

                    {/* Plotting points in real-time according to selected score with animated motion tags */}
                    <path
                      d={`M 0,${180 - currentScoreData.points[0]} 
                          L 90,${180 - currentScoreData.points[1]} 
                          L 180,${180 - currentScoreData.points[2]} 
                          L 270,${180 - currentScoreData.points[3]} 
                          L 360,${180 - currentScoreData.points[4]} 
                          L 450,${180 - currentScoreData.points[5]}`}
                      className="stroke-blue-600 dark:stroke-blue-450 transition-all duration-500 ease-out-back"
                      style={{ transitionProperty: "d" }}
                    />

                    {/* Gradient Area Fill */}
                    <path
                      d={`M 0,${180 - currentScoreData.points[0]} 
                          L 90,${180 - currentScoreData.points[1]} 
                          L 180,${180 - currentScoreData.points[2]} 
                          L 270,${180 - currentScoreData.points[3]} 
                          L 360,${180 - currentScoreData.points[4]} 
                          L 450,${180 - currentScoreData.points[5]}
                          v 180 H 0 Z`}
                      fill="url(#gradient-area)"
                      className="transition-all duration-500"
                      style={{ transitionProperty: "d" }}
                    />

                    {/* Interactive dots representing nodes */}
                    {currentScoreData.points.map((p, idx) => (
                      <circle
                        key={idx}
                        cx={idx * 90}
                        cy={180 - p}
                        r="5"
                        className="fill-blue-600 dark:fill-blue-450 stroke-white dark:stroke-slate-900 cursor-pointer hover:r-[7] transition-all duration-300"
                      />
                    ))}
                  </svg>
                  
                  {/* Custom Axis Indicator tags */}
                  <div className="absolute inset-x-0 bottom-0 top-0 flex justify-between pointer-events-none text-[8px] font-black text-slate-400 uppercase tracking-widest pt-2">
                    <span>JAN</span>
                    <span>MAR</span>
                    <span>MAI</span>
                    <span>JUL</span>
                    <span>SET</span>
                    <span>DEZ</span>
                  </div>
                </div>
              </div>

              {/* Dynamic stats based on classification selection */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-100 dark:border-slate-850/60">
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">Pontuação Média</span>
                  <p className="text-lg font-black text-slate-900 dark:text-white mt-1 font-mono">{currentScoreData.range}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-100 dark:border-slate-850/60">
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">Limite Pré-Aprovado</span>
                  <p className="text-lg font-black text-blue-600 dark:text-blue-400 mt-1 font-mono tracking-tighter shrink-0">{currentScoreData.limitEst.split(" - ")[0]}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-100 dark:border-slate-850/60">
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">TAXA MÍNIMA</span>
                  <p className="text-lg font-black text-slate-900 dark:text-white mt-1 font-mono">{currentScoreData.fee}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-100 dark:border-slate-850/60">
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">Chance Aprovação</span>
                  <p className="text-lg font-black text-green-600 dark:text-green-400 mt-1">{currentScoreData.chance}</p>
                </div>
              </div>
            </div>

            {/* Bottom explanatory CTA link */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Segurança de Dados criptografada de ponta a ponta
              </span>
              <a href="#consulta" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 cursor-pointer">
                Verifique seu Score Agora <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
