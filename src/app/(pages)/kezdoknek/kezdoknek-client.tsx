'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Eye, Zap, BookOpen, Tv } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Sport {
  id: string
  name: string
  fullName: string
  emoji: string
  tagline: string
  cardGradient: string
  accentColor: string
  glowColor: string
  description: string
  basics: string[]
  whyFollow: string
  keyTerms: string[]
  whereToWatch: string
  bigEvents: string
}

const sports: Sport[] = [
  {
    id: 'nfl',
    name: 'NFL',
    fullName: 'National Football League',
    emoji: '🏈',
    tagline: 'Az amerikaiak vallása',
    cardGradient: 'from-blue-900/60 via-blue-800/40 to-red-900/40',
    accentColor: 'text-blue-400',
    glowColor: 'shadow-blue-500/20',
    description:
      'Az NFL az amerikai futball legmagasabb szintű profi ligája, amely 32 csapatból áll. Ez a világ legjövedelmezőbb sportligája — a Super Bowl évente több mint 100 millió nézőt vonz, és az egész évet meghatározó esemény.',
    basics: [
      'A cél: a labdát az ellenfél végzónájába juttatni — ez a touchdown, ami 6 pontot ér',
      'Egy csapat egyszerre 11 játékost küld a pályára (támadó és védő alakzat felváltva)',
      'A csapatnak 4 kísérlete (down) van, hogy legalább 10 yardot haladjon előre',
      'A szezon szeptembertől januárig tart, majd rájátszás és a Super Bowl következik',
      'A liga AFC és NFC konferenciára oszlik, csapatonként 17 alapmérkőzés van'
    ],
    whyFollow:
      'Taktikai mélység, fizikai brutalitás és filmdrámai fordulatok — minden mérkőzés egy mini háború. A Super Bowl az év legeslegnagyobb sportesemény, amit nehéz kihagyni.',
    keyTerms: [
      'Touchdown: a labda a végzónában = 6 pont',
      'Field goal: rúgás a kapun át = 3 pont',
      'Quarterback (QB): az irányító, a csapat agya',
      'Blitz: szokatlanul sok védő rohan az irányítóra',
      'Draft: fiatal tehetségek kiválasztása a ligába'
    ],
    whereToWatch: 'NFL Game Pass, DAZN, ESPN+',
    bigEvents: 'Super Bowl (február), NFL Draft (április/május), Thanksgiving-i mérkőzések'
  },
  {
    id: 'nascar',
    name: 'NASCAR',
    fullName: 'National Association for Stock Car Auto Racing',
    emoji: '🏎️',
    tagline: 'Sebességmánia ovalon',
    cardGradient: 'from-yellow-700/50 via-orange-800/40 to-red-900/30',
    accentColor: 'text-yellow-400',
    glowColor: 'shadow-yellow-500/20',
    description:
      'A NASCAR a világ legnézettebb autóversenyzési sorozata az USA-ban. Tömeggyártott autónak kinéző, de valójában 750+ lóerős versenyautókkal zajlanak a futamok, főként ovál pályákon — ahol 200+ km/h sebességű forgalom van.',
    basics: [
      'A versenyek többsége ovál pályán zajlik — a körök száma adja az össztávot',
      '40 autó indul egyszerre, érintkezéses versenyzés megengedett (ez különleges!)',
      'A pit stop stratégia döntő: 4 gumi csere + benzin ~12 másodperc alatt',
      'A szezon a Daytona 500-zal indul februárban, a bajnokság novemberben dől el',
      'A top 16 jut a rájátszásba, ahol az utolsó 4 versenyen bárki nyerhet'
    ],
    whyFollow:
      'A drafting (szélárnyék-kihasználás), a tömeges ütközések (big one) és az utolsó körös overtake-ek miatt az adrenalin sosem szűnik. A pit stop stratégiák pedig igazi sakk-játszmává teszik a versenyeket.',
    keyTerms: [
      'Drafting: szélárnyékban haladás az élmezőnnyel — sebesség-előny',
      'Pit stop: gumiváltás + tankolás a boxban a verseny közben',
      'Caution: sárga zászló, mindenki lelassít (balesethez hívják be)',
      'Superspeedway: nagy ovál pályák, pl. Daytona és Talladega',
      'Stage: a futam 3 szakaszra osztott, mindegyikért pontok járnak'
    ],
    whereToWatch: 'DAZN, NASCAR.com Live, Fox Sports',
    bigEvents: 'Daytona 500 (február), Coca-Cola 600 (május), Brickyard 400 (júl)'
  },
  {
    id: 'ufc',
    name: 'UFC',
    fullName: 'Ultimate Fighting Championship',
    emoji: '🥊',
    tagline: 'A ketrec törvénye',
    cardGradient: 'from-red-900/60 via-red-800/30 to-zinc-900/60',
    accentColor: 'text-red-400',
    glowColor: 'shadow-red-500/20',
    description:
      'Az UFC a világ vezető vegyes harcművészeti (MMA) szervezete. Az oktagonban (8-szögű ketrecben) a versenyzők ütéssel, rúgással, birkózással és befejező technikákkal küzdenek — minden harcművészet ötvözve.',
    basics: [
      'Az MMA az összes harcművészeti stílus keveréke: box, kickbox, jiu-jitsu, birkózás',
      'A mérkőzések 3×5 perces menetből állnak (főmérkőzések és bajnoki meccsek 5×5 perc)',
      'Győzelem módjai: KO (ütéssel), TKO (bíró leállítja), submission (megadás), pontozás',
      'Súlycsoportok vannak: strawweight-tól heavyweight-ig (8 kategória mindkét nemnél)',
      'A UFC havonta tart gálát, a kiemelt esemény a Pay-Per-View formátum'
    ],
    whyFollow:
      'Nincs még egy sport, ahol az ütközés ilyen közvetlen és nyers. Jon Jones, Conor McGregor, Islam Makhachev — minden sztárnak megvan a saját stílusa, dramaturgiája és rajongótábora.',
    keyTerms: [
      'Submission: kényszermegadás fojtással vagy karos technikával',
      'Ground and pound: ütések az ellenfélre, miközben a földön van',
      'Takedown: ellenfél földre vitele (grappling előny)',
      'Octagon: a UFC jellemző 8-szögű ketrecpályája',
      'PPV: Pay-Per-View, a nagy gálák formátuma (külön fizetős)'
    ],
    whereToWatch: 'UFC Fight Pass, DAZN, PPV rendszereken',
    bigEvents: 'UFC 300-as számú gálák, éves bajnoki csúcsmeccsek'
  },
  {
    id: 'nba',
    name: 'NBA',
    fullName: 'National Basketball Association',
    emoji: '🏀',
    tagline: 'Ahol a legendák születnek',
    cardGradient: 'from-orange-900/50 via-orange-800/30 to-blue-900/40',
    accentColor: 'text-orange-400',
    glowColor: 'shadow-orange-500/20',
    description:
      'Az NBA a világ legjobb kosárlabdaligája, 30 csapattal. LeBron James, Stephen Curry, Nikola Jokić — a bolygó legjobb sportolói itt versenyeznek, és az NBA a modern popkultúra megkerülhetetlen része.',
    basics: [
      '5 vs 5 játék, a cél minél több pontot dobni a gyűrűbe az ellenfél kosarába',
      'A mérkőzés 4×12 perces negyedből áll (NBA-szabály, Európában 4×10 perc)',
      'Dobástípusok: 2 pontos (közelről), 3 pontos (vonal mögülről), büntető (1 pont)',
      'Shot clock: 24 másodperc alatt kell dobni, különben labdavesztés',
      'A szezon novembertől júniusig tart, 82 alapmérkőzéssel csapatonként'
    ],
    whyFollow:
      'A dunk-ok, az utolsó másodperces buzzer beater-ek és a szupersztárok közötti epikus rivalizálás miatt az NBA az egyik legszórakoztatóbb liga. Ráadásul az öltözői drámák és trade-ek mindig szállítják a hírt.',
    keyTerms: [
      'Dunk: a gyűrűbe gyömöszölt labda (a legmutatósabb akció)',
      'Buzzer beater: az utolsó másodpercben esett nyerő dobás',
      'Triple-double: 10+ pont, 10+ lepattanó és 10+ gólpassz egy meccsen',
      'Pick and roll: klasszikus kétemberes akció, a kosárlabda alapja',
      'Playoffs: rájátszás, best-of-7 formátumban (4 győzelem kell a továbbjutáshoz)'
    ],
    whereToWatch: 'NBA League Pass, DAZN, ESPN+',
    bigEvents: 'NBA Finals (június), All-Star Weekend (február), NBA Draft (június)'
  },
  {
    id: 'tennis',
    name: 'Tenisz',
    fullName: 'Profi tenisz (ATP / WTA)',
    emoji: '🎾',
    tagline: 'A Grand Slam-ek világa',
    cardGradient: 'from-green-900/50 via-emerald-800/30 to-yellow-900/40',
    accentColor: 'text-green-400',
    glowColor: 'shadow-green-500/20',
    description:
      'A tenisz az egyik legrégebbi és legnézettebb egyéni sport. Federer, Nadal, Djokovic — az ő rivalizálásuk meghatározta egy egész korszakot. Ma Jannik Sinner és Carlos Alcaraz küzdenek a trónért.',
    basics: [
      'Pontok: 0, 15, 30, 40 — aki eléri a 40-et és még egyet szerez, nyeri a games-t',
      'Set: aki 6 games-t nyer (legalább 2-es különbséggel), nyeri a setet',
      'Meccs: férfiaknál legtöbbször best-of-5, nőknél best-of-3 set a Grand Slam-eken',
      'Ász: a szervát az ellenfél nem tudja megütni = azonnali pont',
      'Break: az ellenfél szervagémjét nyeri valaki — ez a meccs kulcsmozzanata'
    ],
    whyFollow:
      'A Grand Slam-ek páratlan drámával bírnak: egy 5 setes meccs Roland Garroson 4+ óra feszültséget jelent. Pályaborítás szerint (kemény, salak, fű) teljesen más arcát mutatja a sport.',
    keyTerms: [
      'Grand Slam: a 4 legnagyobb torna (AO, Roland Garros, Wimbledon, US Open)',
      'Tie-break: 6-6-nál döntő szettjáték, 7 pontig (kétpontos előny kell)',
      'Deuce: 40-40 állás, két egymást követő pontot kell nyerni a gémhez',
      'Ace: közvetlen nyerőszerva — az ellenfél nem érinti a labdát',
      'Seed: kiemelt játékos a torna tábláján (1-es = legjobb kiemelt)'
    ],
    whereToWatch: 'Eurosport, Tennis Channel, DAZN',
    bigEvents: 'Australian Open (jan), Roland Garros (máj-jún), Wimbledon (júl), US Open (aug-szep)'
  },
  {
    id: 'darts',
    name: 'Darts',
    fullName: 'Profi darts (PDC)',
    emoji: '🎯',
    tagline: 'A számítás és az acélkéz',
    cardGradient: 'from-purple-900/60 via-violet-800/30 to-green-900/40',
    accentColor: 'text-purple-400',
    glowColor: 'shadow-purple-500/20',
    description:
      'A darts egy precíziós sport, ahol a játékosok egy szabványos táblára hajítanak kis nyilakat. A profi PDC versenyeket teli nézőterek, egyedi belépők és fergeteges buli-hangulat jellemzi.',
    basics: [
      'A legelterjedtebb formátum: 501 — onnan kell visszaszámolni pontosan nullára',
      'Az utolsó nyílnak double-ba (kettős sávba) kell kerülnie, különben „bust"',
      'Egy körben 3 nyilat dob a játékos — max. lehetséges dobás: 180 (3×treble 20)',
      'Leg: egyetlen 501-es játszma. Set: több leg összessége (pl. best-of-5 leg)',
      'A tábla legfontosabb mezői: treble 20 (a „vastag sáv"), bullseye (50 pont)'
    ],
    whyFollow:
      'A PDC World Darts Championship Alexandra Palace-ban az év legbulisabb sportesemény. Michael van Gerwen vagy Luke Littler egy 180-as sorozatánál a tömeg megőrül — és a számítás (checkout stratégia) igazi intellektuális kihívás.',
    keyTerms: [
      '180: maximális dobás körönként (3 nyíl × treble 20)',
      'Checkout: a befejező nyerő sorozat (pl. T20, D20 = 100 pont)',
      'Double in/out: csak double-ra lehet kezdeni/befejezni (egyes formátumokban)',
      'PDC: Professional Darts Corporation — a profi darts fő szervezete',
      'Nine-darter: a tökéletes leg (mindössze 9 nyíllal 501-ről nullára)'
    ],
    whereToWatch: 'DAZN, Sky Sports Darts, PDC.tv',
    bigEvents: 'World Darts Championship (dec-jan), Premier League Darts, World Matchplay'
  },
  {
    id: 'cycling',
    name: 'Kerékpár',
    fullName: 'Profi országúti kerékpározás',
    emoji: '🚴',
    tagline: 'A Grand Tour-ok eposza',
    cardGradient: 'from-yellow-800/40 via-amber-700/30 to-red-900/40',
    accentColor: 'text-yellow-400',
    glowColor: 'shadow-yellow-400/20',
    description:
      'Az országúti kerékpározás a világ egyik legkövetelőbb sportja. A Tour de France 21 etapján a versenyzők összesen ~3500 km-t tesznek meg, köztük brutális hegyi szakaszokkal — ez szenvedés és stratégia egyszerre.',
    basics: [
      'Fő formátumok: egynapos klasszikusok (pl. Paris–Roubaix) és körversenyek (Grand Tour-ok)',
      'A csapatok 8 főből állnak — a csapatmunka (leadout, domestique) elengedhetetlen',
      'Különféle mezek jelölik a versenykategóriákat (sárga = összetett vezető a TdF-en)',
      'Szélárnyék-kihasználás (drafting) kritikus: a pelotonban ~40%-kal kevesebbet kell pedálozni',
      'Sprinterek, hegymászók és összetett versenyzők különböző típusú etapokat céloznak'
    ],
    whyFollow:
      'Tadej Pogačar és Jonas Vingegaard alpesi párharca az évtized egyik legjobb rivalizálása. A pireneusi befutók ikonikus pillanatok — és a stratégia, az időjárás, a csapatmunka együtt alkotják a sportág varázsát.',
    keyTerms: [
      'Peloton: a főmezőny, ahol csoportosan haladnak a versenyzők',
      'Grand Tour: a három nagy körverseny — TdF, Giro d\'Italia, Vuelta a España',
      'GC: General Classification — az összetett verseny (ki a leggyorsabb összesítve)',
      'Domestique: csapattárs, aki önfeláldozóan segíti a csapat vezérét',
      'Attack: kiszakadási kísérlet a mezőnyből (a leglátványosabb pillanatok egyike)'
    ],
    whereToWatch: 'Eurosport, GCN+, DAZN',
    bigEvents: 'Tour de France (júl), Giro d\'Italia (máj), Vuelta a España (aug-szep), Monuments'
  }
]

