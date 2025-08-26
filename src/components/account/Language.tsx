import { useState } from "react";
import { Check } from "lucide-react";

const Language = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English (UK)");

  const languages = ["English (UK)", "English (US)", "Latin", "French"];

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
  };

  return (
    <div className="p-8 bg-white">
      <div className="w-full">
        <h1 className="text-xl font-semibold text-[#1C1C1E] mb-8">
          Choose your preferred language
        </h1>

        <div className="space-y-6">
          {languages.map((language) => (
            <button
              key={language}
              onClick={() => handleLanguageSelect(language)}
              className="w-full flex items-center justify-between py-2 text-left"
            >
              <span className="text-lg font-medium text-[#363636]">
                {language}
              </span>

              {selectedLanguage === language && (
                <div className="w-6 h-6 bg-[#00C2A8] rounded-full flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Language;
