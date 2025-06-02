import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    
    // Create admin user if it doesn't exist
    const adminUser = await User.findOne({ isAdmin: true });
    let adminUserId;
    
    if (!adminUser) {
      const createdAdmin = await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        isAdmin: true,
      });
      adminUserId = createdAdmin._id;
      console.log('Admin user created'.green.inverse);
    } else {
      adminUserId = adminUser._id;
      console.log('Admin user already exists'.yellow);
    }
    
    // Add user reference to products
    const sampleProducts = products.map(product => {
      return { ...product, user: adminUserId };
    });

    // Insert products
    const createdProducts = await Product.insertMany(sampleProducts);

    console.log(`${createdProducts.length} Produkte wurden importiert!`.green.inverse);
    
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    
    console.log('Alle Produkte wurden gelöscht!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Check command line args to determine operation
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
