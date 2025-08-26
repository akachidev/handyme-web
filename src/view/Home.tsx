import {
  aroundYouProviders,
  recommendedProviders,
  topRatedProviders,
} from "@/assets/data";
import {
  TopRatedCard,
  ServiceProviderCard,
  HorizontalServiceCard,
} from "@/components/cards";
import ServiceFilter from "@/components/globals/ServiceFilter";
import MainLayout from "@/components/layouts/MainLayout";
import { RouterConstantUtil } from "@/lib/RouterConstantUtils";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  const handleCardClick = (section: string) => {
    console.log(section);
    navigate(RouterConstantUtil.page.artisan);
  };

  return (
    <MainLayout>
      <div className="min-h-screen overflow-hidden mx-3 ">
        <div className="max-w-7xl mx-auto pt-8 pb-4">
          <div className="w-full mx-auto ">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-semibold text-[#171717] mb-2">
                Hey Francis 👋
              </h1>
              <p className="text-lg text-[#1E2B3A]">
                What do you need help with?
              </p>
            </div>

            {/* Filter Component */}
            <ServiceFilter />
          </div>
        </div>

        <div className="max-w-7xl mx-auto  py-8">
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-[#2C2C2E]">
                Around You
              </h2>
              <button
                onClick={() => navigate(RouterConstantUtil.page.aroundYou)}
                className="text-primary hover:text-teal-600 font-medium transition-colors"
              >
                View all
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {aroundYouProviders.map((provider) => (
                <ServiceProviderCard
                  key={provider.id}
                  name={provider.name}
                  avatar={provider.avatar}
                  rating={provider.rating}
                  service={provider.service}
                  price={provider.price}
                  isVerified={provider.isVerified}
                  onClick={() => handleCardClick("around-you")}
                />
              ))}
            </div>
          </section>

          {/* Recommended for you Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-[#2C2C2E]">
                Recommended for you
              </h2>
              <button
                onClick={() => navigate(RouterConstantUtil.page.recommended)}
                className="text-primary hover:text-teal-600 font-medium transition-colors"
              >
                View all
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedProviders.map((provider) => (
                <HorizontalServiceCard
                  key={provider.id}
                  name={provider.name}
                  avatar={provider.avatar as string}
                  mainImage={provider.mainImage}
                  rating={provider.rating}
                  service={provider.service}
                  price={provider.price}
                  distance={provider.distance}
                  tasksCompleted={provider.tasksCompleted}
                  onClick={() => handleCardClick("recommended")}
                  onBookNow={() => navigate(RouterConstantUtil.page.booking)}
                />
              ))}
            </div>
          </section>

          {/* Top Rated Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-[#2C2C2E]">
                Top Rated
              </h2>
              <button
                onClick={() => navigate(RouterConstantUtil.page.topRated)}
                className="text-primary hover:text-teal-600 font-medium transition-colors"
              >
                View all
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {topRatedProviders.map((provider) => (
                <TopRatedCard
                  key={provider.id}
                  name={provider.name}
                  avatar={provider.avatar}
                  mainImage={provider.mainImage}
                  rating={provider.rating}
                  service={provider.service}
                  price={provider.price}
                  distance={provider.distance}
                  tasksCompleted={provider.tasksCompleted}
                  onClick={() => handleCardClick("top-rated")}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
