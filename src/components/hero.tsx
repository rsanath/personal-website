import { HeroContent } from './hero-content'
import { Plasma } from './plasma'

export function Hero({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <section className="relative h-dvh overflow-hidden bg-background text-foreground">
            <div className="absolute w-full h-[50%] mx-auto bg-linear-to-b dark:from-teal-700 from-teal-600 to-transparent mask-[linear-gradient(to_bottom,black_1%,transparent_100%)]">
                <Plasma />
            </div>
            <HeroContent name={title} line={subtitle} />
        </section>
    )
}
