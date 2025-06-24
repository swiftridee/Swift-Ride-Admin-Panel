
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
            SR
          </div>
          <span className="ml-4 text-4xl font-bold text-gray-900">Swift Ride</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          Vehicle Reservation System
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Manage your fleet with our comprehensive admin dashboard
        </p>
        
        <div className="space-y-4">
          <div>
            <Link to="/admin/login">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                Admin Login
              </Button>
            </Link>
          </div>
          
          <div className="text-sm text-gray-500">
            <p>Demo admin access - explore the dashboard features</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
