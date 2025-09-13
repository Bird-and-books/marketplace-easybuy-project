import ProductCard from '../ProductCard/ProductCard.jsx';
import LinkIcon from '@/components/icons/LinkIcon.jsx';
import Link from 'next/link';

export default function RecommendationsNew() {
  const products = [
    {
      image: '/img/product/woman-rec.png',
      title: "Women's Midi Slip Dress",
      price: 25.0,
      oldPrice: 43.0,
      isOnSale: true,
      brand: 'A New Day',
      colors: ['#252527', '#757c6a', '#62232c'],
    },
    {
      image: '/img/product/man-rec.png',
      title: 'Men Twill Block Puffer Jacket',
      price: 25.0,
      oldPrice: 43.0,
      isOnSale: true,
      brand: 'Members Only',
      colors: ['#535049', '#494e62'],
    },
    {
      image: '/img/product/woman2-rec.png',
      title: "Women's Long Sleeve",
      price: 25.0,
      oldPrice: 43.0,
      isOnSale: true,
      brand: 'Wild Fable',
      colors: ['#252527', '#066277', '#8c1d37'],
    },
    {
      image: '/img/product/kid-rec.png',
      title: 'Winnie the Pooh Baby',
      price: 25.0,
      oldPrice: 43.0,
      isOnSale: true,
      brand: 'Disney',
      colors: ['#000000'],
    },
  ];
  return (
    <section className="section-container">
      <div className="flex items-center justify-between mb-[24px] lg:mb-[72px] border-b border-dashed ">
        <h2 className="font-dm font-bold lg:text-[40px]">Recommendations</h2>
        <Link
          className='relative inline-flex items-center gap-2 text-[32px] leading-[48px]  transition-colors duration-300 ease-in-out hover:text-blue-600
         after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-700
         after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100
         after:transition-transform after:duration-300 after:ease-in-out '
          href="#"
        >
          <span className="hidden md:inline text-4xl">Shop now</span>
          <LinkIcon className="transition-transform duration-300 ease-in-out group-hover:translate-x-[5px]" />
        </Link>
      </div>
      <ul className="flex flex-wrap gap-x-2 gap-y-4 md:flex-nowrap md:gap-x-8 md:gap-y-0">
        {products.map((product, i) => (
          <li
            key={i}
            className="max-w-[167px] bg-white shadow-main relative rounded-2xl md:max-w-[396px]"
          >
            <ProductCard key={i} {...product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
