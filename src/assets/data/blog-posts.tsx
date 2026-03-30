import type { BlogPost } from '@/components/blocks/blog-component/blog-component'

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'wembley-1953-aranycsapat',
    title: 'Az Évszázad Meccse: Magyarország–Anglia, Wembley, 1953',
    description:
      'Hat–három. Két szó, amely örökre beírta magát a sporthistória legfényesebb lapjaira. Elemzésünk azt vizsgálja, hogyan tört be az Aranycsapat a futball gondolkodásába.',
    imageUrl:
      'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Wembley Stadion esti fényözönben, teli lelátókkal',
    date: '2025. január 15.',
    publishedAt: '2025-01-15',
    category: 'Legendás Meccsek',
    author: 'Kovács Péter',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    readTime: 12,
    featured: true
  },
  {
    id: 2,
    slug: 'puskas-aranylabu-kiralyfi',
    title: 'Puskás Ferenc: Az Aranylábú Királyfi, Akit Sosem Felejtünk El',
    description:
      'Nem kapott Aranylabdát. Nem volt szüksége rá. Puskás Ferenc portréja arról szól, hogyan lett egy budapesti srácból a futball örök lelkiismerete.',
    imageUrl:
      'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Futballpálya éjszakai fényszórók alatt, teli lelátók',
    date: '2025. február 3.',
    publishedAt: '2025-02-03',
    category: 'Ikonok & Legendák',
    author: 'Németh András',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    readTime: 10,
    featured: true
  },
  {
    id: 3,
    slug: 'bl-elodonto-taktika-2025',
    title: 'BL-elődöntő taktikai elemzése: A sajtó presszingje és a tér kihasználása',
    description:
      'Miért dőlnek el a nagy meccsek az első tizenöt percben? Taktikai keretrendszerünkben szétbontjuk az elmúlt szezon legemlékezetesebb elődöntőjét.',
    imageUrl:
      'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Focisták taktikai elhelyezkedése pályán felülről nézve',
    date: '2025. március 10.',
    publishedAt: '2025-03-10',
    category: 'Aktuális Elemzések',
    author: 'Szabó Dávid',
    avatarUrl: 'https://i.pravatar.cc/150?img=15',
    readTime: 8,
    featured: true
  },
  {
    id: 4,
    slug: 'ronaldo-onteremtes',
    title: 'Cristiano Ronaldo: Az Önteremtés Históriája',
    description:
      'Madeirából Manchester, Lisszabonból Madrid — Ronaldo karrierje nem csupán sportteljesítmény, hanem a modern önfejlesztés parabolája.',
    imageUrl:
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Futballabda a zöld pályán, éles fények között',
    date: '2025. március 22.',
    publishedAt: '2025-03-22',
    category: 'Ikonok & Legendák',
    author: 'Fekete Mária',
    avatarUrl: 'https://i.pravatar.cc/150?img=47',
    readTime: 9,
    featured: false
  },
  {
    id: 5,
    slug: 'berni-donto-1954',
    title: 'Az 1954-es Berni Döntő: Egy Elveszített Mítosz Anatómiája',
    description:
      'Az „Aranycsapat" vereségét évtizedeken át feldolgozhatatlannak találta a nemzet. Mi ez a játék valójában a taktika és a pszichológia tükrében?',
    imageUrl:
      'https://images.unsplash.com/photo-1510021127601-68e27f6cd9fe?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Régi futballstadion fekete-fehér hangulatban, lelátós nézőkkel',
    date: '2025. április 5.',
    publishedAt: '2025-04-05',
    category: 'Sporttörténelem',
    author: 'Horváth Gábor',
    avatarUrl: 'https://i.pravatar.cc/150?img=17',
    readTime: 11,
    featured: false
  },
  {
    id: 6,
    slug: 'guardiola-tiki-taka',
    title: 'Guardiola és a Tiki-Taka: A Futball Taktikai Forradalma',
    description:
      'A Barcelonai laboratóriumtól a Manchester City dominanciájáig — hogyan változtatta meg Pep Guardiola örökre a profi futball gondolkodásmódját.',
    imageUrl:
      'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Futballabda közeli felvétele zöld pályán',
    date: '2025. április 18.',
    publishedAt: '2025-04-18',
    category: 'Aktuális Elemzések',
    author: 'Varga László',
    avatarUrl: 'https://i.pravatar.cc/150?img=22',
    readTime: 7,
    featured: false
  },
  {
    id: 7,
    slug: 'forma1-adatforradalom',
    title: 'A Forma–1 Adatforradalom: Hogyan Írta Újra az Analitika a Sportot',
    description:
      'A versenyszakasz már rég a boxban dől el. A modern F1 adat- és stratégiaháborújának belső világa — mérnöki és sporttörténeti szemszögből.',
    imageUrl:
      'https://images.unsplash.com/photo-1541699418592-940cdcf3a5e3?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Forma-1-es versenyautó sebességben a pályán',
    date: '2025. május 2.',
    publishedAt: '2025-05-02',
    category: 'Sporttörténelem',
    author: 'Kiss Bence',
    avatarUrl: 'https://i.pravatar.cc/150?img=25',
    readTime: 8,
    featured: false
  },
  {
    id: 8,
    slug: 'felelos-fogadas-utmutato',
    title: 'Felelős Fogadás: Valószínűség, Logika — Soha Nem Ígéret',
    description:
      'A sportfogadás lehet intellektuális gyakorlat. De csak akkor, ha tisztában vagy a kockázattal. Útmutatónk az ésszerű elemzés és a határok ismeretéről szól.',
    imageUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Statisztikai grafikonok és adatelemzés digitális kijelzőn',
    date: '2025. május 20.',
    publishedAt: '2025-05-20',
    category: 'Okos Tippek',
    author: 'Molnár Zsolt',
    avatarUrl: 'https://i.pravatar.cc/150?img=7',
    readTime: 6,
    featured: false
  },
  {
    id: 9,
    slug: 'liverpool-istanbul-2005',
    title: 'Istanbul, 2005: A Három Félidős Csoda, Amit Nem Lehetett Megírni',
    description:
      'Háromgólos hátrányból BL-győzelem — a Liverpool vs AC Milan döntő máig a sport irracionális lelkének legtisztább bizonyítéka.',
    imageUrl:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Futballisták ünneplése, stadion ünnepi fényözönben',
    date: '2025. június 8.',
    publishedAt: '2025-06-08',
    category: 'Legendás Meccsek',
    author: 'Kovács Péter',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    readTime: 10,
    featured: false
  },
  {
    id: 10,
    slug: 'odds-ertek-fogadas',
    title: 'Odds és Érték: Hogyan Gondolkodik Egy Okos Fogadó?',
    description:
      'Az értékfogadás nem szerencsejáték — gondolkodásmód. Megmutatjuk, mikor kínál az oddsz valódi matematikai előnyt, és mikor csak illúziót.',
    imageUrl:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Pénzügyi grafikonok és számok elemzése laptopon',
    date: '2025. június 22.',
    publishedAt: '2025-06-22',
    category: 'Okos Tippek',
    author: 'Molnár Zsolt',
    avatarUrl: 'https://i.pravatar.cc/150?img=7',
    readTime: 7,
    featured: false
  },
  {
    id: 11,
    slug: 'messi-zsenialitas-anatomia',
    title: 'Messi Zsenialitásának Anatómiája: Mit Lát Ő, Amit Mi Nem?',
    description:
      'A kognitív tudomány és a futball-analitika metszéspontján: miért csinál Messi olyan döntéseket, amelyek csak utólag tűnnek nyilvánvalónak?',
    imageUrl:
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Futballcipők közelről, a pálya széle mentén',
    date: '2025. július 10.',
    publishedAt: '2025-07-10',
    category: 'Ikonok & Legendák',
    author: 'Fekete Mária',
    avatarUrl: 'https://i.pravatar.cc/150?img=47',
    readTime: 11,
    featured: false
  },
  {
    id: 12,
    slug: 'pressing-forradalom-klopp',
    title: 'A Pressing Forradalom: Klopp és a Gegenpressing Mögötti Logika',
    description:
      'Hogyan alakított át Jürgen Klopp két évtized alatt egy kevéssé ismert taktikai elvet a modern futball egyik legmásolt rendszerévé?',
    imageUrl:
      'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Futballisták intenzív pressen alapuló taktikai helyzetben',
    date: '2025. augusztus 3.',
    publishedAt: '2025-08-03',
    category: 'Aktuális Elemzések',
    author: 'Szabó Dávid',
    avatarUrl: 'https://i.pravatar.cc/150?img=15',
    readTime: 9,
    featured: false
  },
  {
    id: 13,
    slug: 'israel-adesanya-ufc-kozepsulyu',
    title: 'Israel Adesanya: A Modern Kor UFC Középsúlyú Mestere',
    description:
      'A nigériai–új-zélandi kick-box virtuóz hogyan hódította meg a ketrecet? Az UFC középsúlyának modern királyáról — stílusáról, stratégiájáról és örökségéről.',
    imageUrl:
      'https://images.unsplash.com/photo-1681203888755-bd61fe3558eb?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'MMA harcos mellkasi közelkép bokszolókesztyűben — az állóharc megtestesítője, akárcsak Adesanya',
    date: '2026. március 30.',
    publishedAt: '2026-03-30',
    category: 'Ikonok & Legendák',
    author: 'Varga László',
    avatarUrl: 'https://i.pravatar.cc/150?img=22',
    readTime: 11,
    featured: false
  },
  {
    id: 14,
    slug: 'deportivo-la-coruna-tortenete',
    title: 'Deportivo La Coruña: A Galíciai Álom Tündöklése és Hanyatlása',
    description:
      'Egyszer megverték a Real Madridat a Bernabéuban, BL-elődöntőt játszottak és spanyol bajnokok lettek. A tündöklés és az utána jövő sötétség históriája.',
    imageUrl:
      'https://images.unsplash.com/photo-1549923015-badf41b04831?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Légi felvétel focistadionról nappal — teli lelátókkal, zöld gyeppel',
    date: '2026. március 30.',
    publishedAt: '2026-03-30',
    category: 'Sporttörténelem',
    author: 'Horváth Gábor',
    avatarUrl: 'https://i.pravatar.cc/150?img=17',
    readTime: 13,
    featured: false
  },
  {
    id: 15,
    slug: 'michael-jordan-23xi-nascar',
    title: 'Michael Jordan és a 23XI: Hogyan Hódítja Meg az NBA Legendája a NASCAR-t',
    description:
      'A hatszoros NBA-bajnok üzleti stratégiai gondolkodása a NASCAR Cup Seriesben: Jordan és Denny Hamlin csapata, a 23XI megdöbbentő felemelkedése.',
    imageUrl:
      'https://images.unsplash.com/photo-1579987323085-529f1a806810?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'NASCAR versenyautó pit stop közben a Daytona 500-on',
    date: '2026. március 30.',
    publishedAt: '2026-03-30',
    category: 'Aktuális Elemzések',
    author: 'Kiss Bence',
    avatarUrl: 'https://i.pravatar.cc/150?img=25',
    readTime: 9,
    featured: false
  }
]
