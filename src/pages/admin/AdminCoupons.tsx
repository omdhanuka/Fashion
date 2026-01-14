import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { FiEdit2, FiTrash2, FiPlus, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import CouponFormModal from '../../components/admin/CouponFormModal';

interface Coupon {
  _id: string;
  code: string;
  discountType: string;
  discountValue: number;
  minOrderValue: number;
  maxDiscountAmount: number | null;
  expiryDate: string;
  usageLimit: number | null;
  usedCount: number;
  status: string;
}

const AdminCoupons: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await api.get('/admin/coupons');
      setCoupons(response.data.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to load coupons');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this coupon?')) return;

    try {
      await api.delete(`/admin/coupons/${id}`);
      toast.success('Coupon deleted successfully');
      fetchCoupons();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete coupon');
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await api.patch(`/admin/coupons/${id}/toggle-status`);
      toast.success('Coupon status updated');
      fetchCoupons();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingCoupon(null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingCoupon(null);
  };

  const handleSuccess = () => {
    fetchCoupons();
    handleModalClose();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isExpired = (date: string) => {
    return new Date(date) < new Date();
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-xl">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Coupons</h1>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <FiPlus size={20} />
            Add Coupon
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Discount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Min Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Usage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Expiry
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {coupons.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No coupons found
                    </td>
                  </tr>
                ) : (
                  coupons.map((coupon) => (
                    <tr key={coupon._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-bold text-blue-600">{coupon.code}</td>
                      <td className="px-6 py-4">
                        {coupon.discountType === 'percentage'
                          ? `${coupon.discountValue}%`
                          : `$${coupon.discountValue}`}
                        {coupon.maxDiscountAmount && (
                          <div className="text-xs text-gray-500">
                            Max: ${coupon.maxDiscountAmount}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">${coupon.minOrderValue}</td>
                      <td className="px-6 py-4">
                        {coupon.usedCount}
                        {coupon.usageLimit && ` / ${coupon.usageLimit}`}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={isExpired(coupon.expiryDate) ? 'text-red-600' : ''}
                        >
                          {formatDate(coupon.expiryDate)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            coupon.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {coupon.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleStatus(coupon._id)}
                            className="p-2 text-purple-600 hover:bg-purple-50 rounded transition"
                            title="Toggle Status"
                          >
                            {coupon.status === 'Active' ? (
                              <FiToggleRight size={20} />
                            ) : (
                              <FiToggleLeft size={20} />
                            )}
                          </button>
                          <button
                            onClick={() => handleEdit(coupon)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                          >
                            <FiEdit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(coupon._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <CouponFormModal
            coupon={editingCoupon}
            onClose={handleModalClose}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCoupons;
