import toast from "react-hot-toast";

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

const pay = async (price, uid, pid) => {
  let amount = price || 100;
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    toast.error("Razorpay SDK failed to load. Are you online?");
    return;
  }

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY, // This is Api key. you will get it from razorpay dashboard > account and settings > API keys
    amount: parseInt(amount * 100),
    currency: "INR", // your 3 letter currency code
    name: "Cart-Hive", // project or transaction name
    description: "Payment for products",
    image: "", // your project logo
    handler: function (response) {
      try {
        console.log("price", price);
        console.log("uid", uid);
        console.log("pid", pid);
        console.log(response);
      } catch (error) {
        const err = error.response.data.message || "Payment failed";
        toast.error(err);
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
};

export default pay;
