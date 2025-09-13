require('dotenv').config();
const mongoose = require('mongoose');

// Import models
const User = require('../models/User');
const Product = require('../models/Product');
const Staff = require('../models/Staff');
const Supplier = require('../models/Supplier');
const Sale = require('../models/Sale');
const Expense = require('../models/Expense');
const PurchaseOrder = require('../models/PurchaseOrder');

// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://sathish07002_db_user:strikers_04@cluster0.mqpyomy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Sample data
const sampleUsers = [
  {
    username: 'admin',
    email: 'admin@inventory.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    isActive: true,
    preferences: {
      darkMode: false,
      remainderSettings: {
        enabled: true,
        threshold: 0.25,
        reminderTime: '09:00',
        reminderDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        notificationMethod: 'dashboard'
      }
    }
  },
  {
    username: 'manager1',
    email: 'manager@inventory.com',
    password: 'manager123',
    firstName: 'John',
    lastName: 'Manager',
    role: 'manager',
    isActive: true
  },
  {
    username: 'staff1',
    email: 'staff@inventory.com',
    password: 'staff123',
    firstName: 'Jane',
    lastName: 'Staff',
    role: 'staff',
    isActive: true
  }
];

const sampleSuppliers = [
  {
    name: 'Global Textiles',
    contact: 'sales@globaltextiles.com',
    phone: '+919876543210',
    address: {
      street: '123 Textile Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001',
      country: 'India'
    },
    contactPerson: {
      name: 'Rajesh Kumar',
      position: 'Sales Manager',
      phone: '+919876543211',
      email: 'rajesh@globaltextiles.com'
    },
    paymentTerms: 'Net 30',
    creditLimit: 100000,
    rating: 4,
    isActive: true
  },
  {
    name: 'Coffee Co',
    contact: 'orders@coffeeco.io',
    phone: '+919876543212',
    address: {
      street: '456 Coffee Lane',
      city: 'Bangalore',
      state: 'Karnataka',
      zipCode: '560001',
      country: 'India'
    },
    contactPerson: {
      name: 'Priya Sharma',
      position: 'Order Manager',
      phone: '+919876543213',
      email: 'priya@coffeeco.io'
    },
    paymentTerms: 'Net 15',
    creditLimit: 50000,
    rating: 5,
    isActive: true
  },
  {
    name: 'Electronics Hub',
    contact: 'sales@electronicshub.com',
    phone: '+919876543214',
    address: {
      street: '789 Tech Park',
      city: 'Delhi',
      state: 'Delhi',
      zipCode: '110001',
      country: 'India'
    },
    contactPerson: {
      name: 'Amit Singh',
      position: 'Sales Director',
      phone: '+919876543215',
      email: 'amit@electronicshub.com'
    },
    paymentTerms: 'Net 45',
    creditLimit: 200000,
    rating: 4,
    isActive: true
  }
];

