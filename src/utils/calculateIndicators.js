export const calculateIndicators = ({ cashFlows, initialInvestment, discountRate }) => {
    // Valor Presente Líquido (VPL)
    const npv = cashFlows.reduce((acc, cf, index) => acc + cf.amount / Math.pow(1 + discountRate / 100, cf.year), -initialInvestment);
  
    // Taxa Interna de Retorno (TIR)
    const irr = calculateIRR(cashFlows, initialInvestment);
  
    // Valor Futuro Líquido (VFL)
    const vfl = cashFlows.reduce((acc, cf) => acc + cf.amount * Math.pow(1 + discountRate / 100, cf.year), -initialInvestment * Math.pow(1 + discountRate / 100, cashFlows.length));
  
    // Payback
    const payback = calculatePayback(cashFlows, initialInvestment);
  
    // Payback Descontado
    const discountedPayback = calculateDiscountedPayback(cashFlows, initialInvestment, discountRate);
  
    // Relação Custo-Benefício
    const costBenefitRatio = (npv + initialInvestment) / initialInvestment;
  
    return {
      npv,
      irr,
      profitabilityIndex: (npv + initialInvestment) / initialInvestment,
      vfl,
      payback,
      discountedPayback,
      costBenefitRatio,
    };
  };
  
  // Cálculo da TIR usando o método de Newton-Raphson
  const calculateIRR = (cashFlows, initialInvestment) => {
    const maxIterations = 1000;
    const tolerance = 1e-6;
    let rate = 0.1; // Taxa inicial de 10%
    for (let i = 0; i < maxIterations; i++) {
      let npv = 0;
      let npvPrime = 0;
      for (let j = 0; j < cashFlows.length; j++) {
        npv += cashFlows[j].amount / Math.pow(1 + rate, cashFlows[j].year);
        npvPrime += -cashFlows[j].year * cashFlows[j].amount / Math.pow(1 + rate, cashFlows[j].year + 1);
      }
      npv -= initialInvestment;
      if (Math.abs(npv) < tolerance) return rate;
      rate -= npv / npvPrime;
    }
    return rate;
  };
  
  // Cálculo do Payback
  const calculatePayback = (cashFlows, initialInvestment) => {
    let cumulativeCashFlow = -initialInvestment;
    for (let i = 0; i < cashFlows.length; i++) {
      cumulativeCashFlow += cashFlows[i].amount;
      if (cumulativeCashFlow >= 0) return cashFlows[i].year;
    }
    return -1; // Se o payback não for alcançado
  };
  
  // Cálculo do Payback Descontado
  const calculateDiscountedPayback = (cashFlows, initialInvestment, discountRate) => {
    let cumulativeCashFlow = -initialInvestment;
    for (let i = 0; i < cashFlows.length; i++) {
      cumulativeCashFlow += cashFlows[i].amount / Math.pow(1 + discountRate / 100, cashFlows[i].year);
      if (cumulativeCashFlow >= 0) return cashFlows[i].year;
    }
    return -1; // Se o payback descontado não for alcançado
  };
  