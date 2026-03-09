'use client'

import { useState } from 'react'
import { TrophyIcon, AlertTriangleIcon, TrendingUpIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'

type VoteOption = 'home' | 'draw' | 'away'

type Match = {
  id: number
  league: string
  leagueBadge: string
  date: string
  homeTeam: string
  awayTeam: string
  homeOdds: string
  drawOdds: string
  awayOdds: string
  analystPick: VoteOption
  analystNote: string
  initialVotes: { home: number; draw: number; away: number }
}

const MATCHES: Match[] = [
  {
    id: 1,
    league: 'Premier League',
    leagueBadge: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    date: '2026. márc. 14. · 17:30',
    homeTeam: 'Arsenal',
    awayTeam: 'Manchester City',
    homeOdds: '2.40',
    drawOdds: '3.50',
    awayOdds: '2.80',
    analystPick: 'home',
    analystNote: 'Az Arsenal hazai pályán rendre megállítja a City presszingjét. Az Emirates erőd.',
    initialVotes: { home: 312, draw: 89, away: 241 }
  },
  {
    id: 2,
    league: 'La Liga',
    leagueBadge: '🇪🇸',
    date: '2026. márc. 15. · 21:00',
    homeTeam: 'Real Madrid',
    awayTeam: 'Atlético Madrid',
    homeOdds: '2.10',
    drawOdds: '3.30',
    awayOdds: '3.40',
    analystPick: 'draw',
    analystNote: 'A Madrid-derbi historikusan kiegyenlített — Atlético remek védekezése könnyen pontot ér.',
    initialVotes: { home: 445, draw: 198, away: 203 }
  },
  {
    id: 3,
    league: 'Bundesliga',
    leagueBadge: '🇩🇪',
    date: '2026. márc. 15. · 18:30',
    homeTeam: 'Bayern München',
    awayTeam: 'Borussia Dortmund',
    homeOdds: '1.75',
    drawOdds: '4.00',
    awayOdds: '4.50',
    analystPick: 'home',
    analystNote: 'A Klassiker Bayern-dominanciája ebben a szezonban kiemelkedő. Otthon veszítenek ritkán.',
    initialVotes: { home: 521, draw: 110, away: 189 }
  },
  {
    id: 4,
    league: 'Serie A',
    leagueBadge: '🇮🇹',
    date: '2026. márc. 16. · 20:45',
    homeTeam: 'Inter Milan',
    awayTeam: 'AC Milan',
    homeOdds: '2.20',
    drawOdds: '3.20',
    awayOdds: '3.10',
    analystPick: 'draw',
    analystNote: 'A Derby della Madonnina mindig meglepetés — mindkét csapat egyforma esélyekkel lép pályára.',
    initialVotes: { home: 287, draw: 241, away: 294 }
  },
  {
    id: 5,
    league: 'NB I',
    leagueBadge: '🇭🇺',
    date: '2026. márc. 16. · 17:00',
    homeTeam: 'Ferencváros',
    awayTeam: 'MTK Budapest',
    homeOdds: '1.55',
    drawOdds: '4.20',
    awayOdds: '5.50',
    analystPick: 'home',
    analystNote: 'Az FTC otthon gyakorlatilag verhetetlen, az MTK vendégmérlegelése gyenge idén.',
    initialVotes: { home: 634, draw: 88, away: 56 }
  }
]

const OPTION_LABELS: Record<VoteOption, string> = {
  home: 'Hazai',
  draw: 'Döntetlen',
  away: 'Vendég'
}

const MatchCard = ({ match }: { match: Match }) => {
  const [votes, setVotes] = useState(match.initialVotes)
  const [userVote, setUserVote] = useState<VoteOption | null>(null)

  const totalVotes = votes.home + votes.draw + votes.away
  const pct = (v: number) => Math.round((v / totalVotes) * 100)

  const handleVote = (option: VoteOption) => {
    if (userVote) return
    setUserVote(option)
    setVotes(prev => ({ ...prev, [option]: prev[option] + 1 }))
  }

  const optionStyle = (option: VoteOption) => {
    if (!userVote) return 'border hover:border-primary hover:bg-primary/5 cursor-pointer transition-all'
    if (option === userVote) return 'border-2 border-primary bg-primary/10'
    return 'border border-muted opacity-60'
  }

  return (
    <Card className='shadow-none'>
      <CardContent className='space-y-5 p-5 sm:p-6'>
        {/* League + Date */}
        <div className='flex items-center justify-between gap-2'>
          <div className='flex items-center gap-2'>
            <span className='text-base'>{match.leagueBadge}</span>
            <Badge className='bg-primary/10 text-primary border-0 text-xs'>{match.league}</Badge>
          </div>
          <span className='text-muted-foreground text-xs'>{match.date}</span>
        </div>

        {/* Teams + Odds */}
        <div className='grid grid-cols-3 items-center gap-2 text-center'>
          <div className='space-y-1'>
            <p className='text-foreground text-sm font-bold sm:text-base'>{match.homeTeam}</p>
            <p className='text-muted-foreground text-xs'>Hazai</p>
            <Badge variant='outline' className='text-xs tabular-nums'>{match.homeOdds}</Badge>
          </div>
          <div className='space-y-1'>
            <p className='text-muted-foreground text-xs font-semibold uppercase tracking-widest'>vs</p>
            <Badge variant='outline' className='text-xs tabular-nums'>{match.drawOdds}</Badge>
          </div>
          <div className='space-y-1'>
            <p className='text-foreground text-sm font-bold sm:text-base'>{match.awayTeam}</p>
            <p className='text-muted-foreground text-xs'>Vendég</p>
            <Badge variant='outline' className='text-xs tabular-nums'>{match.awayOdds}</Badge>
          </div>
        </div>

        <Separator className='opacity-30' />

        {/* Analyst pick */}
        <div className='flex items-start gap-2 rounded-lg bg-muted/50 p-3 text-sm'>
          <TrendingUpIcon className='text-primary mt-0.5 size-4 shrink-0' />
          <div className='space-y-0.5'>
            <p className='text-foreground font-medium'>
              Elemző tipp: <span className='text-primary'>{OPTION_LABELS[match.analystPick]}</span>
            </p>
            <p className='text-muted-foreground text-xs leading-relaxed'>{match.analystNote}</p>
          </div>
        </div>

        {/* Voting */}
        <div className='space-y-3'>
          <p className='text-muted-foreground text-xs font-medium uppercase tracking-wide'>
            Mit gondol a közösség? ({totalVotes} szavazat)
          </p>

          {!userVote ? (
            <div className='grid grid-cols-3 gap-2'>
              {(['home', 'draw', 'away'] as VoteOption[]).map(option => (
                <button
                  key={option}
                  onClick={() => handleVote(option)}
                  className={`rounded-lg p-3 text-center text-sm font-medium ${optionStyle(option)}`}
                >
                  <div className='text-xs text-muted-foreground mb-1'>{OPTION_LABELS[option]}</div>
                  <div className='text-foreground font-bold tabular-nums'>
                    {option === 'home' ? match.homeTeam : option === 'away' ? match.awayTeam : 'X'}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className='space-y-2'>
              {(['home', 'draw', 'away'] as VoteOption[]).map(option => (
                <div key={option} className='space-y-1'>
                  <div className='flex items-center justify-between text-xs'>
                    <span className={`font-medium ${option === userVote ? 'text-primary' : 'text-muted-foreground'}`}>
                      {option === 'home' ? match.homeTeam : option === 'away' ? match.awayTeam : 'Döntetlen'}
                      {option === userVote && ' ✓'}
                    </span>
                    <span className='text-muted-foreground tabular-nums'>{pct(votes[option])}%</span>
                  </div>
                  <Progress value={pct(votes[option])} className='h-2' />
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

const TippekPage = () => {
  return (
    <div className='mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8'>
      {/* Header */}
      <div className='mb-10 space-y-3'>
        <p className='text-muted-foreground text-xs font-medium uppercase tracking-[0.22em]'>433 stílusban</p>
        <h1 className='text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl'>Tippek & Predikciók</h1>
        <p className='text-muted-foreground max-w-2xl text-lg'>
          Elemzőink előrejelzései a hét meccseihez — és te is szavazhatsz. Valószínűség, logika, felelős gondolkodás.
        </p>
        <Separator className='mt-6 max-w-24 opacity-40' />
      </div>

      {/* Disclaimer */}
      <Card className='mb-8 border-amber-200 bg-amber-50/50 shadow-none dark:border-amber-900/30 dark:bg-amber-900/10'>
        <CardContent className='flex items-start gap-3 p-4 text-sm'>
          <AlertTriangleIcon className='text-amber-500 mt-0.5 size-4 shrink-0' />
          <p className='text-muted-foreground'>
            <strong className='text-foreground'>Fontos:</strong> Ez az oldal kizárólag oktatási és szórakoztatási
            célokat szolgál. Nem adunk fogadási tanácsot, és nem garantálunk nyereményt. 18+ Játssz felelősséggel.
          </p>
        </CardContent>
      </Card>

      {/* Matches */}
      <div className='space-y-5'>
        <div className='flex items-center gap-2'>
          <TrophyIcon className='text-primary size-5' />
          <h2 className='text-lg font-bold'>A hét mérkőzései</h2>
        </div>
        {MATCHES.map(match => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  )
}

export default TippekPage
