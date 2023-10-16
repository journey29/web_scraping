'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

type Props = {
    navItems: { label: string, href: string }[]
}

const Navigation = ({ navItems }: Props) => {
    const pathName = usePathname()
    return (
        <nav>
            <ul className='flex items-center gap-10'>
                {navItems.map(item => {
                    return <li key={item.label}>
                        <Link href={item.href} className={`${pathName === item.href ? 'font-semibold' : 'font-normal'} text-lg hover:underline`}>{item.label}</Link>
                    </li>
                })}
            </ul>
        </nav>
    )
}

export default Navigation