import { topRatedProviders } from "@/assets/data";
import { TopRatedCard } from "@/components/cards";
import DFilter from "@/components/globals/DFilter";
import MainLayout from "@/components/layouts/MainLayout";

const TopRated = () => {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto pt-4 pb-4">
        <div className="w-full mx-auto ">
          <DFilter title="Top Rated" />
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
              onClick={() => console.log("")}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default TopRated;
