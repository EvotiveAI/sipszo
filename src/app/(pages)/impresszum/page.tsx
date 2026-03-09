import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShieldCheckIcon, BookOpenIcon, UsersIcon, AlertTriangleIcon } from 'lucide-react'
import { authors } from '@/assets/data/authors'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

export const metadata = {
  title: 'Impresszum | TAKTIKA',
  description: 'A TAKTIKA kiadói adatai, szerkesztőségi elvek és jogi információk.'
}

const ImpresszumPage = () => {
  return (
    <div className='mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8'>
      {/* Header */}
      <div className='mb-12 space-y-3'>
        <p className='text-muted-foreground text-xs font-medium uppercase tracking-[0.22em]'>Átláthatóság</p>
        <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>Impresszum</h1>
        <p className='text-muted-foreground max-w-2xl text-lg'>
          Kik vagyunk, mit csinálunk, és milyen elvek mentén — nyíltan és felelősen.
        </p>
        <Separator className='mt-6 max-w-24 opacity-40' />
      </div>

      <div className='space-y-10'>
        {/* Kiadói adatok */}
        <section className='space-y-4'>
          <h2 className='flex items-center gap-2 text-xl font-bold'>
            <BookOpenIcon className='text-primary size-5' />
            Kiadói adatok
          </h2>
          <Card className='shadow-none'>
            <CardContent className='grid gap-3 p-6 text-sm sm:grid-cols-2'>
              {[
                ['Lap neve', 'TAKTIKA — Prémium Magyar Sportelemzés'],
                ['Kiadó', 'ImHere2bet Média Kft.'],
                ['Székhely', 'Budapest, Magyarország'],
                ['Alapítva', '2025'],
                ['Felelős szerkesztő', 'Szabó Dárió'],
                ['Kapcsolat', 'szerkesztoseg@taktika.hu']
              ].map(([label, value]) => (
                <div key={label} className='space-y-0.5'>
                  <p className='text-muted-foreground text-xs uppercase tracking-wide'>{label}</p>
                  <p className='text-foreground font-medium'>{value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Szerkesztőség */}
        <section className='space-y-4'>
          <h2 className='flex items-center gap-2 text-xl font-bold'>
            <UsersIcon className='text-primary size-5' />
            Szerkesztőség
          </h2>
          <div className='grid gap-3 sm:grid-cols-2'>
            {authors.map(author => (
              <Link key={author.id} href={`/szerzo/${author.slug}`}>
                <Card className='group cursor-pointer shadow-none transition-colors hover:bg-muted/50'>
                  <CardContent className='flex items-center gap-3 p-4'>
                    <Avatar className='size-10'>
                      <AvatarImage src={author.avatarUrl} alt={author.name} />
                      <AvatarFallback>{author.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='text-foreground text-sm font-semibold group-hover:text-primary transition-colors'>
                        {author.name}
                      </p>
                      <p className='text-muted-foreground text-xs'>{author.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Szerkesztőségi elvek */}
        <section className='space-y-4'>
          <h2 className='flex items-center gap-2 text-xl font-bold'>
            <ShieldCheckIcon className='text-primary size-5' />
            Szerkesztőségi elvek
          </h2>
          <Card className='shadow-none'>
            <CardContent className='space-y-4 p-6 text-sm leading-relaxed'>
              <p className='text-muted-foreground'>
                A TAKTIKA független magyar sportelemző magazin. Nem portál, nem hírfolyam, nem reklámprojekt.
                Célunk az elmélyült, analitikai sportírás — a szenzációhajhászás és a gyorshírek helyett.
              </p>
              <p className='text-muted-foreground'>
                Minden megjelent cikk szerkesztői ellenőrzésen megy át. Szerzőink valódi szakemberek:
                edzők, sporttörténészek, adatelemzők és újságírók. Soha nem közlünk fizetett tartalmakat szerkesztői
                jelölés nélkül.
              </p>
              <p className='text-muted-foreground'>
                Pontosságra, pártatlanságra és mélységre törekszünk. Ha hibát találsz valamelyik cikkünkben,
                kérjük jelezd szerkesztőségünknek — kijavítjuk, és feltüntetjük a korrekciót.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Felelős fogadás */}
        <section className='space-y-4'>
          <h2 className='flex items-center gap-2 text-xl font-bold'>
            <AlertTriangleIcon className='text-amber-500 size-5' />
            Felelős fogadás
          </h2>
          <Card className='border-amber-200 bg-amber-50/50 shadow-none dark:border-amber-900/30 dark:bg-amber-900/10'>
            <CardContent className='space-y-4 p-6 text-sm leading-relaxed'>
              <div className='flex flex-wrap gap-2'>
                <Badge className='bg-amber-500/20 text-amber-700 border-0 dark:text-amber-400'>18+</Badge>
                <Badge className='bg-amber-500/20 text-amber-700 border-0 dark:text-amber-400'>Játssz felelősséggel</Badge>
              </div>
              <p className='text-muted-foreground'>
                <strong className='text-foreground'>A TAKTIKA nem tippszolgálat.</strong> Nem ígérünk nyerő
                fogadásokat, nem garantálunk profitot, és nem biztatunk senkit arra, hogy fogadjon. Cikkeink
                oktatási és elemzési célt szolgálnak.
              </p>
              <p className='text-muted-foreground'>
                A sportfogadás kockázattal jár, és addiktív lehet. A 18 éven aluliak számára tilos.
                Ha úgy érzed, hogy a fogadás problémává vált számodra vagy szeretteid számára, kérj segítséget.
              </p>
              <div className='rounded-lg bg-amber-100/50 p-4 dark:bg-amber-900/20'>
                <p className='text-muted-foreground text-xs'>
                  <strong className='text-foreground'>Szerencsejáték-függőség segélyvonal (Magyarország):</strong>
                  {' '}A Nemzeti Egészségügyi Alap és az Anonim Szerencsejátékosok szervezete ingyenes segítséget
                  nyújt. Tel: 06-80-20-20-20
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Jogi nyilatkozat */}
        <section className='space-y-3'>
          <Separator className='opacity-40' />
          <p className='text-muted-foreground text-xs leading-relaxed'>
            © {new Date().getFullYear()} TAKTIKA — Prémium Magyar Sportelemzés. Minden jog fenntartva.
            Az oldalon megjelent tartalmak szerzői jogi védelem alatt állnak. A cikkek vagy azok részeinek
            engedély nélküli másolása, terjesztése tilos. Az oldalon szereplő külső linkekért felelősséget
            nem vállalunk.
          </p>
        </section>
      </div>
    </div>
  )
}

export default ImpresszumPage
