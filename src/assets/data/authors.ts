export type Author = {
  id: number
  slug: string
  name: string
  avatarUrl: string
  role: string
  bio: string
  specialties: string[]
}

export const authors: Author[] = [
  {
    id: 1,
    slug: 'kovacs-peter',
    name: 'Kovács Péter',
    avatarUrl: '/images/avatars/8.webp',
    role: 'Vezető elemző',
    bio: 'Kovács Péter a magyar futballtörténelem elismert kutatója. Több mint 15 éve foglalkozik a labdarúgás taktikai és történelmi aspektusaival. Az Aranycsapat korszakának egyik legelmélyültebb ismerője.',
    specialties: ['Legendás Meccsek', 'Sporttörténelem']
  },
  {
    id: 2,
    slug: 'nemeth-andras',
    name: 'Németh András',
    avatarUrl: '/images/avatars/1.webp',
    role: 'Portré szerkesztő',
    bio: 'Németh András sportújságíróként kezdte pályafutását, ma a kiemelkedő sportoló-portrék írásának mestere. Stílusára a líraiság és a mélylélektani megközelítés jellemző.',
    specialties: ['Ikonok & Legendák']
  },
  {
    id: 3,
    slug: 'szabo-david',
    name: 'Szabó Dávid',
    avatarUrl: '/images/avatars/4.webp',
    role: 'Taktikai elemző',
    bio: 'Szabó Dávid UEFA Pro licences edző és sportanalitikus. Az edzőpálya és az újságírás határán mozog: cikkei egyaránt szólnak a futball rajongóinak és a szakembereknek.',
    specialties: ['Aktuális Elemzések']
  },
  {
    id: 4,
    slug: 'fekete-maria',
    name: 'Fekete Mária',
    avatarUrl: '/images/avatars/2.webp',
    role: 'Sporttörténész',
    bio: 'Fekete Mária sporttörténészként a modern labdarúgás szociológiai és kulturális vetületeit vizsgálja. Különleges figyelmet fordít a sport és az identitás kapcsolatára.',
    specialties: ['Ikonok & Legendák', 'Sporttörténelem']
  },
  {
    id: 5,
    slug: 'horvath-gabor',
    name: 'Horváth Gábor',
    avatarUrl: '/images/avatars/7.webp',
    role: 'Történelmi rovatvezető',
    bio: 'Horváth Gábor a sportpszichológia és a játékelmélet metszéspontján dolgozik. Cikkei a nagy meccsek mélystruktúráit tárják fel, a taktikától a mentális dimenziókig.',
    specialties: ['Sporttörténelem', 'Legendás Meccsek']
  },
  {
    id: 6,
    slug: 'varga-laszlo',
    name: 'Varga László',
    avatarUrl: '/images/avatars/6.webp',
    role: 'Elemzés rovatvezető',
    bio: 'Varga László adatelemző és taktikai tanácsadó, aki a modern labdarúgás statisztikai forradalma előtt és után egyaránt otthonosan mozog. A szám mögötti logikát keresi.',
    specialties: ['Aktuális Elemzések', 'Okos Tippek']
  },
  {
    id: 7,
    slug: 'kiss-bence',
    name: 'Kiss Bence',
    avatarUrl: '/images/avatars/3.webp',
    role: 'Multisport szerkesztő',
    bio: 'Kiss Bence a motorsport és az adatelemzés határán dolgozik. A Forma–1 stratégiai forradalmának egyik legalaposabb hazai ismerője, de a többi motorsport-sorozatban is otthon van.',
    specialties: ['Sporttörténelem']
  },
  {
    id: 8,
    slug: 'molnar-zsolt',
    name: 'Molnár Zsolt',
    avatarUrl: '/images/avatars/5.webp',
    role: 'Felelős fogadás szerkesztő',
    bio: 'Molnár Zsolt valószínűségszámítással és viselkedési közgazdaságtannal foglalkozó szakember. Célja, hogy a sportfogadást intellektuális diszciplínaként mutassa be — nem ígéretekkel, hanem eszközökkel.',
    specialties: ['Okos Tippek']
  }
]
