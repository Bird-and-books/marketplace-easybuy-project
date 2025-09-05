'use client';

import Image from 'next/image.js';
import { useState } from 'react';
import FavoriteBtn from '@/components/ui/favorite-btn/FavoriteBtn.jsx';
import StarRating from '@/components/ui/star-rating/StarRating.jsx';
import SmallCartIcon from '@/components/icons/SmallCartIcon.jsx';
import './ProductCard.scss';

export default function ProductCard({ isOnSale, image, title, brand, price, oldPrice, colors }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => setIsFavorite((prev) => !prev);

  return (
    <>
      <div className="relative mb-3 w-[167px] h-[223px] md:w-[396px] md:h-[544px]">
        {isOnSale && (
          <div className="text-white text-xs font-semibold py-1 px-2.5 absolute top-2 left-2 bg-orange-400 rounded-lg md:text-base md:px-4.5 md:top-4 md:left-4">
            On Sale
          </div>
        )}
        <Image className="rounded-2xl object-cover" src={image} alt={title} fill />
        <StarRating initialRating={3} />
      </div>
      <button className="absolute top-3.5 right-3.5 md:top-4 md:right-4" onClick={toggleFavorite}>
        <FavoriteBtn isFavorite={isFavorite} />
      </button>
      <div className="px-2 md:px-6">
        <div className="mb-2 md:mb-3 md:flex md:items-center gap-x-2">
          <span className="font-dm font-bold md:text-2xl">${price.toFixed(2)}</span>
          {oldPrice && (
            <span className="hidden md:block md:line-through">${oldPrice.toFixed(2)}</span>
          )}
        </div>
        <p className="text-sm font-medium mb-2 md:text-xl md:mb-3">{title}</p>
        <p className="text-xs mb-2 md:text-base md:mb-3">{brand}</p>

        <div className="hidden md:flex gap-x-4 mb-13">
          {colors.map((color, idx) => (
            <span key={idx} className="w-6 h-6 " style={{ backgroundColor: color }}></span>
          ))}
        </div>
        <button className="bg-main flex justify-center items-center py-2 w-full rounded-lg mb-16 md:py-4 md:mb-7 ">
          <SmallCartIcon />
          <p className="text-white text-sm font-semibold ml-2 md:text-base">Add to Cart</p>
        </button>
      </div>
    </>
  );
}
