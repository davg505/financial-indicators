import React, { useState } from 'react';

const DataInput = ({ onSubmit }) => {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [discountRate, setDiscountRate] = useState('');
  const [cashFlows, setCashFlows] = useState([]);

  const handleAddCashFlow = () => {
    setCashFlows([...cashFlows, { year: cashFlows.length + 1, amount: 0 }]);
  };

  const handleCashFlowChange = (index, value) => {
    const updatedCashFlows = [...cashFlows];
    updatedCashFlows[index].amount = value;
    setCashFlows(updatedCashFlows);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ initialInvestment: parseFloat(initialInvestment), discountRate: parseFloat(discountRate), cashFlows });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Investimento Inicial:</label>
        <input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} required />
      </div>
      <div>
        <label>Taxa de Desconto (%):</label>
        <input type="number" value={discountRate} onChange={(e) => setDiscountRate(e.target.value)} required />
      </div>
      <div>
        <label>Fluxos de Caixa Futuros:</label>
        {cashFlows.map((cashFlow, index) => (
          <div key={index}>
            <label>Ano {cashFlow.year}:</label>
            <input type="number" value={cashFlow.amount} onChange={(e) => handleCashFlowChange(index, parseFloat(e.target.value))} required />
          </div>
        ))}
        <button type="button" onClick={handleAddCashFlow}>Adicionar Fluxo de Caixa</button>
      </div>
      <button type="submit">Calcular</button>
    </form>
  );
};

export default DataInput;
