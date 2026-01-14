import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase.config';
import toast from 'react-hot-toast';
import { 
  FiHome, 
  FiShoppingBag, 
  FiFolder, 
  FiTag, 
  FiShoppingCart, 
  FiUsers, 
  FiLogOut 
} from 'react-icons/fi';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate('/admin/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const navItems = [
    { path: '/admin/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/admin/products', icon: FiShoppingBag, label: 'Products' },
    { path: '/admin/categories', icon: FiFolder, label: 'Categories' },
    { path: '/admin/coupons', icon: FiTag, label: 'Coupons' },
    { path: '/admin/orders', icon: FiShoppingCart, label: 'Orders' },
    { path: '/admin/users', icon: FiUsers, label: 'Users' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        </div>

        <nav className="p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg mb-2 text-red-600 hover:bg-red-50 transition w-full mt-4"
          >
            <FiLogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