const VISIBLE_DESKTOP = 3

export default function KezdoknenClient() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedSport, setSelectedSport] = useState<string | null>(null)
  const detailRef = useRef<HTMLDivElement>(null)

  const maxIndex = sports.length - VISIBLE_DESKTOP

  const prev = () => setCurrentIndex(i => Math.max(0, i - 1))
  const next = () => setCurrentIndex(i => Math.min(maxIndex, i + 1))

  const handleCardClick = (id: string) => {
    if (selectedSport === id) {
      setSelectedSport(null)
    } else {
      setSelectedSport(id)
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }

  const activeSport = sports.find(s => s.id === selectedSport) ?? null

  // For mobile, show one at a time from the full list
  const visibleSports = sports.slice(currentIndex, currentIndex + VISIBLE_DESKTOP)

  return (
    <div className='mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
      {/* ── Hero ── */}
      <div className='mb-14 space-y-4'>
        <p className='text-muted-foreground text-xs font-medium uppercase tracking-[0.22em]'>Sportismertető</p>
        <h1 className='text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl'>
          Fedezd fel a sportokat
        </h1>
        <p className='text-muted-foreground max-w-2xl text-lg leading-relaxed'>
          Nem ismered az NFL-t? Sosem követtél Tour de France-t? Minden sport megtalálható itt — érthetően, hogy
          tényleg értsd, amit nézel.
        </p>
        <Separator className='mt-6 max-w-24 opacity-40' />
      </div>

      {/* ── Carousel ── */}
      <div className='relative'>
        {/* Navigation arrows */}
        <div className='mb-6 flex items-center justify-between'>
          <p className='text-muted-foreground text-sm'>
            Válassz egy sportot a részletesebb leíráshoz
          </p>
          <div className='flex gap-2'>
            <Button
              variant='outline'
              size='icon'
              onClick={prev}
              disabled={currentIndex === 0}
              className='h-9 w-9 rounded-full'
              aria-label='Előző'
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={next}
              disabled={currentIndex >= maxIndex}
              className='h-9 w-9 rounded-full'
              aria-label='Következő'
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>

        {/* Cards grid — desktop: 3 visible, tablet: 2, mobile: 1 */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {visibleSports.map(sport => {
            const isSelected = selectedSport === sport.id
            return (
              <button
                key={sport.id}
                onClick={() => handleCardClick(sport.id)}
                className={cn(
                  'group relative flex flex-col items-center overflow-hidden rounded-2xl border p-8 text-center transition-all duration-300',
                  'hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  `bg-gradient-to-br ${sport.cardGradient}`,
                  isSelected
                    ? `border-current ring-2 ring-offset-2 ring-offset-background ${sport.accentColor} shadow-lg ${sport.glowColor}`
                    : 'border-border/50 hover:border-border'
                )}
              >
                {/* Emoji logo */}
                <div className='mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-background/20 text-5xl backdrop-blur-sm transition-transform duration-300 group-hover:scale-110'>
                  {sport.emoji}
                </div>

                {/* Name */}
                <h2 className='text-foreground mb-1 text-2xl font-extrabold tracking-tight'>
                  {sport.name}
                </h2>
                <p className={cn('mb-3 text-xs font-semibold uppercase tracking-widest', sport.accentColor)}>
                  {sport.fullName}
                </p>

                {/* Tagline */}
                <p className='text-muted-foreground text-sm leading-snug'>
                  {sport.tagline}
                </p>

                {/* Selected indicator */}
                <div
                  className={cn(
                    'mt-5 flex items-center gap-1 text-xs font-medium transition-all duration-200',
                    isSelected ? sport.accentColor : 'text-muted-foreground opacity-60 group-hover:opacity-100'
                  )}
                >
                  {isSelected ? (
                    <>
                      <ChevronUp className='h-3 w-3' /> Elrejtés
                    </>
                  ) : (
                    <>
                      <ChevronDown className='h-3 w-3' /> Részletek
                    </>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Dot navigation */}
        <div className='mt-6 flex justify-center gap-2'>
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`${i + 1}. oldal`}
              className={cn(
                'h-2 rounded-full transition-all duration-200',
                currentIndex === i ? 'w-6 bg-foreground' : 'w-2 bg-muted-foreground/40 hover:bg-muted-foreground/70'
              )}
            />
          ))}
        </div>
      </div>

      {/* ── Detail panel ── */}
      {activeSport && (
        <div
          ref={detailRef}
          className={cn(
            'mt-10 overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-500'
          )}
        >
          {/* Panel header */}
          <div className={cn('bg-gradient-to-r p-8', activeSport.cardGradient)}>
            <div className='flex flex-wrap items-start justify-between gap-4'>
              <div className='flex items-center gap-4'>
                <span className='text-5xl'>{activeSport.emoji}</span>
                <div>
                  <h2 className='text-2xl font-extrabold tracking-tight sm:text-3xl'>{activeSport.name}</h2>
                  <p className={cn('text-sm font-semibold', activeSport.accentColor)}>{activeSport.fullName}</p>
                </div>
              </div>
              <Badge variant='outline' className={cn('text-sm', activeSport.accentColor)}>
                {activeSport.tagline}
              </Badge>
            </div>
            <p className='text-muted-foreground mt-4 max-w-3xl leading-relaxed'>{activeSport.description}</p>
          </div>

          {/* Panel body */}
          <div className='grid gap-8 p-8 md:grid-cols-2'>
            {/* Basics */}
            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <BookOpen className={cn('h-4 w-4', activeSport.accentColor)} />
                <h3 className='font-bold uppercase tracking-wider text-sm'>Az alapok</h3>
              </div>
              <ul className='space-y-3'>
                {activeSport.basics.map((item, i) => (
                  <li key={i} className='flex gap-3'>
                    <span className={cn('mt-0.5 shrink-0 text-sm font-bold tabular-nums', activeSport.accentColor)}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className='text-muted-foreground text-sm leading-relaxed'>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key terms */}
            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <Zap className={cn('h-4 w-4', activeSport.accentColor)} />
                <h3 className='font-bold uppercase tracking-wider text-sm'>Kulcsfogalmak</h3>
              </div>
              <ul className='space-y-2'>
                {activeSport.keyTerms.map((term, i) => {
                  const [word, ...rest] = term.split(':')
                  return (
                    <li key={i} className='rounded-lg bg-muted/40 px-4 py-2.5 text-sm leading-relaxed'>
                      <span className={cn('font-semibold', activeSport.accentColor)}>{word}:</span>
                      <span className='text-muted-foreground'>{rest.join(':')}</span>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Why follow */}
            <div className='space-y-3 md:col-span-2'>
              <Separator className='opacity-30' />
              <div className='flex items-center gap-2'>
                <Eye className={cn('h-4 w-4', activeSport.accentColor)} />
                <h3 className='font-bold uppercase tracking-wider text-sm'>Miért kövesd?</h3>
              </div>
              <p className='text-muted-foreground leading-relaxed'>{activeSport.whyFollow}</p>
            </div>

            {/* Where to watch + events */}
            <div className='space-y-3 md:col-span-2'>
              <Separator className='opacity-30' />
              <div className='flex flex-wrap gap-6'>
                <div className='space-y-1.5'>
                  <div className='flex items-center gap-2'>
                    <Tv className={cn('h-4 w-4', activeSport.accentColor)} />
                    <h3 className='font-bold uppercase tracking-wider text-sm'>Ahol megnézheted</h3>
                  </div>
                  <p className='text-muted-foreground text-sm'>{activeSport.whereToWatch}</p>
                </div>
                <div className='space-y-1.5'>
                  <h3 className='font-bold uppercase tracking-wider text-sm'>Nagy események</h3>
                  <p className='text-muted-foreground text-sm'>{activeSport.bigEvents}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
