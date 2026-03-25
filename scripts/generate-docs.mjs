import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  Table, TableRow, TableCell, WidthType, BorderStyle,
  AlignmentType, PageBreak, TableOfContents,
  UnderlineType, ShadingType
} from 'docx'
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '..', 'docs', 'word')
mkdirSync(OUT_DIR, { recursive: true })

// ─── Helpers ─────────────────────────────────────────────────────────────────

const BRAND_COLOR  = '1A3A5C'   // navy
const ACCENT_COLOR = 'D4A017'   // gold
const MUTED_COLOR  = '6B7280'   // gray
const RED_COLOR    = 'B91C1C'

function h1(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT_COLOR, space: 4 } },
    run: { color: BRAND_COLOR, bold: true }
  })
}

function h2(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 320, after: 120 },
    run: { color: BRAND_COLOR }
  })
}

function h3(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 80 },
    run: { color: BRAND_COLOR }
  })
}

function p(text, opts = {}) {
  const runs = []
  // Parse **bold** and *italic* inline
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g)
  for (const part of parts) {
    if (part.startsWith('**') && part.endsWith('**')) {
      runs.push(new TextRun({ text: part.slice(2, -2), bold: true, color: opts.color || '000000' }))
    } else if (part.startsWith('*') && part.endsWith('*')) {
      runs.push(new TextRun({ text: part.slice(1, -1), italics: true, color: opts.color || '000000' }))
    } else if (part.startsWith('`') && part.endsWith('`')) {
      runs.push(new TextRun({ text: part.slice(1, -1), font: 'Courier New', size: 18, color: '374151' }))
    } else if (part) {
      runs.push(new TextRun({ text: part, color: opts.color || '000000', bold: opts.bold || false }))
    }
  }
  return new Paragraph({
    children: runs,
    spacing: { before: 60, after: 120 },
    alignment: opts.alignment || AlignmentType.LEFT,
    indent: opts.indent ? { left: 360 } : undefined
  })
}

function bullet(text, level = 0) {
  const runs = []
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g)
  for (const part of parts) {
    if (part.startsWith('**') && part.endsWith('**')) {
      runs.push(new TextRun({ text: part.slice(2, -2), bold: true }))
    } else if (part.startsWith('`') && part.endsWith('`')) {
      runs.push(new TextRun({ text: part.slice(1, -1), font: 'Courier New', size: 18 }))
    } else if (part) {
      runs.push(new TextRun({ text: part }))
    }
  }
  return new Paragraph({
    children: runs,
    bullet: { level },
    spacing: { before: 40, after: 60 }
  })
}

function numbered(text, num) {
  const runs = []
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  for (const part of parts) {
    if (part.startsWith('**') && part.endsWith('**')) {
      runs.push(new TextRun({ text: part.slice(2, -2), bold: true }))
    } else if (part) {
      runs.push(new TextRun({ text: part }))
    }
  }
  return new Paragraph({
    children: [
      new TextRun({ text: `${num}. `, bold: true, color: BRAND_COLOR }),
      ...runs
    ],
    spacing: { before: 60, after: 80 },
    indent: { left: 360 }
  })
}

function quote(text) {
  return new Paragraph({
    children: [new TextRun({ text, italics: true, color: MUTED_COLOR })],
    spacing: { before: 120, after: 120 },
    indent: { left: 560 },
    border: { left: { style: BorderStyle.THICK, size: 12, color: ACCENT_COLOR, space: 8 } }
  })
}

function codeBlock(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: 'Courier New', size: 18, color: '1F2937' })],
    spacing: { before: 80, after: 80 },
    indent: { left: 360 },
    shading: { type: ShadingType.SOLID, color: 'F3F4F6' }
  })
}

function divider() {
  return new Paragraph({
    text: '',
    border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: 'E5E7EB', space: 4 } },
    spacing: { before: 160, after: 160 }
  })
}

