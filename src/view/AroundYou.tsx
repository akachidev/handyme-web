import { ServiceProviderCard } from "@/components/cards";
import DFilter from "@/components/globals/DFilter";
import MainLayout from "@/components/layouts/MainLayout";
import { MapPin } from "lucide-react";

export const aroundYouProvidersByLocation = [
  {
    location: "Ifite Awka",
    providers: [
      {
        id: "1",
        name: "Elijah Mboto",
        avatar: "/images/user.jpg",
        rating: 4.2,
        service: "Plumber",
        price: 2500,
        isVerified: true,
      },
      {
        id: "2",
        name: "Emmanuel Sara",
        avatar: "/images/user.jpg",
        rating: 4.2,
        service: "Education & Academic Help",
        price: 2500,
        isVerified: false,
      },
      {
        id: "3",
        name: "Elijah Mboto",
        avatar: "/images/user.jpg",
        rating: 4.2,
        service: "Plumber",
        price: 2500,
        isVerified: true,
      },
      {
        id: "4",
        name: "Elijah Mboto",
        avatar: "/images/user.jpg",
        rating: 5.0,
        service: "Plumber",
        price: 10500,
        isVerified: true,
      },
      {
        id: "5",
        name: "Elijah Mboto",
        avatar: "/images/user.jpg",
        rating: 4.2,
        service: "Plumber",
        price: 2500,
        isVerified: true,
      },
      {
        id: "6",
        name: "Emmanuel Sara",
        avatar: "/images/user.jpg",
        rating: 4.2,
        service: "Education & Academic Help",
        price: 2500,
        isVerified: false,
      },
      {
        id: "7",
        name: "Elijah Mboto",
        avatar: "/images/user.jpg",
        rating: 4.2,
        service: "Plumber",
        price: 2500,
        isVerified: true,
      },
      {
        id: "8",
        name: "Elijah Mboto",
        avatar: "/images/user.jpg",
        rating: 5.0,
        service: "Plumber",
        price: 10500,
        isVerified: true,
      },
    ],
  },
  {
    location: "Okpuno",
    providers: [
      {
        id: "9",
        name: "Elijah Mboto",
        avatar: "/images/user.jpg",
        rating: 4.2,
        service: "Plumber",
        price: 2500,
        isVerified: true,
      },
      {
        id: "10",
        name: "Emmanuel Sara",
        avatar: "/images/user.jpg",
        rating: 4.2,
        service: "Education & Academic Help",
        price: 2500,
        isVerified: false,
      },
      {
        id: "11",
        name: "Elijah Mboto",
        avatar: "/images/user.jpg",
        rating: 4.2,
        service: "Plumber",
        price: 2500,
        isVerified: true,
      },
      {
        id: "12",
        name: "Elijah Mboto",
        avatar: "/images/user.jpg",
        rating: 5.0,
        service: "Plumber",
        price: 10500,
        isVerified: true,
      },
    ],
  },
  {
    location: "Nodu",
    providers: [
      {
        id: "13",
        name: "Elijah Mboto",
        avatar: "/images/user.jpg",
        rating: 4.2,
        service: "Plumber",
        price: 2500,
        isVerified: true,
      },
      {
        id: "14",
        name: "Emmanuel Sara",
        avatar: "/images/user.jpg",
        rating: 4.2,
        service: "Education & Academic Help",
        price: 2500,
        isVerified: false,
      },
      {
        id: "15",
        name: "Elijah Mboto",
        avatar: "/images/user.jpg",
        rating: 4.2,
        service: "Plumber",
        price: 2500,
        isVerified: true,
      },
      {
        id: "16",
        name: "Elijah Mboto",
        avatar: "/images/user.jpg",
        rating: 5.0,
        service: "Plumber",
        price: 10500,
        isVerified: true,
      },
    ],
  },
];

const AroundYou = () => {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto pt-4 pb-4">
        {/* Filter Section */}
        <div className="w-full mx-auto mb-6">
          <DFilter title="Around you" />
        </div>

        <div className="space-y-8">
          {aroundYouProvidersByLocation.map((locationGroup, index) => (
            <div key={locationGroup.location} className="w-full">
              <div className="flex items-center gap-2 mb-4">
                <img src="/icons/location.png" className="h-6 w-5" alt="icon" />
                <h2 className="text-lg font-semibold text-gray-900">
                  {locationGroup.location}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {locationGroup.providers.map((provider) => (
                  <ServiceProviderCard
                    key={provider.id}
                    name={provider.name}
                    avatar={provider.avatar}
                    rating={provider.rating}
                    service={provider.service}
                    price={provider.price}
                    isVerified={provider.isVerified}
                    onClick={() =>
                      console.log(`Clicked provider: ${provider.name}`)
                    }
                  />
                ))}
              </div>

              {/* Divider (except for last section) */}
              {index < aroundYouProvidersByLocation.length - 1 && (
                <div className="border-b border-gray-200 mt-6"></div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State (if no providers) */}
        {aroundYouProvidersByLocation.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <MapPin className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No providers found
            </h3>
            <p className="text-gray-500 max-w-md">
              Try adjusting your search criteria or location to find service
              providers near you.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default AroundYou;
