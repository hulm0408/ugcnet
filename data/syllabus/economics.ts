import type { OfficialSyllabusUnit, SyllabusSourceInfo } from '../../config/subjects/types';

export const economicsSyllabusSource: SyllabusSourceInfo = {
  authority: 'UGC / NTA',
  documentTitle: 'UGC NET Economics (Code 01) Official Syllabus',
  retrievedDate: '2024-08',
  verified: true,
};

export const economicsSyllabus: OfficialSyllabusUnit[] = [
  {
    unitNumber: 1,
    title: 'Unit 1: Microeconomics',
    topics: [
      {
        name: 'Theory of Consumer Behaviour',
        subtopics: [
          { name: 'Cardinal Utility Analysis: Law of Diminishing Marginal Utility, Law of Equi-Marginal Utility, Consumer Surplus (Marshall vs Hicks)' },
          { name: 'Ordinal Utility Analysis: Indifference Curves (Properties, Marginal Rate of Substitution MRS), Consumer Equilibrium, Budget Line' },
          { name: 'Income and Substitution Effects: Slutsky Decomposition vs Hicksian Decomposition, Normal, Inferior, and Giffen Goods' },
          { name: 'Revealed Preference Theory (Paul Samuelson: Weak Axiom WARP and Strong Axiom SARP), Elasticity of Demand (Price, Income, Cross, Substitution Elasticities)' },
          { name: 'Choice under Uncertainty and Risk: Expected Utility Theory (Von Neumann-Morgenstern VNM Utility, Risk Aversion, Risk Neutrality, Risk Loving, St. Petersburg Paradox, Friedman-Savage Hypothesis)' },
        ],
      },
      {
        name: 'Theory of Production and Costs',
        subtopics: [
          { name: 'Production Function: Short-Run (Law of Variable Proportions - 3 Stages of Production) vs Long-Run (Laws of Returns to Scale, Isoquants, Isocost Lines, Expansion Path, Ridge Lines)' },
          { name: 'Specific Production Functions: Cobb-Douglas (Properties, Euler’s Theorem on Distribution), Constant Elasticity of Substitution (CES) Production Function (Arrow, Chenery, Minhas, Solow - Elasticity of substitution σ = 1 / (1 + ρ)), Leontief Fixed Proportions Production Function' },
          { name: 'Cost Functions: Short-run Cost Curves (AFC, AVC, ATC, MC), Long-run Average Cost (LAC / Envelope Curve, Economies and Diseconomies of Scale), Learning Curve / Experience Curve' },
        ],
      },
      {
        name: 'Market Structures and Pricing Decisions',
        subtopics: [
          { name: 'Perfect Competition: Short-Run and Long-Run Equilibrium of Firm and Industry, Shut-down Point, Supply Curve of Firm' },
          { name: 'Monopoly: Pricing and Output, Deadweight Loss, Natural Monopoly, Price Discrimination (1st, 2nd, 3rd Degree - Pigou Conditions, Peak-Load Pricing, Transfer Pricing)' },
          { name: 'Monopolistic Competition: Edward Chamberlin’s Model (Individual & Group Equilibrium, Selling Costs, Excess Capacity Theorem)' },
          { name: 'Oligopoly Non-Collusive Models: Cournot Duopoly (Reaction Curves, Output = 2/3 of competitive output), Bertrand Duopoly (Price competition / Paradox), Stackelberg Leader-Follower Model, Paul Sweezy’s Kinked Demand Curve (Price Rigidity)' },
          { name: 'Oligopoly Collusive Models: Cartels (Joint Profit Maximization) and Price Leadership Models (Dominant Firm, Barometric, Low-Cost)' },
        ],
      },
      {
        name: 'Game Theory, General Equilibrium and Welfare Economics',
        subtopics: [
          { name: 'Game Theory: Cooperative vs Non-Cooperative Games, Normal/Strategic Form vs Extensive Form, Dominant Strategy, Nash Equilibrium, Prisoner’s Dilemma, Subgame Perfect Nash Equilibrium (SPNE)' },
          { name: 'General Equilibrium Analysis: Walrasian General Equilibrium, Edgeworth-Bowley Box Diagram, Contract Curve, Production Possibility Frontier' },
          { name: 'Welfare Economics: Pareto Optimality Criteria (Efficiency in Consumption, Production, Product Mix - Marginal Conditions), First and Second Fundamental Theorems of Welfare Economics' },
          { name: 'Compensation Criteria: Kaldor-Hicks Criterion, Scitovsky Double Criterion, Bergson-Samuelson Social Welfare Function, Kenneth Arrow’s Impossibility Theorem' },
          { name: 'Asymmetric Information and Market Failure: Adverse Selection (George Akerlof - Market for Lemons), Moral Hazard (Principal-Agent Problem), Signaling (Spence), Screening (Rothschild-Stiglitz)' },
        ],
      },
    ],
  },
  {
    unitNumber: 2,
    title: 'Unit 2: Macroeconomics',
    topics: [
      {
        name: 'National Income Accounting and Classical vs Keynesian Macroeconomics',
        subtopics: [
          { name: 'National Income Concepts: GDP, GNP, NNP, National Income at Factor Cost vs Market Price, Real vs Nominal GDP, GDP Deflator, Green National Accounting' },
          { name: 'Circular Flow of Income (Two, Three, Four-Sector Models), Methods of Measuring National Income (Output/Value Added, Income, Expenditure methods)' },
          { name: 'Classical Macroeconomic Model: Say’s Law of Markets (Supply creates its own demand), Wage-Price Flexibility, Full Employment Equilibrium, Classical Dichotomy, Quantity Theory of Money (Fisher MV=PT, Cambridge Cash Balance equations)' },
          { name: 'Keynesian Macroeconomics: Principle of Effective Demand (Aggregate Demand vs Aggregate Supply), Consumption Function (Marginal Propensity to Consume MPC, Average Propensity to Consume APC), Investment Multiplier (k = 1 / (1 - MPC)), Liquidity Preference Theory of Interest (Transactions, Precautionary, Speculative Motives, Liquidity Trap)' },
        ],
      },
      {
        name: 'Theories of Consumption and Investment',
        subtopics: [
          { name: 'Consumption Hypotheses: Absolute Income Hypothesis (Keynes - Non-proportional), Relative Income Hypothesis (James Duesenberry - Demonstration Effect, Ratchet Effect), Permanent Income Hypothesis (Milton Friedman - Transitory vs Permanent Income), Life-Cycle Hypothesis (Franco Modigliani - Wealth and Age Profile), Random Walk Model (Robert Hall)' },
          { name: 'Theories of Investment: Marginal Efficiency of Capital (MEC) vs Marginal Efficiency of Investment (MEI), Accelerator Principle (Simple & Flexible Accelerator), Jorgenson’s Neoclassical Investment Model, Tobin’s q Theory of Investment' },
        ],
      },
      {
        name: 'IS-LM Model and Open-Economy Mundell-Fleming Framework',
        subtopics: [
          { name: 'IS Curve (Goods Market Equilibrium: Y = C + I(r) + G, Slope, Shifts)' },
          { name: 'LM Curve (Money Market Equilibrium: M/P = L(r, Y), Slope, Shifts)' },
          { name: 'General Equilibrium in IS-LM Framework, Fiscal Policy vs Monetary Policy Effectiveness (Crowding Out Effect, Horizontal vs Vertical LM cases)' },
          { name: 'Mundell-Fleming Model (Open Economy IS-LM-BP): Perfect Capital Mobility (BP curve horizontal), Fiscal and Monetary Policy efficacy under Fixed vs Flexible Exchange Rates' },
        ],
      },
      {
        name: 'Inflation, Unemployment and Macroeconomic Schools of Thought',
        subtopics: [
          { name: 'Inflation: Demand-Pull vs Cost-Push, Structural Inflation, Inflationary and Deflationary Gaps' },
          { name: 'Phillips Curve: Original Phillips Curve (Inverse Wage-Unemployment Trade-off), Short-Run vs Long-Run Phillips Curve (Milton Friedman & Edmund Phelps - Natural Rate of Unemployment NRU / NAIRU, Adaptive Expectations)' },
          { name: 'Rational Expectations and New Classical Macroeconomics: Lucas Critique, Policy Ineffectiveness Proposition (Sargent & Wallace), Real Business Cycle (RBC) Theory (Edward Prescott, Finn Kydland - Productivity Shocks)' },
          { name: 'New Keynesian Economics: Nominal & Real Rigidities, Menu Costs, Efficiency Wage Theory (Stiglitz, Shapiro-Stiglitz), Staggered Wage & Price Setting (Taylor, Calvo)' },
        ],
      },
    ],
  },
  {
    unitNumber: 3,
    title: 'Unit 3: Statistics and Econometrics',
    topics: [
      {
        name: 'Probability, Random Variables and Probability Distributions',
        subtopics: [
          { name: 'Probability Concepts: Axioms, Conditional Probability, Bayes’ Theorem, Mathematical Expectation and Moments' },
          { name: 'Discrete Probability Distributions: Binomial Distribution (Mean = np, Variance = npq), Poisson Distribution (Mean = Variance = λ)' },
          { name: 'Continuous Probability Distributions: Normal Distribution (Bell-shaped curve, Standard Normal Variate Z), Log-Normal, Student’s t-Distribution, Chi-Square (χ²) Distribution, Snedecor’s F-Distribution' },
        ],
      },
      {
        name: 'Sampling, Estimation and Hypothesis Testing',
        subtopics: [
          { name: 'Sampling Techniques (Random vs Non-random) and Sampling Distributions, Central Limit Theorem' },
          { name: 'Point and Interval Estimation: Desirable Properties of an Estimator (Unbiasedness, Efficiency / Minimum Variance, Consistency, Sufficiency - Cramer-Rao Inequality, BLUE)' },
          { name: 'Hypothesis Testing: Null (H0) and Alternative (H1) Hypotheses, Type I Error (α) vs Type II Error (β), Power of the Test (1 - β), p-value, One-tailed vs Two-tailed tests, Tests of Significance (z-test, t-test, F-test, Chi-Square test of Independence and Goodness of Fit)' },
        ],
      },
      {
        name: 'Classical Linear Regression Model (CLRM) and OLS Estimation',
        subtopics: [
          { name: 'Two-Variable and Multiple Linear Regression Models: Ordinary Least Squares (OLS) Method' },
          { name: 'Gauss-Markov Assumptions and Theorem: Proof that OLS Estimators are BLUE (Best Linear Unbiased Estimators)' },
          { name: 'Coefficient of Determination (R²) and Adjusted R² (R̄²), Hypothesis Testing of Regression Coefficients (t-test for individual coefficients, F-test for overall model significance)' },
        ],
      },
      {
        name: 'Econometric Violations of OLS Assumptions and Time Series',
        subtopics: [
          { name: 'Multicollinearity: Consequences, Detection (High R² with insignificant t-ratios, VIF / Variance Inflation Factor, Tolerance), Remedial Measures' },
          { name: 'Heteroscedasticity: Non-constant error variance, Consequences (OLS unbiased but inefficient, biased standard errors), Detection (Park Test, Glejser Test, Goldfeld-Quandt Test, White’s General Test, Breusch-Pagan Test), Remedial Measures (Weighted Least Squares WLS)' },
          { name: 'Autocorrelation / Serial Correlation: Correlated error terms, Consequences, Detection (Durbin-Watson d-statistic - Assumptions and limitations, Breusch-Godfrey LM Test), Remedial Measures (Cochrane-Orcutt, Prais-Winsten transformations)' },
          { name: 'Autoregressive and Distributed Lag Models: Koyck Approach, Almon Lag Model, Instrumental Variables (IV) and Two-Stage Least Squares (2SLS)' },
          { name: 'Time Series Econometrics: Stationarity vs Non-Stationarity (Unit Root Tests: Augmented Dickey-Fuller ADF, Phillips-Perron), Spurious Regression, Cointegration (Engle-Granger Two-Step, Johansen Test), Error Correction Model (ECM), ARIMA Modeling (Box-Jenkins Methodology)' },
        ],
      },
    ],
  },
  {
    unitNumber: 4,
    title: 'Unit 4: Mathematical Economics',
    topics: [
      {
        name: 'Differential Calculus and Optimization in Economics',
        subtopics: [
          { name: 'Functions, Limits, Continuity, Derivatives of Single and Multivariable Functions' },
          { name: 'Unconstrained Optimization: First-order conditions (FOC) and Second-order conditions (SOC - Hessian Matrix) for Profit Maximization and Cost Minimization' },
          { name: 'Constrained Optimization: Lagrange Multiplier Method (Consumer Utility Maximization subject to Budget Constraint, Producer Cost Minimization subject to Output Constraint), Bordered Hessian Matrix' },
          { name: 'Kuhn-Tucker Conditions for Non-Linear Programming with Inequality Constraints, Duality Theory, Slutsky Equation Mathematical Derivation' },
        ],
      },
      {
        name: 'Integral Calculus and Differential / Difference Equations',
        subtopics: [
          { name: 'Definite and Indefinite Integrals, Consumer Surplus and Producer Surplus calculations' },
          { name: 'First-Order and Second-Order Differential Equations: Dynamic Market Equilibrium, Continuous-Time Growth Models (Solow Model Dynamics)' },
          { name: 'First-Order and Second-Order Difference Equations: Cobweb Model of Price Adjustment, Samuelson’s Multiplier-Accelerator Interaction Model' },
        ],
      },
      {
        name: 'Linear Algebra and Input-Output / Linear Programming Models',
        subtopics: [
          { name: 'Matrices and Determinants: Matrix Operations, Transpose, Inverse, Rank, Cramer’s Rule for Solving Systems of Simultaneous Equations' },
          { name: 'Input-Output Analysis (Wassily Leontief): Open vs Closed Input-Output Models, Technical Coefficient Matrix (A Matrix), Leontief Inverse (I - A)^(-1), Hawkins-Simon Conditions for Feasibility' },
          { name: 'Linear Programming (LP): Primal and Dual Problems, Graphical Method, Simplex Method, Duality Theorems (Fundamental, Weak, Strong Duality, Complementary Slackness)' },
        ],
      },
    ],
  },
  {
    unitNumber: 5,
    title: 'Unit 5: International Economics',
    topics: [
      {
        name: 'Theories of International Trade',
        subtopics: [
          { name: 'Mercantilism and Classical Theories: Absolute Cost Advantage (Adam Smith), Comparative Cost Advantage (David Ricardo - Opportunity Cost Formulation by Gottfried Haberler)' },
          { name: 'Standard Theory of International Trade: Offer Curves (Marshall and Edgeworth), Terms of Trade (Net Barter, Gross Barter, Income, Single and Double Factoral Terms of Trade), Gains from Trade' },
          { name: 'Heckscher-Ohlin Theory (Factor Proportions Theory / 2x2x2 Model): Factor Price Equalization Theorem (Samuelson), Stolper-Samuelson Theorem (Tariff and Income Distribution), Rybczynski Theorem (Factor Endowment Growth and Output)' },
          { name: 'Empirical Verification: Leontief Paradox and Explanations (Human Capital, R&D, Factor Intensity Reversals)' },
          { name: 'Modern / Intra-Industry Trade Theories: Kravis Availability Theory, Linder’s Representative Demand Hypothesis, Vernon’s Product Life Cycle Theory, Paul Krugman’s New Trade Theory (Monopolistic Competition, Economies of Scale)' },
        ],
      },
      {
        name: 'Trade Policies, Tariffs, Quotas and Economic Integration',
        subtopics: [
          { name: 'Trade Barriers: Partial Equilibrium Effects of Tariffs in Small and Large Countries (Price, Consumption, Production, Trade, Revenue, and Redistribution Effects, Optimum Tariff Formula)' },
          { name: 'Non-Tariff Barriers (NTBs): Import Quotas (Equivalence of Tariff and Quota), Voluntary Export Restraints (VERs), Export Subsidies, Dumping and Anti-Dumping Duties' },
          { name: 'Effective Rate of Protection (ERP) vs Nominal Rate of Protection (NRP)' },
          { name: 'Economic Integration: Jacob Viner’s Customs Union Theory (Trade Creation vs Trade Diversion Effects), Forms of Integration (PTA, FTA, Customs Union, Common Market, Economic Union)' },
        ],
      },
      {
        name: 'Balance of Payments and Foreign Exchange Markets',
        subtopics: [
          { name: 'Balance of Payments (BOP) Accounting: Current Account vs Capital Account, Autonomous vs Accommodating Transactions, Overall Balance' },
          { name: 'BOP Adjustment Approaches: Elasticity Approach (Marshall-Lerner Condition: |e_x + e_m| > 1, J-Curve Effect), Absorption Approach (Sidney Alexander: B = Y - A), Monetary Approach to Balance of Payments' },
          { name: 'Foreign Exchange Rate Determination: Purchasing Power Parity (PPP - Absolute vs Relative), Interest Rate Parity (Covered vs Uncovered IRP), Spot vs Forward Exchange Rates' },
          { name: 'International Financial Architecture: Gold Standard, Bretton Woods System (Fixed Exchange Rates), IMF (Special Drawing Rights SDRs, Quotas), World Bank Group (IBRD, IDA, IFC), WTO Framework' },
        ],
      },
    ],
  },
  {
    unitNumber: 6,
    title: 'Unit 6: Public Economics',
    topics: [
      {
        name: 'Market Failure, Public Goods and Externalities',
        subtopics: [
          { name: 'Role of Government in Economic Activity: Allocation, Distribution, Stabilization Functions (Richard Musgrave)' },
          { name: 'Market Failure: Causes (Monopoly Power, Asymmetric Information, Missing Markets)' },
          { name: 'Public Goods: Pure Public Goods (Non-Rivalry and Non-Excludability), Pure Private Goods, Club Goods, Common Pool Resources (Tragedy of the Commons - Garrett Hardin)' },
          { name: 'Free-Rider Problem, Efficient Provision of Public Goods (Samuelson Condition: ΣMRS = MRT), Lindahl Equilibrium / Voluntary Exchange Model' },
          { name: 'Externalities: Positive vs Negative Externalities, Pigouvian Taxes and Subsidies, Coase Theorem (Property Rights and Costless Bargaining)' },
        ],
      },
      {
        name: 'Public Revenue and Taxation Principles',
        subtopics: [
          { name: 'Canons of Taxation (Adam Smith: Equality/Ability, Certainty, Convenience, Economy)' },
          { name: 'Tax Principles: Benefit Principle (Lindahl, Erik) vs Ability to Pay Principle (Sacrifice Theories: Equal Absolute, Equal Proportional, Equal Marginal Sacrifice)' },
          { name: 'Types of Taxes: Direct vs Indirect Taxes, Proportional, Progressive, Regressive, Degressive Taxation, Specific vs Ad-Valorem Taxes' },
          { name: 'Incidence and Shifting of Taxation: Impact, Shifting, and Incidence of Tax, Elasticity of Demand/Supply and Tax Burden, Deadweight Loss of Taxation (Harberger Triangle)' },
          { name: 'Optimal Taxation: Ramsey Rule of Optimal Commodity Taxation, Mirrlees Optimal Income Taxation, Laffer Curve (Tax Rates vs Revenue)' },
        ],
      },
      {
        name: 'Public Expenditure, Public Debt and Fiscal Federalism',
        subtopics: [
          { name: 'Theories of Public Expenditure: Wagner’s Law of Increasing State Activity, Wiseman-Peacock Hypothesis (Displacement, Inspection, Concentration Effects), Colin Clark’s Critical Limit Hypothesis (25% Ceiling)' },
          { name: 'Public Debt: Sources, Classical vs Keynesian Views, Burden of Public Debt (Internal vs External Debt, Buchanan, Modigliani), Debt Sustainability, Ricardian Equivalence Theorem (Robert Barro)' },
          { name: 'Fiscal Policy & Budgeting: Revenue Deficit, Fiscal Deficit, Primary Deficit, Effective Revenue Deficit, Zero-Base Budgeting (ZBB), Gender Budgeting, FRBM Act 2003' },
          { name: 'Fiscal Federalism in India: Vertical and Horizontal Fiscal Imbalance, Principles of Devolution, Finance Commission of India (Article 280 - Terms of Reference, Criteria for Horizontal Devolution), Goods and Services Tax (GST - Dual GST, GST Council Article 279A)' },
        ],
      },
    ],
  },
  {
    unitNumber: 7,
    title: 'Unit 7: Money and Banking',
    topics: [
      {
        name: 'Money Supply, Money Multiplier and Central Banking',
        subtopics: [
          { name: 'Money Supply Measures in India: Reserve Money (High-Powered Money / Base Money H or M0), Narrow Money (M1: Currency + Demand Deposits + Other Deposits with RBI), Broad Money (M3: M1 + Time Deposits with Banks), NM1, NM2, NM3, L1, L2, L3' },
          { name: 'Money Multiplier Process: Determinants of Money Multiplier (Currency-Deposit Ratio c, Reserve-Deposit Ratio r = CRR + e), Relationship between High-Powered Money and Money Supply (M = m × H)' },
          { name: 'Reserve Bank of India (RBI): Functions, Monetary Policy Instruments (Quantitative: Cash Reserve Ratio CRR, Statutory Liquidity Ratio SLR, Repo Rate, Reverse Repo Rate, Standing Deposit Facility SDF, Marginal Standing Facility MSF, Open Market Operations OMO; Qualitative: Margin Requirements, Moral Suasion)' },
          { name: 'Monetary Policy Transmission Channels: Interest Rate, Credit, Asset Price, and Exchange Rate Channels, Inflation Targeting Framework in India (Monetary Policy Committee MPC: 4% ± 2% CPI target)' },
        ],
      },
      {
        name: 'Commercial Banking, Non-Banking Financial Institutions and Financial Markets',
        subtopics: [
          { name: 'Commercial Banking: Functions, Credit Creation Process (Deposit Multiplier = 1 / r), Balance Sheet of Banks, Non-Performing Assets (NPAs - Sub-Standard, Doubtful, Loss Assets, Provisioning norms, SARFAESI Act, IBC 2016)' },
          { name: 'Capital Adequacy Norms: Basel I, II, III Accords (CRAR / Capital to Risk-Weighted Assets Ratio, Tier 1 and Tier 2 Capital, Leverage Ratio, Liquidity Coverage Ratio LCR)' },
          { name: 'Non-Banking Financial Companies (NBFCs), Development Financial Institutions (NABARD, SIDBI, EXIM Bank, NHB)' },
          { name: 'Financial Markets in India: Money Market Instruments (Treasury Bills, Commercial Paper, Certificates of Deposit, Call Money) and Capital Market (Primary vs Secondary Markets, Stock Exchanges, SEBI Regulation)' },
        ],
      },
    ],
  },
  {
    unitNumber: 8,
    title: 'Unit 8: Growth and Development Economics',
    topics: [
      {
        name: 'Economic Growth vs Development and Measurement Indices',
        subtopics: [
          { name: 'Economic Growth vs Economic Development: Growth as quantitative change vs Development as structural transformation' },
          { name: 'Measuring Development: Human Development Index (HDI - Geometric mean of Life Expectancy, Education, GNI per capita), Inequality-Adjusted HDI (IHDI), Gender Inequality Index (GII), Multidimensional Poverty Index (MPI - Oxford OPHI / UNDP 10 indicators), Physical Quality of Life Index (PQLI - Morris D. Morris: Infant Mortality, Life Expectancy at age 1, Basic Literacy)' },
          { name: 'Poverty and Inequality: Lorenz Curve, Gini Coefficient, Kuznets Inverted-U Hypothesis, Headcount Ratio, Poverty Gap Index, Squared Poverty Gap, Sen’s Poverty Index, Capability Approach (Amartya Sen: Development as Freedom)' },
        ],
      },
      {
        name: 'Classical and Structural Theories of Development',
        subtopics: [
          { name: 'Classical Theories: Adam Smith (Division of Labour, Capital Accumulation), David Ricardo (Stationary State, Agricultural Bottleneck), Karl Marx (Organic Composition of Capital, Falling Rate of Profit), Joseph Schumpeter (Role of Innovator, Creative Destruction, Business Cycles)' },
          { name: 'Stages of Economic Growth (W.W. Rostow: Traditional Society, Pre-conditions for Take-off, Take-off, Drive to Maturity, Age of High Mass Consumption)' },
          { name: 'Structural Change Models: W. Arthur Lewis (Two-Sector Model: Unlimited Supplies of Labour, Capitalist Surplus), Fei-Ranis Model, Michael Todaro Model of Rural-Urban Migration and Urban Unemployment' },
        ],
      },
      {
        name: 'Strategies of Economic Development',
        subtopics: [
          { name: 'Big Push Theory (Paul Rosenstein-Rodan: Indivisibilities in Production, Demand, and Supply of Savings)' },
          { name: 'Balanced Growth Theory (Ragnar Nurkse: Vicious Circles of Poverty, Synchronization of Investment across industries; Arthur Lewis)' },
          { name: 'Unbalanced Growth Theory (Albert O. Hirschman: Forward and Backward Linkages, SOC vs DPA priority paths)' },
          { name: 'Critical Minimum Effort Thesis (Harvey Leibenstein: Shocks vs Stimulants, Per Capita Income Threshold) and Low-Level Equilibrium Trap (Richard Nelson)' },
          { name: 'Dependency Theories: Raúl Prebisch & Hans Singer (Prebisch-Singer Hypothesis: Secular Deterioration in Terms of Trade for Primary Commodities), Andre Gunder Frank (Development of Underdevelopment), Samir Amin' },
        ],
      },
      {
        name: 'Theories and Models of Economic Growth',
        subtopics: [
          { name: 'Harrod-Domar Growth Model: Dual Role of Investment (Income Generating vs Capacity Creating), Harrod’s Fundamental Growth Equation (GC = s, Actual vs Warranted Gw vs Natural Gn Growth Rates, Knife-Edge Instability Problem)' },
          { name: 'Neoclassical Growth Model (Robert Solow - 1956): Production Function with Diminishing Returns, Steady State Equilibrium (sf(k) = (n + g + δ)k), Golden Rule of Capital Accumulation (Edmund Phelps: MPK = n + g + δ), Conditional vs Absolute Convergence Hypothesis, Solow Residual / Total Factor Productivity (TFP)' },
          { name: 'Cambridge Growth Models: Joan Robinson’s Growth Model (Golden Age Equilibrium), Nicholas Kaldor’s Growth Model' },
          { name: 'Endogenous Growth Theory (New Growth Theory): Paul Romer (AK Model, Increasing Returns, R&D Spillovers), Robert Lucas (Human Capital Accumulation), Aghion-Howitt (Schumpeterian Creative Destruction in Endogenous Growth)' },
        ],
      },
    ],
  },
  {
    unitNumber: 9,
    title: 'Unit 9: Environmental Economics and Demography',
    topics: [
      {
        name: 'Environmental Economics: Valuation, Externalities and Market Mechanisms',
        subtopics: [
          { name: 'Environment as a Public Good, Market Failure and Environmental Externalities' },
          { name: 'Environmental Valuation Techniques: Stated Preference Methods (Contingent Valuation Method CVM - Willingness to Pay WTP vs Willingness to Accept WTA) vs Revealed Preference Methods (Hedonic Pricing Method, Travel Cost Method TCM)' },
          { name: 'Environmental Policy Instruments: Command and Control vs Market-Based Instruments (Pigouvian Emission Taxes, Subsidies, Cap-and-Trade / Tradable Pollution Permits, Coase Bargaining Solution)' },
          { name: 'Environmental Kuznets Curve (EKC - Inverted U-shaped relationship between GDP per capita and Environmental Degradation)' },
          { name: 'Sustainable Development: Weak Sustainability (Hartwick’s Rule) vs Strong Sustainability, Natural Capital, Carbon Credits and Clean Development Mechanism (CDM)' },
        ],
      },
      {
        name: 'Demography: Theories, Measures and Life Tables',
        subtopics: [
          { name: 'Demographic Theories: Malthusian Theory of Population, Demographic Transition Model (Frank Notestein - 5 Stages)' },
          { name: 'Fertility and Mortality Measures: Crude Birth Rate (CBR), General Fertility Rate (GFR), Age-Specific Fertility Rate (ASFR), Total Fertility Rate (TFR - Replacement Level 2.1), Crude Death Rate (CDR), Infant Mortality Rate (IMR), Maternal Mortality Ratio (MMR)' },
          { name: 'Life Table: Construction, Columns of Life Table (lx, dx, qx, px, Lx, Tx, ex - Expectation of life at birth e0)' },
          { name: 'Population Age Structure and Demographic Dividend: Age-Sex Pyramids, Dependency Ratio, Ageing of Population, Census of India Demographics' },
        ],
      },
    ],
  },
  {
    unitNumber: 10,
    title: 'Unit 10: Indian Economy',
    topics: [
      {
        name: 'Economic Growth, Structural Change and Planning in India',
        subtopics: [
          { name: 'Trends in National Income, Per Capita Income, and Structural Composition of GDP (Primary, Secondary, Tertiary sectors)' },
          { name: 'Planning in India: Objectives, Strategies, Mahalanobis Heavy Industrialization Strategy (Second Plan), Evolution from Planning Commission to NITI Aayog (Composition, Team India, Knowledge & Innovation Hubs, SDG India Index)' },
        ],
      },
      {
        name: 'Agriculture and Rural Development',
        subtopics: [
          { name: 'Agriculture: Growth, Productivity Trends, Cropping Patterns, Land Reforms in India' },
          { name: 'Agricultural Inputs & Pricing: Green Revolution, Minimum Support Price (MSP - CACP Cost Concepts: A2, A2+FL, C2), Public Distribution System (PDS / NFSA 2013), PM-KISAN' },
          { name: 'Agricultural Credit and Marketing: Priority Sector Lending (PSL), NABARD, Kisan Credit Card (KCC), e-NAM (National Agriculture Market), Farm Subsidies debate' },
        ],
      },
      {
        name: 'Industrial Sector and Infrastructure',
        subtopics: [
          { name: 'Industrial Growth and Policy Reforms: Industrial Policy Resolutions (1948, 1956), New Economic Policy 1991 (LPG: Liberalization, Privatization, Globalization, Disinvestment policies)' },
          { name: 'MSME Sector: Definition, Revised Classification under MSMED Act, Role in Employment and Exports' },
          { name: 'Make in India, Production Linked Incentive (PLI) Schemes, National Manufacturing Policy' },
          { name: 'Infrastructure Development: Energy, Transport (Bharatmala, Sagarmala, PM Gati Shakti), Digital Infrastructure (Digital India, UPI)' },
        ],
      },
      {
        name: 'Foreign Trade, Balance of Payments and Fiscal / Financial Reforms',
        subtopics: [
          { name: 'Foreign Trade of India: Volume, Composition, and Direction of Merchandise and Services Trade, Foreign Trade Policy (FTP)' },
          { name: 'Balance of Payments Trends: Current Account Deficit (CAD), Foreign Exchange Reserves management, FDI and FPI Inflows' },
          { name: 'Fiscal and Tax Reforms in India: Direct Tax Reforms, Goods and Services Tax (GST Implementation and Performance), FRBM Act targets' },
          { name: 'Banking and Financial Sector Reforms: Narasimham Committee I & II recommendations, Raghuram Rajan & Urjit Patel Committee reports, Insolvency and Bankruptcy Code (IBC 2016), Pradhan Mantri Jan Dhan Yojana (PMJDY)' },
        ],
      },
    ],
  },
];
