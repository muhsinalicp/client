import React, { useEffect } from "react";
import api from "../../../api";

function OrderPage() {
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await api.get("/api/user/orders");
    };
    fetchOrders();
  }, []);

  return <div>OrderPage</div>;
}

export default OrderPage;
