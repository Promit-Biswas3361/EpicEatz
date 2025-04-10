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

const OwnerOrders = () => {
  const [orders, setOrders] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditingOrderId, setIsEditingOrderId] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserOrders = async () => {
      let token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/restaurant/orders", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
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

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  const toggleEditingOrder = (order) => {
    if (order.status === "Pending") {
      setIsEditingOrderId((prev) => (prev === order.id ? null : order.id));
    }
  };

  const handleStatusChange = (newStatus, id) => {
    const updateOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );

    setOrders(updateOrders);
    setIsEditingOrderId(null);
  };

  return (
    <div>
      <h3 className="text-2xl font-extrabold mb-8">All Orders</h3>

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
                  <p className="text-lg font-semibold">{order.address.label}</p>

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
                <div
                  className={`flex flex-shrink-0 items-center h-fit border-1 border-gray-200 rounded-full px-2 cursor-pointer hover:bg-gray-100 ${
                    isEditingOrderId === order.id ? "hidden" : ""
                  }`}
                  onClick={() => toggleEditingOrder(order)}
                >
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

                {isEditingOrderId === order.id && (
                  <div className="mt-2 flex max-sm:flex-col space-x-2">
                    <button
                      className="bg-green-500 max-sm:w-19 max-sm:mb-1 max-md:text-xs max-md:h-8 max-md:px-1 md:h-10 md:px-1.5 md:text-sm text-white lg:h-12 lg:px-3 rounded-md cursor-pointer font-semibold text-center"
                      onClick={() => handleStatusChange("Delivered", order.id)}
                    >
                      DELIVERED
                    </button>
                    <button
                      className="bg-orange-500 max-sm:w-19 max-sm:mb-1 max-md:text-xs max-md:h-8 max-md:px-1 md:h-10 md:px-1.5 md:text-sm text-white lg:h-12 lg:px-3 rounded-md cursor-pointer font-semibold text-center"
                      onClick={() => handleStatusChange("Pending", order.id)}
                    >
                      PENDING
                    </button>
                    <button
                      className="bg-red-500 max-sm:w-19 max-sm:mb-1 max-md:text-xs max-md:h-8 max-md:px-1 md:h-10 md:px-1.5 md:text-sm text-white lg:h-12 lg:px-3 rounded-md cursor-pointer font-semibold text-center"
                      onClick={() => handleStatusChange("Cancelled", order.id)}
                    >
                      CANCELLED
                    </button>
                  </div>
                )}
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

export default OwnerOrders;
