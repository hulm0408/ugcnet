import type { OfficialSyllabusUnit, SyllabusSourceInfo } from '../../config/subjects/types';

export const politicalScienceSyllabusSource: SyllabusSourceInfo = {
  authority: 'UGC / NTA',
  documentTitle: 'UGC NET Political Science (Code 02) Official Syllabus',
  retrievedDate: '2024-08',
  verified: true,
};

export const politicalScienceSyllabus: OfficialSyllabusUnit[] = [
  {
    unitNumber: 1,
    title: 'Unit 1: Political Theory (राजनीतिक सिद्धांत)',
    topics: [
      {
        name: 'Concepts: Liberty, Equality, Justice, Rights, Democracy and Power',
        subtopics: [
          { name: 'Liberty: Negative vs Positive Liberty (Isaiah Berlin), Republican Liberty, Autonomy' },
          { name: 'Equality: Equality of Opportunity vs Outcome, Complex Equality (Michael Walzer), Dworkin’s Resource Equality, Amartya Sen’s Capability Approach' },
          { name: 'Justice: John Rawls (A Theory of Justice - Original Position, Veil of Ignorance, Difference Principle), Robert Nozick (Entitlement Theory), Communitarian Critique (Sandel, Taylor, MacIntyre)' },
          { name: 'Rights: Natural, Legal, Moral, Human Rights (Three Generations of Rights - Karel Vasak), Dworkin (Rights as Trumps)' },
          { name: 'Democracy: Classical, Liberal, Participatory (Carole Pateman, C.B. Macpherson), Deliberative (Habermas, Joshua Cohen), Radical Democracy (Chantal Mouffe)' },
          { name: 'Power: Three Faces of Power (Steven Lukes), Foucault (Biopolitics, Disciplinary Power), Gramsci (Hegemony), Hannah Arendt (Acting in Concert)' },
        ],
      },
      {
        name: 'Sovereignty, Citizenship and Civil Society',
        subtopics: [
          { name: 'Sovereignty: Monistic Theory (Bodin, Austin), Pluralist Theory (Laski, Figgis, MacIver), Popular Sovereignty (Rousseau)' },
          { name: 'Citizenship: Liberal, Republican, Communitarian, Multicultural (Will Kymlicka - Group-Differentiated Rights), Differentiated (Iris Marion Young)' },
          { name: 'Civil Society and Public Sphere: Hegel, Marx, Gramsci, Habermas' },
        ],
      },
      {
        name: 'Political Traditions and Ideologies',
        subtopics: [
          { name: 'Liberalism: Classical (Locke, Smith), Modern/Welfare (Mill, Green, Rawls), Neo-Liberalism (Hayek, Nozick, Friedman)' },
          { name: 'Socialism & Marxism: Utopian vs Scientific Socialism (Marx & Engels), Western Marxism (Lukács, Gramsci, Frankfurt School)' },
          { name: 'Conservatism (Burke, Oakeshott), Communitarianism, Multiculturalism (Bhikhu Parekh, Charles Taylor)' },
          { name: 'Feminism (Liberal, Radical, Socialist, Postmodern, Black, Eco-feminism), Ecologism (Deep vs Shallow Ecology), Post-Modernism' },
        ],
      },
    ],
  },
  {
    unitNumber: 2,
    title: 'Unit 2: Western Political Thought',
    topics: [
      {
        name: 'Classical and Early Modern Western Thinkers',
        subtopics: [
          { name: 'Plato: Republic (Theory of Forms, Philosopher King, Justice, Ideal State, Communism of Wives and Property, Allegory of the Cave), Statesman, Laws' },
          { name: 'Aristotle: Politics (State as Natural Institution, Teleology, Citizenship, Classification of Constitutions, Theory of Revolution, Slavery, Distributive Justice)' },
          { name: 'Niccolò Machiavelli: The Prince, Discourses on Livy (Autonomy of Politics, Dual Morality, Lion and Fox, Fortune and Virtue)' },
          { name: 'Thomas Hobbes: Leviathan (State of Nature, Social Contract, Absolute Sovereignty, Self-Preservation)' },
          { name: 'John Locke: Two Treatises of Government (State of Nature, Natural Rights to Life, Liberty, Estate, Limited Government, Right to Revolution)' },
          { name: 'Jean-Jacques Rousseau: The Social Contract, Discourse on Inequality (Noble Savage, General Will vs Will of All, Forced to be Free)' },
        ],
      },
      {
        name: 'Modern, Utilitarian, Idealist and Revolutionary Western Thinkers',
        subtopics: [
          { name: 'Mary Wollstonecraft: A Vindication of the Rights of Woman (1792 - Gender Equality, Rationality, Education)' },
          { name: 'G.W.F. Hegel: Philosophy of Right (Dialectics, Master-Slave Dialectic, Family -> Civil Society -> State as March of God on Earth)' },
          { name: 'John Stuart Mill: On Liberty (Harm Principle, Qualitative Utilitarianism, Free Speech), Representative Government, Subjection of Women' },
          { name: 'Karl Marx: 1844 Manuscripts (Alienation), Communist Manifesto 1848, Das Kapital, Critique of Gotha Programme' },
          { name: 'Antonio Gramsci: Prison Notebooks (Hegemony, War of Position vs Movement, Organic Intellectuals, Historic Bloc)' },
          { name: 'Hannah Arendt: The Human Condition (Vita Activa: Labor, Work, Action), Origins of Totalitarianism, Banality of Evil' },
          { name: 'Frantz Fanon: The Wretched of the Earth, Black Skin White Masks; Mao Zedong: On Contradiction, Peasant Guerrilla Warfare; John Rawls: Theory of Justice' },
        ],
      },
    ],
  },
  {
    unitNumber: 3,
    title: 'Unit 3: Indian Political Thought',
    topics: [
      {
        name: 'Ancient and Medieval Indian Political Thinkers',
        subtopics: [
          { name: 'Dharamshastra and Kautilya: Arthashastra (Saptanga Theory of State, Mandala Theory, Shadgunya Niti, Espionage System)' },
          { name: 'Buddhist Traditions: Aggannasutta (Origin of State and Kingship / Mahasammata)' },
          { name: 'Ziauddin Barani: Fatawa-i-Jahandari (Ideal Sultan, Zawabit / State Laws), Kabir (Begumpura - Sorrowless City, Syncretism)' },
        ],
      },
      {
        name: 'Modern Indian Thinkers and Social Reformers',
        subtopics: [
          { name: 'Raja Ram Mohan Roy (Brahmo Samaj, Modern Liberalism), Pandita Ramabai (Stree Dharma Neeti, High-Caste Hindu Woman, Critique of Patriarchy)' },
          { name: 'Swami Vivekananda (Vedantic Humanism, Cultural Nationalism), Rabindranath Tagore (Universalism, Critique of Aggressive Nationalism)' },
          { name: 'Sri Aurobindo (Spiritual Nationalism, Passive Resistance, Integral Yoga)' },
          { name: 'Mahatma Gandhi: Hind Swaraj 1909 (Critique of Modern Civilization, Satyagraha, Ahimsa, Swaraj, Sarvodaya, Trusteeship, Oceanic Circles of Power)' },
          { name: 'B.R. Ambedkar: Annihilation of Caste, Constitutional Democracy, State Socialism, Social Justice, Navayana Buddhism' },
          { name: 'Jawaharlal Nehru (Democratic Socialism, Secularism, Panchsheel), Rammanohar Lohia (Sapta Kranti, Chaukhambha Raj), Jayaprakash Narayan (Total Revolution, Partyless Democracy), Periyar E.V. Ramasamy (Self-Respect Movement, Dravidian Rationalism), M.N. Roy (Radical Humanism)' },
        ],
      },
    ],
  },
  {
    unitNumber: 4,
    title: 'Unit 4: Comparative Political Analysis',
    topics: [
      {
        name: 'Approaches, Constitutionalism and Regimes',
        subtopics: [
          { name: 'Approaches: Institutional, Systems (Easton), Structural-Functional (Almond & Powell), Political Culture (Civic Culture), New Institutionalism' },
          { name: 'Constitutionalism: Western vs Non-Western, Forms of Constitutions, Rule of Law and Due Process' },
          { name: 'Regime Types: Democratic (Liberal, Electoral, Participatory) vs Authoritarian, Totalitarian, Military Regimes, Fascist Regimes' },
        ],
      },
      {
        name: 'Electoral Systems, Parties, Movements and Democratization',
        subtopics: [
          { name: 'Electoral Systems: FPTP, Proportional Representation (List System, STV), Mixed-Member Proportional (MMP), Duverger’s Law' },
          { name: 'Political Parties & Systems: Duverger Classification (Cadre, Mass), Sartori Typology (Predominant, Two-Party, Moderate vs Polarized Pluralism)' },
          { name: 'Interest Groups / Pressure Groups: Types and Pluralist vs Corporatist Models' },
          { name: 'Social Movements & Revolutions: Resource Mobilization Theory, Political Opportunity Structures, New Social Movements (NSMs), Skocpol’s Theory of Revolutions' },
          { name: 'Democratization: Huntington’s Waves of Democratization (1st, 2nd, 3rd Waves), Democratic Consolidation, Democratic Backsliding' },
        ],
      },
    ],
  },
  {
    unitNumber: 5,
    title: 'Unit 5: International Relations',
    topics: [
      {
        name: 'Theories and Approaches to International Relations',
        subtopics: [
          { name: 'Realism: Classical (Morgenthau’s 6 Principles, E.H. Carr), Neo-Realism / Structural (Waltz - Defensive vs Mearsheimer - Offensive Realism)' },
          { name: 'Liberalism: Classical (Kant’s Perpetual Peace), Neo-Liberal Institutionalism (Keohane & Nye - Complex Interdependence, International Regimes)' },
          { name: 'Marxist and Critical Theories: World Systems (Wallerstein), Dependency (Frank, Amin), Critical Theory (Robert Cox)' },
          { name: 'Social Constructivism (Alexander Wendt: Anarchy is what states make of it), Feminist IR (J. Ann Tickner, Cynthia Enloe), Post-Colonialism, Post-Modernism' },
        ],
      },
      {
        name: 'Concepts: Power, Security, Conflict, Peace and Global Institutions',
        subtopics: [
          { name: 'Power in IR: Hard, Soft (Nye), Smart Power, Polarity (Unipolar, Bipolar, Multipolar)' },
          { name: 'Security: Traditional Security vs Non-Traditional (Human Security - UNDP, Securitization Theory - Buzan)' },
          { name: 'Conflict Resolution and Peace: Positive vs Negative Peace (Johan Galtung), Arms Control, Nuclear Deterrence, NPT, CTBT' },
          { name: 'United Nations: Structure, Peacekeeping, Security Council Reforms, Global Political Economy (IMF, World Bank, WTO), Regional Blocs (EU, ASEAN, SAARC, SCO, BRICS, Quad)' },
        ],
      },
    ],
  },
  {
    unitNumber: 6,
    title: 'Unit 6: India’s Foreign Policy',
    topics: [
      {
        name: 'Principles, Evolution and Strategies of India’s Foreign Policy',
        subtopics: [
          { name: 'Foundations & Determinants: Geography, Strategic Culture, Economic Interests, Leadership' },
          { name: 'Core Principles: Non-Alignment (NAM), Panchsheel (1954), Strategic Autonomy, Gujral Doctrine (1996), Act East Policy, SAGAR Doctrine' },
          { name: 'Nuclear Doctrine: No First Use (NFU), Credible Minimum Deterrent, Non-Proliferation stance' },
        ],
      },
      {
        name: 'Bilateral Relations with Major Powers and Neighbours',
        subtopics: [
          { name: 'Relations with Major Powers: USA (Civil Nuclear Deal, 2+2 Dialogue, Quad, Defense Agreements), Russia (Special Strategic Partnership), China (Border Disputes, 1962, Galwan, BRI concerns)' },
          { name: 'Neighbourhood First: Pakistan (Kashmir, Indus Waters Treaty, Cross-border terrorism), Bangladesh (LBA 2015, Teesta), Nepal (1950 Treaty), Sri Lanka, Bhutan, Maldives, Afghanistan' },
          { name: 'Extended Neighbourhood & Multilateral Engagements: West Asia (Israel, Gulf Cooperation Council, Iran - Chabahar), Central Asia, Multilateralism (G20 2023, BRICS, SCO, UNSC Permanent Seat Quest)' },
        ],
      },
    ],
  },
  {
    unitNumber: 7,
    title: 'Unit 7: Political Institutions in India',
    topics: [
      {
        name: 'Making of the Constitution and Constitutional Organs',
        subtopics: [
          { name: 'Constituent Assembly Debates, Ideological Foundations, Preamble, Fundamental Rights and DPSPs' },
          { name: 'Union & State Executive: President (Powers, Ordinances, Discretion), Prime Minister & Council of Ministers, Governor' },
          { name: 'Union & State Legislature: Lok Sabha vs Rajya Sabha, Parliamentary Committees (PAC, Estimates, Department-Related Standing Committees)' },
          { name: 'Judiciary: Supreme Court, High Courts, Judicial Review, Judicial Activism, PIL, Collegium System, Judicial Reforms' },
        ],
      },
      {
        name: 'Federalism and Constitutional / Statutory Bodies',
        subtopics: [
          { name: 'Federal Structure: Cooperative Federalism, Asymmetric Federalism (Article 371), Inter-State Council, NITI Aayog, GST Council (Art 279A), Finance Commission (Art 280)' },
          { name: 'Local Self-Government: 73rd and 74th Constitutional Amendment Acts (PRIs, ULBs, PESA Act 1996)' },
          { name: 'Constitutional & Statutory Bodies: Election Commission of India (Art 324), CAG (Art 148), UPSC, National Commissions for SCs, STs, BCs, Minorities, Women, Human Rights (NHRC), Lokpal & Lokayuktas' },
        ],
      },
    ],
  },
  {
    unitNumber: 8,
    title: 'Unit 8: Political Processes in India',
    topics: [
      {
        name: 'State, Society and Identity Politics in India',
        subtopics: [
          { name: 'Caste in Indian Politics: Caste Mobilization, Dominant Caste, Reservation Policies, Mandal Commission' },
          { name: 'Religion and Communalism, Secularism debates, Minorities and Identity politics' },
          { name: 'Language and Regionalism: Linguistic Reorganization of States, Demands for Autonomy and New States' },
        ],
      },
      {
        name: 'Party System, Social Movements and Political Economy',
        subtopics: [
          { name: 'Party System: One-Party Dominance (Congress System - Rajni Kothari), Coalition Era, Multi-Party System, National vs State Parties, Anti-Defection Law' },
          { name: 'Social Movements: Farmers’ Movements, Labour Movements, Women’s Movement, Dalit and Tribal Movements, Environmental Movements' },
          { name: 'Political Economy of India: Planned Development, Neoliberal Reforms (1991), Welfare Regimes (MGNREGA, DBT, Food Security), State-Capital Nexus' },
        ],
      },
    ],
  },
  {
    unitNumber: 9,
    title: 'Unit 9: Public Administration',
    topics: [
      {
        name: 'Theories, Concepts and Evolution of Public Administration',
        subtopics: [
          { name: 'Evolution: Woodrow Wilson (Politics-Administration Dichotomy), Classical Theories (Fayol, Gulick & Urwick POSDCORB, Taylor’s Scientific Management, Weber’s Bureaucracy)' },
          { name: 'Human Relations (Elton Mayo - Hawthorne), Decision-Making Theory (Herbert Simon - Bounded Rationality, Satisficing Model)' },
          { name: 'Ecological Approach (Fred Riggs - Prismatic Sala Model), New Public Administration (Minnowbrook I, II, III), Public Choice Approach (Buchanan, Ostrom)' },
          { name: 'New Public Management (NPM - 3 Es: Economy, Efficiency, Effectiveness, Reinventing Government), New Public Service (Denhardt - Serving over Steering), Good Governance' },
        ],
      },
      {
        name: 'Accountability, Control and Administrative Reforms in India',
        subtopics: [
          { name: 'Mechanisms of Control: Legislative, Executive, and Judicial Control over Administration' },
          { name: 'Accountability & Citizens’ Rights: Citizen’s Charter, Right to Information (RTI Act 2005), Social Audit, Whistle Blowers Protection Act' },
          { name: 'Anti-Corruption Machinery: CVC, CBI, Lokpal & Lokayuktas Act 2013' },
          { name: 'Administrative Reforms: First ARC (1966) vs Second ARC (2005 - Veerappa Moily reports on Ethics, Local Governance, Citizen-Centric Administration)' },
        ],
      },
    ],
  },
  {
    unitNumber: 10,
    title: 'Unit 10: Governance and Public Policy in India',
    topics: [
      {
        name: 'Good Governance, E-Governance and Accountability Mechanisms',
        subtopics: [
          { name: 'Good Governance: Concepts, Characteristics (Accountability, Transparency, Rule of Law, Inclusiveness - World Bank parameters)' },
          { name: 'E-Governance: Initiatives (Digital India, UMANG, PRAGATI, GeM - Government e-Marketplace, Direct Benefit Transfer DBT), Challenges of Digital Governance' },
          { name: 'Civil Society, NGOs, Self-Help Groups (SHGs) and Participatory Governance' },
        ],
      },
      {
        name: 'Public Policy Formulation, Implementation and Major Policies',
        subtopics: [
          { name: 'Public Policy: Models of Policy Making (Institutional, Rational, Incremental - Lindblom, Garbage Can Model, Elite Model)' },
          { name: 'Policy Implementation and Evaluation: Monitoring, Feedback, Impact Assessment' },
          { name: 'Major Socio-Economic Policies: RTE Act 2009 / NEP 2020, Ayushman Bharat (PM-JAY), National Food Security Act (NFSA 2013), MGNREGA, Rights of Persons with Disabilities Act 2016' },
        ],
      },
    ],
  },
];
