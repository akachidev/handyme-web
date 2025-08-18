import { Link } from "react-router-dom";
import { RouterConstantUtil } from "@/lib/RouterConstantUtils";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white px-6 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-2">Oops! Page not found.</p>
      <p className="text-[#B2B6BD] mb-6 max-w-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to={RouterConstantUtil.page.home}
        className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition duration-300"
      >
        Go back home
      </Link>
    </div>
  );
}
