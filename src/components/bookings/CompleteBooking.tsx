import { Calendar, CloudUpload, Plus } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  onContinue: any;
  formData: any;
  setFormData: any;
}

const CompleteBooking = ({ onContinue, formData, setFormData }: Props) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    formData.date ? new Date(formData.date) : undefined
  );
  const [selectedTime, setSelectedTime] = useState(formData.time || "");

  const handleFileUpload = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setFormData({
        ...formData,
        date: date.toISOString(),
        dateTime: selectedTime
          ? `${format(date, "yyyy-MM-dd")}T${selectedTime}`
          : formData.dateTime,
      });
    }
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    if (selectedDate) {
      setFormData({
        ...formData,
        time,
        dateTime: `${format(selectedDate, "yyyy-MM-dd")}T${time}`,
      });
    }
  };

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-base font-medium text-[#363636] mb-3">
          Describe the Task
        </label>
        <textarea
          placeholder="What do you need done?"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={6}
          className="w-full bg-[#FFFFFF] px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C2A8] focus:border-transparent outline-none resize-none text-[#363636] placeholder-gray-500"
        />
      </div>

      {/* Upload Photo/Video */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-base font-medium text-[#363636]">
            Upload Photo/Video (5 max)
          </label>
          <div className="w-6 h-6 bg-[#1E2B3A] rounded-full flex items-center justify-center">
            <Plus size={15} color="white" />
          </div>
        </div>

        <div className="border-2 border-dashed border-[#F7F9FA] rounded-lg p-8 text-center">
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.mp4"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload-complete"
            multiple
          />
          <label htmlFor="file-upload-complete" className="cursor-pointer">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-[#F2F4F7] rounded-full p-2">
                <CloudUpload className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <span className="text-[#0095FF]">Click to upload</span>
                <span className="text-[#475467]"> or drag and drop</span>
              </div>
              <p className="text-sm text-gray-500">
                supports only .JPG, .PNG and .MP4
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Service Duration */}
      <div>
        <label className="block text-base font-medium text-[#363636] mb-3">
          Service proposed duration (optional)
        </label>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-[#363636]">8hrs</span>
          <div className="flex-1 relative">
            <input
              type="range"
              min="1"
              max="24"
              value={formData.duration || 8}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              className="w-full h-2 bg-[#00C2A8]/[20%] rounded-lg appearance-none cursor-pointer slider"
            />
            <div
              className="absolute top-2.5 left-0 h-2 bg-[#00C2A8] rounded-lg pointer-events-none"
              style={{ width: `${((formData.duration || 8) / 24) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Price */}
      <div>
        <label className="block text-base font-medium text-[#363636] mb-3">
          Price
        </label>
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <input
              type="range"
              min="5000"
              max="100000"
              step="5000"
              value={formData.price || 55000}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full h-2 bg-[#00C2A8]/[20%] rounded-lg appearance-none cursor-pointer"
            />
            <div
              className="absolute top-2.5 left-0 h-2 bg-[#00C2A8] rounded-lg pointer-events-none"
              style={{
                width: `${
                  (((formData.price || 55000) - 5000) / (100000 - 5000)) * 100
                }%`,
              }}
            ></div>
          </div>
          <span className="text-sm text-[#363636] font-medium">
            ₦{(formData.price || 55000).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Date/Time Selection */}
      <div className="space-y-4">
        <label className="block text-base font-medium text-[#363636]">
          Date/Time
        </label>

        {/* Date Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Select Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal px-4 py-4 bg-[#F7F9FA] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C2A8] focus:border-transparent h-auto",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <ShadcnCalendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={(date: any) =>
                  date < new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Select Time
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => handleTimeChange(time)}
                className={cn(
                  "px-3 py-2 text-sm rounded-lg border transition-colors",
                  selectedTime === time
                    ? "bg-[#00C2A8] text-white border-[#00C2A8]"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={onContinue}
        className="w-full bg-[#00C2A8] text-white py-4 px-6 rounded-lg font-medium text-lg transition-colors mt-8"
      >
        Continue
      </button>
    </div>
  );
};

export default CompleteBooking;
