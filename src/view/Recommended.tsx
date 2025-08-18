import { recommendedProviders } from "@/assets/data";
import { HorizontalServiceCard } from "@/components/cards";
import DFilter from "@/components/globals/DFilter";
import MainLayout from "@/components/layouts/MainLayout";

const Recommended = () => {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto pt-4 pb-4">
        <div className="w-full mx-auto ">
          <DFilter title="Recommended For You" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              onClick={() => console.log("")}
              onBookNow={() => console.log(`Book now: ${provider.name}`)}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Recommended;
