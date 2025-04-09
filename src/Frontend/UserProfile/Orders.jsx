import React, { useState, useEffect } from "react";
import { IndianRupee, CircleSmall } from "lucide-react";
import OrderDetails from "./OrderDetails";
import { useNavigate } from "react-router-dom";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
      const fetchUserOrders = async () => {
        let token = localStorage.getItem("token");
        if (!token) {
          navigate("/"); // Redirect if not logged in
          return;
        }
  
        try {
          const response = await fetch("http://localhost:5000/api/user/orders", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          const data = await response.json();
          console.log(data.orders)
          if (response.ok) {
            setOrders(data.orders);
          } else {
            alert(data.message);
            localStorage.removeItem("token"); // Clear invalid token
            navigate("/");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          localStorage.removeItem("token"); // Remove token in case of error
          navigate("/");
        }
      };
  
      fetchUserOrders();
    }, [navigate]);

  const cancelOrder = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/orders/${id}/cancel`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Update the UI after successful cancellation
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === id ? { ...order, status: "Cancelled" } : order
          )
        );
      } else {
        alert(data.message || "Failed to cancel order");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Something went wrong");
    }
  };


  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <div>
      <h3 className="text-2xl font-extrabold mb-8">Past Orders</h3>

      <div className="">
        {!(orders && orders.length > 0) && (
          <p className="text-lg">No orders found!!</p>
        )}
        {orders &&
          orders.length > 0 &&
          orders.map((order) => (
            <div key={order.id} className="border border-gray-400 p-3 mb-4">
              <div className="flex justify-between border-b-3 border-dotted border-gray-200 mb-3">
                <div className="flex-grow">
                  <p className="text-lg font-semibold">{order.restaurant}</p>

                  <div className="flex text-xs text-gray-500 mb-3">
                    <p className="mr-1">Order #{order.id}</p>
                    <p className="mr-1"> | </p>
                    <p>{formatDate(order.date)}</p>
                  </div>

                  <div
                    className="cursor-pointer font-bold text-orange-500 hover:text-orange-700 mb-1.5"
                    onClick={() => viewOrderDetails(order)}
                  >
                    <p>View Details</p>
                  </div>
                </div>
                <div className="flex items-center h-fit border-1 border-gray-200 rounded-full px-2">
                  <CircleSmall
                    size={13}
                    color={
                      order.status === "Delivered"
                        ? "green"
                        : order.status === "Pending"
                        ? "orange"
                        : order.status === "Cancelled"
                        ? "red"
                        : "#6b7280"
                    }
                    fill={
                      order.status === "Delivered"
                        ? "green"
                        : order.status === "Pending"
                        ? "orange"
                        : order.status === "Cancelled"
                        ? "red"
                        : "#6b7280"
                    }
                  />
                  <p className="ml-1 text-sm">{order.status}</p>
                </div>
              </div>
              <div className="">
                <div className="flex justify-between">
                  <p>Total items: {order.items.length}</p>
                  <div className="flex items-center">
                    <p className="mr-1.5">Amount:</p>
                    <IndianRupee size={14} />
                    <p> {order.total}</p>
                  </div>
                </div>

                {order.status === "Pending" && (
                  <div className="text-center mt-3">
                    <button
                      className="bg-red-500 rounded-lg cursor-pointer px-2.5 py-1 text-white hover:bg-red-600"
                      onClick={() => cancelOrder(order.id)}
                    >
                      CANCEL
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      {selectedOrder && (
        <OrderDetails order={selectedOrder} onClose={closeOrderDetails} />
      )}
    </div>
  );
};

export default Orders;
