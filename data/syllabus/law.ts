import type { OfficialSyllabusUnit, SyllabusSourceInfo } from '../../config/subjects/types';

export const lawSyllabusSource: SyllabusSourceInfo = {
  authority: 'UGC / NTA',
  documentTitle: 'UGC NET Law (Code 58) Official Syllabus',
  retrievedDate: '2024-08',
  verified: true,
};

export const lawSyllabus: OfficialSyllabusUnit[] = [
  {
    unitNumber: 1,
    title: 'Unit I: Jurisprudence',
    topics: [
      {
        name: 'Nature, Scope and Sources of Law',
        subtopics: [
          { name: 'Nature and Definition of Jurisprudence, Relation of Jurisprudence with other Social Sciences' },
          { name: 'Sources of Law: Custom (Essentials of valid custom), Precedent (Stare Decisis, Ratio Decidendi, Obiter Dicta), Legislation (Supreme and Subordinate legislation)' },
        ],
      },
      {
        name: 'Schools of Jurisprudence',
        subtopics: [
          { name: 'Natural Law School: Classical Greek/Roman, Medieval (St. Thomas Aquinas), Renaissance, Modern Revival (John Finnis, Lon Fuller’s Inner Morality of Law)' },
          { name: 'Analytical Positivism: John Austin (Command Theory, Sovereign, Sanction), H.L.A. Hart (Concept of Law - Primary and Secondary Rules, Rule of Recognition), Hans Kelsen (Pure Theory of Law - Grundnorm, Hierarchy of Norms), Jeremy Bentham (Utilitarianism)' },
          { name: 'Historical School: Friedrich Carl von Savigny (Volksgeist - Spirit of the people), Sir Henry Maine (Status to Contract)' },
          { name: 'Sociological School: Roscoe Pound (Social Engineering, Jural Postulates), Rudolf von Ihering (Jurisprudence of Interests), Leon Duguit (Social Solidarity), Eugen Ehrlich (Living Law)' },
          { name: 'Realist School: American Realism (Oliver Wendell Holmes - Bad Man Theory, Karl Llewellyn, Jerome Frank) and Scandinavian Realism (Axel Hägerström, Alf Ross)' },
          { name: 'Critical Legal Studies (CLS), Feminist Jurisprudence, and Postmodern Legal Theory' },
        ],
      },
      {
        name: 'Law, Morality and Theories of Justice',
        subtopics: [
          { name: 'Hart-Devlin Debate on Law and Morality, Hart-Fuller Debate on Positivism and Fidelity to Law' },
          { name: 'Theories of Justice: Aristotle’s Distributive vs Corrective Justice, John Rawls (A Theory of Justice - Veil of Ignorance, Difference Principle), Robert Nozick (Entitlement Theory), Amartya Sen (Idea of Justice - Niti vs Nyaya)' },
        ],
      },
      {
        name: 'Legal Concepts: Rights, Duties, Personality and Ownership',
        subtopics: [
          { name: 'Rights and Duties: Hohfeld’s Table of Jural Correlatives and Jural Opposites' },
          { name: 'Legal Personality: Status of Unborn Person, Dead Person, Animals, Idol, Corporate Personality (Theories of Corporate Personality)' },
          { name: 'Concepts of Property, Possession (Corpus Possessionis & Animus Possidendi, Savigny & Salmond theories), Ownership (Vested vs Contingent), and Liability (Civil vs Criminal, Strict & Absolute liability)' },
        ],
      },
    ],
  },
  {
    unitNumber: 2,
    title: 'Unit II: Constitutional and Administrative Law',
    topics: [
      {
        name: 'Preamble, Fundamental Rights and Basic Structure Doctrine',
        subtopics: [
          { name: 'Preamble: Sovereign, Socialist, Secular, Democratic, Republic, Justice, Liberty, Equality, Fraternity (Berubari vs Kesavananda Bharati)' },
          { name: 'Definition of State under Article 12 and Law under Article 13 (Judicial Review, Doctrine of Eclipse, Severability, Waiver)' },
          { name: 'Right to Equality (Articles 14 to 18): Rule of Law, Arbitrariness test (E.P. Royappa), Reasonable classification, Affirmative action / Reservations (Articles 15, 16, Indra Sawhney, Maratha Reservation)' },
          { name: 'Right to Freedom (Articles 19 to 22): Six Freedoms & Reasonable restrictions (Article 19(2)), Protection in respect of conviction (Article 20: Ex-post facto, Double jeopardy, Self-incrimination)' },
          { name: 'Protection of Life and Personal Liberty (Article 21): Due Process vs Procedure Established by Law (A.K. Gopalan, Maneka Gandhi, K.S. Puttaswamy - Right to Privacy)' },
          { name: 'Right against Exploitation (Arts 23-24), Freedom of Religion (Arts 25-28: Essential Religious Practices test), Cultural & Educational Rights (Arts 29-30), Constitutional Remedies (Art 32 & 226 Writs: Habeas Corpus, Mandamus, Prohibition, Quo Warranto, Certiorari)' },
          { name: 'Basic Structure Doctrine: Evolution from Shankari Prasad, Sajjan Singh, Golaknath to Kesavananda Bharati (1973), Minerva Mills (1980), I.R. Coelho (2007)' },
        ],
      },
      {
        name: 'Directive Principles, Fundamental Duties and Union-State Relations',
        subtopics: [
          { name: 'Directive Principles of State Policy (Part IV - Arts 36-51) and Fundamental Duties (Part IV-A - Art 51A), Harmonious Construction between Fundamental Rights and DPSPs (Champakam Dorairajan, Minerva Mills)' },
          { name: 'Federalism and Distribution of Powers: Legislative Relations (Seventh Schedule: Union, State, Concurrent Lists, Doctrine of Pith and Substance, Colorable Legislation, Territorial Nexus), Administrative Relations, Financial Relations (GST Council Art 279A, Finance Commission Art 280)' },
          { name: 'Emergency Provisions (Part XVIII): National Emergency (Art 352), President’s Rule (Art 356 - S.R. Bommai case guidelines), Financial Emergency (Art 360)' },
        ],
      },
      {
        name: 'Executive, Legislature and Judiciary',
        subtopics: [
          { name: 'Union & State Executive: President / Governor (Powers, Ordinances Art 123/213 - D.C. Wadhwa, Pardoning Power Art 72/161)' },
          { name: 'Parliament & State Legislatures: Privileges (Art 105/194), Anti-Defection Law (Tenth Schedule - Kihoto Hollohan)' },
          { name: 'Union & State Judiciary: Appointment of Judges (Collegium system - First, Second, Third Judges Cases, NJAC Case 2015), Independence of Judiciary, Supreme Court Jurisdiction (Original Art 131, Appellate, Advisory Art 143, Curative Petition - Rupa Ashok Hurra), Public Interest Litigation (PIL / Epistolary jurisdiction)' },
        ],
      },
      {
        name: 'Administrative Law: Natural Justice, Delegated Legislation & Control',
        subtopics: [
          { name: 'Nature, Scope and Evolution of Administrative Law, Separation of Powers (Montesquieu), Rule of Law (A.V. Dicey)' },
          { name: 'Delegated Legislation: Need, Limits, Sub-delegation (Delegatus non potest delegare), Parliamentary and Judicial Control of Delegated Legislation' },
          { name: 'Principles of Natural Justice: Nemo judex in causa sua (Rule against Bias: Pecuniary, Personal, Subject-matter bias), Audi alteram partem (Right to fair hearing, Reasoned decisions / Speaking orders), Post-decisional hearing, Exceptions to Natural Justice' },
          { name: 'Administrative Discretion and Judicial Control: Wednesbury Unreasonableness, Proportionality Doctrine, Legitimate Expectation, Promissory Estoppel' },
          { name: 'Ombudsman (Lokpal and Lokayuktas Act 2013), Central Vigilance Commission (CVC), Tribunals (Article 323A & 323B - L. Chandra Kumar case)' },
        ],
      },
    ],
  },
  {
    unitNumber: 3,
    title: 'Unit III: Public International Law and IHL',
    topics: [
      {
        name: 'Nature, Origins and Sources of International Law',
        subtopics: [
          { name: 'Nature and Basis of International Law (True law or Positive morality - Austin vs Oppenheim, Pacta Sunt Servanda, Jus Cogens norms)' },
          { name: 'Sources of International Law (Article 38 of ICJ Statute: Treaties/Conventions, International Custom - Opinio Juris, General Principles of Law, Judicial Decisions, Juristic writings)' },
          { name: 'Relationship between International Law and Municipal Law: Monism vs Dualism, Specific Adoption / Transformation theories, Indian practice (Article 51(c), Article 253)' },
        ],
      },
      {
        name: 'Subjects, Statehood, Recognition and Succession',
        subtopics: [
          { name: 'Subjects of International Law: States, International Organizations (Reparations for Injuries Advisory Opinion 1949), Non-State entities, Individuals' },
          { name: 'Statehood criteria (Montevideo Convention 1933: Permanent population, Defined territory, Government, Capacity to enter relations)' },
          { name: 'Recognition of States and Governments: Constitutive Theory (Oppenheim) vs Declaratory / Evidentiary Theory (Hall), De Jure vs De Facto Recognition, Legal consequences of recognition / non-recognition' },
          { name: 'State Succession: Rights and Obligations regarding treaties, public debts, state property' },
          { name: 'State Jurisdiction: Territorial, Nationality, Protective, Universality principles, Extradition (Doctrine of Double Criminality, Rule of Specialty, Non-extradition of political offenders), Asylum (Territorial vs Extra-territorial)' },
        ],
      },
      {
        name: 'Law of the Sea and State Responsibility',
        subtopics: [
          { name: 'United Nations Convention on the Law of the Sea (UNCLOS III 1982): Internal Waters, Territorial Sea (12 NM, Right of Innocent Passage), Contiguous Zone (24 NM), Exclusive Economic Zone (EEZ - 200 NM), Continental Shelf, High Seas (Freedom of High Seas), International Seabed Authority' },
          { name: 'State Responsibility: Internationally Wrongful Acts (ILC Articles on State Responsibility), Attribution of conduct, Reparation (Restitution, Compensation, Satisfaction)' },
        ],
      },
      {
        name: 'United Nations and International Humanitarian Law (IHL)',
        subtopics: [
          { name: 'United Nations Organization: General Assembly, Security Council (Chapter VII enforcement powers, Veto), ECOSOC, Trusteeship, Secretariat, International Court of Justice (ICJ: Contentious vs Advisory jurisdiction)' },
          { name: 'Settlement of International Disputes: Peaceful Means (Article 33 of UN Charter: Negotiation, Good Offices, Mediation, Conciliation, Arbitration, Judicial Settlement) vs Coercive Means (Retorsion, Reprisals, Embargo, Sanctions)' },
          { name: 'International Humanitarian Law (IHL): Geneva Conventions 1949 and Additional Protocols, Hague Conventions, Protection of wounded, prisoners of war (POWs) and civilians in armed conflict, International Criminal Court (ICC - Rome Statute: Genocide, Crimes against Humanity, War Crimes, Aggression)' },
        ],
      },
    ],
  },
  {
    unitNumber: 4,
    title: 'Unit IV: Law of Crimes',
    topics: [
      {
        name: 'General Principles of Criminal Law and Mens Rea',
        subtopics: [
          { name: 'Elements of Crime: Actus Reus (Guilty Act), Mens Rea (Guilty Mind - Actus non facit reum nisi mens sit rea), Exception of Strict Liability in criminal law' },
          { name: 'Stages of Crime: Intention, Preparation (when punishable: Waging war, Dacoity), Attempt (Section 511 IPC / BNS), Accomplishment' },
          { name: 'Group Liability: Joint Liability (Section 34 IPC - Common Intention, Barendra Kumar Ghosh case) vs Constructive Liability (Section 149 IPC - Common Object of Unlawful Assembly)' },
          { name: 'Abetment (Sec 107-120 IPC), Criminal Conspiracy (Sec 120A & 120B IPC - Agreement to do an illegal act)' },
        ],
      },
      {
        name: 'General Exceptions (Sections 76 to 106 IPC)',
        subtopics: [
          { name: 'Mistake of Fact vs Mistake of Law (Sec 76 & 79 - Ignorantia facti excusat, ignorantia juris non excusat)' },
          { name: 'Judicial Acts (Sec 77 & 78), Accident (Sec 80), Absence of criminal intention / Necessity (Sec 81 - R v Dudley and Stephens)' },
          { name: 'Infancy / Doli Incapax (Sec 82 - absolute immunity under 7 years, Sec 83 - 7 to 12 years maturity test)' },
          { name: 'Insanity (Sec 84 - M’Naghten Rules, Legal vs Medical Insanity), Involuntary Intoxication (Sec 85) vs Voluntary Intoxication (Sec 86 - Basdev v State of Pepsu)' },
          { name: 'Consent (Sec 87-90 - Volenti non fit injuria), Duress / Compulsion (Sec 94), Act causing slight harm / Trifle (Sec 95 - De minimis non curat lex)' },
          { name: 'Right of Private Defence of Body and Property (Sec 96 to 106 IPC - When right extends to causing death Sec 100 & 103)' },
        ],
      },
      {
        name: 'Offences Against the Human Body',
        subtopics: [
          { name: 'Culpable Homicide (Section 299 IPC) vs Murder (Section 300 IPC - Five Exceptions to Section 300: Grave & Sudden Provocation (K.M. Nanavati), Right of Private Defence, Exceeding legal power, Sudden fight, Consenting victim)' },
          { name: 'Rash and Negligent Act causing death (Sec 304A IPC), Dowry Death (Sec 304B IPC), Abetment of Suicide (Sec 306 IPC)' },
          { name: 'Hurt (Sec 319) and Grievous Hurt (Sec 320 - Eight designated clauses)' },
          { name: 'Wrongful Restraint (Sec 339) and Wrongful Confinement (Sec 340)' },
          { name: 'Force, Criminal Force, Assault (Sec 351), Kidnapping (From India Sec 360, From lawful guardianship Sec 361) vs Abduction (Sec 362)' },
          { name: 'Sexual Offences: Rape (Sec 375 & 376 IPC - Post-Criminal Law Amendment 2013 changes), Sexual harassment, Voyeurism, Stalking (Sec 354A-D), Unnatural Offences (Sec 377 - Navtej Singh Johar decrim)' },
        ],
      },
      {
        name: 'Offences Against Property and the State',
        subtopics: [
          { name: 'Theft (Sec 378 - Five explanations), Extortion (Sec 383), Robbery (Sec 390 - when theft/extortion is robbery), Dacoity (Sec 391 - Five or more persons)' },
          { name: 'Criminal Misappropriation of Property (Sec 403), Criminal Breach of Trust (Sec 405)' },
          { name: 'Cheating (Sec 415 & 420), Mischief (Sec 425), Criminal Trespass, House-breaking (Sec 445)' },
          { name: 'Offences Against State: Waging War (Sec 121), Sedition (Sec 124A - Kedar Nath Singh guidelines), Defamation (Sec 499 & 500 - Ten exceptions)' },
        ],
      },
    ],
  },
  {
    unitNumber: 5,
    title: 'Unit V: Law of Torts and Consumer Protection',
    topics: [
      {
        name: 'Nature, Definition and General Principles of Tortious Liability',
        subtopics: [
          { name: 'Definition of Tort (Salmond vs Winfield: Tort vs Breach of Contract, Tort vs Crime)' },
          { name: 'Fundamental Maxims: Injuria sine damno (Ashby v White - actionable per se) vs Damnum sine injuria (Gloucester Grammar School case)' },
          { name: 'Mental Elements in Tort: Malice, Intention, Negligence, Motive' },
        ],
      },
      {
        name: 'General Defences in Tort',
        subtopics: [
          { name: 'Volenti non fit injuria (Consent - Hall v Brooklands, Rescue cases exception: Haynes v Harwood)' },
          { name: 'Act of God / Vis Major (Nichols v Marsland), Inevitable Accident (Stanley v Powell)' },
          { name: 'Statutory Authority (Vaughan v Taff Vale Rly), Necessity (Cope v Sharpe), Private Defence, Act of State' },
        ],
      },
      {
        name: 'Specific Torts and Liabilities',
        subtopics: [
          { name: 'Negligence: Duty of care (Donoghue v Stevenson - Snail in the ginger beer / Neighbour Principle), Breach of duty, Causation and Remoteness of Damage (Re Polemis vs Wagon Mound No. 1), Res Ipsa Loquitur, Contributory Negligence (Last Opportunity Rule)' },
          { name: 'Strict Liability: Rule in Rylands v Fletcher (1868) - Non-natural use of land, escape of dangerous thing, Five Exceptions' },
          { name: 'Absolute Liability: M.C. Mehta v Union of India (1987 - Oleum Gas Leak Case) - Enterprise engaged in hazardous industry liable without any Rylands exceptions, Bhopal Gas Disaster' },
          { name: 'Vicarious Liability: Master and Servant relationship (Course of Employment, Frolic of his own, Sovereign Immunity of State - Kasturilal vs State of UP / Vidyawati vs State of Rajasthan)' },
          { name: 'Nuisance (Public vs Private), Defamation (Libel vs Slander, Defences: Truth, Fair Comment, Privilege), Trespass to Person (Assault, Battery, False Imprisonment) and Property' },
        ],
      },
      {
        name: 'Consumer Protection Act, 2019 and Motor Vehicles Act',
        subtopics: [
          { name: 'Consumer Protection Act 2019: Consumer definition, Rights of Consumers, Unfair Trade Practices, Defect in Goods, Deficiency in Services, E-commerce rules' },
          { name: 'Redressal Machinery: District Commission (Pecuniary limit up to 50 Lakhs / 1 Crore), State Commission, National Commission, Central Consumer Protection Authority (CCPA), Product Liability provisions' },
          { name: 'Motor Vehicles Act 1988: Third Party Insurance, No-Fault Liability, Claims Tribunal procedures' },
        ],
      },
    ],
  },
  {
    unitNumber: 6,
    title: 'Unit VI: Commercial Law (Contracts, Company & Partnership)',
    topics: [
      {
        name: 'General Principles of Contract Law (Indian Contract Act, 1872)',
        subtopics: [
          { name: 'Formation of Contract: Offer and Acceptance (Postal Rule - Adams v Lindsell, Communication through electronic means)' },
          { name: 'Consideration: Privity of Contract (Tweddle v Atkinson, Dunlop Tyre case) vs Privity of Consideration in Indian Law (Chinnaya v Ramayya)' },
          { name: 'Capacity to Contract: Minor’s Agreement is Void ab initio (Mohori Bibee v Dharmodas Ghose 1903)' },
          { name: 'Free Consent (Coercion Sec 15, Undue Influence Sec 16, Fraud Sec 17, Misrepresentation Sec 18, Bilateral Mistake Sec 20)' },
          { name: 'Agreements in Restraint of Trade (Sec 27 - Exceptions), Restraint of Legal Proceedings (Sec 28), Wagering Agreements (Sec 30)' },
          { name: 'Discharge of Contract, Frustration of Contract (Sec 56 - Doctrine of Impossibility: Taylor v Caldwell, Satyabrata Ghose), Remedies for Breach' },
        ],
      },
      {
        name: 'Special Contracts: Indemnity, Guarantee, Bailment, Pledge & Agency',
        subtopics: [
          { name: 'Contract of Indemnity (Sec 124) vs Contract of Guarantee (Sec 126), Continuing Guarantee, Discharge of Surety' },
          { name: 'Bailment (Sec 148): Duties of Bailor and Bailee, Bailee’s Particular vs General Lien' },
          { name: 'Pledge (Sec 172): Rights of Pawnee, Pledge by non-owners' },
          { name: 'Contract of Agency (Sec 182): Creation of Agency, Ostensible authority, Sub-agent vs Substituted agent, Termination of Agency' },
        ],
      },
      {
        name: 'Partnership Act, 1932 and Limited Liability Partnership Act, 2008',
        subtopics: [
          { name: 'Partnership Act 1932: Essential elements, Sharing of profits vs Agency test (Cox v Hickman), Relations of partners to one another and third parties, Implied authority of partner, Registration of firms and effects of non-registration (Sec 69), Dissolution of firm' },
          { name: 'LLP Act 2008: Salient features, LLP vs Partnership firm vs Company, Designated partners, Incorporation and Winding up of LLP' },
        ],
      },
      {
        name: 'The Companies Act, 2013: Corporate Governance & Management',
        subtopics: [
          { name: 'Corporate Personality: Veil of Incorporation (Salomon v Salomon & Co Ltd) and Lifting the Corporate Veil' },
          { name: 'MOA (Clauses, Ultra Vires doctrine: Ashbury Rly Carriage case) and AOA (Indoor Management: Royal British Bank v Turquand, Constructive Notice)' },
          { name: 'Corporate Financing: Shares, Debentures, Prospectus liability (Golden Rule), Buy-back of shares' },
          { name: 'Corporate Management: Directors (Appointment, Independent Directors, Duties under Sec 166), Board Meetings, Prevention of Oppression and Mismanagement (Sec 241-242 - Foss v Harbottle rule and exceptions), Corporate Social Responsibility (Sec 135), Winding up (Insolvency and Bankruptcy Code IBC 2016)' },
        ],
      },
    ],
  },
  {
    unitNumber: 7,
    title: 'Unit VII: Family Law',
    topics: [
      {
        name: 'Sources, Schools and Marriage under Hindu Law',
        subtopics: [
          { name: 'Sources of Hindu Law: Ancient (Shruti, Smriti, Commentaries/Nibandhas, Custom) and Modern (Legislation, Precedent, Justice, Equity & Good Conscience)' },
          { name: 'Schools of Hindu Law: Mitakshara (Four sub-schools: Benares, Mithila, Maharashtra, Dravida - Right by birth, Survivorship) vs Dayabhaga (Jimutavahana - Succession on death)' },
          { name: 'Hindu Marriage Act, 1955: Conditions for Valid Marriage (Section 5), Void (Sec 11) and Voidable (Sec 12) Marriages, Ceremonies of Marriage (Sec 7 - Saptapadi)' },
        ],
      },
      {
        name: 'Matrimonial Remedies, Divorce, Maintenance & Adoption in Hindu Law',
        subtopics: [
          { name: 'Matrimonial Remedies: Restitution of Conjugal Rights (Sec 9 - T. Sareetha vs Saroj Rani constitutionality), Judicial Separation (Sec 10)' },
          { name: 'Divorce Grounds (Section 13(1)): Cruelty (mental & physical), Desertion, Adultery, Conversion, Insanity, Leprosy, Presumption of death' },
          { name: 'Divorce by Mutual Consent (Sec 13B - Cooling-off period waiver: Amardeep Singh), Irretrievable Breakdown of Marriage (Supreme Court Article 142 powers)' },
          { name: 'Hindu Adoption and Maintenance Act, 1956: Capacity to adopt, Requisites of valid adoption, Maintenance of wife, children, aged parents (Sec 18, 19, 20), Maintenance under Section 125 CrPC / BNSS (Shah Bano case)' },
          { name: 'Hindu Succession Act, 1956: Intestate Succession (Class I, Class II heirs, Agnates, Cognates), Coparcenary and 2005 Amendment (Daughters as Coparceners by birth - Vineeta Sharma v Rakesh Sharma 2020)' },
        ],
      },
      {
        name: 'Sources, Schools and Marriage under Muslim Law',
        subtopics: [
          { name: 'Sources of Muslim Law: Primary (Quran, Sunnah/Hadith, Ijma, Qiyas) and Secondary (Custom, Judicial Precedents, Legislation, Istihsan/Equity)' },
          { name: 'Schools of Muslim Law: Sunni Schools (Hanafi, Maliki, Shafi’i, Hanbali) and Shia Schools (Ithna-Ashari/Ja’fari, Isma’ili, Zaydi)' },
          { name: 'Nikah (Muslim Marriage): Nature of contract, Essentials of valid marriage (Ijab & Qubul, Capacity, Witnesses, Mehr/Dower), Classification of Marriage (Sahih/Valid, Fasid/Irregular, Batil/Void, Muta Marriage under Shia law)' },
          { name: 'Dower (Mehr): Prompt (Mu’ajjal) vs Deferred (Muwajjal) Dower, Proper Dower (Mehr-i-Misl), Widow’s Right of Retention' },
        ],
      },
      {
        name: 'Dissolution of Muslim Marriage, Hiba, Wills and Waqf',
        subtopics: [
          { name: 'Talaq by Husband: Talaq-us-Sunnat (Ahsan & Hasan), Talaq-ul-Biddat (Triple Talaq - Declared unconstitutional in Shayara Bano 2017 & Muslim Women Protection of Rights on Marriage Act 2019), Ila, Zihar' },
          { name: 'Divorce by Mutual Consent: Khula and Mubarat' },
          { name: 'Divorce by Wife / Judicial Divorce: Dissolution of Muslim Marriages Act, 1939 (Sec 2 grounds: Cruelty, Desertion, Failure to maintain, Option of Puberty / Khiyar-ul-Buloogh)' },
          { name: 'Hiba (Gift): Essentials of valid Hiba (Declaration, Acceptance, Delivery of Possession), Hiba-bil-Iwaz, Hiba-ba-Shart-ul-Iwaz' },
          { name: 'Wills (Wasiyat - One-third disposable limit) and Waqf (Creation, Mutawalli, Waqf Act 1995)' },
          { name: 'Uniform Civil Code (UCC - Article 44 debate, Sarla Mudgal, Daniel Latifi cases)' },
        ],
      },
    ],
  },
  {
    unitNumber: 8,
    title: 'Unit VIII: Environment and Human Rights Law',
    topics: [
      {
        name: 'Constitutional and Statutory Environmental Law in India',
        subtopics: [
          { name: 'Constitutional Provisions: Article 21 (Right to wholesome environment - Subhash Kumar case), Article 48A (State obligation), Article 51A(g) (Fundamental duty)' },
          { name: 'Environment (Protection) Act, 1986: Definitions of Environment, Pollutant, Hazardous substance, Central Government powers, Environmental Impact Assessment (EIA) Notification' },
          { name: 'Water (Prevention and Control of Pollution) Act 1974 & Air (Prevention and Control of Pollution) Act 1981: Central and State Pollution Control Boards (CPCB/SPCB) powers and functions' },
          { name: 'National Green Tribunal (NGT) Act, 2010: Composition, Jurisdiction, Powers, Application of Precautionary and Polluter Pays Principles' },
        ],
      },
      {
        name: 'International Environmental Law Principles and Conventions',
        subtopics: [
          { name: 'Stockholm Declaration 1972 (Magna Carta of Environment) and Rio Declaration 1992 (Agenda 21)' },
          { name: 'Core Environmental Doctrines: Sustainable Development, Precautionary Principle (Vellore Citizens Welfare Forum), Polluter Pays Principle (Indian Council for Enviro-Legal Action), Public Trust Doctrine (M.C. Mehta v Kamal Nath), Inter-Generational Equity' },
          { name: 'Key Multilateral Agreements: Montreal Protocol 1987, UNFCCC & Kyoto Protocol 1997, Paris Agreement 2015, Convention on Biological Diversity (CBD 1992)' },
        ],
      },
      {
        name: 'Human Rights Jurisprudence and International Bill of Rights',
        subtopics: [
          { name: 'Concept, Evolution and Generations of Human Rights: First (Civil-Political), Second (Socio-Economic), Third (Collective/Solidarity rights)' },
          { name: 'Universal Declaration of Human Rights (UDHR 1948 - 30 Articles)' },
          { name: 'International Covenant on Civil and Political Rights (ICCPR 1966) and International Covenant on Economic, Social and Cultural Rights (ICESCR 1966)' },
          { name: 'Conventions on Specific Rights: CEDAW (Women), CRC (Rights of the Child), CAT (Convention Against Torture), CRPD (Disabilities)' },
        ],
      },
      {
        name: 'Human Rights Protection in India',
        subtopics: [
          { name: 'Protection of Human Rights Act, 1993: National Human Rights Commission (NHRC) and State Human Rights Commissions (SHRC) - Composition, Functions, Powers of Inquiry' },
          { name: 'Human Rights of Vulnerable Groups: Rights of Women (Vishaka v State of Rajasthan - POSH Act 2013), Children (POCSO Act 2012, Child Labour Prohibition), Scheduled Castes/Scheduled Tribes (SC/ST Prevention of Atrocities Act 1989), Refugees and Migrants' },
        ],
      },
    ],
  },
  {
    unitNumber: 9,
    title: 'Unit IX: Intellectual Property Rights and Cyber Law',
    topics: [
      {
        name: 'Concept of IPR and International Treaties',
        subtopics: [
          { name: 'Nature, Scope and Theories of Intellectual Property (Locke’s Labour Theory, Hegel’s Personality Theory, Utilitarian/Incentive Theory)' },
          { name: 'International Treaties: Paris Convention 1883 (Industrial Property), Berne Convention 1886 (Literary and Artistic Works), Patent Cooperation Treaty (PCT 1970), Madrid Agreement (Trademarks), WIPO Copyright Treaty (WCT 1996), WTO-TRIPS Agreement 1995 (Minimum standards, flexibilities, Compulsory licensing)' },
        ],
      },
      {
        name: 'Patents, Copyrights, Trademarks and Other IP Forms in India',
        subtopics: [
          { name: 'Patents Act, 1970: Patentability criteria (Novelty, Inventive Step / Non-obviousness, Industrial Applicability), Non-patentable inventions (Section 3 - Sec 3(d) Novartis case, Sec 3(k) Software/Algorithm exclusions), Compulsory Licensing (Sec 84 - Natco v Bayer), Infringement and Remedies' },
          { name: 'Copyright Act, 1957: Subject matter (Literary, Dramatic, Musical, Artistic works, Cinematograph films, Sound recordings), Rights of Author (Economic rights, Moral rights / Droit Moral Sec 57), Term of Copyright (Life + 60 years), Fair Dealing exceptions (Sec 52), Copyright Societies' },
          { name: 'Trade Marks Act, 1999: Distinctiveness, Absolute (Sec 9) and Relative (Sec 10) grounds for refusal, Deceptive similarity, Infringement vs Passing Off action, Well-known Trademarks' },
          { name: 'Geographical Indications of Goods Act 1999, Designs Act 2000, Protection of Plant Varieties and Farmers’ Rights Act 2001' },
        ],
      },
      {
        name: 'Information Technology Act, 2000 and Cyber Crimes',
        subtopics: [
          { name: 'UNCITRAL Model Law on Electronic Commerce (1996) and Enactment of IT Act 2000' },
          { name: 'Electronic Governance: Legal recognition of electronic records and electronic signatures, Asymmetric Crypto-system, Public/Private Key, Digital Signature Certificates (DSC), Certifying Authorities' },
          { name: 'Cyber Crimes and Penalties: Hacking (Sec 43/66), Data theft, Identity theft (Sec 66C), Cheating by personation (Sec 66D), Publishing obscene material (Sec 67, 67A, 67B), Cyber Terrorism (Sec 66F)' },
          { name: 'Intermediary Liability and Free Speech: Section 79 Safe Harbour provisions, Shreya Singhal v Union of India (2015 - Striking down Section 66A of IT Act)' },
          { name: 'Data Protection & Privacy: Information Technology (Reasonable Security Practices) Rules 2011, Digital Personal Data Protection (DPDP) Act, 2023 (Data Fiduciary, Data Principal rights, Data Protection Board of India)' },
        ],
      },
    ],
  },
  {
    unitNumber: 10,
    title: 'Unit X: Comparative Public Law and Systems of Governance',
    topics: [
      {
        name: 'Comparative Constitutionalism and Forms of Government',
        subtopics: [
          { name: 'Comparative Public Law: Meaning, Objectives, Scope, and Methodologies of Comparative Constitutional Law' },
          { name: 'Constitutionalism: Essential elements (Limited government, Rule of law, Fundamental rights protection, Judicial independence)' },
          { name: 'Forms of Government: Presidential vs Parliamentary Systems (USA vs UK vs India), Semi-Presidential System (France), Unitary vs Federal Systems (USA, Canada, Australia, India - Asymmetric Federalism)' },
        ],
      },
      {
        name: 'Constitutional Conventions, Separation of Powers and Judicial Review',
        subtopics: [
          { name: 'Rule of Law: A.V. Dicey’s concept and comparison across UK, USA, France (Droit Administratif), and India' },
          { name: 'Separation of Powers and Checks and Balances: Comparison between USA (Rigid separation), UK (Fused powers), France, and India' },
          { name: 'Judicial Review Models: American Model (Marbury v Madison - Decentralized review), European / Kelsenian Model (Constitutional Courts - Centralized review), Indian Model (Articles 13, 32, 226)' },
        ],
      },
      {
        name: 'Amendment of Constitution and Emergency Regimes in Comparative Perspective',
        subtopics: [
          { name: 'Amendment Procedures: Flexible vs Rigid Constitutions (UK, USA, Canada, Australia, South Africa, India Article 368)' },
          { name: 'Limits on Amending Power: Doctrine of Unconstitutional Constitutional Amendments (Basic Structure in India, Germany Basic Law Article 79(3) Eternity Clause / Ewigkeitsklausel)' },
          { name: 'Emergency Regimes: Comparison of Emergency Powers in USA, UK, France, and India' },
        ],
      },
      {
        name: 'Ombudsman and Public Accountability Mechanisms',
        subtopics: [
          { name: 'Evolution of Ombudsman System: Scandinavian Model (Sweden, Finland, Denmark), Parliamentary Commissioner (UK), Conseil d’État (France), Lokpal & Lokayuktas (India)' },
          { name: 'Open Government, Freedom of Information (USA FOIA vs UK Freedom of Information Act vs India RTI Act 2005)' },
        ],
      },
    ],
  },
];
