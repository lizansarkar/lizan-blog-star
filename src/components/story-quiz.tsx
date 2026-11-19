"use client";

import { useState } from "react";
import { HelpCircle, CheckCircle2, XCircle, Trophy, RotateCcw, ArrowRight } from "lucide-react";

interface QuestionProp {
  prompt: string;
  choices: string[];
}

interface StoryQuizProps {
  slug: string;
  title: string;
  questions: QuestionProp[];
}

interface ScoreResult {
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  results: {
    prompt: string;
    selected: number;
    correctAnswer: number;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export function StoryQuiz({ slug, title, questions }: StoryQuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(false);
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);

  const handleSelect = (qIdx: number, cIdx: number) => {
    if (scoreResult) return; // locked after submission
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: cIdx }));
  };

  const isAllAnswered = questions.every((_, idx) => selectedAnswers[idx] !== undefined);

  const handleSubmit = async () => {
    if (!isAllAnswered || loading) return;
    setLoading(true);

    try {
      const answersArray = questions.map((_, idx) => selectedAnswers[idx]);
      const res = await fetch("/api/quiz/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, answers: answersArray }),
      });

      if (res.ok) {
        const data = await res.json();
        setScoreResult(data);
      }
    } catch (err) {
      console.error("Failed to submit quiz", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setScoreResult(null);
  };

  return (
    <div className="mt-14 rounded-3xl border border-border bg-card p-6 sm:p-9 shadow-sm transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <HelpCircle className="h-4 w-4" />
          <span>Interactive Understanding Check</span>
        </div>
        <span className="text-xs text-muted-foreground font-mono">
          {questions.length} questions · Server scored
        </span>
      </div>

      <h3 className="mt-2 text-xl md:text-2xl font-bold text-foreground">
        {title}
      </h3>
      <p className="mt-1 text-xs text-muted-foreground">
        Verify your retention of this dispatch. Answers are evaluated strictly on the server.
      </p>

      {/* Questions list */}
      <div className="mt-6 space-y-6">
        {questions.map((q, qIndex) => {
          const selected = selectedAnswers[qIndex];
          const result = scoreResult?.results[qIndex];

          return (
            <div
              key={qIndex}
              className={`rounded-2xl border p-5 transition-all ${
                result
                  ? result.isCorrect
                    ? "border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-950/20"
                    : "border-rose-500/40 bg-rose-500/5 dark:bg-rose-950/20"
                  : "border-border/80 bg-background/50"
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3.5">
                <p className="text-sm font-semibold text-foreground leading-snug">
                  <span className="text-primary font-mono mr-1.5">{qIndex + 1}.</span>
                  {q.prompt}
                </p>
                {result && (
                  <span className="shrink-0">
                    {result.isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-rose-500" />
                    )}
                  </span>
                )}
              </div>

              {/* Choices */}
              <div className="grid gap-2">
                {q.choices.map((choice, cIndex) => {
                  const isOptionSelected = selected === cIndex;
                  const isCorrectOption = result?.correctAnswer === cIndex;

                  let optionStyles =
                    "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground";

                  if (result) {
                    if (isCorrectOption) {
                      optionStyles =
                        "border-emerald-500/70 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-medium";
                    } else if (isOptionSelected && !result.isCorrect) {
                      optionStyles =
                        "border-rose-500/70 bg-rose-500/10 text-rose-700 dark:text-rose-300 line-through";
                    } else {
                      optionStyles = "border-border/40 opacity-50 text-muted-foreground";
                    }
                  } else if (isOptionSelected) {
                    optionStyles =
                      "border-primary bg-primary/10 text-foreground font-semibold shadow-xs";
                  }

                  return (
                    <button
                      key={cIndex}
                      type="button"
                      disabled={Boolean(scoreResult)}
                      onClick={() => handleSelect(qIndex, cIndex)}
                      className={`flex items-center text-left p-3 rounded-xl border text-xs transition-all ${optionStyles}`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-mono mr-3 shrink-0 ${
                          isOptionSelected
                            ? "border-primary bg-primary text-primary-foreground font-bold"
                            : "border-border"
                        }`}
                      >
                        {String.fromCharCode(65 + cIndex)}
                      </span>
                      <span className="leading-relaxed">{choice}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation note when scored */}
              {result && (
                <div className="mt-3.5 pt-3 border-t border-border/40 text-xs text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground mr-1">Tenet note:</span>
                  {result.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quiz Actions and Results Banner */}
      <div className="mt-8 pt-5 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        {scoreResult ? (
          <div className="flex items-center gap-4 w-full justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                  scoreResult.passed
                    ? "bg-emerald-500/15 text-emerald-500"
                    : "bg-amber-500/15 text-amber-500"
                }`}
              >
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  Score: {scoreResult.score} / {scoreResult.total} ({scoreResult.percentage}%)
                </p>
                <p className="text-xs text-muted-foreground">
                  {scoreResult.passed
                    ? "Mastery achieved! Stored to your reader desk history."
                    : "Good attempt! Review the notes above and try again."}
                </p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors shrink-0"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Retake
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs text-muted-foreground">
              {Object.keys(selectedAnswers).length} of {questions.length} answered
            </p>
            <button
              onClick={handleSubmit}
              disabled={!isAllAnswered || loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-xs font-semibold text-background hover:opacity-90 disabled:opacity-40 transition-opacity"
            >
              {loading ? (
                "Scoring on server..."
              ) : (
                <>
                  <span>Submit Quiz Answers</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
