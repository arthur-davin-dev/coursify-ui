import { Inter, Outfit } from 'next/font/google';

// Primary font for body text
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter', // CSS variable name
});

// Stylized font for headings (similar to your image)
export const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});