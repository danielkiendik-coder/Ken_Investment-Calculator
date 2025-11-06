import React, { useState, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';

const InvestmentCalculator = () => {
  const [investment, setInvestment] = useState(1000000);
  const [tbillYield, setTbillYield] = useState(16.5);
  const [dividendYield, setDividendYield] = useState(7.5);
  const [stockAppreciation, setStockAppreciation] = useState(10);
  const [years, setYears] = useState(5);
  const [portfolioSplit, setPortfolioSplit] = useState(50);

  const calculations = useMemo(() => {
    const tbillTax = 0;
    const dividendTax = 0.05;

    const tbillAmount = investment;
    const tbillAnnualReturn = tbillAmount * (tbillYield / 100);
    const tbillAfterTax = tbillAnnualReturn * (1 - tbillTax);
    
    const stockAmount = investment;
    const dividendAnnualReturn = stockAmount * (dividendYield / 100);
    const dividendAfterTax = dividendAnnualReturn * (1 - dividendTax);
    
    const tbillGrowth = [];
    const stockGrowth = [];
    const mixedGrowth = [];
    
    let tbillValue = investment;
    let stockValue = investment;
    let stockDividendValue = investment;
    let mixedValue = investment;
    
    const mixedTbillAmount = investment * (portfolioSplit / 100);
    const mixedStockAmount = investment * ((100 - portfolioSplit) / 100);
    
    for (let year = 0; year <= years; year++) {
      if (year > 0) {
        tbillValue = tbillValue * (1 + tbillYield / 100);
      }
      
      if (year > 0) {
        stockValue = stockValue * (1 + (stockAppreciation / 100));
        const yearlyDividend = stockDividendValue * (dividendYield / 100) * (1 - dividendTax);
        stockDividendValue = stockValue + yearlyDividend;
      }
      
      if (year > 0) {
        const mixedTbill = mixedTbillAmount * Math.pow(1 + tbillYield / 100, year);
        const mixedStock = mixedStockAmount * Math.pow(1 + stockAppreciation / 100, year);
        const mixedDivAccum = mixedStockAmount * (dividendYield / 100) * (1 - dividendTax) * year;
        mixedValue = mixedTbill + mixedStock + mixedDivAccum;
      }
      
      tbillGrowth.push({
        year,
        value: Math.round(tbillValue),
        label: `Year ${year}`
      });
      
      stockGrowth.push({
        year,
        value: Math.round(stockDividendValue),
        valueNoDiv: Math.round(stockValue),
        label: `Year ${year}`
      });
      
      mixedGrowth.push({
        year,
        value: Math.round(mixedValue),
        label: `Year ${year}`
      });
    }
    
    const combinedData = tbillGrowth.map((item, idx) => ({
      year: `Year ${item.year}`,
      'T-Bills': item.value,
      'Dividend Stocks': stockGrowth[idx].value,
      'Mixed Portfolio': mixedGrowth[idx].value
    }));
    
    const incomeComparison = [
      {
        type: 'T-Bills',
        gross: Math.round(tbillAnnualReturn),
        tax: 0,
        net: Math.round(tbillAfterTax),
        effectiveRate: tbillYield
      },
      {
        type: 'Dividend Stocks',
        gross: Math.round(dividendAnnualReturn),
        tax: Math.round(dividendAnnualReturn * dividendTax),
        net: Math.round(dividendAfterTax),
        effectiveRate: dividendYield * (1 - dividendTax)
      }
    ];
    
    const portfolioData = [
      { name: 'T-Bills', value: portfolioSplit, amount: mixedTbillAmount },
      { name: 'Stocks', value: 100 - portfolioSplit, amount: mixedStockAmount }
    ];
    
    return {
      tbillAnnualReturn: Math.round(tbillAfterTax),
      stockAnnualReturn: Math.round(dividendAfterTax),
      tbillFinalValue: Math.round(tbillGrowth[years].value),
      stockFinalValue: Math.round(stockGrowth[years].value),
      mixedFinalValue: Math.round(mixedGrowth[years].value),
      combinedData,
      incomeComparison,
      portfolioData,
      tbillMonthly: Math.round(tbillAfterTax / 12),
      stockMonthly: Math.round(dividendAfterTax / 12),
      mixedAnnual: Math.round((mixedTbillAmount * (tbillYield / 100)) + (mixedStockAmount * (dividendYield / 100) * (1 - dividendTax))),
      stockCapitalGain: Math.round(stockValue - investment)
    };
  }, [investment, tbillYield, dividendYield, stockAppreciation, years, portfolioSplit]);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Kenya Investment Calculator</h1>
        </div>
        <p className="text-gray-600 mb-4">Compare T-Bills vs Dividend Stocks (After Tax)</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Investment Amount (KES)
            </label>
            <input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              step="50000"
              min="50000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              T-Bill Yield (% p.a.)
            </label>
            <input
              type="number"
              value={tbillYield}
              onChange={(e) => setTbillYield(Number(e.target.value))}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              step="0.5"
              min="0"
              max="30"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Dividend Yield (% p.a.)
            </label>
            <input
              type="number"
              value={dividendYield}
              onChange={(e) => setDividendYield(Number(e.target.value))}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              step="0.5"
              min="0"
              max="20"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Stock Price Appreciation (% p.a.)
            </label>
            <input
              type="number"
              value={stockAppreciation}
              onChange={(e) => setStockAppreciation(Number(e.target.value))}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              step="1"
              min="-20"
              max="50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Investment Period (Years)
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              step="1"
              min="1"
              max="30"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mixed Portfolio: T-Bills (%)
            </label>
            <input
              type="range"
              value={portfolioSplit}
              onChange={(e) => setPortfolioSplit(Number(e.target.value))}
              className="w-full"
              min="0"
              max="100"
              step="5"
            />
            <div className="text-center text-sm text-gray-600 mt-1">
              {portfolioSplit}% T-Bills | {100 - portfolioSplit}% Stocks
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">T-Bills (Tax-Free)</h3>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-700">
              KES {calculations.tbillAnnualReturn.toLocaleString()}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Annual Income | KES {calculations.tbillMonthly.toLocaleString()}/month
            </p>
            <p className="text-sm font-semibold text-blue-600 mt-2">
              After {years} years: KES {calculations.tbillFinalValue.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">Dividend Stocks (5% Tax)</h3>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-700">
              KES {calculations.stockAnnualReturn.toLocaleString()}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Annual Dividend | KES {calculations.stockMonthly.toLocaleString()}/month
            </p>
            <p className="text-sm font-semibold text-green-600 mt-2">
              After {years} years: KES {calculations.stockFinalValue.toLocaleString()}
              <span className="text-xs block">
                (Capital gain: +KES {calculations.stockCapitalGain.toLocaleString()})
              </span>
            </p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">Mixed Portfolio</h3>
              <Calculator className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-700">
              KES {calculations.mixedAnnual.toLocaleString()}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Annual Income | KES {Math.round(calculations.mixedAnnual / 12).toLocaleString()}/month
            </p>
            <p className="text-sm font-semibold text-purple-600 mt-2">
              After {years} years: KES {calculations.mixedFinalValue.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Annual Income & Tax Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-2 px-4 text-sm font-semibold text-gray-700">Investment Type</th>
                  <th className="text-right py-2 px-4 text-sm font-semibold text-gray-700">Gross Income</th>
                  <th className="text-right py-2 px-4 text-sm font-semibold text-gray-700">Tax</th>
                  <th className="text-right py-2 px-4 text-sm font-semibold text-gray-700">Net Income</th>
                  <th className="text-right py-2 px-4 text-sm font-semibold text-gray-700">Effective Rate</th>
                </tr>
              </thead>
              <tbody>
                {calculations.incomeComparison.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-200">
                    <td className="py-3 px-4 font-medium text-gray-800">{item.type}</td>
                    <td className="py-3 px-4 text-right text-gray-700">
                      KES {item.gross.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-red-600">
                      KES {item.tax.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-green-700">
                      KES {item.net.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-blue-600">
                      {item.effectiveRate.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-gray-600 bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
            <strong>Note:</strong> T-Bills enjoy 0% tax, while dividends are taxed at 5%. This gives T-Bills a significant advantage in net returns for pure income investors.
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 mb-8 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Portfolio Value Over Time (Compound Growth)</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={calculations.combinedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(value) => `KES ${Number(value).toLocaleString()}`} />
              <Legend />
              <Line type="monotone" dataKey="T-Bills" stroke="#3B82F6" strokeWidth={3} />
              <Line type="monotone" dataKey="Dividend Stocks" stroke="#10B981" strokeWidth={3} />
              <Line type="monotone" dataKey="Mixed Portfolio" stroke="#8B5CF6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg p-4 mb-8 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Net Annual Income Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={calculations.incomeComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(value) => `KES ${Number(value).toLocaleString()}`} />
              <Legend />
              <Bar dataKey="gross" fill="#93C5FD" name="Gross Income" />
              <Bar dataKey="net" fill="#10B981" name="Net Income (After Tax)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Mixed Portfolio Allocation</h3>
          <div className="flex flex-col md:flex-row items-center justify-around">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={calculations.portfolioData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {calculations.portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 md:mt-0">
              {calculations.portfolioData.map((item, idx) => (
                <div key={idx} className="mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS[idx] }}></div>
                    <span className="font-semibold text-gray-800">{item.name}</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-6">
                    KES {item.amount.toLocaleString()} ({item.value}%)
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-l-4 border-blue-500">
          <h3 className="text-lg font-bold text-gray-800 mb-4">💡 Key Insights</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>Tax Advantage:</strong> T-Bills are completely tax-free, while dividends face 5% withholding tax, giving T-Bills an edge for pure income.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span><strong>Total Returns:</strong> Dividend stocks can outperform through capital appreciation (stock price growth) even with lower dividend yields.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span><strong>Liquidity:</strong> T-Bills lock your money until maturity, while stocks can be sold anytime (though prices fluctuate).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">•</span>
              <span><strong>Risk:</strong> T-Bills are government-backed (very safe), while stocks carry market risk but offer growth potential.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span><strong>Diversification:</strong> A mixed portfolio balances safety (T-Bills) with growth potential (stocks) for optimal returns.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculator;
