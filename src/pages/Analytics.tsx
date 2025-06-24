import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";

const Analytics: React.FC = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Analytics</h1>
        <div className="bg-white rounded-lg shadow p-6">
          {/* Analytics content will go here */}
          <p>Analytics dashboard coming soon...</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Analytics;
