import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useParams, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createStripePaymentIntentAPI } from "../../apis/stripePayment/stripePayment";
import StatusMessage from "../Alert/StatusMessage";

const CheckoutForm = () => {
  //Get the payload
  const params = useParams()
  const [SearchParams] = useSearchParams();
  const plan = params?.plan
  const amount = SearchParams.get('amount')
  //Stripe configuration
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const mutation = useMutation({
    mutationFn: createStripePaymentIntentAPI,
    onSuccess: async (data) => {

      if (data && data.clientSecret) {

        const { error } = await stripe.confirmPayment({
          elements,
          clientSecret: data.clientSecret,
          confirmParams: {
            return_url: "http://localhost:3000/success",
          },
        });
        if (error) {
          console.log("first");
          setErrorMessage(error?.message);
        }
      } else {
        setErrorMessage("Failed to create payment intent");
      }
    },
    onError: (error) => {
      console.log("Dasdsa");
      setErrorMessage(error?.message || "An error occurred");
    },
  });

  //Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (elements === null) {
      console.log("aafirst");
      // return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.log("fisadsrst");
      // return;
    }
    const data = { amount, plan };
    mutation.mutate(data);
  };

  return (
    <div className="bg-gray-900 h-screen -mt-4 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-96 mx-auto my-4 p-6 bg-white 
      rounded-lg shadow-lg">
        <div className="mb-6">
          <PaymentElement />
        </div>
        {/* {Display loading} */}
        {mutation.isPending && (
          <StatusMessage type="loading" message="Please wait..." />
        )}
        {/* {Display error} */}
        {mutation.isError && (
          <StatusMessage type="error" message={mutation.error?.response?.data?.message} />
        )}
        {/* {Display success} */}
        {mutation.isSuccess && (
          <StatusMessage type="success" message="Payment successful" />
        )}

        <button className="
        w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ">
          Pays
        </button>
        {errorMessage && <div className="text-red-500 mt-4">
          {errorMessage}</div>}
      </form>
    </div>
  );
};

export default CheckoutForm;
