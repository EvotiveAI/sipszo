import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  Table, TableRow, TableCell, WidthType, BorderStyle,
  AlignmentType, ShadingType
} from 'docx'
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '..', 'docs', 'word')
mkdirSync(OUT_DIR, { recursive: true })

const BRAND   = '1A3A5C'
const GOLD    = 'D4A017'
const MUTED   = '6B7280'
const RED     = 'B91C1C'
const GREEN   = '166534'
const BLUE    = '1E40AF'
const ORANGE  = '92400E'

function h1(text) {
  return new Paragraph({
    text, heading: HeadingLevel.HEADING_1,
    spacing: { before: 440, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: GOLD, space: 4 } }
  })
}
function h2(text) {
  return new Paragraph({
    text, heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 120 }
  })
}
function h3(text) {
  return new Paragraph({
    text, heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 80 }
  })
}

function p(text, opts = {}) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
  const runs = parts.map(part => {
    if (part.startsWith('**') && part.endsWith('**'))
      return new TextRun({ text: part.slice(2, -2), bold: true, color: opts.color || '1F2937' })
    if (part.startsWith('*') && part.endsWith('*'))
      return new TextRun({ text: part.slice(1, -1), italics: true, color: MUTED })
    return new TextRun({ text: part, color: opts.color || '1F2937' })
  })
  return new Paragraph({
    children: runs,
    spacing: { before: 60, after: 120 },
    alignment: opts.center ? AlignmentType.CENTER : AlignmentType.LEFT
  })
}

function bullet(text, sub = false) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  const runs = parts.map(part =>
    part.startsWith('**') && part.endsWith('**')
      ? new TextRun({ text: part.slice(2, -2), bold: true })
      : new TextRun({ text: part })
  )
  return new Paragraph({ children: runs, bullet: { level: sub ? 1 : 0 }, spacing: { before: 40, after: 60 } })
}

function num(text, n) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  const runs = [new TextRun({ text: `${n}.  `, bold: true, color: BRAND })]
  parts.forEach(part =>
    part.startsWith('**') && part.endsWith('**')
      ? runs.push(new TextRun({ text: part.slice(2, -2), bold: true }))
      : runs.push(new TextRun({ text: part }))
  )
  return new Paragraph({ children: runs, spacing: { before: 60, after: 80 }, indent: { left: 360 } })
}

function divider() {
  return new Paragraph({
    text: '', spacing: { before: 160, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: 'E5E7EB', space: 4 } }
  })
}

function box(text, color, bg, label = '') {
  return new Paragraph({
    children: [
      ...(label ? [new TextRun({ text: label + '  ', bold: true, color })] : []),
      ...text.split(/(\*\*[^*]+\*\*)/g).map(part =>
        part.startsWith('**') && part.endsWith('**')
          ? new TextRun({ text: part.slice(2, -2), bold: true, color })
          : new TextRun({ text: part, color })
      )
    ],
    spacing: { before: 120, after: 120 },
    indent: { left: 400, right: 400 },
    shading: { type: ShadingType.SOLID, color: bg },
    border: { left: { style: BorderStyle.THICK, size: 14, color, space: 8 } }
  })
}

const warn  = (t) => box(t, RED,   'FEF2F2', '⚠  FONTOS:')
const info  = (t) => box(t, BLUE,  'EFF6FF')
const good  = (t) => box(t, GREEN, 'F0FDF4', '✓')
const hot   = (t) => box(t, ORANGE,'FFFBEB', '🔥 LEHETŐSÉG:')

