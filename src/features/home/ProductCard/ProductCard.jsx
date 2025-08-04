'use client';

import Image from 'next/image.js';
import { useState } from 'react';
import FavoriteBtn from '@/components/ui/favorite-btn/FavoriteBtn.jsx';
import StarRating from '@/components/ui/star-rating/StarRating.jsx';
import SmallCartIcon from '@/components/icons/SmallCartIcon.jsx';

export default function ProductCard({ isOnSale, image, title, brand, price, oldPrice, colors }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => setIsFavorite((prev) => !prev);

  return (
    <>
      <div className="relative mb-3">
        {isOnSale && (
          <div className="text-white text-xs font-semibold py-1 px-2.5 absolute top-2 left-2 bg-orange-400 rounded-lg">
            On Sale
          </div>
        )}
        <Image className="rounded-2xl" src={image} alt={title} width={167} height={223} />
        <StarRating initialRating={3} />
      </div>
      <button className="absolute top-3.5 right-3.5" onClick={toggleFavorite}>
        <FavoriteBtn isFavorite={isFavorite} />
      </button>
      <div className="px-2">
        <div className="mb-2">
          <span className="font-dm font-bold">${price.toFixed(2)}</span>
          {oldPrice && <span className="hidden ">${oldPrice.toFixed(2)}</span>}
        </div>
        <p className="text-sm font-medium mb-2">{title}</p>
        <p className="text-xs mb-2">{brand}</p>

        <div className="hidden">
          {colors.map((color, idx) => (
            <span key={idx} className="color-dot" style={{ backgroundColor: color }}></span>
          ))}
        </div>
        <button className="bg-main flex justify-center items-center py-2 w-full rounded-lg mb-16">
          <SmallCartIcon />
          <p className="text-white text-sm font-semibold ml-2">Add to Cart</p>
        </button>
      </div>
    </>
  );
}
