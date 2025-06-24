
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';

const AdminForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password reset requested for:', email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full"></div>
            </div>
            <h2 className="text-xl font-semibold mb-2">Check your email</h2>
            <p className="text-gray-600 mb-6">
              We've sent a password reset link to {email}
            </p>
            <Link to="/admin/login">
              <Button 
                className="w-full text-white hover:opacity-90"
                style={{ backgroundColor: 'rgb(79, 158, 234)' }}
              >
                Back to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="text-2xl font-normal" style={{ fontSize: '24px', lineHeight: '32px' }}>
              <span style={{ color: 'rgb(79, 158, 234)' }}>Swift</span>
              <span style={{ color: 'rgb(255, 114, 94)' }}>Ride</span>
            </span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Forgot Password</CardTitle>
          <p className="text-gray-600">Enter your email to receive a reset link</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10"
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', lineHeight: '24px' }}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full text-white hover:opacity-90"
              style={{ backgroundColor: 'rgb(79, 158, 234)' }}
            >
              Send Reset Link
            </Button>
          </form>
          <div className="mt-6 text-center">
            <Link 
              to="/admin/login" 
              className="text-sm hover:underline"
              style={{ color: 'rgb(79, 158, 234)' }}
            >
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminForgotPassword;
