import Promo from '@/components/home/Promo/Promo';
import FavoriteBrands from '@/components/home/FavoriteBrands/FavoriteBrands';
import UkrainianBrands from '@/components/home/UkrainianBrands/UkrainianBrands';
import Recommendations from '@/components/home/Recommendations/Recommendations';

const Home = () => {
  return (
    <div className="container">
      <Promo />
      <FavoriteBrands />
      <UkrainianBrands />
      <Recommendations />
    </div>
  );
};

export default Home;
