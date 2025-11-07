# 🇰🇪 Kenya Investment Calculator

An interactive web application that helps Kenyan investors compare returns between Treasury Bills (T-Bills) and dividend stocks after tax.

![ongoing](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🎯 Overview

This calculator provides tax-adjusted comparison between two popular investment vehicles in Kenya:
- **Treasury Bills**: Government securities offering 16-17% yields (tax-free)
- **Dividend Stocks**: NSE-listed companies offering dividends (5% withholding tax)

Built as part of my portfolio to demonstrate financial modeling, data visualization, and React development skills.

## ✨ Key Features

- 💰 **Tax-Adjusted Calculations**: Accurate net returns accounting for Kenya's tax structure
- 📈 **Compound Growth Modeling**: Visualize portfolio value over 1-30 years
- 📊 **Interactive Charts**: Real-time visualization using Recharts
- 🎚️ **Portfolio Mixing**: Simulate balanced portfolios (T-Bills + Stocks)
- 💹 **Capital Appreciation**: Factor in stock price growth potential
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile

## 🖼️ Screenshots

*Calculator showing KES 1M investment comparison over 5 years*

## 🛠️ Technologies Used

- **React 18** - Modern UI framework with hooks
- **Recharts** - Composable charting library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon set
- **Vite** - Lightning-fast build tool

## 💡 Use Cases

1. **Income Planning**: Calculate investment needed for target monthly income
2. **Tax Optimization**: Compare after-tax returns across asset classes
3. **Retirement Planning**: Model long-term wealth accumulation
4. **Portfolio Allocation**: Find optimal T-Bill vs Stock mix
5. **Financial Education**: Understand compound interest and taxation impact

## 📊 Kenya Investment Context (2025)

### Current Market Rates:
- **T-Bills**: 15.5-17.5% yields (0% tax)
- **Money Market Funds**: 13-15% (taxable)
- **Top Dividend Stocks**:
  - Standard Chartered Kenya: ~16% yield
  - NCBA Bank: ~9% yield
  - KCB Group: ~7% yield
  - Safaricom: ~4% yield

### Tax Structure:
- T-Bills/T-Bonds: **0% tax** ✅
- Dividends: **5% withholding tax**
- Bank interest: **15% withholding tax**

## 🚀 How to Use

### Live Demo
*[Will be deployed on Vercel/Netlify - link coming soon]*

### Run Locally
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/kenya-investment-calculator.git

# Navigate to directory
cd kenya-investment-calculator

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser to http://localhost:5173
```

## 📖 Usage Guide

1. **Set Investment Amount**: Enter your capital (minimum KES 50,000)
2. **Adjust Yields**: Update T-Bill and dividend yields based on current rates
3. **Add Appreciation**: Estimate stock price growth (historical average: 8-12%)
4. **Choose Timeline**: Select investment period (1-30 years)
5. **Mix Portfolio**: Use slider to allocate between T-Bills and stocks
6. **Analyze Results**: View charts, tables, and key metrics

## 📐 Calculation Methodology

### T-Bills:
```
Annual Return = Investment × (Yield / 100)
After-Tax Return = Annual Return × (1 - 0%) = Annual Return
Compound Value = Investment × (1 + Yield)^Years
```

### Dividend Stocks:
```
Gross Dividend = Investment × (Dividend Yield / 100)
Net Dividend = Gross Dividend × (1 - 0.05)
Stock Value Growth = Investment × (1 + Appreciation%)^Years
Total Value = Stock Value + Accumulated Dividends
```

### Mixed Portfolio:
```
Weighted returns based on allocation percentage
```

## 🎓 Educational Value

This project demonstrates:

- **Financial Modeling**: Compound interest, tax calculations, portfolio theory
- **React Development**: Hooks (useState, useMemo), component architecture
- **Data Visualization**: Interactive charts with user inputs
- **UX Design**: Responsive layout, intuitive controls
- **Real-World Application**: Solving actual investment problems in Kenya

## 📈 Example Scenarios

### Goal: KES 500,000 Annual Income

**Option 1: Pure T-Bills (16.5%)**
- Investment needed: **KES 3,030,303**
- Tax-free returns

**Option 2: Pure Dividend Stocks (7.5% yield)**
- Investment needed: **KES 7,017,544**
- Plus capital appreciation potential

**Option 3: Balanced (50/50)**
- Investment needed: **KES 4,500,000**
- Diversified risk

## 🔮 Future Enhancements

- [ ] Add Money Market Funds comparison
- [ ] Include Saccos and REITs
- [ ] Monte Carlo simulation for risk analysis
- [ ] Inflation-adjusted returns
- [ ] Portfolio optimization algorithm (maximize return/minimize risk)
- [ ] Export results to PDF
- [ ] Save/load investment scenarios
- [ ] Historical performance backtesting
- [ ] Mobile app version (React Native)

## 👨‍💼 About the Developer

**[Daniel Kiendi]** - MSc Economics Graduate

Passionate about financial literacy and data-driven investing in Kenya. Combining economics expertise with software development to create practical financial tools.

### Skills Demonstrated:
- Financial Analysis & Modeling
- React/JavaScript Development
- Data Visualization
- UI/UX Design
- Kenya Financial Markets Knowledge

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

- **LinkedIn**: http://www.linkedin.com/in/daniel-kiendi
- **Email**: danielkiendik@gmail.com
- **Portfolio**: 
- **GitHub**: @danelkiendi(https://github.com/danielkiendik-coder)

## ⚠️ Disclaimer

This calculator is for **educational and informational purposes only**. It does not constitute financial advice. Always consult with a qualified financial advisor before making investment decisions. Past performance does not guarantee future results.

---

### 🌟 If you found this helpful, please star the repository!

**Keywords**: Kenya Investment, T-Bills, Treasury Bills, Dividend Stocks, NSE, Nairobi Securities Exchange, Tax Calculator, Financial Planning, React Calculator, Investment Calculator, Compound Interest
