import type { Metadata } from 'next'
import KezdoknenClient from './kezdoknek-client'

export const metadata: Metadata = {
  title: 'Kezdőknek | Körkapcsolás',
  description:
    'Fedezd fel a sportokat! Minden, amit tudni kell az NFL-ről, NASCAR-ról, UFC-ről, NBA-ről, teniszről, dartsról és kerékpározásról — érthetően, érdekesen.'
}

const KezdoknenPage = () => {
  return <KezdoknenClient />
}

export default KezdoknenPage
