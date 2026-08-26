import 'dotenv/config';
import prisma from '../../lib/db';
import { RawMockQuestion, MockTestDefinition, insertMockTestToDatabase, validateMockQuestions } from './common';

// Import all generators
import { getPaper1MockTest } from './subjects/paper1';
import { getArabicMockTest } from './subjects/arabic';
import { getHistoryMockTest } from './subjects/history';
import { getPoliticalScienceMockTest } from './subjects/political_science';
import { getEconomicsMockTest } from './subjects/economics';
import { getComputerScienceMockTest } from './subjects/computer_science';
import { getCommerceMockTest } from './subjects/commerce';
import { getManagementMockTest } from './subjects/management';
import { getEnglishMockTest } from './subjects/english';
import { getHindiMockTest } from './subjects/hindi';
import { getLawMockTest } from './subjects/law';
import { getSociologyMockTest } from './subjects/sociology';
import { getPsychologyMockTest } from './subjects/psychology';
import { getEducationMockTest } from './subjects/education';
import { getGeographyMockTest } from './subjects/geography';
import { getBengaliMockTest } from './subjects/bengali';
import { getSanskritMockTest } from './subjects/sanskrit';
import { getUrduMockTest } from './subjects/urdu';
import { getYogaMockTest } from './subjects/yoga';

// Topic database for enriching subjects to 10 questions per unit
export const SUBJECT_UNIT_TOPIC_REPOSITORIES: Record<string, Record<number, { topic: string; concepts: string[] }>> = {
  political_science: {
    1: { topic: 'Political Theory', concepts: ['Liberty', 'Equality', 'Justice', 'Rights', 'Democracy', 'Power', 'Citizenship', 'State', 'Feminism', 'Ecologism'] },
    2: { topic: 'Political Thought', concepts: ['Plato', 'Aristotle', 'Machiavelli', 'Hobbes', 'Locke', 'Rousseau', 'Hegel', 'Marx', 'Gramsci', 'Rawls'] },
    3: { topic: 'Indian Political Thought', concepts: ['Dharamshastra', 'Kautilya', 'Barani', 'Kabir', 'Pandita Ramabai', 'Tilak', 'Gandhi', 'Aurobindo', 'Periyar', 'Ambedkar'] },
    4: { topic: 'Comparative Political Analysis', concepts: ['Approaches', 'Colonialism', 'Nationalism', 'Constitutions', 'Regimes', 'Electoral Systems', 'Parties', 'Social Movements', 'State in Comparative Perspective', 'Globalization'] },
    5: { topic: 'International Relations', concepts: ['Realism', 'Liberalism', 'Constructivism', 'Marxist IR', 'Conflict & Peace', 'Security', 'Disarmament', 'Regional Organizations', 'Global Governance', 'Contemporary Challenges'] },
    6: { topic: 'India\'s Foreign Policy', concepts: ['Determinants', 'Non-Alignment', 'Neighbourhood First', 'Act East', 'Look West', 'US Relations', 'Russia Relations', 'China Relations', 'Multilateral Engagements', 'Nuclear Doctrine'] },
    7: { topic: 'Political Institutions in India', concepts: ['Constituent Assembly', 'Preamble & Rights', 'Union Executive', 'Parliament', 'Judiciary', 'Federalism', 'Statutory Bodies', 'Elections & Commissions', 'Local Self-Government', 'Constitutional Amendments'] },
    8: { topic: 'Political Processes in India', concepts: ['State & Society', 'Caste in Politics', 'Religion & Secularism', 'Gender & Politics', 'Regionalism', 'Social Movements', 'Civil Society', 'Electoral Politics', 'Coalitions', 'Political Economy'] },
    9: { topic: 'Public Administration', concepts: ['Meaning & Evolution', 'Theories of Organization', 'Scientific Management', 'Human Relations', 'Decision-Making', 'Ecological Approach', 'NPA & NPM', 'Public Choice', 'Development Administration', 'Good Governance'] },
    10: { topic: 'Governance & Public Policy in India', concepts: ['Good Governance Indicators', 'Accountability & Control', 'RTI & Citizen Charter', 'Ombudsman & Lokpal', 'Policy Making & Models', 'Monitoring & Evaluation', 'Social Audit', 'Panchayati Raj & Decentralization', 'E-Governance', 'Public Welfare Delivery'] },
  },
};