function coverPage(title, sub, meta = '2026. március · TAKTIKA Belső Kutatás') {
  return [
    new Paragraph({ text: '', spacing: { before: 1000 } }),
    new Paragraph({
      children: [new TextRun({ text: 'TAKTIKA', bold: true, size: 56, color: BRAND, allCaps: true })],
      alignment: AlignmentType.CENTER, spacing: { after: 80 }
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Prémium Magyar Sportelemzés', size: 22, color: MUTED, italics: true })],
      alignment: AlignmentType.CENTER, spacing: { after: 500 }
    }),
    new Paragraph({
      children: [new TextRun({ text: title, bold: true, size: 46, color: BRAND })],
      alignment: AlignmentType.CENTER, spacing: { after: 200 }
    }),
    new Paragraph({
      children: [new TextRun({ text: sub, size: 24, color: MUTED, italics: true })],
      alignment: AlignmentType.CENTER, spacing: { after: 600 }
    }),
    new Paragraph({
      children: [new TextRun({ text: meta, size: 20, color: MUTED })],
      alignment: AlignmentType.CENTER
    }),
    new Paragraph({ children: [new TextRun({ break: 1 })], pageBreakBefore: true })
  ]
}

function tbl(headers, rows, widths) {
  const hRow = new TableRow({
    children: headers.map((h, i) => new TableCell({
      children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, color: 'FFFFFF', size: 18 })], alignment: AlignmentType.LEFT })],
      width: { size: widths[i], type: WidthType.PERCENTAGE },
      shading: { type: ShadingType.SOLID, color: BRAND },
      margins: { top: 80, bottom: 80, left: 120, right: 80 }
    }))
  })
  const dRows = rows.map((row, ri) => new TableRow({
    children: row.map((cell, ci) => new TableCell({
      children: [new Paragraph({ children: [new TextRun({ text: String(cell), size: 18 })], alignment: AlignmentType.LEFT })],
      width: { size: widths[ci], type: WidthType.PERCENTAGE },
      shading: { type: ShadingType.SOLID, color: ri % 2 === 0 ? 'F9FAFB' : 'FFFFFF' },
      margins: { top: 80, bottom: 80, left: 120, right: 80 }
    }))
  }))
  return new Table({
    rows: [hRow, ...dRows],
    width: { size: 100, type: WidthType.PERCENTAGE },
    margins: { top: 80, bottom: 80, left: 80, right: 80 }
  })
}

function gap() { return new Paragraph({ text: '', spacing: { before: 160 } }) }

// ─────────────────────────────────────────────────────────────────────────────

