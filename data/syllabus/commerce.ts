import type { OfficialSyllabusUnit, SyllabusSourceInfo } from '../../config/subjects/types';

export const commerceSyllabusSource: SyllabusSourceInfo = {
  authority: 'UGC / NTA',
  documentTitle: 'UGC NET Commerce (Code 08) Official Syllabus',
  retrievedDate: '2024-08',
  verified: true,
};

export const commerceSyllabus: OfficialSyllabusUnit[] = [
  {
    unitNumber: 1,
    title: 'Unit 1: Business Environment and International Business',
    topics: [
      {
        name: 'Concepts and Elements of Business Environment',
        subtopics: [
          { name: 'Internal Environment: Promoters, Board of Directors, Organizational structure, Culture' },
          { name: 'External Environment: Micro (Suppliers, Customers, Competitors) and Macro (PESTLE framework)' },
          { name: 'Economic Systems: Capitalism, Socialism, Mixed Economy' },
          { name: 'Economic Policies: Monetary policy (RBI Repo/CRR/SLR), Fiscal policy, Industrial policy, FEMA 1999' },
        ],
      },
      {
        name: 'Corporate Social Responsibility and Environmental Governance',
        subtopics: [
          { name: 'CSR Provisions under Companies Act 2013 (Section 135, Schedule VII - 2% net profit mandate)' },
          { name: 'Corporate Governance Models: Anglo-American, German, Japanese, Indian (SEBI LODR regulations)' },
          { name: 'Business Ethics and Consumer Protection Act, 2019 (Three-tier redressal commission structure)' },
        ],
      },
      {
        name: 'Scope, Modes of Entry and Theories of International Business',
        subtopics: [
          { name: 'Modes of Entry into International Business: Exporting, Licensing, Franchising, Joint Ventures, FDI, Turnkey projects' },
          { name: 'Classical Trade Theories: Mercantilism, Absolute Advantage (Adam Smith), Comparative Cost Advantage (David Ricardo), Opportunity Cost (Haberler)' },
          { name: 'Modern Trade Theories: Heckscher-Ohlin Theory (Factor Proportions), Leontief Paradox, Product Life Cycle Theory (Raymond Vernon), Porter’s National Competitive Advantage (Diamond Model)' },
        ],
      },
      {
        name: 'Foreign Direct Investment (FDI), FPI and Balance of Payments (BOP)',
        subtopics: [
          { name: 'FDI vs Foreign Portfolio Investment (FPI): Horizontal, Vertical, Conglomerate FDI' },
          { name: 'FDI Inflows, Outflows and Sectoral Caps under Automatic and Government Approval Routes' },
          { name: 'Balance of Payments (BOP): Current Account (Trade in Goods & Services, Unilateral transfers) vs Capital Account (FDI, FPI, External Commercial Borrowings ECB)' },
          { name: 'BOP Disequilibrium: Causes, Adjustment mechanisms (Devaluation, Expenditure reduction/switching)' },
        ],
      },
      {
        name: 'Regional Economic Integration and Trade Agreements',
        subtopics: [
          { name: 'Levels of Regional Integration: Preferential Trade Area (PTA), Free Trade Area (FTA), Customs Union (CU), Common Market (CM), Economic Union (EU)' },
          { name: 'Major Blocs: European Union (EU), ASEAN, SAARC/SAFTA, NAFTA/USMCA, BRICS, BIMSTEC' },
        ],
      },
      {
        name: 'International Economic Institutions and WTO Framework',
        subtopics: [
          { name: 'Bretton Woods Institutions: International Monetary Fund (IMF - SDRs, Quotas, Tranche policies), World Bank Group (IBRD, IDA, IFC, MIGA, ICSID)' },
          { name: 'UNCTAD and World Trade Organization (WTO): Evolution from GATT 1947 to WTO 1995 (Marrakesh Agreement)' },
          { name: 'Key WTO Agreements: GATT, GATS (Modes 1 to 4 of service supply), TRIPS (Patents, Copyrights, Trademarks, Geographical Indications), TRIMS, Agreement on Agriculture (AoA - Green, Amber, Blue Boxes)' },
        ],
      },
    ],
  },
  {
    unitNumber: 2,
    title: 'Unit 2: Accounting and Auditing',
    topics: [
      {
        name: 'Basic Accounting Principles, Concepts and Ind AS / IFRS Standards',
        subtopics: [
          { name: 'Accounting Concepts: Entity, Money Measurement, Going Concern, Dual Aspect, Accrual, Matching, Conservatism' },
          { name: 'Indian Accounting Standards (Ind AS) converged with IFRS: Ind AS 1 (Presentation), Ind AS 2 (Inventories), Ind AS 16 (PPE), Ind AS 115 (Revenue from Contracts), Ind AS 116 (Leases)' },
        ],
      },
      {
        name: 'Partnership Accounts',
        subtopics: [
          { name: 'Admission of a Partner: Sacrificing ratio, Revaluation of assets/liabilities, Treatment of Goodwill (AS 26)' },
          { name: 'Retirement and Death of a Partner: Gaining ratio, Settlement of accounts, Joint Life Policy' },
          { name: 'Dissolution of Partnership Firm: Realisation account, Insolvency of a partner (Garner vs Murray rule), Piece-meal distribution (Proportionate Capital & Maximum Loss methods)' },
        ],
      },
      {
        name: 'Corporate Accounting and Company Restructuring',
        subtopics: [
          { name: 'Issue, Forfeiture and Re-issue of Shares, Pro-rata allotment, Issue and Redemption of Preference Shares and Debentures' },
          { name: 'Internal Reconstruction: Capital Reduction Account, Alteration of Share Capital' },
          { name: 'Amalgamation, Absorption and External Reconstruction: As per Ind AS 103 (Business Combinations), Purchase consideration calculations' },
          { name: 'Holding Company Accounts: Consolidated Balance Sheet, Minority Interest, Cost of Control / Goodwill, Unrealized profits' },
        ],
      },
      {
        name: 'Cost and Management Accounting',
        subtopics: [
          { name: 'Cost Classification: Direct vs Indirect, Fixed vs Variable vs Semi-Variable, Product vs Period costs' },
          { name: 'Marginal Costing: Cost-Volume-Profit (CVP) analysis, P/V Ratio, Break-Even Point (BEP), Margin of Safety, Key factor analysis' },
          { name: 'Standard Costing and Variance Analysis: Material variances, Labour variances, Overhead variances (Two/Three/Four-way), Sales variances' },
          { name: 'Budgetary Control: Functional budgets, Flexible budgets, Zero-Based Budgeting (ZBB - Peter Pyhrr)' },
        ],
      },
      {
        name: 'Financial Statement Analysis and Advanced Contemporary Accounting',
        subtopics: [
          { name: 'Ratio Analysis: Liquidity ratios (Current, Quick), Leverage/Solvency ratios (Debt-Equity, ICR), Activity/Turnover ratios, Profitability ratios (ROE, ROCE, EPS)' },
          { name: 'Cash Flow Statement: As per Ind AS 7 / AS 3 (Operating, Investing, Financing activities under Direct & Indirect methods)' },
          { name: 'Human Resource Accounting (Lev & Schwartz, Flamholtz), Inflation Accounting (CPP & CCA methods), Environmental Accounting' },
        ],
      },
      {
        name: 'Auditing: Principles, Procedures and Standards',
        subtopics: [
          { name: 'Nature, Objectives, and Types of Audit: Statutory Audit, Internal Audit, Cost Audit, Management Audit, Tax Audit' },
          { name: 'Audit Planning, Audit Programme, Audit Working Papers, Audit Evidence (SA 500), Vouching and Verification of Assets & Liabilities' },
          { name: 'Company Auditor: Appointment, Qualifications, Disqualifications, Removal, Powers, Duties, Liabilities (Sections 139–147 of Companies Act 2013)' },
          { name: 'Audit Reports: Clean/Unqualified, Qualified, Adverse, Disclaimer of Opinion' },
        ],
      },
    ],
  },
  {
    unitNumber: 3,
    title: 'Unit 3: Business Economics',
    topics: [
      {
        name: 'Meaning and Scope of Business Economics and Consumer Behaviour',
        subtopics: [
          { name: 'Nature of Business Economics, Objectives of Business Firms (Profit Maximisation, Baumol’s Sales Revenue Maximisation, Marris’ Growth Maximisation, Williamson’s Managerial Utility)' },
          { name: 'Law of Demand and Elasticity of Demand: Price, Income, Cross Elasticity, Methods of Measurement (Point, Arc, Total Outlay)' },
          { name: 'Consumer Behaviour: Cardinal Utility (Law of Diminishing Marginal Utility, Equi-Marginal Utility), Ordinal Utility (Indifference Curve Analysis - Properties, Consumer Equilibrium, Income & Substitution Effects: Hicks vs Slutsky decomposition)' },
          { name: 'Revealed Preference Theory (Paul Samuelson)' },
        ],
      },
      {
        name: 'Theory of Production and Cost Analysis',
        subtopics: [
          { name: 'Production Function: Short-Run (Law of Variable Proportions - Three Stages of Production), Long-Run (Laws of Returns to Scale, Isoquants, Isocost lines, Expansion Path)' },
          { name: 'Cobb-Douglas Production Function: Properties, Elasticity of substitution, Constant returns to scale' },
          { name: 'Cost Concepts: Short-run Cost Curves (AFC, AVC, ATC, MC - U-shaped curves), Long-run Average Cost Curve (Envelope Curve, Economies and Diseconomies of Scale)' },
        ],
      },
      {
        name: 'Market Structures and Price Determination',
        subtopics: [
          { name: 'Perfect Competition: Characteristics, Short-run and Long-run equilibrium of firm and industry (P = MR = MC = minimum LAC)' },
          { name: 'Monopoly: Price determination, Multi-plant monopoly, Deadweight loss, Price Discrimination (First, Second, Third degree - Pigou conditions)' },
          { name: 'Monopolistic Competition: Product differentiation, Selling costs, Chamberlin’s Excess Capacity Theorem' },
          { name: 'Oligopoly: Interdependence, Kinked Demand Curve model (Paul Sweezy - Price Rigidity), Non-collusive models (Cournot, Bertrand, Stackelberg), Collusive models (Cartels, Price Leadership)' },
        ],
      },
      {
        name: 'Pricing Strategies and Practice',
        subtopics: [
          { name: 'Cost-Plus Pricing (Mark-up pricing), Marginal Cost Pricing' },
          { name: 'Price Skimming (High initial price) vs Penetration Pricing (Low initial price)' },
          { name: 'Peak-Load Pricing, Transfer Pricing, Bundling Pricing, Psychological Pricing, Limit Pricing' },
        ],
      },
    ],
  },
  {
    unitNumber: 4,
    title: 'Unit 4: Business Finance',
    topics: [
      {
        name: 'Scope, Sources of Finance and Lease Financing',
        subtopics: [
          { name: 'Financial Management Objectives: Profit Maximisation vs Wealth Maximisation (Time Value of Money)' },
          { name: 'Sources of Finance: Long-Term (Equity, Preference shares, Debentures, Retained earnings), Short-Term (Commercial Paper, Treasury Bills, Certificate of Deposit)' },
          { name: 'International Financing: ADRs, GDRs, Foreign Currency Convertible Bonds (FCCBs), External Commercial Borrowings (ECB)' },
          { name: 'Lease Financing: Operating Lease vs Financial Lease, Sale and Lease Back, Leveraged Lease' },
        ],
      },
      {
        name: 'Cost of Capital and Capital Structure Theories',
        subtopics: [
          { name: 'Cost of Capital: Cost of Debt (Kd), Cost of Preference Shares (Kp), Cost of Equity (Ke - Dividend Growth Model, CAPM Model), Weighted Average Cost of Capital (WACC - Book value vs Market value weights)' },
          { name: 'Leverage Analysis: Operating Leverage (DOL = %ΔEBIT / %ΔSales), Financial Leverage (DFL = %ΔEPS / %ΔEBIT), Combined Leverage (DCL = DOL × DFL)' },
          { name: 'Capital Structure Theories: Net Income (NI) Approach (David Durand), Net Operating Income (NOI) Approach, Traditional Approach, Modigliani-Miller (MM) Hypothesis (Proposition I & II - Without and With Corporate Taxes), Trade-Off Theory, Pecking Order Theory' },
        ],
      },
      {
        name: 'Capital Budgeting Decisions',
        subtopics: [
          { name: 'Non-Discounted Cash Flow Techniques: Payback Period, Accounting Rate of Return (ARR)' },
          { name: 'Discounted Cash Flow (DCF) Techniques: Net Present Value (NPV), Internal Rate of Return (IRR), Profitability Index (PI), Discounted Payback Period' },
          { name: 'NPV vs IRR Conflicts in Mutually Exclusive Projects and Modified Internal Rate of Return (MIRR)' },
          { name: 'Risk Analysis in Capital Budgeting: Certainty Equivalent Approach, Risk-Adjusted Discount Rate (RADR), Decision Tree Analysis, Sensitivity Analysis' },
        ],
      },
      {
        name: 'Working Capital Management and Dividend Decisions',
        subtopics: [
          { name: 'Working Capital Concepts: Gross vs Net Working Capital, Operating Cycle method, Working Capital financing policies (Conservative, Aggressive, Matching)' },
          { name: 'Cash Management Models (Baumol Model, Miller-Orr Model), Inventory Management (EOQ, ABC analysis), Receivables Management (Credit policy, Ageing schedule)' },
          { name: 'Dividend Theories & Models: Relevance Models (Walter’s Model: r vs Ke, Gordon’s Model: Share valuation with growth), Irrelevance Model (Modigliani-Miller Dividend Invariance Theorem)' },
        ],
      },
      {
        name: 'Risk-Return Analysis, Portfolio Theory and Derivatives',
        subtopics: [
          { name: 'Capital Asset Pricing Model (CAPM): Beta (Systematic risk), Security Market Line (SML), Capital Market Line (CML)' },
          { name: 'Financial Derivatives: Forwards, Futures, Options (Call, Put, In-the-money, Out-of-the-money, Black-Scholes Formula), Swaps (Interest rate and Currency swaps)' },
          { name: 'Corporate Restructuring, Mergers and Acquisitions: Motives, Valuation approaches, Hostile takeovers, Defenses (Poison pill, White knight)' },
        ],
      },
    ],
  },
  {
    unitNumber: 5,
    title: 'Unit 5: Business Statistics and Research Methods',
    topics: [
      {
        name: 'Measures of Central Tendency and Dispersion',
        subtopics: [
          { name: 'Central Tendency: Arithmetic Mean, Median, Mode, Geometric Mean, Harmonic Mean and their mathematical properties' },
          { name: 'Dispersion: Range, Quartile Deviation, Mean Deviation, Standard Deviation (Variance), Coefficient of Variation (CV)' },
          { name: 'Skewness (Karl Pearson and Bowley measures) and Kurtosis (Mesokurtic, Leptokurtic, Platykurtic - β2/γ2)' },
        ],
      },
      {
        name: 'Correlation, Regression and Probability',
        subtopics: [
          { name: 'Correlation: Karl Pearson’s Coefficient of Correlation (r), Spearman’s Rank Correlation, Properties of r (-1 ≤ r ≤ +1)' },
          { name: 'Linear Regression: Regression lines (Y on X and X on Y), Regression coefficients (byx and bxy), Angle between regression lines, r = √(byx × bxy)' },
          { name: 'Probability Concepts: Classical, Empirical, Axiomatic approaches, Addition and Multiplication Theorems, Conditional Probability, Bayes’ Theorem' },
        ],
      },
      {
        name: 'Probability Distributions',
        subtopics: [
          { name: 'Binomial Distribution: Parameters n and p, Mean = np, Variance = npq (Mean > Variance)' },
          { name: 'Poisson Distribution: Parameter λ, Mean = Variance = λ (Rare events)' },
          { name: 'Normal Distribution: Symmetrical bell-shaped curve, Mean = Median = Mode, Total area = 1, Area properties (68.26%, 95.44%, 99.73%), Standard Normal Variate (Z = (X - μ) / σ)' },
        ],
      },
      {
        name: 'Research Design, Sampling and Data Collection',
        subtopics: [
          { name: 'Research Process: Problem formulation, Research questions, Objectives, Literature review' },
          { name: 'Sampling Techniques: Probability Sampling (Simple Random, Stratified, Systematic, Cluster, Multi-Stage) vs Non-Probability Sampling (Convenience, Purposive/Judgmental, Quota, Snowball)' },
          { name: 'Sampling Errors vs Non-Sampling Errors, Central Limit Theorem' },
          { name: 'Measurement Scales: Nominal, Ordinal, Interval, Ratio scales' },
        ],
      },
      {
        name: 'Hypothesis Testing and Parametric vs Non-Parametric Tests',
        subtopics: [
          { name: 'Hypothesis Testing Procedure: Null (H0) and Alternative (H1) Hypotheses, Level of Significance (α), Critical Region, Type I (Rejecting true H0) and Type II (Accepting false H0) Errors, Power of Test (1 - β), p-value interpretation' },
          { name: 'Parametric Tests: Z-test (Large sample mean & proportion tests), t-test (Small sample Student’s t-test: One-sample, Independent two-sample, Paired t-test), F-test (Variance ratio), ANOVA (One-Way and Two-Way Analysis of Variance)' },
          { name: 'Non-Parametric Tests: Chi-Square Test (Goodness of Fit, Independence of Attributes), Mann-Whitney U test, Wilcoxon Signed-Rank test, Kruskal-Wallis H test, Spearman’s Rank correlation test' },
        ],
      },
    ],
  },
  {
    unitNumber: 6,
    title: 'Unit 6: Business Management and Human Resource Management',
    topics: [
      {
        name: 'Principles and Functions of Management',
        subtopics: [
          { name: 'Management Schools: Classical (Scientific Management - F.W. Taylor, Administrative Management - Henri Fayol’s 14 Principles, Bureaucratic - Max Weber), Neo-Classical (Human Relations Movement - Elton Mayo’s Hawthorne Studies), Modern (Systems and Contingency approaches)' },
          { name: 'Functions of Management: Planning (Types of plans, MBO - Peter Drucker), Organizing (Formal vs Informal, Span of Control, Departmentation, Delegation & Decentralization), Directing, Controlling (Feedforward, Concurrent, Feedback controls)' },
        ],
      },
      {
        name: 'Organisational Behaviour: Motivation and Leadership',
        subtopics: [
          { name: 'Motivation Theories: Maslow’s Hierarchy of Needs, Herzberg’s Two-Factor (Hygiene-Motivator) Theory, McGregor’s Theory X & Theory Y, McClelland’s Needs Theory (Achievement, Power, Affiliation), Vroom’s Expectancy Theory, Porter-Lawler Model, Adam’s Equity Theory' },
          { name: 'Leadership Theories: Trait Theory, Behavioural Theories (Ohio State & Michigan Studies, Blake & Mouton’s Managerial Grid), Contingency/Situational Theories (Fiedler’s Contingency Model, Hersey-Blanchard Situational Model, House’s Path-Goal Theory, Transformational vs Transactional Leadership)' },
          { name: 'Group Dynamics, Organisational Culture, Organisational Development (OD Interventions) and Stress Management' },
        ],
      },
      {
        name: 'Human Resource Management (HRM) Functions',
        subtopics: [
          { name: 'Human Resource Planning (HRP): Forecasting demand and supply of labour' },
          { name: 'Job Analysis: Job Description (Tasks, duties) vs Job Specification (Qualifications, skills, traits)' },
          { name: 'Recruitment (Internal & External sources) and Selection Process (Tests, Interviews, Assessment Centres)' },
          { name: 'Training and Development: On-the-Job methods (Apprenticeship, Job Rotation, Mentoring) vs Off-the-Job methods (Vestibule training, Case studies, Role playing), Kirkpatrick’s 4-Level Evaluation Model' },
        ],
      },
      {
        name: 'Performance Appraisal, Compensation and Industrial Relations',
        subtopics: [
          { name: 'Performance Appraisal Methods: Traditional (Graphic Rating Scale, Ranking, Forced Choice) vs Modern (360-Degree Feedback, BARS - Behaviourally Anchored Rating Scales, MBO)' },
          { name: 'Compensation Management: Job Evaluation methods (Ranking, Point Rating, Factor Comparison), Wage structures, Incentive schemes (Taylor, Halsey, Rowan plans)' },
          { name: 'Industrial Relations & Trade Unions: Trade Unions Act 1926, Industrial Disputes Act 1947 (Strikes, Lockouts, Layoff, Retrenchment), Workers’ Participation in Management (WPM), Collective Bargaining' },
        ],
      },
    ],
  },
  {
    unitNumber: 7,
    title: 'Unit 7: Banking and Financial Institutions',
    topics: [
      {
        name: 'Overview of Indian Financial System and Central Banking',
        subtopics: [
          { name: 'Structure of Financial System: Money Market (Organized vs Unorganized) and Capital Market (Primary vs Secondary markets)' },
          { name: 'Reserve Bank of India (RBI): Role, Functions, Monetary Policy Instruments (Quantitative: Repo Rate, Reverse Repo, SDF, MSF, Bank Rate, CRR, SLR; Qualitative: Margin requirements, Moral suasion)' },
        ],
      },
      {
        name: 'Commercial Banking and Digital Banking Reforms',
        subtopics: [
          { name: 'Types of Banks: Public Sector Banks, Private Banks, Foreign Banks, Regional Rural Banks (RRBs), Small Finance Banks, Payments Banks' },
          { name: 'Asset Classification & NPAs: Standard, Sub-Standard, Doubtful, Loss Assets, Gross NPA vs Net NPA, SARFAESI Act 2002, Insolvency and Bankruptcy Code (IBC 2016), Asset Reconstruction Companies (ARCs)' },
          { name: 'Basel Accords: Basel I, II, III norms (Capital Adequacy Ratio CAR / CRAR, Tier 1 and Tier 2 capital, Capital Conservation Buffer)' },
          { name: 'Digital Banking: RTGS, NEFT, IMPS, UPI, NPCI, Mobile Banking, Core Banking Solutions (CBS)' },
        ],
      },
      {
        name: 'Development Financial Institutions (DFIs) and Non-Banking Financial Companies (NBFCs)',
        subtopics: [
          { name: 'DFIs: NABARD (Rural credit), SIDBI (MSME finance), EXIM Bank (Foreign trade finance), NHB (Housing finance), MUDRA Bank (Shishu, Kishore, Tarun categories)' },
          { name: 'NBFCs: Types, RBI Regulatory Framework for NBFCs (Base, Middle, Upper, Top layers)' },
        ],
      },
      {
        name: 'Financial Regulators and Capital Market Intermediaries',
        subtopics: [
          { name: 'Regulators: SEBI (Capital markets), IRDAI (Insurance), PFRDA (Pensions)' },
          { name: 'Mutual Funds: Open-ended vs Close-ended, Equity, Debt, Hybrid, ETFs, NAV calculation' },
          { name: 'Credit Rating Agencies (CRISIL, ICRA, CARE) and Depositories (NSDL, CDSL)' },
        ],
      },
    ],
  },
  {
    unitNumber: 8,
    title: 'Unit 8: Marketing Management',
    topics: [
      {
        name: 'Marketing Concepts, Trends and Marketing Environment',
        subtopics: [
          { name: 'Marketing Philosophies: Production, Product, Selling, Marketing, Societal Marketing, Holistic Marketing concepts' },
          { name: 'Strategic Marketing Planning: Mission, SWOT Analysis, BCG Growth-Share Matrix, Ansoff’s Product-Market Expansion Grid' },
          { name: 'Emerging Trends: Digital Marketing, Social Media Marketing, Green Marketing, Relationship Marketing (CRM), Rural Marketing' },
        ],
      },
      {
        name: 'Market Segmentation, Targeting and Positioning (STP) & Consumer Behaviour',
        subtopics: [
          { name: 'Market Segmentation Bases: Geographic, Demographic, Psychographic (VALS framework), Behavioural' },
          { name: 'Targeting Strategies: Undifferentiated (Mass), Differentiated, Concentrated (Niche), Micro-marketing' },
          { name: 'Positioning: Perceptual Mapping, Points of Parity (POPs) and Points of Difference (PODs)' },
          { name: 'Consumer Decision Making Process: Need recognition, Information search, Evaluation of alternatives, Purchase decision, Post-purchase behaviour (Cognitive Dissonance)' },
        ],
      },
      {
        name: 'Product and Pricing Decisions',
        subtopics: [
          { name: 'Product Levels (Core, Actual, Augmented), Product Hierarchy, Product Mix (Width, Length, Depth, Consistency)' },
          { name: 'Product Life Cycle (PLC): Stages (Introduction, Growth, Maturity, Decline) and Marketing strategies' },
          { name: 'New Product Development Process: Idea generation, Screening, Concept testing, Business analysis, Test marketing, Commercialization' },
          { name: 'Branding Decisions, Brand Equity (David Aaker model, Keller’s Brand Resonance Pyramid), Packaging and Labeling' },
          { name: 'Pricing Methods: Cost-based, Value-based, Competition-based, Going-rate pricing, Captive pricing' },
        ],
      },
      {
        name: 'Distribution (Place) and Promotion Decisions',
        subtopics: [
          { name: 'Marketing Channels: Zero-level, One-level, Two-level channels, Channel Conflict (Horizontal, Vertical, Multi-channel), VMS (Corporate, Administered, Contractual)' },
          { name: 'Logistics and Supply Chain Management: Warehousing, Inventory, Order processing, Transportation' },
          { name: 'Integrated Marketing Communications (IMC) Mix: Advertising (5 M’s: Mission, Money, Message, Media, Measurement), Personal Selling (Steps in selling process), Sales Promotion (Trade vs Consumer promotions), Public Relations (PR), Direct Marketing' },
        ],
      },
    ],
  },
  {
    unitNumber: 9,
    title: 'Unit 9: Legal Aspects of Business',
    topics: [
      {
        name: 'Indian Contract Act, 1872',
        subtopics: [
          { name: 'Essential elements of a valid contract (Offer & Acceptance, Intention, Consideration, Capacity, Free Consent: Coercion, Undue Influence, Fraud, Misrepresentation, Mistake, Legality of object)' },
          { name: 'Types of Contracts: Void, Voidable, Valid, Illegal, Unenforceable, Contingent Contracts, Quasi-Contracts' },
          { name: 'Performance and Discharge of Contracts, Breach of Contract and Remedies (Damages: Ordinary, Special, Exemplary, Nominal; Injunction, Specific Performance)' },
          { name: 'Special Contracts: Contract of Indemnity and Guarantee (Rights of Surety), Contract of Bailment and Pledge (Rights of Pawnee/Pawnor), Contract of Agency (Creation, Rights, Termination)' },
        ],
      },
      {
        name: 'Sale of Goods Act, 1930',
        subtopics: [
          { name: 'Contract of Sale vs Agreement to Sell' },
          { name: 'Conditions and Warranties: Express and Implied Conditions/Warranties, Doctrine of Caveat Emptor and its Exceptions' },
          { name: 'Transfer of Property / Ownership (Nemo dat quod non habet and its exceptions)' },
          { name: 'Rights of an Unpaid Seller: Right of Lien, Right of Stoppage in Transit, Right of Resale' },
        ],
      },
      {
        name: 'Negotiable Instruments Act, 1881',
        subtopics: [
          { name: 'Definition and Characteristics of Negotiable Instruments' },
          { name: 'Promissory Notes, Bills of Exchange, and Cheques (Differences, Parties)' },
          { name: 'Holder vs Holder in Due Course (HIDC) rights and privileges' },
          { name: 'Endorsement types (Blank, Special, Restrictive, Conditional, Sans Recourse), Crossing of Cheques, Dishonour of Cheques (Section 138 penalties and procedures)' },
        ],
      },
      {
        name: 'The Companies Act, 2013',
        subtopics: [
          { name: 'Nature, Types of Companies (Public, Private, One Person Company OPC, Section 8 Company, Holding/Subsidiary)' },
          { name: 'Formation of Company: Promotion, Incorporation, Memorandum of Association (MOA - Clauses, Doctrine of Ultra Vires), Articles of Association (AOA - Doctrine of Indoor Management / Turquand Rule)' },
          { name: 'Prospectus (Red Herring, Shelf, Abridged), Corporate Management (Directors: Independent, Women directors, DIN, Duties)' },
          { name: 'Company Meetings (AGM, EGM, Resolutions), Winding Up of Companies' },
        ],
      },
      {
        name: 'Competition Act, 2002 and Information Technology Act, 2000',
        subtopics: [
          { name: 'Competition Act 2002: Anti-competitive agreements, Abuse of dominant position, Regulation of combinations (Mergers), Competition Commission of India (CCI)' },
          { name: 'Information Technology Act 2000: Digital Signatures, Electronic Governance, Cyber Crimes and Penalties, Certifying Authorities' },
          { name: 'Intellectual Property Rights (IPR): Patents Act 1970 (20-year term), Copyright Act 1957 (Life + 60 years), Trademarks Act 1999 (10 years renewable), Geographical Indications Act 1999' },
          { name: 'Right to Information (RTI) Act, 2005: Public authority, Obligations, Public Information Officer (PIO - 30-day timeline), Central Information Commission (CIC)' },
        ],
      },
    ],
  },
  {
    unitNumber: 10,
    title: 'Unit 10: Income-tax and Corporate Tax Planning',
    topics: [
      {
        name: 'Basic Concepts and Residential Status',
        subtopics: [
          { name: 'Income Tax Concepts: Previous Year, Assessment Year, Person, Assessee, Gross Total Income, Total Income, Marginal Relief, Surcharge' },
          { name: 'Residential Status of Individual, HUF, Firm, Company (POEM - Place of Effective Management)' },
          { name: 'Incidence of Tax based on Residential Status (ROR, RNOR, Non-Resident)' },
          { name: 'Incomes Exempt from Tax under Section 10 (Agricultural income Sec 10(1), Retrenchment compensation, Gratuity, Leave encashment)' },
        ],
      },
      {
        name: 'Computation of Income under Five Heads',
        subtopics: [
          { name: 'Income from Salaries: Allowances (HRA Sec 10(13A), Children education allowance), Perquisites (Rent-free accommodation, Car facility), Standard deduction Sec 16' },
          { name: 'Income from House Property: Gross Annual Value (GAV), Municipal taxes, Net Annual Value (NAV), Standard deduction Sec 24(a) (30%), Interest on borrowed capital Sec 24(b) (Self-occupied vs Let-out limits)' },
          { name: 'Profits and Gains of Business or Profession (PGBP): Allowable deductions (Sec 30 to 37), Depreciation (Sec 32 - Block of Assets, Written Down Value WDV method), Disallowable expenses (Sec 40, 40A), Presumptive taxation schemes (Sec 44AD, 44ADA, 44AE)' },
          { name: 'Capital Gains: Short-Term vs Long-Term Capital Assets (Holding period rules), Cost of Acquisition, Cost of Improvement, Cost Inflation Index (CII), Indexed Cost, Exemptions under Sections 54, 54B, 54EC, 54F' },
          { name: 'Income from Other Sources: Dividends, Casual income (Lotteries/Crossword puzzles - flat 30% tax Sec 115BB), Family pension, Gifts Sec 56(2)(x)' },
        ],
      },
      {
        name: 'Clubbing of Income, Set-off & Carry Forward of Losses and Deductions from GTI',
        subtopics: [
          { name: 'Clubbing of Income: Transfer of income without transfer of asset, Minor child’s income (Sec 64(1A) - Rs 1,500 exemption per child)' },
          { name: 'Set-off and Carry Forward of Losses: Inter-source and Inter-head set-off rules, Carry forward limits (Business loss - 8 years, Speculation loss - 4 years, Capital loss - 8 years)' },
          { name: 'Deductions from Gross Total Income (Chapter VI-A): Section 80C (Rs 1.5 Lakh ceiling), 80CCC, 80CCD (NPS additional Rs 50,000 Sec 80CCD(1B)), 80D (Health Insurance), 80E (Education loan interest), 80G (Donations), 80GG (Rent paid), 80TTA/80TTB, 80U (Disability)' },
        ],
      },
      {
        name: 'Corporate Tax Planning and Assessment of Companies',
        subtopics: [
          { name: 'Tax Planning vs Tax Avoidance vs Tax Evasion (Legal boundaries and ethics)' },
          { name: 'Corporate Tax Rates: Domestic companies vs Foreign companies, Concessional tax regimes (Section 115BAA - 22%, Section 115BAB - 15% for new manufacturing companies)' },
          { name: 'Minimum Alternate Tax (MAT): Section 115JB (Tax on Book Profits @ 15% plus surcharge/cess), MAT Credit carry forward (15 years)' },
          { name: 'Tax planning regarding Form of Business Organisation, Location of Business, Nature of Business, Capital Structure (Debt vs Equity financing tax shields)' },
        ],
      },
      {
        name: 'Tax Administration, TDS/TCS and International Taxation',
        subtopics: [
          { name: 'Tax Deduction at Source (TDS): Sec 192 (Salary), Sec 194A (Interest), Sec 194C (Contractors), Sec 194J (Professional fees), Tax Collection at Source (TCS), Advance Tax installment due dates' },
          { name: 'E-Filing of Income-tax returns, Types of ITR forms (ITR-1 Sahaj to ITR-7), Assessment procedures (Self-assessment Sec 140A, Summary assessment Sec 143(1), Scrutiny assessment Sec 143(3), Best Judgment Sec 144)' },
          { name: 'International Taxation: Double Taxation Avoidance Agreement (DTAA - Section 90/90A and Bilateral/Unilateral Relief Sec 91), Transfer Pricing regulations (Arm’s Length Price methods: CUP, Resale Price, Cost Plus, Profit Split, TNMM), Advance Pricing Agreements (APA)' },
        ],
      },
    ],
  },
];
