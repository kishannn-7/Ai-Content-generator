import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { VerifyPaymentAPI } from "../../apis/stripePayment/stripePayment";


const PaymentSuccess = () => {
  //Get the payload
  const [SearchParams] = useSearchParams();
  const paymentIntentID = SearchParams.get('payment_intent')
  // Static values for demonstration

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["verifyPayment"],
    queryFn: () => VerifyPaymentAPI(paymentIntentID),
  })

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
      {isLoading ? (
        // Simulate loading state
        <div className="flex flex-col items-center justify-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mb-3" />
          <p className="text-lg text-gray-600">
            Verifying your payment, please wait...
          </p>
        </div>
      ) : isError ? (
        // Simulate error state
        <div className="text-center text-red-500">
          <FaTimesCircle className="text-5xl mb-3" />
          <p className="text-xl">Payment verification failed</p>
          <p>An error occurred</p>
        </div>
      ) : (
        // Simulate success state
        <div className="text-center text-green-500">
          <FaCheckCircle className="text-5xl mb-3" />
          <h1 className="text-2xl font-bold mb-3">Payment Successful</h1>
          <p className="text-gray-600 mb-4">
            Thank you for your payment. Your transaction ID is {paymentIntentID}
            .
          </p>
          <Link
            to="/generate-content"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Start Using AI
          </Link>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
