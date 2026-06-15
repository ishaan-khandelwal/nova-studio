import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import Script from 'next/script';

export const metadata = {
  title: 'Nova Studio | Premium Digital Agency Platform',
  description: 'Nova Studio is a modern digital agency offering premium Web Design, Front-End Development, and Brand Strategy services. Explore our portfolio and start your project with us.',
};

const themeInitScript = `
(function() {
  try {
    var t = localStorage.getItem('academy_theme') || 'theme-light';
    var valid = ['theme-light', 'theme-dark', 'theme-mint', 'theme-violet'];
    if (valid.indexOf(t) === -1) t = 'theme-light';
    document.documentElement.classList.add(t);
  } catch(e) {
    document.documentElement.classList.add('theme-light');
  }
})();
`;

export default function Root({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased scroll-smooth"
      suppressHydrationWarning={true}
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body 
        className="min-h-full flex flex-col selection:bg-[var(--selection-bg)] selection:text-[var(--selection-text)]"
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        suppressHydrationWarning={true}
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="border-t py-8 transition-all duration-300"
                style={{ borderColor: 'var(--border-primary)', color: 'var(--text-muted)' }}>
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-semibold">
            <p>&copy; {new Date().getFullYear()} Nova Studio. All rights reserved.</p>
            <Link href="/admin" className="hover:text-[var(--text-accent)] transition-colors">
              Admin Access
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
