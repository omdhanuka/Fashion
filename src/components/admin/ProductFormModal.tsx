import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { FiX } from 'react-icons/fi';
import { AxiosError } from 'axios';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: { _id: string; name: string };
  description: string;
  stockQuantity: number;
  status: string;
  imageUrl: string;
}

interface Category {
  _id: string;
  name: string;
}

interface ProductFormModalProps {
  product: Product | null;
  onClose: () => void;
  onSuccess: () => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ product, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    stockQuantity: '',
    status: 'Active',
  });
  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    fetchCategories();
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        category: product.category._id,
        description: product.description,
        stockQuantity: product.stockQuantity.toString(),
        status: product.status,
      });
      setPreviewUrl(product.imageUrl);
    }
  }, [product]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/admin/categories');
      setCategories(response.data.data);
    } catch (error) {
      toast.error('Failed to load categories');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('description', formData.description);
      data.append('stockQuantity', formData.stockQuantity);
      data.append('status', formData.status);
      
      if (image) {
        data.append('image', image);
      }

      if (product) {
        await api.put(`/admin/products/${product._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Product updated successfully');
      } else {
        await api.post('/admin/products', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Product created successfully');
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
            {product ? 'Edit Product' : 'Add Product'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Price *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Stock Quantity *</label>
                <input
                  type="number"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
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
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Image {!product && '*'}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required={!product}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="mt-4 w-32 h-32 object-cover rounded"
                />
              )}
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
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

export default ProductFormModal;
