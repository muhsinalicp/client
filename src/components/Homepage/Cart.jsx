import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import api from "../../api";
import { Loader2, TrashIcon } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import pay from "../../utils/RazorPay";

function Cart() {
  const [cart, setcart] = useState([{}]);
  const [loading, setloading] = useState(false);
  const [render, setrender] = useState(false);
  const [cartSummary, setcartSummary] = useState({
    totalAmount: 0,
    deliveryCharges: 0,
    discount: 0,
    grandTotal: 0,
  });

  useEffect(() => {
    setloading(true);
    try {
      const fetchcart = async () => {
        const res = await api.get("/api/user/cart");
        setcart(res.data.cart);
        setcartSummary(res.data.cartSummary);
      };
      fetchcart();
    } catch (error) {
      toast.error("Failed to fetch cart");
    } finally {
      setloading(false);
    }
  }, [render]);

  // delete item from cart
  const handleDelete = async (id) => {
    const res = api.delete(`api/user/deletecart/${id}`);

    toast.promise(
      res,
      {
        loading: "Removing item from cart...",
        success: (res) => {
          setrender(!render);
          return res.data.message || "Item removed from cart";
        },
        error: (err) => {
          return err.response.data.message || "Failed to remove item from cart";
        },
      },
      {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      }
    );
  };

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <div className="w-full h-full">
          <Navbar />
          <div className="w-full h-[90%]  flex justify-center items-center">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="w-screen h-screen">
        <Navbar />
        <div className="w-full h-[90%]  flex justify-center items-center">
          <h1 className="text-2xl font-semibold tracking-wider">
            Your cart is empty
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen">
      <div className="w-full h-full">
        <Navbar />
        <Toaster />

        <div className="w-full h-full flex flex-col gap-4 p-4">
          <h1 className="head-font text-2xl lg:text-4xl ">YOUR CART</h1>
          <div className="w-full h-full flex flex-col md:flex-row gap-4">
            {/* cart items  */}
            <div className="w-full md:w-3/5 h-fit flex flex-col border-2 border-gray-200 rounded-lg p-1 md:p-2 ">
              {cart?.map((item, index) => (
                <div
                  className={`w-full h-fit   border-gray-200 md:p-3 ${
                    index + 1 === cart.length ? "border-b-0" : "border-b-1"
                  }`}
                  key={index}
                >
                  <div className="flex gap-2 h-full items-center relative">
                    {/* delete button */}
                    <div className="absolute top-0 right-0">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="hover:bg-red-500 hover:text-white transition-all duration-300 text-red-500 p-2 rounded-full"
                      >
                        <TrashIcon className="w-6 h-6" />
                      </button>
                    </div>
                    {/* image */}
                    <div className="h-full flex justify-center items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 md:h-28  rounded-lg"
                      />
                    </div>
                    <div className="space-y-1">
                      <h1 className="font-medium tracking-wide text-base md:text-xl">
                        {item.name}
                      </h1>
                      <h4 className="text-xs">
                        Color:
                        <span className="text-gray-500">{item.color}</span>
                      </h4>
                      <h4 className="text-xs">
                        Size:
                        <span className="text-gray-500">{item.size}</span>
                      </h4>
                      <h4 className="text-xs">
                        Price:
                        <span className="text-gray-500">{item.price}</span>
                      </h4>
                      <h4 className="text-xs">
                        Quantity:
                        <span className="text-gray-500">{item.quantity}</span>
                      </h4>
                      <h4 className="text-2xl p-2 font-bold">
                        <span className="">₹{item.totalAmount}</span>
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* order summary  */}
            <div className="w-full md:w-2/5">
              <div className="w-full h-fit rounded-lg border-2 border-gray-200  p-3">
                {/* order summary title  */}
                <h1 className=" text-lg font-semibold lg:text-xl pb-6 ">
                  Order Summary
                </h1>

                {/* subtotal */}
                <div className="w-full h-full flex justify-between gap-2 p-2">
                  <h4 className="text-lg text-gray-500">Subtotal:</h4>
                  <h2 className="text-lg font-semibold">
                    ₹{cartSummary.totalAmount}
                  </h2>
                </div>

                {/* delivery charge  */}
                <div className="w-full h-full flex justify-between gap-2 p-2">
                  <h4 className="text-lg text-gray-500">Delivery Charge:</h4>
                  <h2 className="text-lg font-semibold">
                    ₹{cartSummary.deliveryCharges}
                  </h2>
                </div>

                {/* discount  */}
                <div className="w-full h-full flex justify-between gap-2 p-2">
                  <h4 className="text-lg text-gray-500">
                    Discount({cartSummary.discount}%):
                  </h4>
                  <h2 className="text-lg font-semibold text-red-500">
                    -₹{(cartSummary.totalAmount / 100) * cartSummary.discount}
                  </h2>
                </div>
                <hr className="w-full border-gray-200 my-4" />

                {/* grand total  */}
                <div className="w-full h-full flex justify-between gap-2 p-2">
                  <h4 className="text-lg text-gray-500">Grand Total:</h4>
                  <h2 className="text-lg font-semibold">
                    ₹{cartSummary.grandTotal}
                  </h2>
                </div>

                {/* checkout button  */}
                <div className="w-full h-full flex justify-center gap-2 p-2">
                  <button
                    onClick={() => pay(cartSummary.grandTotal, "1", "1")}
                    className="w-full bg-black text-white p-2 rounded-lg"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