function coverPage(title, subtitle, date = '2026. március') {
  return [
    new Paragraph({ text: '', spacing: { before: 1200, after: 0 } }),
    new Paragraph({
      children: [new TextRun({ text: 'TAKTIKA', bold: true, size: 52, color: BRAND_COLOR, allCaps: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 }
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Prémium Magyar Sportelemzés', size: 22, color: MUTED_COLOR, italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 400 }
    }),
    new Paragraph({
      children: [new TextRun({ text: title, bold: true, size: 44, color: BRAND_COLOR })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 200 }
    }),
    new Paragraph({
      children: [new TextRun({ text: subtitle, size: 24, color: MUTED_COLOR, italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 600 }
    }),
    new Paragraph({
      children: [new TextRun({ text: date, size: 20, color: MUTED_COLOR })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 0 }
    }),
    new Paragraph({ children: [new PageBreak()] })
  ]
}

function simpleTable(headers, rows, colWidths) {
  const headerCells = headers.map((h, i) =>
    new TableCell({
      children: [new Paragraph({
        children: [new TextRun({ text: h, bold: true, color: 'FFFFFF', size: 18 })],
        alignment: AlignmentType.CENTER
      })],
      width: { size: colWidths[i], type: WidthType.PERCENTAGE },
      shading: { type: ShadingType.SOLID, color: BRAND_COLOR }
    })
  )

  const dataRows = rows.map((row, ri) =>
    new TableRow({
      children: row.map((cell, ci) =>
        new TableCell({
          children: [new Paragraph({
            children: [new TextRun({ text: cell, size: 18 })],
            alignment: AlignmentType.CENTER
          })],
          width: { size: colWidths[ci], type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.SOLID, color: ri % 2 === 0 ? 'F9FAFB' : 'FFFFFF' }
        })
      )
    })
  )

  return new Table({
    rows: [new TableRow({ children: headerCells }), ...dataRows],
    width: { size: 100, type: WidthType.PERCENTAGE },
    margins: { top: 80, bottom: 80, left: 80, right: 80 }
  })
}

function warningBox(text) {
  return new Paragraph({
    children: [
      new TextRun({ text: '⚠  FONTOS: ', bold: true, color: RED_COLOR }),
      new TextRun({ text, color: '7C2D12' })
    ],
    spacing: { before: 120, after: 120 },
    indent: { left: 360, right: 360 },
    shading: { type: ShadingType.SOLID, color: 'FEF2F2' },
    border: {
      top: { style: BorderStyle.SINGLE, size: 4, color: RED_COLOR },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: RED_COLOR },
      left: { style: BorderStyle.THICK, size: 12, color: RED_COLOR },
      right: { style: BorderStyle.SINGLE, size: 4, color: RED_COLOR }
    }
  })
}

function infoBox(text) {
  return new Paragraph({
    children: [new TextRun({ text, color: '1E40AF', italics: true })],
    spacing: { before: 120, after: 120 },
    indent: { left: 360, right: 360 },
    shading: { type: ShadingType.SOLID, color: 'EFF6FF' },
    border: { left: { style: BorderStyle.THICK, size: 12, color: '3B82F6', space: 8 } }
  })
}

// ─── Doc 1: Facebook Strategy ─────────────────────────────────────────────────

async function buildFacebook() {
  const children = [
    ...coverPage('Facebook Közösségépítési Útmutató', 'Oldal, csoport, posztterv és KPI-k'),
    h1('1. Facebook Oldal létrehozása'),
    p('**Oldal neve:** TAKTIKA — Magyar Sportelemzés'),
    p('**Kategória:** Médiaközeg / Sportweboldal'),
    p('**Leírás (255 karakter):**'),
    quote('Mélyelemzések, taktikai értékelések és okos fogadási útmutatók — felelős, gondolkodó sportrajongóknak. Nem tippeket adunk: gondolkodást tanítunk.'),
    h3('Fontos mezők:'),
    bullet('Website: https://taktika.hu (vagy aktuális Vercel URL)'),
    bullet('Email: hello@taktika.hu'),
    bullet('Profil kép: TAKTIKA logó (négyzetes, 180×180 px)'),
    bullet('Borítókép: szerkesztőségi hangulatfotó, meccsfelvétel + TAKTIKA szöveg overlay (820×312 px)'),
    bullet('CTA gomb: „Kövess minket" → website linkre mutat'),
    divider(),
    h1('2. Facebook Csoport létrehozása'),
    p('**Csoport neve:** TAKTIKA Közösség — Okos Fogadás & Sportelemzés'),
    p('**Típus:** Zárt csoport (exkluzivitás érzése — tag kell a belépéshez)'),
    h3('Leírás:'),
    quote('A TAKTIKA olvasóinak közösségi tere. Taktikai viták, heti tippek megbeszélése, fogadási tapasztalatok — mindig felelős, mindig értelmes alapon. 18+'),
    h3('Belépési kérdések (3 darab):'),
    numbered('„Hogyan találtál a TAKTIKA oldalra?"', 1),
    numbered('„Milyen sportot követsz leginkább? (labdarúgás / F1 / más)"', 2),
    numbered('„Elfogadod, hogy a csoport 18+ és felelős fogadási elveket követ?"', 3),
    h3('Csoportszabályok (rögzített poszt):'),
    numbered('Tiszteletteljes hangnem — személyeskedés tilos', 1),
    numbered('Fogadóiroda spam és affiliate linkek tilosak tagoknak', 2),
    numbered('Tipp megosztásnál mindig adj kontextust (miért? milyen odds?)', 3),
    numbered('18+ szabály — ez nem vitatható', 4),
    divider(),
    h1('3. Első 30 nap posztterv'),
    h2('1. Hét — Bevezetés & Engagement'),
    simpleTable(
      ['Nap', 'Típus', 'Minta tartalom'],
      [
        ['Hétfő', 'Bemutatkozó poszt', '„Elindult a TAKTIKA csoport! Ki vagytok, mit követtek?"'],
        ['Kedd', 'Kérdés', '„Melyik meccs volt a legemlékezetesebb amit láttál?"'],
        ['Szerda', 'Cikk megosztás', '„Miért nyert az Aranycsapat Wembleyben? Teljes elemzés →"'],
        ['Csütörtök', 'Szavazás', '„Szerinted ki nyeri a hétvégi Arsenal–City derbyt?"'],
        ['Péntek', 'Tipp előzetes', '„🔒 Pénteken kijön a heti elemzésünk. Iratkozz fel!"'],
      ],
      [15, 25, 60]
    ),
    new Paragraph({ text: '', spacing: { before: 200 } }),
    h2('2–4. Hét — Rituálék kialakítása'),
    bullet('**Hétfő:** Hétvégi meccsek értékelése — „Ti hogyan láttátok?"'),
    bullet('**Szerda:** Oktatási tartalom — „5 dolog amit tudni kell az odds-okról"'),
    bullet('**Péntek:** Hétvégi előrejelzés + CTA a weboldalra'),
    bullet('**Vasárnap:** Heti összefoglaló — legjobb komment kiemelése'),
    divider(),
    h1('4. Első 50 tag megszerzése'),
    numbered('**Személyes ismerősök:** Hívj meg 20–30 barátot/ismerőst aki sportrajongó', 1),
    numbered('**Meglévő FB ismerősök:** Posztold saját profilodon a csoport linkjét', 2),
    numbered('**Kapcsolódó csoportok:** NB I rajongók, Premier League HU — értékes hozzászólásokhoz fűzve', 3),
    numbered('**Website banner:** „Csatlakozz a Facebook csoporthoz" link az oldalon', 4),
    numbered('**Email lista:** Az első 50 feliratkozónak küld el a csoport meghívót', 5),
    divider(),
    h1('5. Engagement pszichológia — mi működik Facebookon'),
    bullet('**Nyitott kérdések** > link megosztások (algoritmus jutalmazza)'),
    bullet('**Szavazások** minden héten legalább 1x'),
    bullet('„**Ki nyeri?**" kérdés meccs előtt + eredmény kommentben → visszatérés'),
    bullet('**Kiemelés:** „A hét legjobb hozzászólása" poszt → motivál másokat'),
    bullet('**Első komment:** Mindig te kommenteld az első posztot (algoritmus boost)'),
    divider(),
    h1('6. Mérőszámok (KPI-k) — első 3 hónap'),
    simpleTable(
      ['Hónap', 'Csoport tagok', 'Oldal lájkok', 'Átlag elérés/poszt'],
      [
        ['1. hónap', '50+', '30+', '100–300'],
        ['2. hónap', '150+', '100+', '300–800'],
        ['3. hónap', '300+', '250+', '500–2 000'],
      ],
      [20, 25, 25, 30]
    ),
    new Paragraph({ text: '', spacing: { before: 200 } }),
    infoBox('Ha a számok alatt vagy: növeld a kérdések és szavazások arányát, csökkentsd a link-only posztokat.')
  ]

  const doc = new Document({
    creator: 'TAKTIKA',
    title: 'Facebook Közösségépítési Útmutató',
    description: 'TAKTIKA Facebook oldal és csoport stratégia',
    styles: { default: { document: { run: { font: 'Calibri', size: 22 } } } },
    sections: [{ children }]
  })
  const buf = await Packer.toBuffer(doc)
  writeFileSync(join(OUT_DIR, '01_Facebook_Strategia.docx'), buf)
  console.log('✓ 01_Facebook_Strategia.docx')
}

// ─── Doc 2: Instagram/TikTok Reels ───────────────────────────────────────────

async function buildReels() {
  const children = [
    ...coverPage('Instagram & TikTok Reels Forgatókönyvek', '5 kész szkript + carousel sablonok + stories rituálék'),
    h1('Alap sablon — minden Reel-hez'),
    h3('Technikai specifikációk:'),
    bullet('Méret: 1080×1920 px (9:16 arány), min. 15 mp, max. 90 mp'),
    bullet('Felirat: MINDIG — kereshetőség + hozzáférhetőség'),
    bullet('Hook: Az első 2–3 másodperc dönt — azonnali kérdés vagy meglepő állítás'),
    bullet('CTA az utolsó 3 mp-ben: „Teljes elemzés a bio linkben"'),
    bullet('Hashtag sablon: #taktika #sportelemzés #fogadás #labdarúgás #értékfogadás #nbI #premierleague'),
    divider(),

    h1('REEL #1 — „Wembley 1953: Az évszázad meccsének titka" (60 mp)'),
    h3('Hook (0–3 mp):'),
    quote('„1953-ban Anglia soha nem kapott 5-nél több gólt hazai pályán. Aztán jött Puskás."'),
    h3('Tartalom (3–50 mp) — 5 slide / gyors vágás:'),
    numbered('[kép: Wembley 1953] „A meccs előtt Anglia volt az esélyes — 1.30-on"', 1),
    numbered('[kép: Puskás] „Az Aranycsapat 4-2-4-et játszott, amit senki nem látott még"', 2),
    numbered('[stat kártya] „6-3 · 13 lövés · 87% labdabirtoklás"', 3),
    numbered('„Hidegkuti középcsatár volt — de hátralépett, elvonta a védőt"', 4),
    numbered('„Anglia nem értette a mozgást. Ma ezt \'false 9\'-nak hívnánk."', 5),
    h3('CTA (50–60 mp):'),
    quote('„Teljes taktikai elemzés — bio link. Kommentben: melyik futball-taktika volt a leginnovatívabb?"'),
    p('**Zene:** Drámai instrumentális, lassabb tempo'),
    divider(),

    h1('REEL #2 — „Hogyan gondolkodik egy value bettor?" (45 mp)'),
    h3('Hook (0–3 mp):'),
    quote('„A legtöbb fogadó veszít. Nem azért, mert nem tudnak labdarúgást. Hanem mert nem tudnak valószínűséget."'),
    h3('Tartalom (3–38 mp) — szöveges overlay animáció:'),
    numbered('„A fogadóiroda azt mondja: Arsenal 2.40 → azaz 42% esélyt ad"', 1),
    numbered('„Te úgy gondolod: valójában 55% az esély → EZ AZ ÉRTÉK"', 2),
    numbered('[képlet overlay] „Várható érték = (valószínűség × odds) - 1"', 3),
    numbered('„Ha 0.55 × 2.40 = 1.32 → pozitív várható érték ✓"', 4),
    numbered('„Hosszú távon csak ez nyerhet. Nem a tipp. A LOGIKA."', 5),
    h3('CTA (38–45 mp):'),
    quote('„Value Betting Biblia — ingyen, a bio linkben"'),
    p('**Zene:** Lo-fi, visszafogott'),
    divider(),

    h1('REEL #3 — „Istanbul 2005: A lehetetlentől a csodáig" (55 mp)'),
    h3('Hook (0–3 mp):'),
    quote('„Félidőben 3-0-ra vezet az AC Milan. Ha te fogadó vagy, mit csinálsz?"'),
    h3('Tartalom (3–48 mp) — narratív vágás:'),
    numbered('[score kártya] „45. perc · 3-0 · Shevchenko, Crespo ×2"', 1),
    numbered('„A fogadóirodák 1.05-re vitték Milán győzelmét a szünetben"', 2),
    numbered('„Gerrard gólja 54. percben — 3-1"', 3),
    numbered('„Smicer 56. perc — 3-2. A pálya megőrül."', 4),
    numbered('„Alonso 60. perc — 3-3. Ez már nem sport. Ez vallás."', 5),
    numbered('„Dudek kihagyja Shevchenko büntetőjét. Liverpool BL-győző."', 6),
    numbered('„Amit tanulunk: az odds csak valószínűség. A sport mindig több."', 7),
    h3('CTA (48–55 mp):'),
    quote('„Teljes elemzés az oldalon → link a bio-ban"'),
    p('**Zene:** „You\'ll Never Walk Alone" instrumental fade-in a vége felé'),
    divider(),

    h1('REEL #4 — „Guardiola tiki-taka — miért nem másolható?" (40 mp)'),
    h3('Hook (0–3 mp):'),
    quote('„Minden csapat próbálta lemásolni. Miért sikerült csak Guardiola Barcelonájának?"'),
    h3('Tartalom (3–33 mp) — taktikai diagram overlay:'),
    numbered('„A tiki-taka NEM a passz. A POZÍCIÓ."', 1),
    numbered('[diagram] „Guardiola csapata 3 szektorra osztja a pályát"', 2),
    numbered('„Minden labdavesztés után: 6 mp-en belül visszaszerezni → GEGENPRESSING"', 3),
    numbered('„Ehhez kellett: Xavi (látás), Iniesta (technika), Messi (döntés)"', 4),
    numbered('„Ha egy hiányzik, az egész összeomlik — lásd: Barcelona 2021"', 5),
    h3('CTA (33–40 mp):'),
    quote('„Kommentben: melyik a legjobb taktikai rendszer? → Válaszolok mindenkinek"'),
    p('**Zene:** Gyors, energikus instrumentális'),
    divider(),

    h1('REEL #5 — „Melyik fogadóirodát válaszd?" (50 mp)'),
    h3('Hook (0–3 mp):'),
    quote('„Nem mindegy, hol fogadsz. Az odds-különbség hosszú távon ezreket jelent."'),
    h3('Tartalom (3–43 mp):'),
    numbered('„Ugyanaz a meccs — 3 irodánál 3 különböző odds"', 1),
    numbered('[kártya összehasonlítás] „Arsenal győzelem: 2.30 / 2.40 / 2.50"', 2),
    numbered('„A különbség: 20 fogadáson ~2 000 Ft nyereség különbség"', 3),
    numbered('„Mit kell nézni: margin (a vig), kifizetési sebesség, live odds"', 4),
    numbered('„Mi csak olyan irodákat ajánlunk, amit mi is használunk"', 5),
    h3('CTA (43–50 mp):'),
    quote('„Affiliate összehasonlítónk → bio linkben · 18+ Játssz felelősséggel"'),
    p('**Zene:** Visszafogott, professional'),
    divider(),

    h1('Carousel sablonok (Instagram Feed)'),
    h2('Carousel #1 — „5 fogalom amit minden fogadónak tudni kell"'),
    bullet('Slide 1: Cover — „5 fogalom amit minden fogadónak tudni kell"'),
    bullet('Slide 2: Odds = valószínűség, nem garantált nyeremény'),
    bullet('Slide 3: Margin / vig — a fogadóiroda jutaléka'),
    bullet('Slide 4: Value bet — mikor éri meg fogadni'),
    bullet('Slide 5: Bankroll kezelés — a legfontosabb szabály'),
    bullet('Slide 6: Várható érték (EV) — a matematika alapja'),
    bullet('Slide 7: CTA — „Töltsd le a Value Betting Bibliát → link a bio-ban"'),
    h2('Carousel #2 — „Az Aranycsapat 5 taktikai forradalma"'),
    bullet('(A Wembley 1953 cikk alapján — olvasd el a teljes elemzést)'),
    divider(),

    h1('Stories rituálék (hetente)'),
    simpleTable(
      ['Nap', 'Stories tartalom'],
      [
        ['Péntek', '„Kijött a heti elemzésünk — link a bio-ban" + Swipe-up'],
        ['Szombat', '„Ki nyer ma?" szavazás (meccs előtt 2 órával)'],
        ['Szombat este', 'Eredmény: „Megmondtuk" vagy „Tévedtünk" (autentikus!)'],
        ['Hétfő', '„Mit tanultunk a hétvégéből?" — 3 story dia'],
      ],
      [25, 75]
    ),
    new Paragraph({ text: '', spacing: { before: 200 } }),
    h1('TikTok adaptáció'),
    bullet('Rövidebb verzió (30–45 mp)'),
    bullet('Trendzenék használata (TikTok Sound library)'),
    bullet('„POV: értékfogadó vagy" formátum'),
    bullet('Duet / Stitch: reagálj sportmédia videókra'),
    bullet('Hashtag: #sporttipp #focielemzés #fogadás #taktika'),
  ]

  const doc = new Document({
    creator: 'TAKTIKA',
    title: 'Instagram & TikTok Reels Forgatókönyvek',
    styles: { default: { document: { run: { font: 'Calibri', size: 22 } } } },
    sections: [{ children }]
  })
  const buf = await Packer.toBuffer(doc)
  writeFileSync(join(OUT_DIR, '02_Instagram_TikTok_Reels.docx'), buf)
  console.log('✓ 02_Instagram_TikTok_Reels.docx')
}

// ─── Doc 3: Content Calendar ──────────────────────────────────────────────────

async function buildContentCalendar() {
  const children = [
    ...coverPage('8 Hetes Tartalomkészítési Ütemterv', '2026. március – május · Cikkek, social media, backlog'),
    h1('Áttekintés'),
    p('**Időszak:** 2026. március – 2026. május (indulás utáni első 8 hét)'),
    p('**Ritmus:** 2 webes cikk/hét + naponta 1–2 social media poszt'),
    p('**Tartalom arány:** 60% elemzés/taktika · 25% okos tippek/fogadás · 15% legendák/történelem'),
    divider(),

    h1('Heti fix struktúra'),
    simpleTable(
      ['Nap', 'Weboldal', 'Social Media'],
      [
        ['Hétfő', 'Hétvégi értékelő (600–900 szó)', 'FB: „Ti hogyan láttátok?" · IG: Stories értékelés'],
        ['Kedd', '—', 'IG Carousel (oktatási) · TikTok Reel'],
        ['Szerda', 'Mélyelemzés (1500–2500 szó)', 'FB: cikk + kérdés · Twitter: threads'],
        ['Csütörtök', '—', 'IG Reel (sport/taktika) · FB: szavazás'],
        ['Péntek', 'Tippek + odds (PRÉMIUM)', 'IG Stories: „Kijött" · Email hírlevél'],
        ['Szombat', '—', 'IG Stories: szavazás · Live tweet'],
        ['Vasárnap', '—', 'FB: heti összefoglaló, legjobb komment'],
      ],
      [18, 36, 46]
    ),
    new Paragraph({ text: '', spacing: { before: 200 } }),
    divider(),

    h1('1. Hét (márc. 10–16.) — Indulás'),
    h2('Cikkek:'),
    numbered('**[H] Értékelő:** „Arsenal–Man City: Miért volt ez több mint egy derbi?" — Aktuális Elemzések | Szabó Dávid | ~800 szó', 1),
    numbered('**[Sz] Mélyelemzés:** „Mi az értékfogadás?" — Okos Tippek | Molnár Zsolt | ~1800 szó | **PRÉMIUM jelölő**', 2),
    h2('Social:'),
    bullet('H: FB csoport bemutatkozó poszt („Ki vagytok?")'),
    bullet('K: IG Carousel — „5 dolog amit minden fogadónak tudni kell"'),
    bullet('Sz: FB cikk + kérdés „Szerintetek mi az odds valójában?"'),
    bullet('Cs: IG Reel #1 (Wembley 1953 hook)'),
    bullet('P: Email hírlevél #1 · IG Stories „Heti tipp kijött"'),
    divider(),

    h1('2. Hét (márc. 17–23.) — Hitelesség építés'),
    h2('Cikkek:'),
    numbered('**[H] Értékelő:** „Real Madrid–Atlético: Amikor a védekezés nyer derbyt" — Varga László | ~700 szó', 1),
    numbered('**[Sz] Mélyelemzés:** „A pressing rendszerek fejlődése: Klopp, Guardiola és a modern intenzitás" — Szabó Dávid | ~2200 szó', 2),
    h2('Social:'),
    bullet('H: FB „Szerintetek melyik edzői stílus tartósabb: presszingezés vs. birtoklás?"'),
    bullet('K: IG Reel #4 (Guardiola tiki-taka)'),
    bullet('Cs: FB szavazás — „Melyik lett volna az évszázad meccsének tippje?"'),
    bullet('P: Email hírlevél #2 · Heti Bundesliga + Serie A tippek'),
    divider(),

    h1('3. Hét (márc. 24–30.) — Közösség aktiválás'),
    h2('Cikkek:'),
    numbered('**[H] Értékelő:** „Bayern–Dortmund Klassiker: A számok mögötti történet" — Kiss Bence | ~750 szó', 1),
    numbered('**[Sz] Történelmi:** „Az 1954-es berni döntő pszichológiája" — Horváth Gábor | ~2000 szó', 2),
    h2('Social:'),
    bullet('H: FB „Klassiker komment kiemelés — ki mondta, hogy Bayern nyer?"'),
    bullet('K: IG Carousel — „A bankroll kezelés 3 aranyszabálya"'),
    bullet('Cs: IG Reel #3 (Istanbul 2005)'),
    bullet('P: Email hírlevél #3 · Heti NB I tipp + odds elemzés'),
    divider(),

    h1('4. Hét (márc. 31. – ápr. 6.) — Edukáció & értékfogadás'),
    h2('Cikkek:'),
    numbered('**[H] Értékelő:** „Heti meccsösszefoglaló — mit tanultunk a hétvégéről?" — Molnár Zsolt | ~600 szó', 1),
    numbered('**[Sz] Mélyelemzés:** „Margin és vig: hogyan számold ki, mennyit vesz el a fogadóiroda" — Molnár Zsolt | ~1600 szó | **PRÉMIUM**', 2),
    h2('Social:'),
    bullet('K: IG Reel #2 (value bettor gondolkodás)'),
    bullet('Cs: FB interaktív kérdés „Melyik fogadóirodát használod és miért?"'),
    bullet('P: Email hírlevél #4 + Value Betting Biblia PDF promóció'),
    divider(),

    h1('5. Hét (ápr. 7–13.) — Ikonok & narratíva'),
    h2('Cikkek:'),
    numbered('**[H] Értékelő:** „BL-negyeddöntő előzetes: A várható taktikai csaták" — Szabó Dávid | ~900 szó', 1),
    numbered('**[Sz] Portré:** „Ronaldinho: A zseni aki élte a pillanatot" — Fekete Mária | ~2000 szó', 2),
    h2('Social:'),
    bullet('H: FB „BL-negyeddöntő: melyik az értékelésed szerint a legszorosabb?"'),
    bullet('K: IG Carousel — „Ronaldinho 5 legikonikusabb pillanata"'),
    bullet('Cs: IG Reel — „Miért felejthetetlen Ronaldinho?" (30 mp)'),
    bullet('P: Email hírlevél #5 · BL negyeddöntő tippek'),
    divider(),

    h1('6. Hét (ápr. 14–20.) — Visszajelzés & hitelességépítés'),
    h2('Cikkek:'),
    numbered('**[H] Értékelő:** „BL-negyeddöntők: Volt igazunk? Értékelés + önkritika" — Molnár Zsolt | ~700 szó', 1),
    numbered('**[Sz] SEO cikk:** „Sportfogadás Magyarországon 2026 — mi legális, mi nem" — Molnár Zsolt | ~1500 szó', 2),
    p('*Pszichológiai eszköz: szerzői tévedés beismerése = bizalomépítés*', { indent: true }),
    h2('Social:'),
    bullet('H: FB „Megmondtuk / Tévedtünk — becsületes BL-visszatekintés"'),
    bullet('K: IG Reel #5 (fogadóiroda összehasonlítás)'),
    bullet('P: Email hírlevél #6 · Affiliate partnerek bemutatása (etikus keret)'),
    divider(),

    h1('7. Hét (ápr. 21–27.) — Gamification & visszatérők'),
    h2('Cikkek:'),
    numbered('**[H] Értékelő:** „Heti meccsek — top 3 meglepetés és mit árulnak el az oddsokról" — Molnár Zsolt | ~600 szó', 1),
    numbered('**[Sz] Sorozat 1/3:** „Guardiola taktikai evolúciója — 1. rész: Barcelona és a tiki-taka születése" — Varga László | ~2000 szó', 2),
    h2('Social:'),
    bullet('H: FB „Heti kvíz: Ki mondta ezt a meccsanalízist?" (citátum játék)'),
    bullet('K: IG Carousel — Guardiola 3 éra összehasonlítás'),
    bullet('Cs: FB szavazás — „Guardiola melyik csapatát tartod a legjobban?"'),
    bullet('P: Email hírlevél #7 · Sorozat bejelentés (Zeigarnik-hatás)'),
    divider(),

    h1('8. Hét (ápr. 28. – máj. 4.) — Mérés & következő fázis'),
    h2('Cikkek:'),
    numbered('**[H] Értékelő:** Heti meccsösszefoglaló', 1),
    numbered('**[Sz] Sorozat 2/3:** „Guardiola taktikai evolúciója — 2. rész: Bayern és a vertikálisabb futball" — Varga László | ~2000 szó', 2),
    h2('Értékelési pontok:'),
    bullet('Nézd meg az első 8 hét számait (olvasók, email feliratkozók, FB tagok)'),
    bullet('Ha elérted az **500 havi olvasót** → indítsd el az önkéntes támogatás push-ját'),
    bullet('Ha elérted a **2000 havi olvasót** → kezdd el a freemium tesztelését'),
    divider(),

    h1('Tartalom Backlog — Jövőbeli cikkek témái'),
    h2('Okos Tippek'),
    bullet('A Kelly-kritérium: hogyan méretezd a tétjeidet matematikailag'),
    bullet('Draw no bet és Asian handicap magyarázata'),
    bullet('Statisztikai anomáliák a labdarúgásban amit a fogadóirodák figyelmen kívül hagynak'),
    bullet('Élő fogadás: mikor éri meg, mikor nem'),
    h2('Taktika & Elemzés'),
    bullet('Guardiola 3/3: Manchester City és a posztmodern futball'),
    bullet('Mourinho paradoxona: Miért győz a „csúnya" futball?'),
    bullet('Az NB I taktikai fejlődése: Ferencváros modern rendszere'),
    bullet('VAR hatása az odds-okra — statisztikai elemzés'),
    h2('Ikonok & Legendák'),
    bullet('Zidane: A labda és a csend között'),
    bullet('Beckenbauer és a libero forradalma'),
    bullet('Bozsik József: Az agyalás mestere Puskás árnyékában'),
    h2('Sporttörténelem'),
    bullet('Az 1986-os „Isten keze" meccs — manipuláció vagy zseni?'),
    bullet('A Bosman-ítélet és hogyan változtatta meg a futball gazdaságtanát'),
    bullet('Heysel 1985: Tragédia ami átírta az európai futball szabályait'),
  ]

  const doc = new Document({
    creator: 'TAKTIKA',
    title: '8 Hetes Tartalomkészítési Ütemterv',
    styles: { default: { document: { run: { font: 'Calibri', size: 22 } } } },
    sections: [{ children }]
  })
  const buf = await Packer.toBuffer(doc)
  writeFileSync(join(OUT_DIR, '03_Tartalom_Utemterv_8_Het.docx'), buf)
  console.log('✓ 03_Tartalom_Utemterv_8_Het.docx')
}

// ─── Doc 4: Value Betting Biblia ──────────────────────────────────────────────

async function buildValueBetting() {
  const children = [
    ...coverPage('Value Betting Biblia', 'A TAKTIKA ingyenes útmutatója az okos sportfogadáshoz', 'Szerkesztő: Molnár Zsolt · 2026'),
    h1('Bevezető: Miért írtuk ezt a könyvet?'),
    p('A sportfogadásról szóló tartalmak 95%-a három csoportba esik:'),
    numbered('**Biztos tippek** — amelyek soha nem biztos tippek', 1),
    numbered('**Reklámok** — amelyek fogadóirodákat hirdetnek', 2),
    numbered('**Óvások** — amelyek csak azt mondják: „ne fogadj"', 3),
    p('Mi egyik sem vagyunk.'),
    p('A TAKTIKA azt vallja, hogy a sportfogadás — ha okosan csinálják — intellektuális gyakorlat. Valószínűségekről, matematikáról, önfegyelemről szól. Ez az útmutató azt adja meg, amit a fogadóirodák nem akarnak, hogy tudj: a gondolkodásmódot.'),
    h3('Amit ebben az útmutatóban megtalálsz:'),
    bullet('A 6 legfontosabb fogalom amit minden fogadónak ismernie kell'),
    bullet('A value betting matematikája — egyszerűen'),
    bullet('Bankroll kezelés — az egyetlen módszer ami hosszú távon működik'),
    bullet('A leggyakoribb pszichológiai csapdák és hogyan kerüld el őket'),
    bullet('5 lépéses értékelési folyamat minden fogadás előtt'),
    h3('Amit NEM találsz benne:'),
    bullet('„Biztos" tippeket'),
    bullet('Nyerési garanciát'),
    bullet('Gyors meggazdagodási módszert'),
    divider(),

    h1('1. fejezet: Az Alapfogalmak'),
    h2('1.1 Mi az odds?'),
    p('Az odds (szorzó) egy **fordított valószínűség**. Ha a fogadóiroda 2.00-t ad Arsenal győzelmére, azzal azt mondja:'),
    quote('„Szerintünk 50% az esély, hogy Arsenal nyer"'),
    p('**Képlet:** Implicit valószínűség = 1 / odds'),
    simpleTable(
      ['Odds', 'Implicit valószínűség'],
      [['1.50', '66.7%'], ['2.00', '50.0%'], ['3.00', '33.3%'], ['5.00', '20.0%'], ['10.00', '10.0%']],
      [50, 50]
    ),
    new Paragraph({ text: '', spacing: { before: 160 } }),
    infoBox('A fogadóiroda soha nem ad ki 100%-os összes valószínűséget. Az összes kimenetel implicit valószínűsége mindig több mint 100% — a különbség a fogadóiroda jutaléka (vig/margin).'),
    divider(),

    h2('1.2 Mi a margin (vig)?'),
    p('A margin az a százalék, amennyit a fogadóiroda „levesz" minden egyes fogadásból.'),
    h3('Példa — Arsenal vs Manchester City:'),
    bullet('Arsenal győzelme: 2.40 → 41.7%'),
    bullet('Döntetlen: 3.50 → 28.6%'),
    bullet('City győzelme: 2.80 → 35.7%'),
    bullet('**Összesen: 106.0% → Margin: 6.0%**'),
    h3('Iparági átlagok:'),
    bullet('Prémium európai fogadóirodák: 4–6%'),
    bullet('Közepes irodák: 6–9%'),
    bullet('Speciális/egzotikus fogadásokon: 10–15%+'),
    infoBox('Mindig az alacsony margin irodákat részesítsd előnyben.'),
    divider(),

    h2('1.3 Mi a value bet?'),
    p('A value bet — értékfogadás — akkor keletkezik, amikor **te másképpen értékeled a valószínűséget mint a fogadóiroda**, és az iroda oddsza matematikailag magasabb várható értéket ad.'),
    h3('Képlet:'),
    codeBlock('Várható Érték (EV) = (Saját valószínűséged × Odds) - 1'),
    h3('Példa:'),
    bullet('Arsenal győzelme: iroda odds = 2.40 (41.7% implicit valószínűség)'),
    bullet('Te úgy gondolod: Arsenal valójában 55%-ra győz'),
    bullet('EV = (0.55 × 2.40) - 1 = 1.32 - 1 = **+0.32**'),
    infoBox('Pozitív EV = értékfogadás. Negatív EV = kerülni kell.'),
    divider(),

    h2('1.4 A Várható Érték (EV) jelentősége'),
    p('A várható érték NEM garantálja az egyedi fogadás nyerését. Azt mondja meg, hogy **hosszú távon, sok fogadáson keresztül** mire számíthatsz.'),
    h3('100 fogadás, +0.32 EV esetén:'),
    bullet('Átlagos nyereség fogadásonként: 32% a tét értékéből'),
    bullet('De az egyedi fogadások kb. 45%-a veszteséges lesz (ez normális!)'),
    bullet('A minta elegendő mérete: legalább 200–300 fogadás az EV realizálásához'),
    infoBox('Az EV nem csodafegyver — türelem és következetesség kell hozzá.'),
    divider(),

    h1('2. fejezet: Bankroll Kezelés — Az Egyetlen Szabály'),
    h2('2.1 Mi a bankroll?'),
    p('A bankroll az az összeg, amit fogadásra félretettél, és **kizárólag erre szánod**. Soha nem azonos a megtakarításaiddal, a számlád egyenlegével, vagy pénzzel amit máshol is felhasználnál.'),
    infoBox('Alapszabály: A bankrollt olyannak kezeld, mint egy befektetési alapot. Akkor fogadsz, ha pozitív EV-t látsz — és soha nem azért, mert „érzed".'),

    h2('2.2 A Kelly-kritérium — az optimális tétméret'),
    p('A Kelly-kritérium megmondja, a bankrollod hány százalékát kell feltenned egyetlen fogadásra, hogy **maximalizáld a hosszú távú növekedést anélkül, hogy tönkremennél**.'),
    h3('Képlet:'),
    codeBlock('Kelly % = (b × p - q) / b'),
    bullet('b = nettó odds (odds - 1)'),
    bullet('p = saját becsült valószínűséged'),
    bullet('q = 1 - p (veszítési valószínűség)'),
    h3('Példa:'),
    bullet('Odds: 2.40 (b = 1.40)'),
    bullet('Saját valószínűség: 55% (p = 0.55, q = 0.45)'),
    bullet('Kelly % = (1.40 × 0.55 - 0.45) / 1.40 = **22.8%**'),
    infoBox('Ez sok. Valóságban fél-Kelly (11.4%) vagy negyed-Kelly (5.7%) ajánlott, mert a saját valószínűség-becsléseink nem tökéletesek.'),

    h2('2.3 Egyszerűsített bankroll szabályok kezdőknek'),
    numbered('**Soha ne tedd fel a bankroll 5%-ánál többet** egyetlen fogadásra', 1),
    numbered('**Maximum 3–4 aktív fogadás egyszerre** (korreláció veszélye)', 2),
    numbered('**Stop-loss:** Ha a bankroll 30%-át elveszted, állj meg, értékelj', 3),
    numbered('**Soha ne „üsd vissza" a veszteséget** — ez a leggyakoribb hiba', 4),
    numbered('**Vezess naplót** — minden fogadást, az okát, az eredményt', 5),
    divider(),

    h1('3. fejezet: Pszichológiai Csapdák'),
    h2('3.1 A Gambler\'s Fallacy (Szerencsejátékos tévedés)'),
    p('**Mítosz:** „A Real Madrid 5 meccse veszített egymás után, tehát most biztosan nyer"'),
    p('**Valóság:** Minden meccs önálló esemény. A korábbi eredmények NEM befolyásolják a következő meccs valószínűségét — ez nem „kiegyenlítő mechanizmus".'),

    h2('3.2 Confirmation Bias (Megerősítési elfogultság)'),
    p('**Mítosz:** Csak azt a statisztikát keresed, ami alátámasztja a döntésedet'),
    p('**Valóság:** Minden fogadás előtt aktívan keress ellentétes érveket. Ha 3 erős érvod van a fogadás ELLEN és 1 van mellette — ne fogadj.'),

    h2('3.3 Loss Aversion (Veszteségkerülés) fordítottja fogadásban'),
    p('**Mítosz:** „A veszteség nem számít, majd behozom"'),
    p('**Valóság:** 1 000 Ft veszteség pszichológiailag fájdalmasabb mint amennyire 1 000 Ft nyeremény örömet okoz. Fogadásnál ez fordítva veszélyes: azért fogadsz nagyobb téttel, hogy gyorsan visszahozd a veszteséget.'),
    infoBox('Megoldás: Fix tétméret. Mindig.'),

    h2('3.4 Hot Hand Fallacy'),
    p('**Mítosz:** „5 fogadásból 4-et nyertem, most már nyerő szériában vagyok"'),
    p('**Valóság:** Nem létezik nyerő széria a valószínűségek szintjén. Sikeres fogadások sorozata statisztikailag normális variáció — nem képességed megemelkedése.'),
    divider(),

    h1('4. fejezet: 5 Lépéses Értékelési Folyamat'),
    h2('Lépés 1: Gyűjts objektív adatokat'),
    bullet('Aktuális forma (utolsó 5 meccs)'),
    bullet('Sérülések, eltiltások'),
    bullet('Hazai/vendég statisztika az aktuális szezonban'),
    bullet('Egymás elleni mérkőzések (head-to-head)'),
    bullet('Motiváció (mit jelent ez a meccs a csapatnak — kiesés, bajnoki cím, pohárdöntő)'),

    h2('Lépés 2: Határozd meg a saját valószínűségedet'),
    bullet('Ne nézd előbb az oddszt (befolyásol!)'),
    bullet('Elemezd az adatokat → döntsd el: 40%? 55%? 60%?'),
    bullet('Írj le egy százalékot'),

    h2('Lépés 3: Számítsd ki az EV-t'),
    codeBlock('EV = (saját valószínűség × odds) - 1'),
    p('Ha EV pozitív: potenciálisan értékfogadás. Ha negatív: skip.'),

    h2('Lépés 4: Ellenőrizd a margint'),
    bullet('Hasonlítsd össze 3–4 fogadóirodán'),
    bullet('Válaszd a legmagasabb oddszt (a legjobb értéket)'),

    h2('Lépés 5: Határozd meg a tétméretet'),
    bullet('Kelly vagy fix % (max. 5% bankroll)'),
    bullet('Ne emocionálisan — a képlet alapján'),
    divider(),

    h1('5. fejezet: Felelős Fogadás'),
    h2('A fogadás nem jövedelemforrás'),
    p('Még a legjobb módszerek sem garantálnak nyerést. A legtöbb hosszú távon nyereséges fogadó havi szinten +5–15% bankroll növekedést ér el — nem 10×-os szorzókat.'),
    h2('Jelek, hogy megálltál volna'),
    bullet('Fogadsz, hogy pénzt keress megélhetésre'),
    bullet('Veszítés után „visszaütsz"'),
    bullet('Egyre nagyobb téteket teszel fel'),
    bullet('Nem tudod abbahagyni egy veszteségsorozat után'),
    bullet('Titkos fogadásaid vannak (nem mondod el a párodnak, barátaidnak)'),
    warningBox('Ha úgy érzed, a fogadás irányítja az életed: 📞 06-80-20-20-20 · 🌐 www.szeretem.hu'),
    divider(),

    h1('Összefoglalás: A 10 Parancsolat'),
    numbered('Soha ne fogadj saját valószínűség kiszámítása nélkül', 1),
    numbered('Mindig számítsd ki az EV-t fogadás előtt', 2),
    numbered('Bankrollodat soha ne haladja meg az 5%-os tétméret', 3),
    numbered('Vezess részletes naplót', 4),
    numbered('Ne fogadj „érzésből" — adatok alapján döntj', 5),
    numbered('Alacsony marginú irodákat használj', 6),
    numbered('Hasonlítsd össze az oddsokat több irodán', 7),
    numbered('Soha ne üsd vissza a veszteséget', 8),
    numbered('Ha 30%-ot vesztesz, állj meg és értékelj', 9),
    numbered('Mindig maradj a szórakoztató-logikai keretben — soha ne legyen megélhetési kérdés', 10),
    divider(),

    h1('Következő lépés'),
    p('A Value Betting Bibliát elolvastad. Most jöjjön a gyakorlat.'),
    h3('A TAKTIKA minden héten küld:'),
    bullet('1 ingyenes value bet elemzést — emailben'),
    bullet('Odds összehasonlítókat'),
    bullet('Taktikai és statisztikai háttérelemzéseket'),
    p('Ha még nem iratkoztál fel: **taktika.hu/hirlevel**'),
    divider(),
    new Paragraph({
      children: [new TextRun({ text: '© 2026 TAKTIKA — Prémium Magyar Sportelemzés. Minden jog fenntartva.', italics: true, color: MUTED_COLOR, size: 18 })],
      alignment: AlignmentType.CENTER
    }),
    new Paragraph({
      children: [new TextRun({ text: 'A sportfogadás kockázattal jár. 18 éven aluliaknak tilos. Játssz felelősséggel.', italics: true, color: MUTED_COLOR, size: 18 })],
      alignment: AlignmentType.CENTER
    }),
  ]

  const doc = new Document({
    creator: 'TAKTIKA',
    title: 'Value Betting Biblia',
    styles: { default: { document: { run: { font: 'Calibri', size: 22 } } } },
    sections: [{ children }]
  })
  const buf = await Packer.toBuffer(doc)
  writeFileSync(join(OUT_DIR, '04_Value_Betting_Biblia.docx'), buf)
  console.log('✓ 04_Value_Betting_Biblia.docx')
}

// ─── Doc 5: Affiliate Research ────────────────────────────────────────────────

async function buildAffiliate() {
  const children = [
    ...coverPage('Affiliate Program Kutatás & Jogi Útmutató', 'Magyar fogadóirodák · Jogi keret · Várható bevételek'),
    warningBox('Magyarországon a szerencsejáték-reklám szigorúan szabályozott. Mielőtt bármilyen affiliate linket közzéteszel, mindenképpen konzultálj jogi szakértővel, és ellenőrizd a legfrissebb Szerencsejáték Zrt. előírásokat.'),
    new Paragraph({ text: '', spacing: { before: 200 } }),
    divider(),

    h1('1. Magyar jogi keret — összefoglaló'),
    h2('A hatályos szabályozás (2023–2026)'),
    bullet('**Engedélyező hatóság:** Szerencsejáték Felügyelet (Szerencsejáték Zrt., SZVH)'),
    bullet('**Alaptörvény:** 2012. évi CXLV. törvény a szerencsejátékok szervezéséről'),
    bullet('**Reklám szabályozás:** 2008. évi XLVIII. törvény (gazdasági reklámtevékenység)'),

    h2('Amit tilos:'),
    bullet('Nem engedélyezett (külföldi, offshore) fogadóirodák reklámozása'),
    bullet('Nyerési garancia vagy biztos nyeremény kommunikálása'),
    bullet('18 év alattiak megcélzása'),
    bullet('„Fogadj most" típusú azonnali cselekvésre buzdítás nyomulósan'),
    bullet('Fogadóiroda reklám a sporttartalom MELLÉ kevert módon'),

    h2('Ami megengedett:'),
    bullet('Engedélyezett (Szerencsejáték Zrt.-nél regisztrált) irodák bemutatása'),
    bullet('Összehasonlítók, informatív tartalom az irodákról'),
    bullet('Affiliate linkek, ha a kapcsolat egyértelműen jelölve van'),
    bullet('Felelős fogadás üzenetek megjelenítése (kötelező kísérőszöveg)'),

    h2('Kötelező megjelenítés minden affiliate tartalomnál:'),
    codeBlock('"18+ | Játssz felelősséggel | www.szeretem.hu | 06-80-20-20-20"'),
    divider(),

    h1('2. Engedélyezett fogadóirodák (affiliate potenciál)'),
    h2('Tippmix Pro (Szerencsejáték Zrt.)'),
    bullet('**Típus:** Állami, 100% legális HU'),
    bullet('**Affiliate program:** Nincs hagyományos affiliate — állami szponzorációs lehetőség'),
    bullet('**Margin:** ~8–12% (magasabb mint a piaci versenytársak)'),
    bullet('**Kontextus:** Megemlíthető mint „állami, biztonságos opció" — de az odds nem a legjobbak'),

    h2('Bet365 (UK licensz, HU-ban elérhető)'),
    bullet('**Típus:** Nemzetközi, Magyarországon legálisan működő'),
    bullet('**Affiliate program:** Bet365 Affiliates (bet365affiliates.com)'),
    bullet('**CPA:** ~£100–200/befizető ügyfél · **Revenue share:** 20–35%'),
    bullet('**Margin:** ~4–5% (kedvező az olvasóknak)'),
    bullet('**Követelmény:** Minimum 5 befizető ügyfél/hó az aktív státuszhoz'),

    h2('Unibet (Kindred Group, EU licensz)'),
    bullet('**Típus:** Svéd anyacég, Magyarországon elérhető'),
    bullet('**Affiliate program:** Kindred Affiliates (kindredaffiliates.com)'),
    bullet('**Revenue share:** 25–40% · **CPA:** ~€50–100/befizető ügyfél'),
    bullet('**Margin:** ~5–6%'),
    bullet('**Különlegesség:** Responsible Gambling eszközök — TAKTIKA értékrendhez illő'),

    h2('22bet — NEM AJÁNLOTT'),
    warningBox('Curaçao licensz (nem EU/HU) — Magyar állampolgároknak kockázatos, jogi szürkezóna. Nem ajánlott TAKTIKA számára.'),

    h2('Betsson (Malta Gaming Authority, EU)'),
    bullet('**Affiliate program:** Betsson Affiliates · **Revenue share:** 25–40%'),
    bullet('**Margin:** ~4–5% (kedvező)'),
    divider(),

    h1('3. Ajánlott affiliate megközelítés'),
    h2('Mit NE csinálj:'),
    bullet('Sidebar banner hirdetések („Fogadj most a Bet365-ön!")'),
    bullet('Minden cikk végén affiliate linkek'),
    bullet('„Legjobb tippek [iroda] linkkel" típusú tartalom'),
    bullet('Kötelező felelős fogadás figyelmeztető nélküli linkek'),

    h2('Mit CSINÁLJ:'),
    bullet('**Összehasonlító oldal** (/fogadoirodak): Részletes, objektív összehasonlítás (margin, kifizetési sebesség, odds minőség)'),
    bullet('**In-article contextual:** Csak ha a cikk témájához kapcsolódik'),
    bullet('**Transzparens közlés kötelező** minden affiliate linknél (lásd szöveg alább)'),
    codeBlock('„Szponzorált link — ha ezen keresztül regisztrálsz, kis jutalékot kapunk, ami segíti a TAKTIKA működését. Az irodát mi is használjuk és objektíven értékeljük."'),

    h2('Etikus keretek — TAKTIKA brand protection:'),
    bullet('Csak olyan irodát ajánlj amit te is aktívan használsz'),
    bullet('Ha az iroda változtat (rontja az oddszt/kifizetést), frissítsd vagy vedd le'),
    bullet('Évente 1× nyilvános értékelés az ajánlott irodákról'),
    bullet('Felelős fogadás ajánló MINDEN affiliate oldalon/cikkben'),
    divider(),

    h1('4. Várható bevétel — reális becslés'),
    h2('500 havi látogató (2–3. hónap)'),
    simpleTable(
      ['Forrás', 'Részlet', 'Havi bevétel'],
      [
        ['CPA', '2–5 regisztráció × ~€80', '€160–400 (~60–150 eFt)'],
        ['Revenue share', 'Ha aktív fogadók', '+€50–150/hó'],
      ],
      [25, 45, 30]
    ),
    new Paragraph({ text: '', spacing: { before: 160 } }),
    h2('2000 havi látogató (4–6. hónap)'),
    simpleTable(
      ['Forrás', 'Részlet', 'Havi bevétel'],
      [
        ['CPA', '10–20 regisztráció × ~€80', '€800–1 600 (~300–600 eFt)'],
        ['Revenue share', 'Aktív fogadói bázis', '+€200–500/hó'],
      ],
      [25, 45, 30]
    ),
    new Paragraph({ text: '', spacing: { before: 160 } }),
    infoBox('Megjegyzés: Ezek konzervatív becslések sport/fogadás niche esetén.'),
    divider(),

    h1('5. Következő lépések — Checklist'),
    bullet('☐  Jogi konzultáció (ügyvéd, aki HU szerencsejáték reklám jogban jártas)'),
    bullet('☐  Bet365 Affiliates regisztráció és feltételek átnézése'),
    bullet('☐  Unibet/Kindred Affiliates regisztráció'),
    bullet('☐  /fogadoirodak összehasonlító oldal megírása és fejlesztése'),
    bullet('☐  Affiliate közlési szöveg véglegesítése (transzparencia)'),
    bullet('☐  Felelős fogadás oldal frissítése (affiliate kapcsolatra vonatkozó közlés)'),
    bullet('☐  Google Analytics / conversion tracking beállítása affiliate linkekre'),
    divider(),

    h1('6. Hasznos linkek'),
    bullet('Bet365 Affiliates: https://www.bet365affiliates.com'),
    bullet('Kindred Affiliates (Unibet): https://www.kindredaffiliates.com'),
    bullet('Betsson Affiliates: https://www.betssonaffiliates.com'),
    bullet('HU Szerencsejáték törvény: https://njt.hu/jogszabaly/2012-145-00-00'),
    bullet('Szerencsejáték Zrt.: https://www.szerencsejatek.hu'),
    bullet('Felelős játék HU: https://www.szeretem.hu'),
  ]

  const doc = new Document({
    creator: 'TAKTIKA',
    title: 'Affiliate Program Kutatás & Jogi Útmutató',
    styles: { default: { document: { run: { font: 'Calibri', size: 22 } } } },
    sections: [{ children }]
  })
  const buf = await Packer.toBuffer(doc)
  writeFileSync(join(OUT_DIR, '05_Affiliate_Kutatas.docx'), buf)
  console.log('✓ 05_Affiliate_Kutatas.docx')
}

// ─── Run all ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('\nGenerating Word documents...\n')
  await buildFacebook()
  await buildReels()
  await buildContentCalendar()
  await buildValueBetting()
  await buildAffiliate()
  console.log(`\nDone! Files saved to: docs/word/`)
}

main().catch(console.error)
