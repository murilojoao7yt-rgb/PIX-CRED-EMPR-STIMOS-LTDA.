import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // App API Routes
  app.post("/api/simulate-loan", (req, res) => {
    const { amount, installments } = req.body;
    
    if (!amount || !installments) {
      return res.status(400).json({ error: "Missing amount or installments" });
    }

    const interestRate = 0.0299; // 2.99% monthly
    
    // Simplistic calculation for demonstration
    // EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
    const principal = parseFloat(amount);
    const months = parseInt(installments);
    
    const numerator = principal * interestRate * Math.pow(1 + interestRate, months);
    const denominator = Math.pow(1 + interestRate, months) - 1;
    
    const monthlyPayment = numerator / denominator;
    const totalPayment = monthlyPayment * months;

    res.json({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      interestRate: (interestRate * 100).toFixed(2),
      totalInterest: (totalPayment - principal).toFixed(2),
    });
  });

  app.post("/api/check-cpf", (req, res) => {
    const { cpf } = req.body;
    
    if (!cpf) {
      return res.status(400).json({ error: "CPF is required" });
    }

    // "Real-time" check simulation
    setTimeout(() => {
      // Simulate some logic to determine if CPF is approved
      // Using last digit to mock approval rates
      const lastDigit = parseInt(cpf.replace(/\D/g, '').slice(-1));
      
      if (isNaN(lastDigit)) {
         return res.status(400).json({ status: "error", message: "CPF inválido." });
      }

      // 80% approval rate simulation
      if (lastDigit < 8) {
        res.json({
          status: "approved",
          score: 750 + (lastDigit * 10),
          limit: 200000 + (lastDigit * 100000),
          message: "Crédito pré-aprovado! Continue com a solicitação."
        });
      } else {
         res.json({
          status: "denied",
          score: 300 + (lastDigit * 10),
          limit: 0,
          message: "Infelizmente não podemos liberar crédito no momento."
        });
      }
    }, 1500); // 1.5s artificial delay for simulation
  });

  app.post("/api/finalize-contract", (req, res) => {
    const { name, email, phone, pixType, pixKey, bankName, amount, installments, cpf } = req.body;
    
    if (!name || !email || !phone || !pixType || !pixKey || !bankName || !amount || !installments || !cpf) {
      return res.status(400).json({ error: "Preencha todos os campos obrigatórios para formalizar o contrato." });
    }

    const transactionId = "TX-" + Math.floor(100000000 + Math.random() * 900000000);
    const contractId = "CCB-" + Math.floor(100000 + Math.random() * 900000);

    res.json({
      status: "success",
      transactionId,
      contractId,
      timestamp: new Date().toISOString(),
      amount: parseFloat(amount),
      installments: parseInt(installments),
      name,
      pixKey,
      bankName,
      message: "Contrato assinado digitalmente e registrado com sucesso!"
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    // app.use(vite.middlewares) will handle asset serving and SPA fallback
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
