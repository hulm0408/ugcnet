'use client';

import React, { useState } from 'react';
import styles from './QuestionCard.module.css';

interface Option {
  key: string;
  arabic: string;
  english?: string;
}

interface QuestionProps {
  id: string;
  originalNumber: string;
  questionArabic: string;
  questionEnglish?: string | null;
  optionsArabic: Record<string, string>;
  optionsEnglish?: Record<string, string> | null;
  contextArabic?: string | null;
  contextEnglish?: string | null;
}

export default function QuestionCard({
  id,
  originalNumber,
  questionArabic,
  questionEnglish,
  optionsArabic,
  optionsEnglish,
  contextArabic,
  contextEnglish,
}: QuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options: Option[] = ['A', 'B', 'C', 'D'].map(key => ({
    key,
    arabic: optionsArabic[key] || '',
    english: optionsEnglish?.[key],
  })).filter(opt => opt.arabic !== '');

  return (
    <div className={styles.questionCard}>
      <div className={styles.cardHeader}>
        <div className={styles.questionMeta}>
          <span className="badge badge-neutral">Q{originalNumber}</span>
          <span className={styles.questionId}>ID: {id}</span>
        </div>
      </div>

      {(contextArabic || contextEnglish) && (
        <div className={styles.contextBlock}>
          {contextArabic && (
            <div className={styles.contextArabic}>{contextArabic}</div>
          )}
          {contextEnglish && (
            <div className={styles.contextEnglish}>{contextEnglish}</div>
          )}
        </div>
      )}

      <div className={styles.questionBody}>
        <div className={styles.questionArabic}>{questionArabic}</div>
        {questionEnglish && (
          <div className={styles.questionEnglish}>{questionEnglish}</div>
        )}
      </div>

      <div className={styles.optionsList}>
        {options.map((opt) => (
          <button
            key={opt.key}
            type="button"
            className={`${styles.optionBtn} ${selectedOption === opt.key ? styles.selected : ''}`}
            onClick={() => setSelectedOption(opt.key)}
          >
            <span className={styles.optionKey}>{opt.key}</span>
            <div className={styles.optionContent}>
              <div className={styles.optionArabic}>{opt.arabic}</div>
              {opt.english && (
                <div className={styles.optionEnglish}>{opt.english}</div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
