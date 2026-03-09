import type { BlogPost } from '@/components/blocks/blog-component/blog-component'

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'scalable-code',
    title: 'Az Évszázad Meccse: Magyarország–Anglia, Wembley, 1953',
    description:
      'Hat–három. Két szó, amely örökre beírta magát a sporthistória legfényesebb lapjaira. Elemzésünk azt vizsgálja, hogyan tört be az Aranycsapat a futball gondolkodásába.',
    imageUrl: '/images/blog-post/post-8.webp',
    imageAlt: 'Wembley Stadion, 1953',
    date: '2025. január 15.',
    category: 'Legendás Meccsek',
    author: 'Kovács Péter',
    avatarUrl: '/images/avatars/8.webp',
    readTime: 12,
    featured: true
  },
  {
    id: 2,
    slug: 'ai-driven-workflows',
    title: 'Puskás Ferenc: Az Aranylábú Királyfi, Akit Sosem Felejtünk El',
    description:
      'Nem kapott Aranylabdát. Nem volt szüksége rá. Puskás Ferenc portréja arról szól, hogyan lett egy budapesti srácból a futball örök lelkiismerete.',
    imageUrl: '/images/blog-post/post-7.webp',
    imageAlt: 'Puskás Ferenc portré',
    date: '2025. február 3.',
    category: 'Ikonok & Legendák',
    author: 'Németh András',
    avatarUrl: '/images/avatars/1.webp',
    readTime: 10,
    featured: true
  },
  {
    id: 3,
    slug: 'product-launch-checklist',
    title: 'BL-elődöntő taktikai elemzése: A sajtó presszingje és a tér kihasználása',
    description:
      'Miért dőlnek el a nagy meccsek az első tizenöt percben? Taktikai keretrendszerünkben szétbontjuk az elmúlt szezon legemlékezetesebb elődöntőjét.',
    imageUrl: '/images/blog-post/post-2.webp',
    imageAlt: 'Taktikai tábla elemzés',
    date: '2025. március 10.',
    category: 'Aktuális Elemzések',
    author: 'Szabó Dávid',
    avatarUrl: '/images/avatars/4.webp',
    readTime: 8,
    featured: false
  },
  {
    id: 4,
    slug: 'empathy-driven-design',
    title: 'Cristiano Ronaldo: Az Önteremtés Históriája',
    description:
      'Madeirából Manchester, Lisszabonból Madrid — Ronaldo karrierje nem csupán sportteljesítmény, hanem a modern önfejlesztés parabolája.',
    imageUrl: '/images/blog-post/post-3.webp',
    imageAlt: 'Cristiano Ronaldo portré',
    date: '2025. március 22.',
    category: 'Ikonok & Legendák',
    author: 'Fekete Mária',
    avatarUrl: '/images/avatars/2.webp',
    readTime: 9,
    featured: false
  },
  {
    id: 5,
    slug: 'scaling-design-component-system',
    title: 'Az 1954-es Berni Döntő: Egy Elveszített Mítosz Anatómiája',
    description:
      'Az „Aranycsapat" vereségét évtizedeken át feldolgozhatatlannak találta a nemzet. Mi ez a játék valójában a taktika és a pszichológia tükrében?',
    imageUrl: '/images/blog-post/post-4.webp',
    imageAlt: 'Berni döntő, 1954',
    date: '2025. április 5.',
    category: 'Sporttörténelem',
    author: 'Horváth Gábor',
    avatarUrl: '/images/avatars/7.webp',
    readTime: 11,
    featured: false
  },
  {
    id: 6,
    slug: 'user-behavior-design',
    title: 'Guardiola és a Tiki-Taka: A Futball Taktikai Forradalma',
    description:
      'A Barcelonai laboratóriumtól a Manchester City dominanciájáig — hogyan változtatta meg Pep Guardiola örökre a profi futball gondolkodásmódját.',
    imageUrl: '/images/blog-post/post-1.webp',
    imageAlt: 'Taktikai futballelemzés',
    date: '2025. április 18.',
    category: 'Aktuális Elemzések',
    author: 'Varga László',
    avatarUrl: '/images/avatars/6.webp',
    readTime: 7,
    featured: false
  },
  {
    id: 7,
    slug: 'fast-apps-blueprint',
    title: 'A Forma–1 Adatforradalom: Hogyan Írta Újra az Analitika a Sportot',
    description:
      'A versenyszakasz már rég a boxban dől el. A modern F1 adat- és stratégiaháborújának belső világa — mérnöki és sporttörténeti szemszögből.',
    imageUrl: '/images/blog-post/post-5.webp',
    imageAlt: 'Forma-1 stratégia',
    date: '2025. május 2.',
    category: 'Sporttörténelem',
    author: 'Kiss Bence',
    avatarUrl: '/images/avatars/3.webp',
    readTime: 8,
    featured: false
  },
  {
    id: 8,
    slug: 'product-kpis-tracking',
    title: 'Felelős Fogadás: Valószínűség, Logika — Soha Nem Ígéret',
    description:
      'A sportfogadás lehet intellektuális gyakorlat. De csak akkor, ha tisztában vagy a kockázattal. Útmutatónk az ésszerű elemzés és a határok ismeretéről szól.',
    imageUrl: '/images/blog-post/post-6.webp',
    imageAlt: 'Statisztikai elemzés',
    date: '2025. május 20.',
    category: 'Okos Tippek',
    author: 'Molnár Zsolt',
    avatarUrl: '/images/avatars/5.webp',
    readTime: 6,
    featured: false
  },
  {
    id: 9,
    slug: 'liverpool-istanbul-2005',
    title: 'Istanbul, 2005: A Három Félidős Csoda, Amit Nem Lehetett Megírni',
    description:
      'Háromgólos hátrányból BL-győzelem — a Liverpool vs AC Milan döntő máig a sport irracionális lelkének legtisztább bizonyítéka.',
    imageUrl: '/images/blog-post/post-1.webp',
    imageAlt: 'Istanbul 2005, Bajnokok Ligája döntő',
    date: '2025. június 8.',
    category: 'Legendás Meccsek',
    author: 'Kovács Péter',
    avatarUrl: '/images/avatars/8.webp',
    readTime: 10,
    featured: false
  },
  {
    id: 10,
    slug: 'odds-ertek-fogadas',
    title: 'Odds és Érték: Hogyan Gondolkodik Egy Okos Fogadó?',
    description:
      'Az értékfogadás nem szerencsejáték — gondolkodásmód. Megmutatjuk, mikor kínál az oddsz valódi matematikai előnyt, és mikor csak illúziót.',
    imageUrl: '/images/blog-post/post-6.webp',
    imageAlt: 'Odds elemzés fogadás',
    date: '2025. június 22.',
    category: 'Okos Tippek',
    author: 'Molnár Zsolt',
    avatarUrl: '/images/avatars/5.webp',
    readTime: 7,
    featured: false
  },
  {
    id: 11,
    slug: 'messi-zsenialitas-anatomia',
    title: 'Messi Zsenialitásának Anatómiája: Mit Lát Ő, Amit Mi Nem?',
    description:
      'A kognitív tudomány és a futball-analitika metszéspontján: miért csinál Messi olyan döntéseket, amelyek csak utólag tűnnek nyilvánvalónak?',
    imageUrl: '/images/blog-post/post-3.webp',
    imageAlt: 'Lionel Messi portré',
    date: '2025. július 10.',
    category: 'Ikonok & Legendák',
    author: 'Fekete Mária',
    avatarUrl: '/images/avatars/2.webp',
    readTime: 11,
    featured: false
  },
  {
    id: 12,
    slug: 'pressing-forradalom-klopp',
    title: 'A Pressing Forradalom: Klopp és a Gegenpressing Mögötti Logika',
    description:
      'Hogyan alakított át Jürgen Klopp két évtized alatt egy kevéssé ismert taktikai elvet a modern futball egyik legmásolt rendszerévé?',
    imageUrl: '/images/blog-post/post-2.webp',
    imageAlt: 'Gegenpressing taktikai elemzés',
    date: '2025. augusztus 3.',
    category: 'Aktuális Elemzések',
    author: 'Szabó Dávid',
    avatarUrl: '/images/avatars/4.webp',
    readTime: 9,
    featured: false
  }
]