const sampleProducts = [
  // Sports
  {
    sku: 'BALL-FOOT-001',
    name: 'Football',
    description: 'Professional football for outdoor games',
    category: 'Sports',
    variant: 'Size 5',
    price: 1200,
    cost: 800,
    stock: 15,
    minStock: 5,
    unit: 'piece',
    tags: ['sports', 'football', 'outdoor']
  },
  {
    sku: 'RACKET-BAD-001',
    name: 'Badminton Racket',
    description: 'Professional badminton racket',
    category: 'Sports',
    variant: 'Professional',
    price: 2500,
    cost: 1800,
    stock: 8,
    minStock: 3,
    unit: 'piece',
    tags: ['sports', 'badminton', 'racket']
  },
  {
    sku: 'SHOES-RUN-001',
    name: 'Running Shoes',
    description: 'Comfortable running shoes',
    category: 'Sports',
    variant: 'Size 9',
    price: 4500,
    cost: 3200,
    stock: 12,
    minStock: 4,
    unit: 'pair',
    tags: ['sports', 'shoes', 'running']
  },
  
  // Groceries
  {
    sku: 'RICE-BAS-001',
    name: 'Basmati Rice',
    description: 'Premium basmati rice',
    category: 'Groceries',
    variant: '1kg',
    price: 180,
    cost: 120,
    stock: 25,
    minStock: 10,
    unit: 'kg',
    expiryDate: new Date('2026-12-01'),
    tags: ['groceries', 'rice', 'food']
  },
  {
    sku: 'OIL-SUN-001',
    name: 'Sunflower Oil',
    description: 'Pure sunflower cooking oil',
    category: 'Groceries',
    variant: '1L',
    price: 120,
    cost: 80,
    stock: 18,
    minStock: 5,
    unit: 'liter',
    expiryDate: new Date('2025-11-15'),
    tags: ['groceries', 'oil', 'cooking']
  },
  {
    sku: 'SUGAR-WHT-001',
    name: 'White Sugar',
    description: 'Pure white sugar',
    category: 'Groceries',
    variant: '500g',
    price: 45,
    cost: 30,
    stock: 30,
    minStock: 10,
    unit: 'gram',
    expiryDate: new Date('2026-06-01'),
    tags: ['groceries', 'sugar', 'sweetener']
  },
  
  // Dairy Products
  {
    sku: 'MILK-FRESH-001',
    name: 'Fresh Milk',
    description: 'Fresh cow milk',
    category: 'Dairy Products',
    variant: '1L',
    price: 60,
    cost: 40,
    stock: 20,
    minStock: 5,
    unit: 'liter',
    expiryDate: new Date('2025-09-20'),
    tags: ['dairy', 'milk', 'fresh']
  },
  {
    sku: 'CHEESE-CHE-001',
    name: 'Cheddar Cheese',
    description: 'Aged cheddar cheese',
    category: 'Dairy Products',
    variant: '200g',
    price: 150,
    cost: 100,
    stock: 10,
    minStock: 3,
    unit: 'gram',
    expiryDate: new Date('2025-10-15'),
    tags: ['dairy', 'cheese', 'cheddar']
  },
  {
    sku: 'YOGURT-PLAIN-001',
    name: 'Plain Yogurt',
    description: 'Natural plain yogurt',
    category: 'Dairy Products',
    variant: '500g',
    price: 80,
    cost: 55,
    stock: 15,
    minStock: 5,
    unit: 'gram',
    expiryDate: new Date('2025-09-25'),
    tags: ['dairy', 'yogurt', 'plain']
  },
  
  // Stationary
  {
    sku: 'PEN-BLUE-001',
    name: 'Blue Pen',
    description: 'Blue ball point pen',
    category: 'Stationary',
    variant: 'Ball Point',
    price: 15,
    cost: 8,
    stock: 50,
    minStock: 20,
    unit: 'piece',
    tags: ['stationary', 'pen', 'writing']
  },
  {
    sku: 'NOTEBOOK-A4-001',
    name: 'A4 Notebook',
    description: 'A4 size ruled notebook',
    category: 'Stationary',
    variant: '200 pages',
    price: 120,
    cost: 80,
    stock: 25,
    minStock: 10,
    unit: 'piece',
    tags: ['stationary', 'notebook', 'writing']
  },
  {
    sku: 'PENCIL-HB-001',
    name: 'HB Pencil',
    description: 'HB graphite pencil',
    category: 'Stationary',
    variant: 'Pack of 10',
    price: 50,
    cost: 30,
    stock: 40,
    minStock: 15,
    unit: 'pack',
    tags: ['stationary', 'pencil', 'drawing']
  },
  
  // Electronics
  {
    sku: 'BATTERY-AA-001',
    name: 'AA Batteries',
    description: 'Rechargeable AA batteries',
    category: 'Electronics',
    variant: 'Pack of 4',
    price: 120,
    cost: 80,
    stock: 25,
    minStock: 10,
    unit: 'pack',
    tags: ['electronics', 'batteries', 'power']
  },
  {
    sku: 'CABLE-USB-001',
    name: 'USB Cable',
    description: 'USB-A to USB-C cable',
    category: 'Electronics',
    variant: '1m',
    price: 150,
    cost: 100,
    stock: 15,
    minStock: 5,
    unit: 'piece',
    tags: ['electronics', 'cable', 'usb']
  },
  {
    sku: 'CHARGER-PHONE-001',
    name: 'Phone Charger',
    description: 'Fast charging phone charger',
    category: 'Electronics',
    variant: 'Type-C',
    price: 300,
    cost: 200,
    stock: 12,
    minStock: 5,
    unit: 'piece',
    tags: ['electronics', 'charger', 'phone']
  },
  {
    sku: 'EARPHONE-WIRE-001',
    name: 'Wired Earphones',
    description: 'High quality wired earphones',
    category: 'Electronics',
    variant: '3.5mm',
    price: 250,
    cost: 150,
    stock: 18,
    minStock: 6,
    unit: 'piece',
    tags: ['electronics', 'earphones', 'audio']
  },
  {
    sku: 'POWERBANK-10000-001',
    name: 'Power Bank',
    description: '10000mAh portable power bank',
    category: 'Electronics',
    variant: '10000mAh',
    price: 1200,
    cost: 800,
    stock: 8,
    minStock: 3,
    unit: 'piece',
    tags: ['electronics', 'powerbank', 'portable']
  },
  {
    sku: 'MEMORY-CARD-001',
    name: 'Memory Card',
    description: '32GB microSD memory card',
    category: 'Electronics',
    variant: '32GB',
    price: 400,
    cost: 250,
    stock: 10,
    minStock: 4,
    unit: 'piece',
    tags: ['electronics', 'memory', 'storage']
  }
];

