import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

export default function PaymentCancel() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center border border-gray-100">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <XCircle className="w-16 h-16 text-red-500" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-3">
          Payment Cancelled
        </h1>

        {/* Description */}
        <p className="text-gray-500 mb-6">
          Your payment was not completed. No charges were made and no credits were deducted.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to="/pricing"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-medium transition duration-200"
          >
            Try Again
          </Link>

          <Link
            to="/"
            className="border border-gray-300 text-gray-600 hover:bg-gray-100 py-2.5 rounded-lg font-medium transition duration-200"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}