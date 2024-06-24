import React from 'react';

const Results = ({ results }) => (
  <div>
    <h2>Resultados</h2>
    <p>VPL: {results.npv}</p>
    <p>TIR: {results.irr}</p>
    <p>Taxa de Lucratividade: {results.profitabilityIndex}</p>
    <p>VFL: {results.vfl}</p>
    <p>Payback: {results.payback}</p>
    <p>Payback Descontado: {results.discountedPayback}</p>
    <p>Relação Custo-Benefício: {results.costBenefitRatio}</p>
  </div>
);

export default Results;
