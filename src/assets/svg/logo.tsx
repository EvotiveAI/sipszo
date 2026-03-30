import Image from 'next/image'

const LogoSvg = () => {
  return (
    <Image
      src='/logo/ujkorkapcsolaslogo.png'
      alt='Körkapcsolás logo'
      width={44}
      height={44}
      className='object-contain'
      priority
    />
  )
}

export default LogoSvg
