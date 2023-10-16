import Link from "next/link"
import Navigation from "./Navigation"

const navItems = [
    { label: "Instructions", href: "/instructions" },
    { label: "Products", href: "/products" }
]

const Header = () => {
    return (
        <header className='p-5 sticky top-0 z-50 bg-gray-50'>
            <div className='flex flex-col gap-5 sm:flex-row sm:gap-0 items-center justify-between max-w-7xl mx-auto'>
                <Link className='text-blue-600 font-bold text-3xl' href="/">Scraper</Link>
                <Navigation navItems={navItems} />
            </div>
        </header>
    )
}

export default Header