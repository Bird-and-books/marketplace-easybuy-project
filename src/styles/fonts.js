import { Inter, DM_Sans, Zen_Dots } from 'next/font/google';


export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm',
  display: 'swap',
});

export const zenDots = Zen_Dots({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-zen',
  display: 'swap',
});
