'use client';

import React, { useState } from 'react';
import styles from './QuestionCard.module.css';
import MemoryButton from '@/components/memory/MemoryButton';
import QuestionMemoryStrip from '@/components/memory/QuestionMemoryStrip';
import MemoryConnectionModal from '@/components/memory/MemoryConnectionModal';

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
  const [memoryModalOpen, setMemoryModalOpen] = useState(false);
  const [memoryRefresh, setMemoryRefresh] = useState(0);

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

      {/* Memory Actions Row */}
      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2 flex-wrap">
        <span className="text-xs font-bold text-stone-400">Personal Connection</span>
        <MemoryButton
          questionId={id}
          onOpenMemoryModal={() => setMemoryModalOpen(true)}
        />
      </div>

      {/* Inline Memory Preview */}
      <QuestionMemoryStrip
        questionId={id}
        onOpenModal={() => setMemoryModalOpen(true)}
        refreshTrigger={memoryRefresh}
      />

      {/* Memory Connection Modal */}
      {memoryModalOpen && (
        <MemoryConnectionModal
          isOpen={memoryModalOpen}
          onClose={() => setMemoryModalOpen(false)}
          question={{
            id,
            original_question_number: originalNumber,
            question_arabic: questionArabic,
            question_english: questionEnglish,
          }}
          onMemorySaved={() => setMemoryRefresh((prev) => prev + 1)}
        />
      )}
    </div>
  );
}
