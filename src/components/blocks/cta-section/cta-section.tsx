import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const CTA = () => {
  return (
    <section className='bg-muted py-8 sm:py-16 lg:py-20' id='szerkesztosegi-elvek'>
      <div className='container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
        <Card className='shadow-none'>
          <CardContent>
            <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
              {/* Left Column - Image */}
              <div className='relative h-64 sm:h-80 lg:h-auto'>
                <img
                  src='/images/cta.webp'
                  alt='Szerkesztőségi irodánk'
                  className='h-full w-full rounded-lg object-cover'
                />
              </div>

              {/* Right Column - Editorial credibility */}
              <Card className='bg-muted rounded-lg border-0 shadow-none'>
                <CardContent className='flex h-full flex-col justify-between gap-6'>
                  <div>
                    <p className='text-muted-foreground mb-3 text-xs font-medium uppercase tracking-[0.2em]'>
                      Szerkesztőségi elvek
                    </p>
                    <h2 className='text-foreground text-xl leading-snug font-bold tracking-tight lg:text-2xl'>
                      Ez az oldal nem portál. Nem hírfolyam. Nem reklámprojekt.
                    </h2>
                  </div>

                  <div className='space-y-4'>
                    <p className='text-muted-foreground text-base leading-relaxed'>
                      A TAKTIKA olyan, mint egy intelligens magyar sportmagazin: mélyelemzések, hosszú formátumú
                      portrék, taktikai értékelések és felelős fogadási útmutatók — nem szenzáció, hanem substancia.
                    </p>
                    <p className='text-muted-foreground text-base leading-relaxed'>
                      Minden szöveg szerkesztői ellenőrzésen megy át. Nem ígérünk profitot, nem adunk „biztos
                      tippet" — de gondolkodásra késztetünk, és megadjuk az eszközöket a saját ítéletalkotáshoz.
                    </p>
                  </div>

                  <div>
                    <Separator className='mb-4 opacity-40' />
                    <p className='text-muted-foreground text-xs leading-relaxed'>
                      <strong className='text-foreground'>Felelős fogadás:</strong> A sportfogadás kockázattal jár.
                      A 18 éven aluliaknak tilos. Ha úgy érzed, hogy a fogadás problémává vált, kérj segítséget:
                      szerencsejáték-függőség ellen küzdő szervezetek elérhetők Magyarországon.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default CTA
