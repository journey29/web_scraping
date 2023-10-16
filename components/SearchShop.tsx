'use client'
import { Fragment, useState } from "react"
import { Combobox, Transition } from "@headlessui/react"
import Image from "next/image"
import { capitalizeFirstLetter } from "@/lib/utils"

type Props = {
    setSelectedShop: (shop: string) => void,
    selectedShop: string
}
const possibleShops = ['amazon', 'prom', 'olx']

const SearchShop = ({ selectedShop, setSelectedShop }: Props) => {
    const [searchValue, setSearchValue] = useState('')

    const filteredShops =
        searchValue === ''
            ? possibleShops
            : possibleShops.filter(shop => shop.toLowerCase().includes(searchValue.toLowerCase()));

    return (
        <>
            <div className="max-w-sm w-full flex flex-col items-start">
                <Combobox onChange={setSelectedShop} value={selectedShop}>
                    <div className="relative w-full">
                        <Combobox.Button className="absolute top-[10px] left-[5px]">
                            <Image src="/assets/icons/magnifying-glass.svg" alt="search" width={30} height={30} />
                        </Combobox.Button>
                        <Combobox.Input
                            className="w-full h-[48px] pl-12 p-4 rounded-full max-sm:rounded-full bg-gray-100 outline-none cursor-pointer text-sm"
                            placeholder="Select the store"
                            displayValue={(searchValue: string) => searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                        />
                    </div>
                    <Transition as={Fragment}
                        leave='transition ease-in duration-100'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        afterLeave={() => setSearchValue('')}
                        show={searchValue.length > 0}
                    >
                        <Combobox.Options className="mt-3">
                            {filteredShops.map(shop => {
                                return <Combobox.Option
                                    key={shop}
                                    value={shop}
                                    className={({ active }) => `
                                    relative cursor-pointer select-none py-3 px-8 rounded-lg text-left
                                    ${active ? 'bg-blue-600 text-white' : 'text-gray-900'}`}>
                                    {({ selected, active }) => (
                                        <>
                                            <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                                {capitalizeFirstLetter(shop)}
                                            </span>
                                            {selected ? (
                                                <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : " text-purple-400"}`}
                                                ></span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            })
                            }
                        </Combobox.Options>
                    </Transition>
                </Combobox>

            </div>
        </>

    )
}

export default SearchShop