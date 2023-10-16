'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";

const Button = () => {
    const pathName = usePathname();

    return (
        pathName !== '/products' && (
            <button className='bg-gray-200 hover:bg-blue-700 hover:text-white text-black font-semibold py-4 px-6 rounded mt-4 ease-in duration-200'>
                <Link href='/products'>See More</Link>
            </button>
        )
    );
};

export default Button;