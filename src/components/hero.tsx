import { HeroContent } from './hero-content'
import { Plasma } from './plasma'

export function Hero({ name, line }: { name: string; line: string }) {
    return (
        <section className="relative h-dvh overflow-hidden bg-paper text-ink">
            <div className="absolute w-full h-[50%] mx-auto bg-linear-to-b from-teal-700 to-transparent mask-[linear-gradient(to_bottom,black_1%,transparent_100%)]">
                <Plasma />
            </div>
            <HeroContent name={name} line={line} />
        </section>
    )
}
