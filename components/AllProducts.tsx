import { getAllProducts } from '@/lib/actions';
import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import Button from './UI/Button';

const AllProducts = async () => {
    const allProducts = await getAllProducts()

    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-wrap justify-center items-start gap-14 mt-10'>
                {allProducts.length > 0
                    ? allProducts.map((product: Product) => (
                        <Link href={`/products/${product._id}`} className='max-w-sm flex flex-col' key={product._id}>
                            <Image className='mb-6 rounded-xl h-[220px] w-[320px] object-cover' src={product.imageUrl} alt='img' width={300} height={300} key={product._id} />
                            <div className='max-w-xs flex flex-col items-start'>
                                <h4 className='font-bold text-gray-900 mb-6'>{product.title.length > 70 ? `${product.title.substring(0, 70)}...` : product.title}</h4>
                                {product.currPrice
                                    ? <p className='bg-gray-200 px-4 py-3 rounded-md font-medium'>{product.currPrice} <span>{product.currency}</span></p>
                                    : <p className='font-medium'>Price currently unavailable</p>}
                            </div>
                        </Link>
                    ))
                    : <h2>You haven't added a product yet</h2>
                }
            </div>
        </div>

    );
};

export default AllProducts;