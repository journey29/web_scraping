
import HeroCarousel from '@/components/HeroCarousel'
import Products from '@/components/Products'
import SearchBar from '@/components/SearchBar'

const Home = () => {
  return (
    <>
      <section className='flex items-center gap-20 mt-12 mb-16'>
        <div className='max-w-2xl'>
          <h1 className='text-2xl md:text-3xl text-gray-900 font-bold mb-6'><span className='text-blue-600'>A powerful data extraction tool:</span> your key to collecting, analysing and understanding information.</h1>
          <p className='mb-10 font-medium'>A web application that gives you the ability to collect valuable data from various sources on the Internet.</p>
          <SearchBar />
        </div>
        <HeroCarousel />
      </section>
      <section>
        <h2 className='font-bold text-2xl md:text-3xl text-center'>Added products</h2>
        <Products />
      </section>
    </>
  )
}

export default Home