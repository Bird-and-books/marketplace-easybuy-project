import Promo from '@/pages/Home/Promo/Promo';
import FavoriteBrands from '@/pages/Home/FavoriteBrands/FavoriteBrands';
import UkrainianBrands from '@/pages/Home/UkrainianBrands/UkrainianBrands';
import Recommendations from '@/pages/Home/Recommendations/Recommendations';

const Home = () => {
  return (
    <div className="container px-4 mx-auto">
      <Promo />
      <FavoriteBrands />
      <UkrainianBrands />
      <Recommendations />
    </div>
  );
};

export default Home;
