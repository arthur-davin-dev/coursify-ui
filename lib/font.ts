import { Kantumruy_Pro } from 'next/font/google';

export const kantumruyPro = Kantumruy_Pro({
  subsets: ['khmer'],
  weight: ['100', '300', '400', '700'], // Choose the weights you need
  variable: '--font-kantumruy', // Define a CSS variable
  display: 'swap',
});