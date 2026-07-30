import './globals.css';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import { AuthProvider } from '../lib/auth-context';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'HealthBD - Find Doctors, Hospitals & Treatment Costs in Bangladesh',
  description: 'HealthBD connects patients with top doctors, specialist consultants, certified hospitals, and medical treatment cost estimates in Bangladesh.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`scroll-smooth ${plusJakartaSans.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased font-sans">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
