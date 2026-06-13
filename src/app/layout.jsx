import './globals.css'

export default function Root() {
    return (
        <html
            lang="en"
            className="h-full antialiased scroll-smooth"
            suppressHydrationWarning={true}
        >
            <head>
                {/* Theme initialiser – runs before React hydration to prevent flash */}
                <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
            </head>
            <body className={`min-h-full flex flex-col selection:bg-[var(--selection-bg)] selection:text-[var(--selection-text)]`}
                style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                suppressHydrationWarning={true}
            >
            </body>
        </html>
    );
}
