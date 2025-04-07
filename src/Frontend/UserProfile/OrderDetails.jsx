import React, { useState, useEffect } from "react";
import { X, MapPin, CircleSmall, IndianRupee, MapPinHouse } from "lucide-react";
import veg from "../../assets/veg.png";
import nonveg from "../../assets/nonveg.jpg";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const OrderDetails = ({ order, onClose }) => {
  const [itemTotal, setItemTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (order && order.items.length > 0) {
      let total = order.items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );
      setItemTotal(total);
      total = Math.round(total * 1.05 + 40);
      setTotalAmount(total);
    }
  }, [order.items]);

  return (
    <div className="fixed top-0 right-0 pl-8 pr-3 py-5 bg-white z-50 h-screen shadow-2xl max-sm:w-full sm:w-80 md:w-100">
      <div className="border-b-1">
        <div className="flex justify-between items-center mb-6">
          <p className="text-xl font-bold">Order #{order.id}</p>
          <X onClick={onClose} className="cursor-pointer" />
        </div>
        <div className="flex items-center mb-3.5">
          <MapPin />
          <p className="text-lg font-semibold ml-2.5">{order.restaurant}</p>
        </div>
        <div className="flex items-center mb-5">
          <MapPinHouse className="flex-shrink-0" />
          <div className="ml-2.5 w-full">
            <p className="text-lg font-semibold">{order.address.label}</p>
            <p className="text-sm text-gray-500 break-words">{order.address.address}</p>
          </div>
        </div>
        <div className="flex justify-between items-center pb-3.5">
          <p className="text-sm">{formatDate(order.date)}</p>
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
      </div>

      <div className="mt-5">
        <p className="font-bold text-gray-500 mb-1.5">
          Total Items : {order.items.length}
        </p>
        <div className="border-b-3 border-dotted border-gray-300 pb-1.5">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center text-sm mb-1.5">
              <div className="w-fit">
                {item.category == "Veg" && (
                  <img src={veg} alt="Veg" className="h-4 w-4" />
                )}
                {item.category == "Non Veg" && (
                  <img src={nonveg} alt="Non Veg" className="h-3.5 w-3.5" />
                )}
              </div>
              <div className="flex-grow ml-2">
                <p className="font-semibold">
                  {item.name} X {item.qty}
                </p>
              </div>
              <div className="flex items-center">
                <IndianRupee size={15} />
                <p className="font-semibold">{item.price * item.qty}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2.5">
          <div className="border-b-1 text-sm">
            <div className="flex justify-between mb-1.5">
              <p>Item total</p>
              <div className="flex items-center">
                <IndianRupee size={13} />
                <p>{itemTotal}</p>
              </div>
            </div>
            <div className="flex justify-between mb-1.5">
              <p>Delivery Fee</p>
              <div className="flex items-center">
                <IndianRupee size={13} />
                <p>40</p>
              </div>
            </div>
            <div className="flex justify-between mb-2.5">
              <p>Taxes</p>
              <div className="flex items-center">
                <IndianRupee size={13} />
                <p>{itemTotal * 0.05}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between font-bold mt-3">
            <p>BILL TOTAL</p>
            <div className="flex items-center">
              <IndianRupee size={16} />
              <p>{order.total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
