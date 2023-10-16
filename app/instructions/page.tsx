import React from 'react'

const Instructions = () => {
    return (
        <div className='mt-20'>
            <h1 className='font-bold text-4xl mb-8'>How to use this service?</h1>
            <ul className='list-decimal flex flex-col gap-5 pl-5'>
                <li className='font-medium text-lg'>
                    Select the store
                </li>
                <li className='font-medium text-lg'>
                    Go the store and choose a product
                </li>
                <li className='font-medium text-lg'>
                    Copy link of the product and go back
                </li>
                <li className='font-medium text-lg'>Paste the link into the appropriate field</li>
                <li className='font-medium text-lg'>Collect the products you are interested in and subscribe to control the price</li>
            </ul>
        </div>
    )
}

export default Instructions