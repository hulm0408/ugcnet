import { getPaper1MockTest } from './generators/subjects/paper1';
import { getArabicMockTest } from './generators/subjects/arabic';
import { getHistoryMockTest } from './generators/subjects/history';
import { getPoliticalScienceMockTest } from './generators/subjects/political_science';
import { getEconomicsMockTest } from './generators/subjects/economics';
import { getComputerScienceMockTest } from './generators/subjects/computer_science';
import { getCommerceMockTest } from './generators/subjects/commerce';
import { getManagementMockTest } from './generators/subjects/management';
import { getEnglishMockTest } from './generators/subjects/english';
import { getHindiMockTest } from './generators/subjects/hindi';
import { getLawMockTest } from './generators/subjects/law';
import { getSociologyMockTest } from './generators/subjects/sociology';
import { getPsychologyMockTest } from './generators/subjects/psychology';
import { getEducationMockTest } from './generators/subjects/education';
import { getGeographyMockTest } from './generators/subjects/geography';
import { getBengaliMockTest } from './generators/subjects/bengali';
import { getSanskritMockTest } from './generators/subjects/sanskrit';
import { getUrduMockTest } from './generators/subjects/urdu';
import { getYogaMockTest } from './generators/subjects/yoga';

const tests = [
  { subject: 'Paper 1', count: getPaper1MockTest().questions.length },
  { subject: 'Arabic', count: getArabicMockTest().questions.length },
  { subject: 'History', count: getHistoryMockTest().questions.length },
  { subject: 'Political Science', count: getPoliticalScienceMockTest().questions.length },
  { subject: 'Economics', count: getEconomicsMockTest().questions.length },
  { subject: 'Computer Science', count: getComputerScienceMockTest().questions.length },
  { subject: 'Commerce', count: getCommerceMockTest().questions.length },
  { subject: 'Management', count: getManagementMockTest().questions.length },
  { subject: 'English', count: getEnglishMockTest().questions.length },
  { subject: 'Hindi', count: getHindiMockTest().questions.length },
  { subject: 'Law', count: getLawMockTest().questions.length },
  { subject: 'Sociology', count: getSociologyMockTest().questions.length },
  { subject: 'Psychology', count: getPsychologyMockTest().questions.length },
  { subject: 'Education', count: getEducationMockTest().questions.length },
  { subject: 'Geography', count: getGeographyMockTest().questions.length },
  { subject: 'Bengali', count: getBengaliMockTest().questions.length },
  { subject: 'Sanskrit', count: getSanskritMockTest().questions.length },
  { subject: 'Urdu', count: getUrduMockTest().questions.length },
  { subject: 'Yoga', count: getYogaMockTest().questions.length },
];

console.table(tests);
