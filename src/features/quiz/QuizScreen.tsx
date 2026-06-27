/**
 * @file Practice screen: renders the active question by input kind and handles
 * answering, revealing and advancing.
 *
 * @packageDocumentation
 */

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Answer } from '@/domain/modes/types';
import type { MessageKey } from '@/i18n';
import { useI18n } from '@/state/i18n';
import { useSettings } from '@/state/settings';
import { StreakBadge } from '@/components/StreakBadge';
import { useQuiz } from './QuizProvider';
import { AnswerReveal } from './AnswerReveal';

/**
 * The practice screen.
 *
 * @returns The quiz view for the current pool, mode and question.
 */
export function QuizScreen(): JSX.Element {
  const quiz = useQuiz();
  const { t } = useI18n();
  const { settings } = useSettings();
  const [textValue, setTextValue] = useState('');
  const [chosenOptionId, setChosenOptionId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate the first question on mount / when pool or mode change (the
  // question is invalidated in the controller, so it regenerates here).
  useEffect(() => {
    if (!quiz.question && !quiz.error && quiz.poolSize > 0) quiz.next();
  }, [quiz]);

  // Clear the remembered choice whenever a new question appears.
  useEffect(() => {
    setChosenOptionId(null);
  }, [quiz.question]);

  // Focus the text field on every new question.
  useEffect(() => {
    if (quiz.question?.inputKind === 'text') inputRef.current?.focus();
  }, [quiz.question]);

  if (quiz.poolSize === 0) {
    return (
      <div className="notice">
        <p>{t('quiz.emptyPool')}</p>
        <Link className="btn" to="/">
          {t('quiz.configurePool')}
        </Link>
      </div>
    );
  }

  const question = quiz.question;
  if (!question) {
    return (
      <div className="notice">
        <p>{t('quiz.unusable')}</p>
        <Link className="btn" to="/">
          {t('quiz.adjust')}
        </Link>
      </div>
    );
  }

  const answered = quiz.result !== null;
  const instruction = t(question.prompt.instructionKey as MessageKey, question.prompt.instructionParams);

  function submitAnswer(answer: Answer): void {
    if (answered) return;
    if (answer.type === 'choice') setChosenOptionId(answer.optionId);
    quiz.submit(answer, settings);
  }

  function goNext(): void {
    setTextValue('');
    quiz.next();
  }

  return (
    <div className="quiz">
      <div className="row row--between" style={{ marginBottom: '0.5rem' }}>
        <StreakBadge session={quiz.session} />
        <Link className="btn btn--ghost" to="/" style={{ padding: '0.3rem 0.8rem' }}>
          {t('quiz.poolSettings')}
        </Link>
      </div>

      <p className="quiz__label">{instruction}</p>

      {question.prompt.glyph && <div className="quiz__prompt-glyph">{question.prompt.glyph}</div>}
      {question.prompt.text && !question.prompt.glyph && (
        <div className="quiz__prompt-text">{question.prompt.text}</div>
      )}

      {/* The control depends only on inputKind: adding a new text/choice mode
          does not require touching this. */}
      {question.inputKind === 'text' && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!answered) submitAnswer({ type: 'text', value: textValue });
            else goNext();
          }}
        >
          <input
            ref={inputRef}
            className="text-input"
            type="text"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            value={textValue}
            disabled={answered}
            onChange={(e) => setTextValue(e.target.value)}
            aria-label={instruction}
          />
        </form>
      )}

      {question.inputKind === 'choice' && (
        <div className="choices">
          {question.options.map((opt) => {
            // After answering, mark the correct option, and—if the learner
            // missed—mark the one they actually picked so they can see it.
            const isCorrect = opt.id === question.correctOptionId;
            const isChosen = opt.id === chosenOptionId;
            const stateClass = answered
              ? isCorrect
                ? ' choice--correct'
                : isChosen
                  ? ' choice--wrong'
                  : ''
              : '';
            return (
              <button
                key={opt.id}
                type="button"
                className={`choice${stateClass}`}
                disabled={answered}
                onClick={() => submitAnswer({ type: 'choice', optionId: opt.id })}
              >
                <span className="choice__glyph">{opt.glyph ?? opt.label}</span>
                {answered && opt.reading && (
                  <span className="choice__reading">{opt.reading}</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {question.inputKind === 'drawing' && (
        <div className="drawing-stub">
          {t('quiz.drawingStub', { reading: question.promptRomaji })}
          <div style={{ marginTop: '1rem' }}>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => submitAnswer({ type: 'drawing', score: 0 })}
            >
              {t('quiz.skip')}
            </button>
          </div>
        </div>
      )}

      {answered && quiz.result && (
        <>
          <AnswerReveal result={quiz.result} item={question.item} />
          <div style={{ marginTop: '1.25rem' }}>
            <button type="button" className="btn btn--block" onClick={goNext} autoFocus>
              {t('quiz.next')}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