const sampleStaff = [
  {
    name: 'Rajesh Kumar',
    position: 'Worker',
    department: 'Staff',
    salary: 25000,
    address: 'Near City Market, Main Road, Mumbai',
    joinDate: new Date('2020-01-01'),
    experience: '8 years',
    contact: '+919876543210',
    email: 'rajesh@inventory.com',
    status: 'active',
    emergencyContact: {
      name: 'Sita Kumar',
      relationship: 'Wife',
      phone: '+919876543220'
    }
  },
  {
    name: 'Priya Sharma',
    position: 'Sales Associate',
    department: 'Sales',
    salary: 35000,
    address: '123 Sales Street, Bangalore',
    joinDate: new Date('2021-03-15'),
    experience: '5 years',
    contact: '+919876543211',
    email: 'priya@inventory.com',
    status: 'active',
    emergencyContact: {
      name: 'Ravi Sharma',
      relationship: 'Husband',
      phone: '+919876543221'
    }
  },
  {
    name: 'Amit Singh',
    position: 'Inventory Manager',
    department: 'Inventory',
    salary: 50000,
    address: '456 Manager Lane, Delhi',
    joinDate: new Date('2019-06-01'),
    experience: '10 years',
    contact: '+919876543212',
    email: 'amit@inventory.com',
    status: 'active',
    emergencyContact: {
      name: 'Sunita Singh',
      relationship: 'Wife',
      phone: '+919876543222'
    }
  },
  {
    name: 'Sneha Patel',
    position: 'Accountant',
    department: 'Finance',
    salary: 40000,
    address: '789 Finance Road, Pune',
    joinDate: new Date('2020-09-01'),
    experience: '6 years',
    contact: '+919876543213',
    email: 'sneha@inventory.com',
    status: 'active',
    emergencyContact: {
      name: 'Vikram Patel',
      relationship: 'Brother',
      phone: '+919876543223'
    }
  }
];

// Function to clear existing data
async function clearDatabase() {
  try {
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    await Staff.deleteMany({});
    await Supplier.deleteMany({});
    await Sale.deleteMany({});
    await Expense.deleteMany({});
    await PurchaseOrder.deleteMany({});
    console.log('✅ Database cleared successfully');
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    throw error;
  }
}

