
import { useState } from "react";
import Header from "@/components/Header";
import ShoppingCart from "@/components/ShoppingCart";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Users, Shield, Truck } from "lucide-react";

const About = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About ModernShop</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're passionate about bringing you the finest selection of modern, high-quality products 
            that enhance your lifestyle and reflect your personal style.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2020, Shoporia began as a vision to create a curated marketplace 
              for contemporary products that combine style, functionality, and quality.
            </p>
            <p className="text-gray-600 mb-4">
              We believe that great design should be accessible to everyone, which is why we 
              carefully select each product in our collection to ensure it meets our high 
              standards for both aesthetics and functionality.
            </p>
            <p className="text-gray-600">
              Today, we're proud to serve customers worldwide, helping them discover products 
              that truly make a difference in their daily lives.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700">
                To make modern, quality design accessible to everyone through carefully 
                curated products and exceptional customer service.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Star className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Quality First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Every product is carefully tested and selected for superior quality and durability.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Customer Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Your satisfaction is our priority, with dedicated support and service.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Trust & Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Shop with confidence knowing your data and transactions are secure.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Truck className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Quick and reliable shipping to get your products to you when you need them.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold mb-2">10,000+</h3>
              <p className="text-purple-100">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">500+</h3>
              <p className="text-purple-100">Products Available</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">4.9/5</h3>
              <p className="text-purple-100">Customer Rating</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default About;
