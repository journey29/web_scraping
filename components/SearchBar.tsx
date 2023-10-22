'use client'

import { scrapeProduct } from "@/lib/actions";
import { FormEvent, useState } from "react";
import SearchShop from "./SearchShop";
import Image from "next/image";

const SearchBar = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [selectedShop, setSelectedShop] = useState('')

    const isValidProductURL = () => {
        try {
            const parsedUrl = new URL(searchValue);
            const hostName = parsedUrl.hostname

            if (hostName.includes(`${selectedShop}.com`) || hostName.includes(`${selectedShop}.`) || hostName.endsWith(selectedShop)) {
                return true
            }
            setError(`Enter a valid URL. You have selected a store: ${selectedShop.toUpperCase()}`)
        } catch (err) {
            setError('Invalid URL. Please enter a valid URL.');
            return false
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSearchValue('')
        setError(null);

        if (selectedShop === '') {
            setError('Please select a store')
            return;
        }

        if (isValidProductURL()) {
            try {
                setIsLoading(true);
                const product = await scrapeProduct(searchValue, selectedShop);
            } catch (err: any) {
                setError('Failed to load your product. Try again')
            } finally {
                setIsLoading(false)
            }
        }
    };
    return (
        <div className="flex gap-5">
            <SearchShop selectedShop={selectedShop} setSelectedShop={setSelectedShop} />
            <form onSubmit={handleSubmit} className="flex flex-col items-end w-full">
                <input className='w-full h-[48px] p-4 rounded-full max-sm:rounded-full bg-gray-100 outline-none cursor-pointer text-sm mb-3'
                    type="text"
                    name='search'
                    placeholder='Enter the URL'
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)} />
                <button className={` rounded-lg px-4 py-3 text-white ${isLoading ? 'bg-gray-400' : 'bg-black '}`} type='submit' disabled={isLoading}>
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
                {error && <div className="flex items-start gap-2 mt-4">
                    <Image src="/assets/icons/warning.png" alt="warning" width={16} height={16} className="object-contain" />
                    <p className="text-md">{error}</p>
                </div>
                }
            </form>
        </div>
    )
}

export default SearchBar