// Function to seed users
async function seedUsers() {
  try {
    console.log('👥 Seeding users...');
    const users = await User.insertMany(sampleUsers);
    console.log(`✅ Created ${users.length} users`);
    return users;
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
}

// Function to seed suppliers
async function seedSuppliers() {
  try {
    console.log('🏢 Seeding suppliers...');
    const suppliers = await Supplier.insertMany(sampleSuppliers);
    console.log(`✅ Created ${suppliers.length} suppliers`);
    return suppliers;
  } catch (error) {
    console.error('❌ Error seeding suppliers:', error);
    throw error;
  }
}

// Function to seed products
async function seedProducts(suppliers) {
  try {
    console.log('📦 Seeding products...');
    const products = [];
    
    for (let i = 0; i < sampleProducts.length; i++) {
      const productData = { ...sampleProducts[i] };
      // Assign random supplier
      productData.supplier = suppliers[Math.floor(Math.random() * suppliers.length)]._id;
      
      const product = await Product.create(productData);
      products.push(product);
    }
    
    console.log(`✅ Created ${products.length} products`);
    return products;
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    throw error;
  }
}

// Function to seed staff
async function seedStaff() {
  try {
    console.log('👨‍💼 Seeding staff...');
    const staff = await Staff.insertMany(sampleStaff);
    console.log(`✅ Created ${staff.length} staff members`);
    return staff;
  } catch (error) {
    console.error('❌ Error seeding staff:', error);
    throw error;
  }
}

// Function to seed sample sales
async function seedSales(users, products) {
  try {
    console.log('💰 Seeding sales...');
    const sales = [];
    
    for (let i = 0; i < 20; i++) {
      const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);
      const items = randomProducts.map(product => ({
        product: product._id,
        quantity: Math.floor(Math.random() * 5) + 1,
        unitPrice: product.price,
        total: product.price * (Math.floor(Math.random() * 5) + 1)
      }));
      
      const subtotal = items.reduce((sum, item) => sum + item.total, 0);
      const tax = subtotal * 0.18; // 18% tax
      const total = subtotal + tax;
      
      const sale = new Sale({
        customer: {
          name: `Customer ${i + 1}`,
          email: `customer${i + 1}@example.com`,
          phone: `+91 98765 ${String(i).padStart(5, '0')}`
        },
        items,
        subtotal,
        tax,
        total,
        paymentMethod: ['cash', 'card', 'upi'][Math.floor(Math.random() * 3)],
        channel: ['POS', 'Online', 'Walk-in'][Math.floor(Math.random() * 3)],
        status: ['pending', 'confirmed', 'delivered'][Math.floor(Math.random() * 3)],
        paymentStatus: ['pending', 'paid'][Math.floor(Math.random() * 2)],
        processedBy: users[Math.floor(Math.random() * users.length)]._id
      });
      
      await sale.save();
      sales.push(sale);
    }
    
    console.log(`✅ Created ${sales.length} sales`);
    return sales;
  } catch (error) {
    console.error('❌ Error seeding sales:', error);
    throw error;
  }
}

// Function to seed sample expenses
async function seedExpenses(users) {
  try {
    console.log('💸 Seeding expenses...');
    const expenses = [];
    
    const expenseCategories = ['Rent', 'Utilities', 'Logistics', 'Marketing', 'Office Supplies', 'Maintenance'];
    
    for (let i = 0; i < 15; i++) {
      const expense = new Expense({
        category: expenseCategories[Math.floor(Math.random() * expenseCategories.length)],
        description: `Expense description ${i + 1}`,
        amount: Math.floor(Math.random() * 5000) + 500,
        paymentMethod: ['cash', 'card', 'bank_transfer'][Math.floor(Math.random() * 3)],
        vendor: {
          name: `Vendor ${i + 1}`,
          contact: `vendor${i + 1}@example.com`,
          phone: `+91 98765 ${String(i).padStart(5, '0')}`
        },
        status: ['pending', 'approved', 'paid'][Math.floor(Math.random() * 3)],
        approvedBy: Math.random() > 0.5 ? users[Math.floor(Math.random() * users.length)]._id : null
      });
      
      await expense.save();
      expenses.push(expense);
    }
    
    console.log(`✅ Created ${expenses.length} expenses`);
    return expenses;
  } catch (error) {
    console.error('❌ Error seeding expenses:', error);
    throw error;
  }
}

// Main seeding function
async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    console.log('🔗 Connecting to MongoDB...');
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully');
    
    // Clear existing data
    await clearDatabase();
    
    // Seed data
    const users = await seedUsers();
    const suppliers = await seedSuppliers();
    const products = await seedProducts(suppliers);
    const staff = await seedStaff();
    const sales = await seedSales(users, products);
    const expenses = await seedExpenses(users);
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   👥 Users: ${users.length}`);
    console.log(`   🏢 Suppliers: ${suppliers.length}`);
    console.log(`   📦 Products: ${products.length}`);
    console.log(`   👨‍💼 Staff: ${staff.length}`);
    console.log(`   💰 Sales: ${sales.length}`);
    console.log(`   💸 Expenses: ${expenses.length}`);
    
    // Display login credentials
    console.log('\n🔑 Login Credentials:');
    console.log('   Admin: admin@inventory.com / admin123');
    console.log('   Manager: manager@inventory.com / manager123');
    console.log('   Staff: staff@inventory.com / staff123');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    process.exit(0);
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, clearDatabase };
