import { Trash2 } from "lucide-react";

const DeleteAccount: React.FC = () => (
  <div className="p-6">
    <h2 className="text-xl font-semibold text-red-500 mb-6">Delete Account</h2>
    <div className="max-w-md mx-auto text-center">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
        <Trash2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-600 mb-2">Warning!</h3>
        <p className="text-sm text-red-600">
          This action cannot be undone. All your data will be permanently
          deleted.
        </p>
      </div>

      <input
        type="text"
        placeholder="Type 'DELETE' to confirm"
        className="w-full p-4 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent mb-4"
      />

      <button className="w-full bg-red-500 text-white py-4 rounded-lg font-semibold hover:bg-red-600 transition-colors">
        Delete Account Permanently
      </button>
    </div>
  </div>
);

export default DeleteAccount;
