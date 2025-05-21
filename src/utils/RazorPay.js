import toast from "react-hot-toast";
import api from "../api";
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const pay = async (price, pdetails, deliveryCharge, superTotal) => {
  let amount = price || 100;
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    toast.error("Razorpay SDK failed to load. Are you online?");
    return;
  }

  return new Promise((resolve) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: parseInt(amount * 100),
      currency: "INR",
      name: "Cart-Hive",
      description: "Payment for products",
      handler: async function (response) {
        try {
          const data = {
            subTotal: superTotal,
            deliveryCharge,
            amount,
            paymentId: response.razorpay_payment_id,
            pdetails,
          };

          const res = api.post("/api/user/placeorder", data);

          toast.promise(res, {
            loading: "Placing order...",
            success: () => "Order placed successfully",
            error: "Failed to place order",
          });

          const result = await res;
          resolve({ success: true, data: result.data });
        } catch (error) {
          const err = error.response?.data?.message || "Payment failed";
          toast.error(err);
          resolve({ success: false });
        }
      },
      prefill: {
        name: "cart-hive",
        email: "cart-hive@gmail.com",
        contact: "9876543210",
      },
      notes: {
        address: "India",
      },
      theme: {
        color: "#158993",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  });
};

export default pay;