async function buildMarketResearch() {
  const children = [
    ...coverPage(
      'Magyar Piac Kutatás',
      'Sport + fogadáselemzés szegmens · Verseny, trendek, fehér foltok, lehetőségek'
    ),

    // ── EXECUTIVE SUMMARY ───────────────────────────────────────────────────
    h1('Végrehajtói összefoglaló'),
    p('A magyar sportmédia + fogadáselemzés tér **érett, de töredezett**. A minőségi olvasók (Büntető-típusú közönség) találkoznak az elemzési oldalakkal, a fogadók (Tipplap, Tippvadász) találkoznak a tippekkel — de a kettő **nem találkozik egymással**.'),
    p('A tartalmi fehér folt egyértelműen a **taktikailag megalapozott, data-driven, fogadási kontextussal bíró szerkesztett sportelemzés**. Ez az a rés, amelyre TAKTIKA épülhet.'),
    hot('A 2026-os Budapesti BL döntő, Szoboszlai globális figyelme és az NB I növekvő professzionalizációja a legtökéletesebb táptalajt adja ehhez.'),
    divider(),

    // ── PIACMÉRET ───────────────────────────────────────────────────────────
    h1('1. A magyar fogadási piac mérete'),
    tbl(
      ['Mutató', 'Adat', 'Forrás'],
      [
        ['Szerencsejáték Zrt. nettó árbevétel (2024)', '1 235,8 milliárd Ft (+26,1%)', 'SZRZJ éves jelentés'],
        ['Napi kifizetett nyeremény', 'átlag 2,5 milliárd Ft/nap', 'SZRZJ'],
        ['Állami befizetés (adó + osztalék)', '178 milliárd Ft/év', 'SZRZJ'],
        ['Globális rangsor — fogadói aktivitás', 'Top 20 (0,43 keresés/1000 lakos)', 'Google Trends'],
        ['Keresési növekedés (2021 csúcs)', '#1 világ — „új fogadói oldalak" (+2 850%)', 'Google Trends HU'],
        ['2026 BL döntő helyszíne', 'Puskás Aréna, Budapest', 'UEFA'],
      ],
      [38, 38, 24]
    ),
    gap(),
    info('A piac évente +26%-kal nő. A fogadási tartalmak iránti kereslet folyamatosan emelkedik — és az organikus kínálat minősége nem tart lépést a kereslettel.'),
    divider(),

    // ── SPORTMÉDIA TÁJTÉRKÉP ────────────────────────────────────────────────
    h1('2. A magyar sportmédia tájtérképe'),
    h2('2.1 Piacvezető hírportálok'),
    tbl(
      ['Oldal', 'Havi forgalom', 'Tartalom típus', 'Fogadási tartalom'],
      [
        ['Nemzeti Sport Online (NSO)', '7–9,5M oldallehívás/hó', 'Hírek, interjúk, riportok', 'Minimális / nincs'],
        ['Sport365.hu', 'Atmedia portfólió 2,7M/hó', 'Napi 80–100 hír, eredmények', 'Nincs'],
        ['nb1.hu', 'Atmedia portfólió 2,7M/hó', 'NB I hírek + taktikai elemzések', 'Nincs'],
        ['Sportal.hu', 'MEGSZŰNT 2025. dec. 10.', 'Általános sport', 'Nem volt'],
      ],
      [22, 28, 30, 20]
    ),
    gap(),
    hot('A Sportal.hu bezárása (2025. dec.) PIACI RÉST hagyott maga után — az olvasóközönség gazdátlan.'),

    h2('2.2 Büntető.com — a legközelebbi presztízs-versenytárs'),
    bullet('**Alapítva:** 2019; leállt 2024 novemberében (Unibet-szponzor kivonult)'),
    bullet('**Csúcs:** 300 000 egyedi látogató/hó · 1 millió+ oldalletöltés/hó'),
    bullet('**Újraindul:** 2025. november 17-től, Szerencsejáték Zrt. kizárólagos szponzorral'),
    bullet('**Főszerkesztő:** Szabó Dárió; **menedzser:** Sz. Nagy Tamás (volt Nemzeti Sport főszerkesztő-helyettes)'),
    bullet('**Pozíció:** „értelmező, elemző, gondolkodtató sportújságírás — hírek, bulvár és összefoglalók NÉLKÜL"'),
    bullet('**Fogadási tartalom:** egyelőre NINCS a profiljukban'),
    box('Büntető.com a presztízs-minőség benchmark. TAKTIKA ott különbözhet: ők nem kombinálják az elemzést a fogadással. Mi igen.', BRAND, 'EFF6FF'),
    divider(),

    // ── FOGADÁSORIENTÁLT VERSENYTÁRSAK ──────────────────────────────────────
    h1('3. Fogadásorientált versenytársak részletes profilja'),

    h2('3.1 Tipplap.hu — a közösségi tipp-oldal'),
    bullet('**Alapítva:** 2011 · **Státusz:** Aktív, 2026-ban is működő'),
    bullet('**Tartalom (napi):** Favorit A-tipp, Villámtipp, BTTS csokor, Under/Over 2.5, Duplázó, Triplázó'),
    bullet('**Sportok:** Foci (PL, BL, NB I), jégkorong (NHL), kézilabda, tenisz'),
    bullet('**Közösség:** Regisztrált felhasználók, kommentek, tippjátékok (BetChallenge, Ágyúgolyófutam)'),
    bullet('**Becsült forgalom:** 50–100k havi látogató'),
    bullet('**Monetizáció:** Display reklám + partner linkek'),
    tbl(
      ['Erőssége', 'Gyengesége'],
      [
        ['Nagy napi tartalommennyiség', 'Elavult design, gyenge UX'],
        ['Elkötelezett törzsközönség', 'Social media jelenlét nulla'],
        ['Tippjátékok visszatérést generálnak', 'Data-driven value bet nincs'],
        ['NB I és BL lefedettség', 'Mobil optimalizáció elavult'],
      ],
      [50, 50]
    ),
    gap(),

    h2('3.2 Tippvadász.hu — prémium subscription modell'),
    bullet('**Csomagok:** Prémium 6 250 Ft/hó · VIP 9 400 Ft/hó · All In 30 000 Ft/3 hó'),
    bullet('**Delivery:** Facebook csoport + weboldal; napi 9+ tipp (min. 1.80-as szorzó)'),
    bullet('**Hirdetett nyerési arány:** 60,69%'),
    bullet('**Monetizáció:** 100% subscription + affiliate fogadóirodákhoz'),
    tbl(
      ['Erőssége', 'Gyengesége'],
      [
        ['Többszintű árképzés', 'Nincs edukációs funnel'],
        ['Facebook community', 'SEO-értéke minimális'],
        ['Egyértelmű értékígéret', 'Hitelesség kérdéses (nincs auditált track record)'],
      ],
      [50, 50]
    ),
    gap(),

    h2('3.3 TML Sportfogadás — legjobb social media jelenlét'),
    bullet('**Instagram:** 32 200 követő (@tmlsportfogadas)'),
    bullet('**Delivery:** Telegram VIP csoportok · Csomagok: 3 990–29 990 Ft (1–30 nap)'),
    bullet('**Tartalom stílus:** Grafikus tippkártyák, Instagram → Telegram funnel'),
    bullet('**Állítás:** „ex-sportolók bennfentes információkkal"'),
    tbl(
      ['Erőssége', 'Gyengesége'],
      [
        ['Legjobb social jelenlét a szegmensben', 'Hitelesség dokumentálva nincs'],
        ['Instagram → Telegram funnel működik', 'Nincs szerkesztői mélység'],
        ['Vizuális tartalom erős', 'Nincs tanító/edukációs elem'],
      ],
      [50, 50]
    ),
    gap(),

    h2('3.4 SEO-affiliate portálok (hetmeteres.com, fogadasguru.com, onlinesportfogadas.hu)'),
    bullet('Fogadóiroda összehasonlítók — nem eredeti elemzők'),
    bullet('**Bevételi modell:** CPA affiliate minden kattintáson és regisztráción'),
    bullet('**TippmixPRO Partnerhálózat** (m-partner.tippmixpro.hu) — belföldi jogi alap'),
    warn('FIGYELMEZTETÉS: Csak legális operátor (Szerencsejáték Zrt.-vel szemben) reklámozható. Illegális oldal hirdetése: 3 évig terjedő szabadságvesztés Magyarországon.'),
    divider(),

    // ── VERSENYTÁRS MÁTRIX ──────────────────────────────────────────────────
    h1('4. Versenytársak összefoglaló mátrix'),
    tbl(
      ['Versenyző', 'Közönség (becslés)', 'Monetizáció', 'Elemzés minősége', 'Fogadási fókusz'],
      [
        ['Büntető.com', '300k/hó (újraindul)', 'Szponzor', '⭐⭐⭐⭐⭐', '❌ Nincs'],
        ['nb1.hu', 'Atmedia 2,7M (total)', 'Display reklám', '⭐⭐⭐⭐', '❌ Nincs'],
        ['Tipplap.hu', '50–100k/hó', 'Display reklám', '⭐⭐', '✓ Erős'],
        ['Tippvadász.hu', '5–15k előfizető', 'Subscription', '⭐', '✓ Erős'],
        ['TML Sportfogadás', '32k Instagram', 'Subscription', '⭐', '✓ Erős'],
        ['TAKTIKA (célpozíció)', '—', 'Affiliate + Support', '⭐⭐⭐⭐⭐', '✓ Erős'],
      ],
      [22, 22, 18, 20, 18]
    ),
    gap(),
    good('TAKTIKA célpozíciója egyedi: nincs más platform, amely egyszerre ad magas szerkesztői minőséget ÉS fogadási perspektívát.'),
    divider(),

    // ── SOCIAL MEDIA ────────────────────────────────────────────────────────
    h1('5. Közösségi média helyzet'),
    h2('5.1 Platform prioritások a magyar sportközönségnél (2025)'),
    tbl(
      ['Platform', '35+ korosztály', '18–35 korosztály', 'Legjobb tartalom típus'],
      [
        ['Facebook', '✅ Elsődleges', 'Csökkenő', 'Hosszabb szöveg, videó, csoportok'],
        ['YouTube', '✅ Erős', '✅ Erős', 'Hosszú elemzés, podcast — ÜRES'],
        ['Instagram', 'Közepes', '✅ Erős', 'Reel, stories, tippgrafikák'],
        ['TikTok', '❌ Alacsony', '✅ Dominál', 'Rövid, ütős videó — ÜRES komoly elemzés'],
        ['Telegram', '✅ Aktív fogadók', '✅ Aktív fogadók', 'Tippek, VIP csoportok'],
      ],
      [18, 22, 22, 38]
    ),
    gap(),
    hot('YouTube: nincs egyetlen komoly, független, taktikai-elemzési alapú YouTube csatorna sem a magyar piacon. A „Tippmix Teljes Terjedelem" az egyetlen kísérlet — de az a Szerencsejáték Zrt. saját brandkommunikációja.'),

    h2('5.2 Kulcs social adat'),
    bullet('Az FTC Facebook Reels és TikTok videói egy Újpest derbire **307 000 megtekintést** hoztak — felülmúlva a TV nézettséget (200–250k)'),
    bullet('A sportszervezetek tartalomgyárakká válnak → hagyományos sportmédia veszít → **tér nyílik független elemző brandeknek**'),
    bullet('**TML Sportfogadás:** 32 200 Instagram követő — ez a legmagasabb szám a fogadásorientált szegmensben'),
    bullet('**Tipszmiksz Csabi:** ~30 000 Instagram, 22 000 TikTok — kasszinós/tipp influencer, nem elemző'),
    divider(),

    // ── KERESÉSI TRENDEK ────────────────────────────────────────────────────
    h1('6. Keresési trendek és kulcsszavak'),
    h2('6.1 Magas volumenű, erős verseny (nehéz, de szükséges)'),
    bullet('"NB1 tippek" — hatalmas volumen, tele affiliate spam oldalakkal'),
    bullet('"Bajnokok Ligája tipp" — szezonális csúcsok BL-meccsek előtt'),
    bullet('"sportfogadás tippek" · "tippmix tippek"'),

    h2('6.2 Közepes volumen, alacsony verseny ← TAKTIKA célterülete'),
    bullet('"NB1 elemzés" · "értékalapú fogadás" · "value bet magyarország"'),
    bullet('"xG statisztika NB1" · "labdarúgás taktika elemzés"'),
    bullet('"fogadási stratégia bankroll" · "Kelly-kritérium fogadás"'),

    h2('6.3 Szezonális keresési csúcsok — tartalomnaptárba kell'),
    tbl(
      ['Időszak', 'Trigger', 'Tartalom lehetőség'],
      [
        ['Július–augusztus', 'NB I szezonkezdés, BL selejtező', 'Csapat-erőfelmérők fogadási szemszögből'],
        ['Szeptember', 'BL alapszakasz', 'Value bet elemzések BL-mérkőzésekre'],
        ['December/Január', 'Téli átigazolási ablak', '„Mire számíthatsz az átigazolások után?" fogadási implikáció'],
        ['Május', 'BL döntő — BUDAPESTEN (2026)', 'Speciális tartalom sorozat, hazai relevancia maximum'],
        ['Szoboszlai meccsek előtt', 'Liverpool szereplés', '„Szoboszlai játszik? Mit jelent ez fogadásra?"'],
        ['Válogatott meccsek', 'Magyarok ellen nagy nemzetek', 'Mélyelemzés + value bet keresés'],
      ],
      [20, 30, 50]
    ),
    gap(),
    divider(),

    // ── FEHÉR FOLTOK ────────────────────────────────────────────────────────
    h1('7. Tartalmi fehér foltok — TAKTIKA differenciálási lehetőségei'),
    p('Ezek azok a területek, amelyeket a piac **nem fed le jól** — itt TAKTIKA egyedüli komoly szereplő lehet:'),
    gap(),

    h2('7.1 ★ Taktikai mélyelemzés + fogadási vetület EGYÜTT'),
    p('Senki sem csinálja ezt. A Büntető elemez, de nem fogad. A Tipplap fogad, de nem elemez taktikát.'),
    hot('TAKTIKA pozíciója: „Ez miért és hogyan fog dőlni?" → „Ezért érdemes/nem érdemes fogadni rá."'),

    h2('7.2 ★ NB I értékalapú fogadási elemzés (xG, PPDA, statisztikai modellek)'),
    p('Az nb1.hu ír xG-ről, de fogadási kontextus nélkül. Nincs olyan forrás, amely az NB I meccseket data-driven value bet perspektívából tárgyalja.'),
    good('Alacsony kulcsszó-verseny + növekvő kereslet = SEO arany.'),

    h2('7.3 ★ Magyar vonatkozású BL/EL tartalom fogadási szemüvegen'),
    p('A 2026-os BL döntő Budapesten lesz. Magyar csapatok (Fradi, ETO) európai szereplése hatalmas érdeklődést generál.'),
    hot('Nincs olyan platform, amely a magyar szempontú BL-elemzést fogadási értékeléssel kombinálja. TAKTIKA lehet az első.'),

    h2('7.4 Szoboszlai + magyar légionisták fogadási elemzése'),
    p('Szoboszlai minden Liverpool meccs előtt keresési tüskéket generál. „Szoboszlai játszik?" → „Liverpool ellen érdemes fogadni?" — ezt a keresletet senki nem tölti be szakszerűen.'),

    h2('7.5 Hosszú formátumú videó/podcast elemzés (YouTube)'),
    p('A piac teljesen üres ezen a területen. Első komoly, független hang a YouTube-on rendkívüli organikus növekedési potenciállal bír.'),

    h2('7.6 Bankroll menedzsment és fogadásmetodika oktatás'),
    p('Mindenki megadja a tippet, de senki sem tanítja meg rendszeresen, hogyan kell kezelni a tőkét. Edukációs tartalom = SEO alap + prémium funnel.'),

    h2('7.7 Élő fogadási taktikák'),
    p('„Live betting" elemzési tartalom szinte teljesen hiányzik. Mi történik az első 15 percben taktikailag, és hogyan reagáljon erre az élőben fogadó?'),

    h2('7.8 Kézilabda, vízilabda — magyar sportágak fogadási elemzéssel'),
    p('Tipplap ír kézilabdáról, de felszínesen. Magyar bajnokság + BL kézilabda fogadási mélyelemzéssel nincs lefedve.'),
    divider(),

    // ── MONETIZÁCIÓ ─────────────────────────────────────────────────────────
    h1('8. Monetizációs modellek a piacon'),
    tbl(
      ['Modell', 'Ki használja', 'Bevétel/látogató', 'Min. közönség', 'TAKTIKA-nak?'],
      [
        ['Display reklám', 'NSO, Sport365, nb1.hu', 'Alacsony', '100k+/hó', 'Nem elsődleges'],
        ['Affiliate (CPA + RevShare)', 'hetmeteres.com, fogadasguru.com', 'Magas', '5–10k/hó', '✅ Azonnal indítható'],
        ['Subscription / Prémium', 'Tippvadász, TML, Sportfogadj', 'Legmagasabb', '1–5k hűséges fan', '✅ 3–6. hónaptól'],
        ['Szponzorált tartalom', 'Büntető.com', 'Magas, de ritka', 'Reputáció kell', 'Hosszabb táv'],
      ],
      [22, 26, 18, 18, 16]
    ),
    gap(),
    h2('Affiliate részletek — a legfontosabb bevételi alap'),
    bullet('**TippmixPRO Partnerhálózat** (m-partner.tippmixpro.hu) — egyetlen legális belföldi opció'),
    bullet('**Bet365 Affiliates:** CPA ~£100–200/regisztráció · Revenue share: 20–35%'),
    bullet('**Kindred/Unibet Affiliates:** Revenue share 25–40% · CPA ~€50–100'),
    bullet('**Betsson Affiliates:** Revenue share 25–40%; alacsony margin (~4–5%)'),
    warn('Illegális operátor (Curaçao-s irodák pl. 22bet) reklámozása: 3 évig terjedő szabadságvesztés Magyarországon. Csak legális operátorokat.'),
    divider(),

    // ── CSELEKVÉSI TERV ─────────────────────────────────────────────────────
    h1('9. Stratégiai cselekvési terv — prioritás sorrendben'),

    h2('Azonnal (1–4. hét)'),
    num('**„Büntető.com meets value betting"** pozicionálás** — presztízs elemzési minőség + fogadási perspektíva EGYÜTT. Semmilyen konkurens nem csinálja.', 1),
    num('**NB I data-driven fogadási elemzések** — xG, PPDA alapú cikkek: alacsony SEO-verseny, növekvő kereslet.', 2),
    num('**Szoboszlai-tartalom stratégia** — minden Liverpool meccs előtt 1 cikk: „Szoboszlai játszik? Mit jelent ez fogadásra?" Organikus keresési csúcsokat fog.', 3),

    h2('1–3. hónap'),
    num('**Affiliate alap kiépítése** — TippmixPRO partnerhálózat + Bet365/Unibet regisztráció. Ez az első bevételi forrás.', 1),
    num('**YouTube csatorna indítása** — a piac üres ezen a területen. Az első komoly, független hang rendkívüli organikus előnyt jelent.', 2),
    num('**Telegram VIP csatorna** — az aktív fogadói közönség Telegramon él. Ide kell a prémium tartalom delivery.', 3),

    h2('3–6. hónap'),
    num('**BL 2026 Budapest speciális sorozat** — 2-3 hónappal a döntő előtt megkezdett tartalom sorozat. Hazai relevancia + globális figyelem = organikus csúcs.', 1),
    num('**Prémium subscription bevezetése** — ha elérted az 500–1000 hűséges olvasót. Minimum szint: 990–1 490 Ft/hó.', 2),
    num('**Élő fogadási taktikai sorozat** — teljesen lefedetlen terület a piacon.', 3),

    h2('6+ hónap'),
    num('**Kézilabda / vízilabda fogadási elemzés** — lefedetlen niche, ahol TAKTIKA dominálhat.', 1),
    num('**Szponzorált tartalom** — ha reputáció megvan. Csak releváns, etikus partnerekkel.', 2),
    num('**Print / digitális éves összefoglaló** — „TAKTIKA Fogadói Évkönyv" — prémium lead magnet és brand megkülönböztető.', 3),
    divider(),

    // ── ÖSSZEFOGLALÁS ────────────────────────────────────────────────────────
    h1('10. Összefoglalás — a 3 legfontosabb tanulság'),
    gap(),
    num('**A piac kettéválik, a rés óriási.** Elemzés + fogadás egyszerre senki sem csinál. TAKTIKA ide kerülhet, és szinte nincs versenytársa ebben a pozícióban.', 1),
    num('**YouTube és TikTok elemzési tartalom teljesen lefedetlen.** Az első komoly, rendszeres szereplő organikus előnyt szerez, amit évekig nem lehet beérni.', 2),
    num('**A 2026-os BL döntő Budapesten van.** Ez egyszer van. A tartalom-stratégiát most kell megkezdeni, hogy az organikus rangsoroláson és a figyelem csúcsán TAKTIKA legyen ott.', 3),
    gap(),
    new Paragraph({
      children: [new TextRun({ text: '© 2026 TAKTIKA — Belső kutatás, nem nyilvános.', italics: true, color: MUTED, size: 18 })],
      alignment: AlignmentType.CENTER, spacing: { before: 400 }
    }),
  ]

  const doc = new Document({
    creator: 'TAKTIKA',
    title: 'Magyar Piac Kutatás — Sport + Fogadáselemzés szegmens',
    styles: { default: { document: { run: { font: 'Calibri', size: 22 } } } },
    sections: [{ children }]
  })
  const buf = await Packer.toBuffer(doc)
  writeFileSync(join(OUT_DIR, '06_Magyar_Piac_Kutatas.docx'), buf)
  console.log('✓ 06_Magyar_Piac_Kutatas.docx')
}

buildMarketResearch().catch(console.error)
