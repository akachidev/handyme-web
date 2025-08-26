import React, { useState } from "react";
import { Check, Upload } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";

const ReportIssue = () => {
  const [selectedIssue, setSelectedIssue] = useState("Unprofessional behavior");
  const [description, setDescription] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const issueTypes = [
    "Unprofessional behavior",
    "Incomplete job",
    "Overcharged",
    "Safety concern",
    "Other",
  ];

  const handleIssueSelect = (issue: string) => {
    setSelectedIssue(issue);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSubmit = () => {
    console.log("Report submitted:", {
      issue: selectedIssue,
      description,
      file: uploadedFile,
    });
  };

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8  ">
        <div className="w-full max-w-6xl mx-auto bg-white rounded p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#363636] mb-8">
              Report an issue
            </h1>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Choose Type of Issue */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-[#363636] mb-6">
                Choose Type of Issue
              </h2>
              <div className="space-y-6">
                {issueTypes.map((issue) => (
                  <button
                    key={issue}
                    onClick={() => handleIssueSelect(issue)}
                    className="w-full flex items-center justify-between py-2 text-left"
                  >
                    <span className="text-base sm:text-lg text-[#363636]">
                      {issue}
                    </span>

                    {selectedIssue === issue && (
                      <div className="w-6 h-6 bg-[#00C2A8] rounded-full flex items-center justify-center">
                        <Check size={14} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Upload Photo/Video */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-[#363636] mb-6">
                Upload Photo/Video (optional)
              </h2>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.mp4"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center space-y-4">
                    <Upload className="w-12 h-12 text-gray-400" />
                    <div>
                      <span className="text-[#00C2A8] hover:underline">
                        Click to upload
                      </span>
                      <span className="text-gray-500"> or drag and drop</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      supports only .JPG, .PNG and .MP4
                    </p>
                  </div>
                </label>

                {uploadedFile && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">
                      File uploaded: {uploadedFile.name}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Description */}
            <section>
              <textarea
                placeholder="Describe What Happened"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="w-full bg-white px-4 py-4 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#00C2A8] focus:border-transparent outline-none resize-none text-sm sm:text-base text-[#363636] placeholder-gray-500"
              />
            </section>

            {/* Submit Button */}
            <section>
              <button
                onClick={handleSubmit}
                className="w-full bg-red-500 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-red-600 transition-colors focus:ring-4 focus:ring-red-500 focus:ring-opacity-30 outline-none"
              >
                Submit Report
              </button>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReportIssue;
