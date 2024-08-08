import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./order.css";

const Order = () => {
  const [loading, setLoading] = useState(true);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/orders");
      if (Array.isArray(response.data)) {
        setOrderList(response.data);
      } else {
        toast.error("Unexpected response structure. Please check the API response.");
      }
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch orders. Please try again.");
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`http://localhost:5000/orders/${orderId}`, { status });
      toast.success(`Order status updated to ${status}`);
      loadOrders(); // Reload orders to get the updated list
    } catch (error) {
      toast.error("Failed to update order status. Please try again.");
    }
  };

  return (
    <div className="order-container">
      {loading ? (
        <div>Loading...</div>
      ) : (
        orderList?.length > 0 ? (
          orderList?.map((order, index) => (
            <div className="order-card" key={order._id || index}>
              <h3 className="Heading">Order ID: {order._id}</h3>
              <div className="order-details">
                <div className="details-left">
                  <div>
                    <strong>User Details:</strong>
                    {order.userId ? (
                      <>
                        <p>Name: {order.userId.name}</p>
                        <p>Email: {order.userId.email}</p>
                        <p>Phone: {order.userId.phone}</p>
                      </>
                    ) : (
                      <p>No User Info</p>
                    )}
                  </div>
                  <div className="item">
                    <strong>Items:</strong>
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="item-details">
                        <p>Product ID: {item.productId?._id}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: {item.price}</p>
                      </div>
                    ))}
                  </div>
                  <p><strong>Total Amount:</strong> {order.totalAmount}</p>
                  <p><strong>Status:</strong> {order.status}</p>
                  <p><strong>Address:</strong> {order.address}</p>
                  <p><strong>Estimated Delivery:</strong> 
                    {order.estimatedDeliveryDate
                      ? new Date(order.estimatedDeliveryDate).toLocaleDateString()
                      : "No Date"}
                  </p>
                  <p><strong>Created At:</strong> 
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "No Date"}
                  </p>
                </div>
                
                <div className="details-right">
                  {order.items?.map((item, idx) => (
                    item.productId?.img && (
                      <img 
                        key={idx} 
                        src={item.productId?.img} 
                        alt={`Product ${item.productId?.name}`} 
                        className="product-image" 
                      />
                    )
                  ))}
                </div>
              </div>
              <div className="order-actions">
                {order.status === 'Pending' && (
                  <>
                    <button onClick={() => updateOrderStatus(order._id, 'Accepted')}>Accept</button>
                    <button onClick={() => updateOrderStatus(order._id, 'Declined')}>Decline</button>
                  </>
                )}
                {order.status === 'Accepted' && (
                  <>
                    <button onClick={() => updateOrderStatus(order._id, 'Dispatched')}>Dispatch</button>
                  </>
                )}
                {order.status === 'Dispatched' && (
                  <>
                    <button onClick={() => updateOrderStatus(order._id, 'Delivered')}>Delivered</button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-data">No Data</div>
        )
      )}
    </div>
  );
};

export default Order;
