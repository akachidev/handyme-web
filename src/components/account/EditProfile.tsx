const EditProfile: React.FC = () => (
  <div className="p-6 bg-white rounded-xl">
    <div className="flex flex-col items-center mb-8">
      <div className="w-20 h-20 rounded-full bg-gray-300 mb-4 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-lg font-semibold text-[#1E2B3A] mb-2">
        Profile Details
      </h2>
    </div>

    <div className=" border border-dashed border-[#8E8E93] mb-6" />

    <div className="space-y-4 mx-auto">
      <div>
        <input
          type="text"
          placeholder="Francis Nkwocha"
          className="w-full p-3 border border-[#00C2A8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C2A8] focus:border-transparent bg-white"
        />
      </div>

      <div>
        <input
          type="text"
          readOnly
          placeholder="Always use the phone number Francis has for quick, reliable help when I need it most."
          className="w-full p-3 text-[#1E2B3A] border border-[#00C2A8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00C2A8] focus:border-transparent bg-white text-sm text-center"
        />
      </div>

      <div className="flex">
        <div className="flex items-center  px-3 py-3 rounded-l-lg border border-r-0 border-[#00C2A8]">
          <span className="text-sm text-[#363636]">+234</span>
        </div>
        <input
          type="tel"
          placeholder="811 000 0000"
          className="flex-1 p-3 text-[#1E2B3A] border border-[#00C2A8] rounded-r-lg focus:outline-none  bg-white"
        />
      </div>
      <p className="text-xs text-[#989FB0] text-center">
        We will send a code to your phone to verify your phone number
      </p>

      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center">
            <img
              src="/icons/google.png"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <input
          type="email"
          placeholder="francis.nkwocha@gmail.com"
          className="w-full pl-14 pr-4 py-3 text-[#1E2B3A] border border-[#00C2A8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C2A8] focus:border-transparent bg-white"
        />
      </div>
      <p className="text-xs text-[#989FB0] text-center">
        You'll be redirected to a window to verify your email
      </p>

      <button className="w-full bg-brandprimary text-white py-4 rounded-lg font-semibold hover:bg-[#00a691] transition-colors mt-8">
        Save Changes
      </button>
    </div>
  </div>
);

export default EditProfile;
