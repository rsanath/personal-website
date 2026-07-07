'use client'

function toggleTheme() {
    const root = document.documentElement
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    root.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
}

export function ThemeToggle() {
    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="fixed bg-white/50 dark:bg-black/50 top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full cursor-pointer active:scale-95"
        >
            <SunIcon className="hidden dark:block" />
            <MoonIcon className="block dark:hidden" />
        </button>
    )
}

function SunIcon({ className }: { className?: string }) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
            className={className}
        >
            <circle
                cx="9"
                cy="9"
                r="3.5"
                stroke="currentColor"
                strokeWidth="1.4"
            />
            <path
                d="M9 1.5V3M9 15v1.5M16.5 9H15M3 9H1.5M14.3 3.7l-1 1M4.7 13.3l-1 1M14.3 14.3l-1-1M4.7 4.7l-1-1"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
            />
        </svg>
    )
}

function MoonIcon({ className }: { className?: string }) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
            className={className}
        >
            <path
                d="M15.5 10.4A6.5 6.5 0 1 1 7.6 2.5a5.2 5.2 0 0 0 7.9 7.9Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
            />
        </svg>
    )
}
