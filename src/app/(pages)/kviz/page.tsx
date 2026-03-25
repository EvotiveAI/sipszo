'use client'

import { useState } from 'react'
import { CheckCircle2Icon, XCircleIcon, TrophyIcon, RefreshCwIcon, ShareIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'

type Question = {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  category: string
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Melyik évben nyerte meg Magyarország az olimpiai labdarúgó-aranyat Helsinkiben?',
    options: ['1948', '1952', '1956', '1960'],
    correct: 1,
    explanation: '1952-ben, Helsinkiben az Aranycsapat 2-0-ra győzte le Jugoszláviát a döntőben.',
    category: 'Sporttörténelem'
  },
  {
    id: 2,
    question: 'Hány gólt szerzett Puskás Ferenc a válogatottban?',
    options: ['73', '84', '94', '101'],
    correct: 1,
    explanation: 'Puskás Ferenc 84 gólt szerzett a magyar válogatottban 85 mérkőzésen — korának egyik legtermékenyebb góllövője.',
    category: 'Ikonok & Legendák'
  },
  {
    id: 3,
    question: 'Mi volt az 1953-as Wembley-meccs végeredménye (Anglia – Magyarország)?',
    options: ['3–4', '3–6', '1–7', '2–5'],
    correct: 1,
    explanation: 'Anglia 3–6-ra kikapott saját Wembley-jén — ez volt az első hazai vereség egy kontinentális csapattól.',
    category: 'Legendás Meccsek'
  },
  {
    id: 4,
    question: 'Melyik csapatban dolgozta ki Guardiola a tiki-taka alapjait?',
    options: ['Manchester City', 'Bayern München', 'FC Barcelona', 'Juventus'],
    correct: 2,
    explanation: 'Guardiola a FC Barcelona B csapatánál finomította, majd az első csapatnál (2008–2012) vezette tökélyre a tiki-taka rendszerét.',
    category: 'Aktuális Elemzések'
  },
  {
    id: 5,
    question: 'Mi az az "xG" a modern futball-statisztikában?',
    options: [
      'Extra gól — a hosszabbításban szerzett gólok mutatója',
      'Expected Goals — a lövés gólvalószínűsége pozíció alapján',
      'Extra Game — a hosszabbítás statisztikája',
      'Execution Grade — a befejezések értékelése'
    ],
    correct: 1,
    explanation: 'Az xG (Expected Goals) megmutatja, mekkora valószínűséggel válik góllá egy lövés az adott pozícióból, figyelembe véve a lövés szögét, távolságát és a helyzet természetét.',
    category: 'Aktuális Elemzések'
  },
  {
    id: 6,
    question: 'Ki volt az 1954-es VB-döntőben a győztes gól szerzője (Nyugat-Németország – Magyarország)?',
    options: ['Fritz Walter', 'Helmut Rahn', 'Sepp Herberger', 'Hans Schäfer'],
    correct: 1,
    explanation: 'Helmut Rahn a 84. percben szerzett góljával nyert Nyugat-Németország 3–2-re — ez a "Berni csoda" históriájának máig legemlegetettebb pillanata.',
    category: 'Legendás Meccsek'
  },
  {
    id: 7,
    question: 'Melyik Forma–1 csapat nyert legtöbb konstruktőri bajnoki címet?',
    options: ['McLaren', 'Williams', 'Ferrari', 'Red Bull'],
    correct: 2,
    explanation: 'A Ferrari 16 konstruktőri bajnoki címmel vezeti a listát, messze megelőzve a többieket a Formula–1 történelmében.',
    category: 'Sporttörténelem'
  }
]

const RESULT_MESSAGES = [
  { min: 0, max: 2, text: 'Kezdő sporttörténész', emoji: '📚', color: 'text-rose-500' },
  { min: 3, max: 4, text: 'Megbízható szurkoló', emoji: '⚽', color: 'text-amber-500' },
  { min: 5, max: 6, text: 'Taktikai szakértő', emoji: '🎯', color: 'text-emerald-500' },
  { min: 7, max: 7, text: 'Aranycsapat-szintű tudás!', emoji: '🏆', color: 'text-yellow-500' }
]

