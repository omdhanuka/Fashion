import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { FiX } from 'react-icons/fi';

interface Coupon {
  _id: string;
  code: string;
  discountType: string;
  discountValue: number;
  minOrderValue: number;
  maxDiscountAmount: number | null;
  expiryDate: string;
  usageLimit: number | null;
  status: string;
}

interface CouponFormModalProps {
  coupon: Coupon | null;
  onClose: () => void;
  onSuccess: () => void;
}

const CouponFormModal: React.FC<CouponFormModalProps> = ({ coupon, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: '',
    minOrderValue: '0',
    maxDiscountAmount: '',
    expiryDate: '',
    usageLimit: '',
    status: 'Active',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (coupon) {
      setFormData({
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue.toString(),
        minOrderValue: coupon.minOrderValue.toString(),
        maxDiscountAmount: coupon.maxDiscountAmount?.toString() || '',
        expiryDate: coupon.expiryDate.split('T')[0],
        usageLimit: coupon.usageLimit?.toString() || '',
        status: coupon.status,
      });
    }
  }, [coupon]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        code: formData.code,
        discountType: formData.discountType,
        discountValue: Number(formData.discountValue),
        minOrderValue: Number(formData.minOrderValue),
        maxDiscountAmount: formData.maxDiscountAmount ? Number(formData.maxDiscountAmount) : null,
        expiryDate: new Date(formData.expiryDate).toISOString(),
        usageLimit: formData.usageLimit ? Number(formData.usageLimit) : null,
        status: formData.status,
      };

      if (coupon) {
        await api.put(`/admin/coupons/${coupon._id}`, payload);
        toast.success('Coupon updated successfully');
      } else {
        await api.post('/admin/coupons', payload);
        toast.success('Coupon created successfully');
      }
      onSuccess();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white">
          <h2 className="text-2xl font-bold">
            {coupon ? 'Edit Coupon' : 'Add Coupon'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Coupon Code *</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 uppercase"
                placeholder="SUMMER2024"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Discount Type *</label>
                <select
                  name="discountType"
                  value={formData.discountType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="flat">Flat Amount ($)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Discount Value *</label>
                <input
                  type="number"
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={handleChange}
                  required
                  min="0"
                  max={formData.discountType === 'percentage' ? '100' : undefined}
                  step="0.01"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Min Order Value</label>
                <input
                  type="number"
                  name="minOrderValue"
                  value={formData.minOrderValue}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Max Discount Amount</label>
                <input
                  type="number"
                  name="maxDiscountAmount"
                  value={formData.maxDiscountAmount}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Optional"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Expiry Date *</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Usage Limit</label>
                <input
                  type="number"
                  name="usageLimit"
                  value={formData.usageLimit}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Unlimited"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : coupon ? 'Update Coupon' : 'Create Coupon'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CouponFormModal;
