import type { OfficialSyllabusUnit, SyllabusSourceInfo } from '../../config/subjects/types';

export const managementSyllabusSource: SyllabusSourceInfo = {
  authority: 'UGC / NTA',
  documentTitle: 'UGC NET Management (Code 17) Official Syllabus',
  retrievedDate: '2024-08',
  verified: true,
};

export const managementSyllabus: OfficialSyllabusUnit[] = [
  {
    unitNumber: 1,
    title: 'Unit 1: Management Functions & Organizational Behaviour',
    topics: [
      {
        name: 'Principles, Evolution and Functions of Management',
        subtopics: [
          { name: 'Evolution of Management Thought: Classical (Taylor, Fayol, Weber), Neo-Classical (Hawthorne Experiments, Mary Parker Follett), Modern (Systems & Contingency Approaches)' },
          { name: 'Management Process: Planning (Types, Premises, Strategic vs Operational, MBO), Decision Making (Bounded Rationality - Herbert Simon, Garbage Can Model, Delphi Technique, Nominal Group Technique)' },
          { name: 'Organizing: Span of Management, Centralization vs Decentralization, Delegation, Matrix & Virtual Structures' },
          { name: 'Managerial Roles (Henry Mintzberg: Interpersonal, Informational, Decisional roles) and Skills (Robert Katz)' },
        ],
      },
      {
        name: 'Individual Behaviour and Personality Dynamics',
        subtopics: [
          { name: 'Personality: Determinants, MBTI (Myers-Briggs), Big Five Model (OCEAN), Locus of Control, Machiavellianism, Type A/B' },
          { name: 'Perception: Perceptual Process, Attribution Theory (Harold Kelley), Perceptual Errors (Halo effect, Stereotyping, Projection, Contrast effect)' },
          { name: 'Attitudes, Values and Job Satisfaction: Measurement of Job Satisfaction (JDI, MSQ), Cognitive Dissonance Theory (Leon Festinger), Organizational Citizenship Behaviour (OCB)' },
        ],
      },
      {
        name: 'Motivation and Leadership Theories',
        subtopics: [
          { name: 'Motivation Content Theories: Maslow’s Hierarchy, Herzberg’s Two-Factor, Alderfer’s ERG Theory, McClelland’s Acquired Needs (Achievement, Power, Affiliation)' },
          { name: 'Motivation Process Theories: Vroom’s Expectancy Theory, Porter-Lawler Expectancy Model, Adams’ Equity Theory, Locke’s Goal Setting Theory' },
          { name: 'Leadership: Trait & Behavioral Theories (Ohio State, Michigan Studies, Blake-Mouton Managerial Grid), Contingency Models (Fiedler’s LPC Model, Hersey-Blanchard Situational Theory, House’s Path-Goal Theory, Vroom-Yetton-Jago Decision Model)' },
          { name: 'Contemporary Leadership: Transformational vs Transactional, Authentic, Servant, and Charismatic Leadership' },
        ],
      },
      {
        name: 'Group Dynamics, Organizational Culture and Change',
        subtopics: [
          { name: 'Group Dynamics: Tuckman’s 5-Stage Model (Forming, Storming, Norming, Performing, Adjourning), Groupthink, Groupshift' },
          { name: 'Organizational Culture: Schein’s 3 Levels of Culture (Artifacts, Espoused Values, Basic Underlying Assumptions), Types of Culture (Handy’s typology)' },
          { name: 'Organizational Change & Development: Kurt Lewin’s 3-Step Model (Unfreeze, Change, Refreeze), Force Field Analysis, Kotter’s 8-Step Change Model, OD Interventions' },
          { name: 'Transactional Analysis (Eric Berne: Ego States, Life Positions, Psychological Games) and Johari Window' },
        ],
      },
    ],
  },
  {
    unitNumber: 2,
    title: 'Unit 2: Strategic Management & Human Resource Management',
    topics: [
      {
        name: 'Strategic Management Process & Environmental Analysis',
        subtopics: [
          { name: 'Strategic Formulation: Vision, Mission, Goals, Strategic Intent, Core Competencies (Prahalad & Hamel)' },
          { name: 'Environmental Scanning: PESTLE Analysis, Michael Porter’s 5 Competitive Forces Model, Value Chain Analysis' },
          { name: 'Strategic Choice Matrices: SWOT/TOWS Matrix, BCG Growth-Share Matrix, GE/McKinsey 9-Cell Matrix, Ansoff’s Matrix, Arthur D. Little (ADL) Matrix, Space Matrix' },
        ],
      },
      {
        name: 'Generic and Corporate Level Strategies',
        subtopics: [
          { name: 'Porter’s Generic Competitive Strategies: Cost Leadership, Differentiation, Focus (Cost Focus / Differentiation Focus)' },
          { name: 'Corporate Level Strategies: Growth/Expansion (Concentration, Integration: Vertical & Horizontal, Diversification: Concentric & Conglomerate), Stability, Retrenchment (Turnaround, Divestment, Liquidation), Combination Strategies' },
          { name: 'Strategy Implementation: McKinsey 7S Framework, Balanced Scorecard (Kaplan & Norton - Financial, Customer, Internal Business, Learning & Growth perspectives)' },
        ],
      },
      {
        name: 'Human Resource Management and Talent Acquisition',
        subtopics: [
          { name: 'Strategic HRM: Harvard Model, Michigan Model, Human Resource Planning (HRP) demand-supply forecasting models' },
          { name: 'Job Analysis: Job Description, Job Specification, Job Design (Job Rotation, Job Enlargement, Job Enrichment - Hackman & Oldham Job Characteristics Model)' },
          { name: 'Recruitment and Selection: Sourcing, Psychometric Testing, Structured Interviews, Assessment Centers' },
        ],
      },
      {
        name: 'Training, Performance Management and Compensation',
        subtopics: [
          { name: 'Training Need Analysis (TNA), Training Methods (On-the-job vs Off-the-job, Simulation, Vestibule), Kirkpatrick’s 4 Levels of Evaluation' },
          { name: 'Performance Management Systems: Traditional methods vs Modern methods (360-degree feedback, BARS, Management by Objectives MBO, Balanced Scorecard evaluation)' },
          { name: 'Compensation & Benefits: Job Evaluation methods (Point factor, Factor comparison), Wage differentials, ESOPs, Fringe benefits' },
          { name: 'Industrial Relations, Trade Unions, Collective Bargaining, Grievance Redressal Mechanisms, and Labour Legislation in India' },
        ],
      },
    ],
  },
  {
    unitNumber: 3,
    title: 'Unit 3: Managerial Economics & Business Analytics',
    topics: [
      {
        name: 'Managerial Economics: Demand, Elasticity & Forecasting',
        subtopics: [
          { name: 'Nature, Scope and Decision-Making Principles of Managerial Economics (Opportunity Cost, Equi-Marginal, Incremental principle)' },
          { name: 'Demand Analysis: Determinants, Price, Income, Cross and Advertising Elasticity of Demand' },
          { name: 'Demand Forecasting Techniques: Qualitative (Delphi, Survey of Buyer Intentions) and Quantitative (Time Series, Trend Projection, Regression Models)' },
        ],
      },
      {
        name: 'Production Analysis and Cost Curves',
        subtopics: [
          { name: 'Short-Run Production: Law of Diminishing Returns, Total, Average, and Marginal Product curves' },
          { name: 'Long-Run Production: Returns to Scale, Isoquants, Isocost Lines, Ridge Lines, Expansion Path, Cobb-Douglas & CES Production Functions' },
          { name: 'Cost Analysis: Opportunity Cost, Sunk Cost, Incremental Cost, Short-Run vs Long-Run Cost Curves, Learning Curve effect' },
        ],
      },
      {
        name: 'Market Structures, Game Theory and Pricing Strategies',
        subtopics: [
          { name: 'Price and Output Determination: Perfect Competition, Monopoly (Price Discrimination, Deadweight Loss), Monopolistic Competition (Chamberlin Excess Capacity)' },
          { name: 'Oligopoly Models: Cournot, Bertrand, Stackelberg, Sweezy’s Kinked Demand Curve, Cartels & Price Leadership' },
          { name: 'Game Theory: Prisoner’s Dilemma, Nash Equilibrium, Dominant Strategy, Zero-Sum Games, Maximin-Minimax strategies' },
          { name: 'Pricing Practices: Price Skimming, Penetration Pricing, Peak-Load Pricing, Transfer Pricing, Bundle Pricing, Value Pricing' },
        ],
      },
    ],
  },
  {
    unitNumber: 4,
    title: 'Unit 4: Financial Accounting & Management Accounting',
    topics: [
      {
        name: 'Financial Accounting Principles and Ind AS / IFRS Standards',
        subtopics: [
          { name: 'GAAP, Accounting Concepts and Conventions' },
          { name: 'Indian Accounting Standards (Ind AS) and Convergence with IFRS (Ind AS 1, 2, 16, 115, 116)' },
          { name: 'Preparation of Final Accounts: Profit & Loss Statement, Balance Sheet as per Schedule III of Companies Act 2013' },
        ],
      },
      {
        name: 'Financial Statement Analysis',
        subtopics: [
          { name: 'Ratio Analysis: Liquidity, Solvency/Leverage, Turnover/Activity, Profitability, and Market Value Ratios (DuPont Analysis for ROE Decomposition)' },
          { name: 'Cash Flow Statement: As per Ind AS 7 (Operating, Investing, Financing activities under Direct & Indirect methods)' },
          { name: 'Fund Flow Statement, Comparative & Common-Size Financial Statements' },
        ],
      },
      {
        name: 'Cost Accounting and Marginal Costing',
        subtopics: [
          { name: 'Cost Concepts, Cost Sheet, Activity Based Costing (ABC) vs Traditional Absorption Costing' },
          { name: 'Marginal Costing & CVP Analysis: Contribution, P/V Ratio, Break-Even Analysis, Margin of Safety, Key Factor Decisions' },
          { name: 'Standard Costing: Variance Analysis (Material, Labour, Overhead Variances)' },
          { name: 'Budgetary Control: Functional Budgets, Flexible Budgeting, Zero-Base Budgeting (ZBB)' },
        ],
      },
    ],
  },
  {
    unitNumber: 5,
    title: 'Unit 5: Corporate Finance & Financial Management',
    topics: [
      {
        name: 'Time Value of Money and Cost of Capital',
        subtopics: [
          { name: 'Time Value of Money: Present Value, Future Value, Annuities, Perpetuities, Compounding & Discounting mechanics' },
          { name: 'Cost of Capital: Cost of Debt (Kd), Preference Shares (Kp), Retained Earnings (Kr), Equity (Ke - CAPM, Dividend Growth Model), Weighted Average Cost of Capital (WACC)' },
          { name: 'Leverage Analysis: Operating Leverage (DOL), Financial Leverage (DFL), Combined Leverage (DCL), EBIT-EPS Indifference Point analysis' },
        ],
      },
      {
        name: 'Capital Structure Theories',
        subtopics: [
          { name: 'Net Income (NI) Approach, Net Operating Income (NOI) Approach' },
          { name: 'Modigliani-Miller (MM) Theorem: Propositions I & II with and without corporate taxes, Arbitrage Mechanism' },
          { name: 'Traditional Theory, Trade-Off Theory, Pecking Order Theory, Agency Theory of Capital Structure' },
        ],
      },
      {
        name: 'Capital Budgeting Decisions under Certainty and Risk',
        subtopics: [
          { name: 'Evaluation Techniques: Payback Period, Accounting Rate of Return (ARR), Net Present Value (NPV), Internal Rate of Return (IRR), Profitability Index (PI), Modified IRR (MIRR)' },
          { name: 'NPV vs IRR Conflicts, Capital Rationing' },
          { name: 'Risk in Capital Budgeting: Certainty Equivalent Method, Risk-Adjusted Discount Rate (RADR), Decision Trees, Sensitivity & Scenario Analysis, Monte Carlo Simulation' },
        ],
      },
      {
        name: 'Working Capital Management and Dividend Policies',
        subtopics: [
          { name: 'Working Capital: Operating Cycle, Financing Strategies (Hedging/Matching, Conservative, Aggressive)' },
          { name: 'Cash Management (Baumol, Miller-Orr models), Inventory Control (EOQ, JIT, ABC, VED), Receivables Management (Credit Policy, Factoring)' },
          { name: 'Dividend Theories: Walter’s Valuation Model, Gordon’s Model, Modigliani-Miller Dividend Irrelevance Hypothesis, Linter’s Dividend Model' },
        ],
      },
    ],
  },
  {
    unitNumber: 6,
    title: 'Unit 6: Strategic Marketing & Consumer Behaviour',
    topics: [
      {
        name: 'Marketing Fundamentals and Strategic Planning',
        subtopics: [
          { name: 'Core Concepts of Marketing, Holistic Marketing (Integrated, Relationship, Internal, Performance Marketing)' },
          { name: 'Marketing Environment (Micro & Macro PESTLE), Competitor Analysis' },
          { name: 'Market Segmentation (Bases: Geographic, Demographic, Psychographic VALS, Behavioural), Target Market Selection, Positioning Strategies (Perceptual Mapping, POPs & PODs)' },
        ],
      },
      {
        name: 'Consumer Decision Making and B2B Marketing',
        subtopics: [
          { name: 'Consumer Buying Process: Problem recognition, Search, Alternative evaluation, Purchase, Post-purchase evaluation (Cognitive dissonance)' },
          { name: 'Psychological Factors: Motivation (Freud, Maslow), Perception (Selective attention, distortion, retention), Learning (Classical, Operant conditioning), Beliefs & Attitudes' },
          { name: 'Organizational / B2B Buying Behaviour: Buying Center roles (Initiator, Influencer, Decider, Buyer, User, Gatekeeper), Buy-grid framework (New task, Modified rebuy, Straight rebuy)' },
        ],
      },
      {
        name: 'Product and Pricing Decisions',
        subtopics: [
          { name: 'Product Levels (Core benefit to Augmented product), Product Mix Decisions, Product Life Cycle (PLC) Strategies' },
          { name: 'New Product Development (NPD) Process, Rogers’ Diffusion of Innovation Model (Innovators, Early Adopters, Early Majority, Late Majority, Laggards)' },
          { name: 'Brand Management: Brand Equity (Aaker Model, Keller CBBE Model), Brand Extension, Brand Co-branding, Packaging & Labeling' },
          { name: 'Pricing Strategies: Value-Based, Cost-Plus, Penetration, Price Skimming, Dynamic Pricing, Freemium, Yield Management' },
        ],
      },
      {
        name: 'Distribution Channels and Integrated Marketing Communications',
        subtopics: [
          { name: 'Marketing Channels: Structure, Multi-Channel Networks, Vertical Marketing Systems (Corporate, Administered, Contractual), Channel Power & Conflict Resolution' },
          { name: 'Logistics and Supply Chain Management: Warehousing, Inventory Management, Transportation' },
          { name: 'IMC Mix: Advertising (5 Ms), Sales Promotion (Consumer vs Trade promotions), Public Relations, Personal Selling Steps, Direct & Digital Marketing' },
        ],
      },
    ],
  },
  {
    unitNumber: 7,
    title: 'Unit 7: International Business & Emerging Global Markets',
    topics: [
      {
        name: 'Theories of International Trade and Modes of Entry',
        subtopics: [
          { name: 'Classical Trade Theories: Mercantilism, Absolute Advantage (Smith), Comparative Advantage (Ricardo), Opportunity Cost (Haberler)' },
          { name: 'Modern Trade Theories: Heckscher-Ohlin Factor Endowment Theory, Leontief Paradox, Vernon’s Product Life Cycle, Krugman’s New Trade Theory, Porter’s Diamond Model' },
          { name: 'Entry Modes: Exporting, Turnkey Projects, Licensing, Franchising, Joint Ventures, Wholly Owned Subsidiaries / Greenfield FDI vs Cross-Border M&As' },
        ],
      },
      {
        name: 'International Trade Environment and Balance of Payments',
        subtopics: [
          { name: 'Trade Barriers: Tariff Barriers (Ad-valorem, Specific, Compound) vs Non-Tariff Barriers (Quotas, Embargoes, Subsidies, Local Content Requirements, Anti-Dumping duties)' },
          { name: 'Balance of Payments (BOP): Structure of Current and Capital Accounts, Causes of Disequilibrium and Corrective Measures' },
          { name: 'Foreign Exchange Market: Exchange Rate Determination (Purchasing Power Parity PPP, Interest Rate Parity IRP, Fisher Effect), Foreign Exchange Exposure (Transaction, Translation, Economic exposure)' },
        ],
      },
      {
        name: 'Regional Economic Integration and Global Institutions',
        subtopics: [
          { name: 'Stages of Integration: PTA, FTA, Customs Union, Common Market, Economic Union (EU, ASEAN, NAFTA/USMCA, SAARC/SAFTA, MERCOSUR, RCEP)' },
          { name: 'International Financial Institutions: IMF (Special Drawing Rights SDRs, Surveillance, Facilities), World Bank Group (IBRD, IDA, IFC, MIGA, ICSID)' },
          { name: 'World Trade Organization (WTO): Principles (MFN, National Treatment), Dispute Settlement Mechanism, TRIPS, TRIMS, GATS, AoA' },
        ],
      },
    ],
  },
  {
    unitNumber: 8,
    title: 'Unit 8: Operations Management & Quantitative Techniques',
    topics: [
      {
        name: 'Operations Strategy and Facility Layout',
        subtopics: [
          { name: 'Operations Management: Scope, Transformational Model, Service vs Manufacturing Operations' },
          { name: 'Facility Location Decisions: Factors, Qualitative and Quantitative Location Models' },
          { name: 'Facility Layout: Process Layout, Product Layout, Cellular Layout, Fixed-Position Layout' },
          { name: 'Capacity Planning, Aggregate Planning, Master Production Schedule (MPS), Material Requirements Planning (MRP I & MRP II), ERP Systems' },
        ],
      },
      {
        name: 'Total Quality Management (TQM) and Lean Operations',
        subtopics: [
          { name: 'TQM Philosophies: Deming’s 14 Points (PDCA Cycle), Juran’s Quality Trilogy, Crosby’s Zero Defects, Ishikawa’s 7 QC Tools (Fishbone/Cause-Effect Diagram, Pareto Chart)' },
          { name: 'Six Sigma: DMAIC (Define, Measure, Analyze, Improve, Control) vs DMADV methodology, 3.4 Defects Per Million Opportunities (DPMO)' },
          { name: 'Lean Manufacturing: Just-in-Time (JIT), Kanban System, 5S Methodology, Kaizen (Continuous Improvement), Poka-Yoke' },
        ],
      },
      {
        name: 'Operations Research & Optimization Techniques',
        subtopics: [
          { name: 'Linear Programming Problem (LPP): Formulation, Graphical Method, Simplex Method, Duality Theory and Sensitivity Analysis' },
          { name: 'Transportation Models: Initial Basic Feasible Solution (North-West Corner Rule, Least Cost Method, Vogel’s Approximation Method VAM), Optimality Test (MODI / u-v Method)' },
          { name: 'Assignment Problem: Hungarian Method, Unbalanced and Restricted Assignment' },
          { name: 'Network Models: PERT (Program Evaluation and Review Technique - Three Time Estimates: a, m, b, Expected Time te = (a+4m+b)/6, Variance) vs CPM (Critical Path Method, Crashing of Networks)' },
          { name: 'Queuing/Waiting Line Models (M/M/1 Queue) and Decision Theory (Maximax, Maximin, Minimax Regret, Hurwicz, Laplace criteria, EMV, EVPI)' },
        ],
      },
    ],
  },
  {
    unitNumber: 9,
    title: 'Unit 9: Information Systems & Technology Management',
    topics: [
      {
        name: 'Management Information Systems (MIS) and Enterprise Architecture',
        subtopics: [
          { name: 'MIS: Role, Concept, Architecture, Types of Information Systems (TPS, OAS, MIS, DSS - Decision Support Systems, ESS - Executive Support Systems)' },
          { name: 'Enterprise Resource Planning (ERP): Architecture, Implementation Lifecycle, Supply Chain Management (SCM) & Customer Relationship Management (CRM) modules' },
          { name: 'Database Management Systems (DBMS): Relational Database concepts, SQL fundamentals, Data Warehousing, Data Mining (ETL process, OLAP cubes)' },
        ],
      },
      {
        name: 'Digital Transformation, Cloud Computing & Emerging Technologies',
        subtopics: [
          { name: 'Cloud Computing: IaaS, PaaS, SaaS, Public, Private, Hybrid Cloud deployment models' },
          { name: 'Big Data Analytics: 5 Vs of Big Data (Volume, Velocity, Variety, Veracity, Value), Predictive and Prescriptive Analytics' },
          { name: 'Artificial Intelligence & Machine Learning in Business: Automation, Chatbots, Natural Language Processing, Recommender Systems' },
          { name: 'Blockchain Technology and Fintech: Distributed Ledger, Smart Contracts, Cryptocurrency, Digital Payment Ecosystems' },
          { name: 'Cyber Security & Information Security: Threats (Malware, Phishing, Ransomware), Firewalls, Encryption (Symmetric vs Asymmetric), Cyber Laws' },
        ],
      },
    ],
  },
  {
    unitNumber: 10,
    title: 'Unit 10: Entrepreneurship Development & Small Business Management',
    topics: [
      {
        name: 'Entrepreneurship: Concepts, Mindset and Theories',
        subtopics: [
          { name: 'Concept, Characteristics, Entrepreneurial Mindset and Competencies' },
          { name: 'Theories of Entrepreneurship: Schumpeter’s Innovation Theory (Creative Destruction), McClelland’s Need for Achievement, Hagen’s Theory of Social Change, Knight’s Risk-Bearing Theory' },
          { name: 'Types of Entrepreneurs: Innovative, Imitative, Fabian, Drone, Social, Technopreneur, Intrapreneur (Corporate Entrepreneur)' },
        ],
      },
      {
        name: 'Business Opportunity Identification and Business Plan Development',
        subtopics: [
          { name: 'Opportunity Recognition: Ideation techniques (Design Thinking, Brainstorming, Scamper), Environmental Scanning' },
          { name: 'Feasibility Analysis: Technical, Market, Financial, Operational, and Legal Feasibility' },
          { name: 'Business Plan (B-Plan) Preparation: Executive Summary, Market Plan, Operational Plan, Financial Projections, Pitch Deck formulation' },
        ],
      },
      {
        name: 'Entrepreneurial Financing and Venture Ecosystem',
        subtopics: [
          { name: 'Financing Stages: Bootstrapping, Seed Capital, Angel Investors, Venture Capital (Series A, B, C rounds), Crowdfunding, IPO' },
          { name: 'Venture Capital Investment Process: Deal Origination, Screening, Due Diligence, Deal Structuring, Post-Investment Monitoring, Exit Mechanisms' },
          { name: 'Startup Ecosystem: Business Incubators, Accelerators, Science & Technology Parks, Startup India Initiative, Atal Innovation Mission (AIM), Standup India' },
        ],
      },
      {
        name: 'MSME Development, Family Business and Women Entrepreneurship',
        subtopics: [
          { name: 'MSME Classification under MSMED Act (Composite criteria of Investment in Plant & Machinery and Annual Turnover)' },
          { name: 'Institutional Support for MSMEs: SIDBI, NABARD, NSIC, DICs, KVIC, MUDRA' },
          { name: 'Family Business: Dynamics, Succession Planning, Governance, Conflict Resolution (3-Circle Model of Family Business)' },
          { name: 'Women Entrepreneurship: Challenges, Opportunities, Government schemes (TREAD, Mahila Samridhi Yojana, Stand-Up India)' },
        ],
      },
    ],
  },
];
