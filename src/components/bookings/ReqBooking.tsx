import { MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  onContinue: any;
  formData: any;
  setFormData: any;
}

const RequestBooking = ({ onContinue, formData, setFormData }: Props) => {
  const categories = [
    "Home Services",
    "Beauty & Wellness",
    "Tutoring",
    "Delivery",
    "Handyman",
    "Cleaning",
  ];

  const services = [
    "Plumbing",
    "Electrical Work",
    "Painting",
    "Carpentry",
    "AC Repair",
  ];

  return (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <label className="block text-base font-medium text-[#363636] mb-3">
          Category
        </label>
        <Select
          value={formData.category}
          onValueChange={(value) =>
            setFormData({ ...formData, category: value })
          }
        >
          <SelectTrigger className="w-full px-4 py-4 bg-white border border-[#809B98] rounded-lg focus:ring-2 focus:ring-[#00C2A8] focus:border-[#00C2A8] outline-none text-[#363636] h-auto">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Select Service */}
      <div>
        <label className="block text-base font-medium text-[#363636] mb-3">
          Select Service
        </label>
        <Select
          value={formData.service}
          onValueChange={(value) =>
            setFormData({ ...formData, service: value })
          }
        >
          <SelectTrigger className="w-full px-4 py-4 bg-white border border-[#809B98] rounded-lg focus:ring-2 focus:ring-[#00C2A8] focus:border-[#00C2A8] outline-none text-[#363636] h-auto">
            <SelectValue placeholder="Select service" />
          </SelectTrigger>
          <SelectContent>
            {services.map((service) => (
              <SelectItem key={service} value={service}>
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Select your location */}
      <div>
        <label className="block text-base font-medium text-[#363636] mb-3">
          Select your location
        </label>
        <div className="flex items-center justify-between p-4 bg-[#F7F9FA] border border-gray-300 rounded-lg">
          <span className="text-[#363636]">{formData.location}</span>
          <MapPin className="w-5 h-5 text-gray-600" />
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={onContinue}
        className="w-full bg-brandprimary text-white py-4 px-6 rounded-lg font-medium text-lg transition-colors mt-8"
      >
        Continue
      </button>
    </div>
  );
};

export default RequestBooking;
