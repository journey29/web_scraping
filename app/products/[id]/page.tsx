import Modal from '@/components/Modal'
import ZoomImage from '@/components/ZoomImage'
import { getProductById } from '@/lib/actions'
import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
    params: {
        id: string
    }
}

const ProductDetails = async ({ params: { id } }: Props) => {
    const product: Product = await getProductById(id)
    return (
        <div className='flex items-center mt-20 flex-col text-center sm:text-start sm:flex-row gap-9'>
            <ZoomImage imageUrl={product.imageUrl} />
            <div className='flex flex-col max-w-sm sm:max-w-lg w-full'>
                <div className='mb-5'>
                    <h4 className='font-bold text-xl sm:text-2xl mb-4'>{product.title}</h4>
                    <div>
                        {product.currPrice
                            ? <p className='font-bold text-lg sm:text-xl mb-3 text-blue-600'>{product.currPrice}<span>{product.currency}</span></p>
                            : <p className='mb-3'>Price currently unavailable</p>
                        }
                        {product.originalPrice &&
                            <p className='font-semibold text-gray-500 line-through text-md'>{product.originalPrice}<span>{product.currency}</span></p>
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-5 mb-6'>
                    <h6 className='font-bold text-xl'>About this item</h6>
                    {
                        product.description ?
                            product.description.length > 300 ? <p>{product.description.slice(0, 300)}...</p> : <p>{product.description}</p>
                            : <p>This product doesn't have a description</p>
                    }
                    <div className='flex gap-2 items-center justify-center sm:justify-start'>
                        <Link className='text-gray-900 font-medium hover:underline' href={product.url} target='_blank'>Go to the product</Link>
                        <Image src="/assets/icons/right-arrow.png" alt='arrow' width={16} height={16} />
                    </div>
                </div>
                <Modal productId={id} />
            </div>
        </div>
    )
}

export default ProductDetails