const KvizPage = () => {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null))
  const [showResult, setShowResult] = useState(false)

  const q = QUESTIONS[current]
  const isAnswered = selected !== null
  const score = answers.filter((a, i) => a === QUESTIONS[i].correct).length

  const resultMsg = RESULT_MESSAGES.find(r => score >= r.min && score <= r.max)!

  const handleSelect = (idx: number) => {
    if (isAnswered) return
    setSelected(idx)
    const newAnswers = [...answers]
    newAnswers[current] = idx
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1)
      setSelected(null)
    } else {
      setShowResult(true)
    }
  }

  const handleRestart = () => {
    setCurrent(0)
    setSelected(null)
    setAnswers(Array(QUESTIONS.length).fill(null))
    setShowResult(false)
  }

  const optionStyle = (idx: number) => {
    if (!isAnswered) return 'border hover:border-primary hover:bg-primary/5 cursor-pointer text-left'
    if (idx === q.correct) return 'border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-left'
    if (idx === selected && selected !== q.correct) return 'border-2 border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-left'
    return 'border border-muted opacity-50 text-left'
  }

  if (showResult) {
    return (
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8'>
        <Card className='shadow-none'>
          <CardContent className='flex flex-col items-center gap-6 p-8 text-center'>
            <div className='text-6xl'>{resultMsg.emoji}</div>
            <div className='space-y-2'>
              <p className={`text-2xl font-bold ${resultMsg.color}`}>{resultMsg.text}</p>
              <p className='text-muted-foreground text-lg'>
                <span className='text-foreground font-bold text-4xl'>{score}</span>
                <span className='text-muted-foreground'>/{QUESTIONS.length} helyes válasz</span>
              </p>
            </div>

            <div className='w-full max-w-xs'>
              <Progress value={(score / QUESTIONS.length) * 100} className='h-3' />
            </div>

            <Separator className='w-full opacity-30' />

            <div className='w-full space-y-2 text-left'>
              <p className='text-sm font-semibold'>Összefoglalás:</p>
              {QUESTIONS.map((question, i) => (
                <div key={i} className='flex items-center gap-2 text-sm'>
                  {answers[i] === question.correct
                    ? <CheckCircle2Icon className='size-4 shrink-0 text-emerald-500' />
                    : <XCircleIcon className='size-4 shrink-0 text-rose-500' />
                  }
                  <span className='text-muted-foreground line-clamp-1'>{question.question}</span>
                </div>
              ))}
            </div>

            <div className='flex flex-wrap justify-center gap-3'>
              <Button onClick={handleRestart} variant='outline' className='gap-2'>
                <RefreshCwIcon className='size-4' />
                Újra próbálom
              </Button>
              <Button
                className='gap-2'
                onClick={() => {
                  if (navigator.share) {
                      navigator.share({
                        title: 'Körkapcsolás Kvíz',
                        text: `${score}/${QUESTIONS.length} pontot értem el a Körkapcsolás futball kvízén! Próbáld te is!`
                      })
                  }
                }}
              >
                <ShareIcon className='size-4' />
                Megosztás
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8'>
      {/* Header */}
      <div className='mb-8 space-y-3'>
        <p className='text-muted-foreground text-xs font-medium uppercase tracking-[0.22em]'>433 stílusban</p>
        <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>Futball Kvíz</h1>
        <p className='text-muted-foreground'>
          {QUESTIONS.length} kérdés — sporttörténelem, taktika és legendák. Mennyit tudsz?
        </p>
        <Separator className='mt-4 max-w-24 opacity-40' />
      </div>

      {/* Progress bar */}
      <div className='mb-6 space-y-2'>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-muted-foreground'>{current + 1}. kérdés / {QUESTIONS.length}</span>
          <Badge className='bg-primary/10 text-primary border-0'>{q.category}</Badge>
        </div>
        <Progress value={((current) / QUESTIONS.length) * 100} />
      </div>

      {/* Question Card */}
      <Card className='shadow-none'>
        <CardContent className='space-y-6 p-6'>
          <h2 className='text-foreground text-lg font-semibold leading-snug sm:text-xl'>
            {q.question}
          </h2>

          {/* Options */}
          <div className='grid gap-3'>
            {q.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`flex w-full items-center gap-3 rounded-lg p-4 text-sm transition-all ${optionStyle(idx)}`}
              >
                <span className='text-muted-foreground flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold tabular-nums'>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className='flex-1'>{option}</span>
                {isAnswered && idx === q.correct && (
                  <CheckCircle2Icon className='size-5 shrink-0 text-emerald-500' />
                )}
                {isAnswered && idx === selected && selected !== q.correct && (
                  <XCircleIcon className='size-5 shrink-0 text-rose-500' />
                )}
              </button>
            ))}
          </div>

          {/* Explanation */}
          {isAnswered && (
            <div className={`flex items-start gap-3 rounded-lg p-4 text-sm ${selected === q.correct ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-rose-50 dark:bg-rose-900/20'}`}>
              {selected === q.correct
                ? <CheckCircle2Icon className='mt-0.5 size-4 shrink-0 text-emerald-500' />
                : <XCircleIcon className='mt-0.5 size-4 shrink-0 text-rose-500' />
              }
              <div>
                <p className={`font-semibold ${selected === q.correct ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                  {selected === q.correct ? 'Helyes!' : 'Sajnos nem jó.'}
                </p>
                <p className='text-muted-foreground mt-1 leading-relaxed'>{q.explanation}</p>
              </div>
            </div>
          )}

          {/* Next button */}
          {isAnswered && (
            <div className='flex justify-end'>
              <Button onClick={handleNext} className='gap-2'>
                {current < QUESTIONS.length - 1 ? 'Következő kérdés' : 'Eredmény megtekintése'}
                <TrophyIcon className='size-4' />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Score tracker */}
      <div className='mt-4 flex justify-between text-xs text-muted-foreground'>
        <span>
          Helyes: <span className='text-emerald-500 font-semibold'>{answers.filter((a, i) => a !== null && a === QUESTIONS[i].correct).length}</span>
        </span>
        <span>
          Hibás: <span className='text-rose-500 font-semibold'>{answers.filter((a, i) => a !== null && a !== QUESTIONS[i].correct).length}</span>
        </span>
      </div>
    </div>
  )
}

export default KvizPage
