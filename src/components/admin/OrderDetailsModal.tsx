import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { FiX } from 'react-icons/fi';

interface OrderDetails {
  _id: string;
  userId: string;
  userEmail: string;
  items: Array<{
    productId: { _id: string; name: string };
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }>;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  subtotal: number;
  coupon?: {
    code: string;
    discountAmount: number;
  };
  total: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
}

interface OrderDetailsModalProps {
  orderId: string;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ orderId, onClose }) => {
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await api.get(`/admin/orders/${orderId}`);
      setOrder(response.data.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white">
          <h2 className="text-2xl font-bold">Order Details #{order._id.slice(-8)}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Order Date</p>
              <p className="font-medium">{formatDate(order.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="font-medium">{order.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Customer Email</p>
              <p className="font-medium">{order.userEmail}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Payment Method</p>
              <p className="font-medium">{order.paymentMethod}</p>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="font-bold text-lg mb-2">Shipping Address</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                {order.shippingAddress.zipCode}
              </p>
              <p>{order.shippingAddress.country}</p>
              <p className="mt-2">Phone: {order.shippingAddress.phone}</p>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-bold text-lg mb-2">Order Items</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Product
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Price
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Quantity
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {order.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <span>{item.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">${item.price.toFixed(2)}</td>
                      <td className="px-4 py-3">{item.quantity}</td>
                      <td className="px-4 py-3 font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h3 className="font-bold text-lg mb-2">Order Summary</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              {order.coupon && (
                <div className="flex justify-between text-green-600">
                  <span>
                    Discount ({order.coupon.code})
                  </span>
                  <span>-${order.coupon.discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
