import React, { useContext, useEffect, useState } from "react";
import api from "../../../api";
import Navbar from "../Navbar";
import { Link, Navigate } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../context/context";
function OrderPage() {
  const auth = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await api.get("/api/user/orders");
        console.log(res.data.orders);
        setOrders(res.data.orders);
      } catch (error) {
        toast.error("Error fetching orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (!auth.isAuth) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <div className="w-full h-full flex flex-col ">
          <Navbar />
          <div className="w-full h-full flex flex-col gap-4 p-4">
            <h1 className="text-3xl  head-font"> Your Orders</h1>
            <div className="w-full h-full flex flex-col gap-4 justify-center text-2xl font-medium tracking-wider items-center">
              <Loader2 size={50} className="animate-spin" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="w-screen h-screen">
        <div className="w-full h-full flex flex-col ">
          <Navbar />
          <div className="w-full h-full flex flex-col gap-4 p-4">
            <h1 className="text-3xl  head-font"> Your Orders</h1>
            <div className="w-full h-full flex flex-col gap-4 justify-center text-2xl font-medium tracking-wider items-center">
              you have no orders yet
              <Link to="/shop/1/all/all/all">
                <button className="bg-black text-white px-4 py-2 text-sm rounded-md flex items-center gap-2">
                  <GiShoppingCart /> Start Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen  h-screen">
      <div className="w-full h-full flex flex-col ">
        <Navbar />
        <div className="w-full h-full flex flex-col gap-4 px-4 ">
          <h1 className="text-3xl h-[4%] head-font"> Your Orders</h1>
          <div className="w-full h-[90%] overflow-y-scroll grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5   gap-4 p-2">
            {orders.map((order) => (
              <div
                key={order._id}
                className="p-2 w-full h-fit  outline outline-gray-300 "
              >
                {/* status container  */}
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium tracking-wider">
                    Status:{" "}
                    <span className="animate-pulse"> {order.status}</span>
                  </p>
                </div>

                {/* expected delivery date container  */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium tracking-wider">
                    Expected Delivery:{" "}
                    <span className="font-bold text-green-900">
                      {new Date(order.deliveryDate).toLocaleDateString()}
                    </span>
                  </span>
                </div>

                {/* image container  */}
                <div className="h-40 w-full">
                  <img
                    className="w-full h-full object-cover"
                    src={order.product.images[0]}
                    alt=""
                  />
                </div>
                {/* product details container  */}
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium tracking-wider">
                    {order.product.name}
                  </p>
                  <p className="text-sm font-medium tracking-wider">
                    color: {order.color}
                  </p>
                  <p className="text-sm font-medium tracking-wider">
                    size: {order.size}
                  </p>
                  <p className="text-sm font-medium tracking-wider">
                    price: ₹{order.product.price}
                  </p>
                  <p className="text-sm font-medium tracking-wider">
                    quantity: {order.quantity}
                  </p>
                  <span className="text-sm font-medium tracking-wider">
                    total price:{" "}
                    <span className="line-through text-gray-500">
                      ₹{order.product.price * order.quantity}
                    </span>
                    <span className="font-bold px-2">₹{order.finalPrice}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
