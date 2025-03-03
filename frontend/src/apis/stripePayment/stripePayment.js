import axios from "axios";
//Stripe PAyment 


//============Free StripePayment API========
export const handleFreeSubscriptionAPI = async () => {

    const response = await axios.post(
        "http://localhost:8090/api/v1/stripe/free-plan", {

    },

        {
            withCredentials: true,
        }
    );
    return response?.data;
}

//============ StripePayment intent API========
export const createStripePaymentIntentAPI = async (payment) => {

    const response = await axios.post(
        "http://localhost:8090/api/v1/stripe/checkout",
        {
            amount: Number(payment?.amount),
            subscriptionPlan: payment?.plan
        },
        {
            withCredentials: true,
        }
    );
    return response?.data;
}


//============ Verify Payment API========
export const VerifyPaymentAPI = async (paymentId) => {

    const response = await axios.post(
        `http://localhost:8090/api/v1/stripe/verify-payment/${paymentId}`,
        {},
        {
            withCredentials: true,
        }
    );
    return response?.data;
}

