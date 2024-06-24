import React, { useState } from 'react';
import './App.css';
import CashFlowChart from './components/CashFlowChart';
import CashFlowTable from './components/CashFlowTable';
import DataInput from './components/DataInput';
import Results from './components/Results';
import { calculateIndicators } from './utils/calculateIndicators'; // Certifique-se de que a função está no caminho correto

const App = () => {
  const [cashFlows, setCashFlows] = useState([]);
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [discountRate, setDiscountRate] = useState(0);
  const [results, setResults] = useState({});

  const handleDataSubmit = (data) => {
    setCashFlows(data.cashFlows);
    setInitialInvestment(data.initialInvestment);
    setDiscountRate(data.discountRate);
    const calculatedResults = calculateIndicators(data);
    setResults(calculatedResults);
  };

  return (
    <div>
      <h1>Indicadores financeiro</h1>
      <DataInput onSubmit={handleDataSubmit} />
      <Results results={results} />
      <CashFlowTable cashFlows={cashFlows} />
      <CashFlowChart cashFlows={cashFlows} />
    </div>
  );
};

export default App;
