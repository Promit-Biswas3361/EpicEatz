import React, { useState } from "react";
import { IndianRupee, CircleSmall } from "lucide-react";
import OrderDetails from "./OrderDetails";

const newOrders = [
  {
    id: 1,
    restaurant: "Pizza Palace",
    items: [
      {
        name: "Margherita Pizza",
        price: 299,
        category: "Veg",
        img: "https://www.cookwithmanali.com/wp-content/uploads/2020/06/Margherita-Pizza-500x500.jpg",
        qty: 2,
      },
      {
        name: "Garlic Bread",
        price: 149,
        category: "Veg",
        img: "https://www.cookingclassy.com/wp-content/uploads/2019/10/garlic-bread-2-768x1152.jpg",
        qty: 1,
      },
    ],
    total: 824,
    status: "Delivered",
    date: "2025-03-14",
    address: {
      label: "Home Address",
      address: "123 Main Street, Apartment 4B, New York, NY 10001",
    },
  },
  {
    id: 2,
    restaurant: "Sushi House",
    items: [
      {
        name: "Salmon Roll",
        price: 450,
        category: "Non Veg",
        img: "https://www.allrecipes.com/thmb/-QGvCN5xwJBpQfoa4OY6Cvh66Cw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1437018-Spicy-Salmon-Sushi-Roll-ddmfs-4x3-2c496fdfd3e14bc78a9ab67036221918.jpg",
        qty: 3,
      },
      {
        name: "Miso Soup",
        price: 120,
        category: "Veg",
        img: "https://www.thespruceeats.com/thmb/g5cE8GqcsPpVsW4c4FXP8qObioI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/miso-soup-recipe-3121935-hero-01-8d10a14fb2c544f388650c8c08f8b37a.jpg",
        qty: 1,
      },
    ],
    total: 1584,
    status: "Cancelled",
    date: "2025-03-12",
    address: {
      label: "Office Address",
      address: "456 Corporate Blvd, Suite 1203, San Francisco, CA 94105",
    },
  },
  {
    id: 3,
    restaurant: "Coffee Corner",
    items: [
      {
        name: "Cappuccino",
        price: 150,
        category: "Veg",
        img: "https://www.allrecipes.com/thmb/chsZz0jqIHWYz39ViZR-9k_BkkE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8624835-how-to-make-a-cappuccino-beauty-4x3-0301-13d55eaad60b42058f24369c292d4ccb.jpg",
        qty: 5,
      },
    ],
    total: 828,
    status: "Pending",
    date: "2025-03-10",
    address: {
      label: "Summer House",
      address: "789 Beachfront Road, Unit 5, Miami Beach, FL 33139",
    },
  },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Orders = () => {
  const [orders, setOrders] = useState(newOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const cancelOrder = (id) => {
    const updatedOrders = orders.map((order) =>
      order.id === id && order.status === "Pending"
        ? { ...order, status: "Cancelled" }
        : order
    );

    setOrders(updatedOrders);
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <div>
      <h3 className="text-2xl font-extrabold mb-10">Past Orders</h3>

      <div className="">
        {orders.map((order) => (
          <div key={order.id} className="border-1 border-gray-400 p-3 mb-4">
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
