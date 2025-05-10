
import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Modern Slim-Fit T-Shirt",
    description: "This soft cotton t-shirt features a modern slim fit design, perfect for casual everyday wear.",
    price: 29.99,
    originalPrice: 39.99,
    onSale: true,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "clothing",
    rating: 4.5,
    reviews: 128,
    reviewList: [
      {
        userName: "Alex J.",
        rating: 5,
        date: "2023-02-15",
        comment: "Great quality and fits perfectly! I'm very pleased with this purchase."
      },
      {
        userName: "Morgan W.",
        rating: 4,
        date: "2022-12-30",
        comment: "Nice material and comfortable to wear. Slightly shorter than expected but still good."
      }
    ],
    details: [
      "100% premium cotton",
      "Pre-shrunk fabric",
      "Modern slim fit",
      "Machine washable"
    ],
    specifications: {
      "Material": "Cotton",
      "Fit": "Slim fit",
      "Neck Type": "Crew neck",
      "Care Instructions": "Machine wash cold"
    }
  },
  {
    id: 2,
    name: "Wireless Bluetooth Earbuds",
    description: "Immersive sound experience with these wireless Bluetooth earbuds featuring noise cancellation.",
    price: 89.99,
    originalPrice: 119.99,
    onSale: true,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "electronics",
    rating: 4.8,
    reviews: 342,
    reviewList: [
      {
        userName: "Taylor N.",
        rating: 5,
        date: "2023-03-10",
        comment: "Amazing sound quality and the battery life is impressive. Well worth the price!"
      }
    ],
    details: [
      "Active noise cancellation",
      "8-hour battery life",
      "Water resistant",
      "Touch controls"
    ],
    specifications: {
      "Battery Life": "8 hours (earbuds) + 24 hours (case)",
      "Bluetooth Version": "5.2",
      "Water Resistance": "IPX5",
      "Noise Cancellation": "Active"
    }
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    description: "Premium ergonomic office chair with adjustable lumbar support and breathable mesh back.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1596079890744-c1a0462d0975?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "furniture",
    rating: 4.6,
    reviews: 78,
    reviewList: [
      {
        userName: "Jamie L.",
        rating: 5,
        date: "2023-01-22",
        comment: "Best office chair I've ever owned. My back pain has significantly reduced since I started using it."
      }
    ],
    details: [
      "Ergonomic design",
      "Adjustable height and armrests",
      "Breathable mesh back",
      "360° swivel"
    ],
    specifications: {
      "Material": "Mesh and high-density foam",
      "Weight Capacity": "300 lbs",
      "Adjustable Features": "Height, armrests, recline, lumbar support",
      "Warranty": "3 years"
    }
  },
  {
    id: 4,
    name: "Smart Fitness Watch",
    description: "Track your fitness goals with this advanced smart watch featuring heart rate monitoring and GPS.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "electronics",
    rating: 4.4,
    reviews: 215,
    reviewList: [
      {
        userName: "Chris M.",
        rating: 4,
        date: "2023-02-05",
        comment: "Good battery life and accurate heart rate monitoring. The sleep tracking could be more precise."
      }
    ],
    details: [
      "Heart rate monitoring",
      "GPS tracking",
      "Water resistant to 50m",
      "7-day battery life"
    ],
    specifications: {
      "Display": "1.4\" AMOLED",
      "Battery Life": "Up to 7 days",
      "Water Resistance": "5 ATM",
      "Connectivity": "Bluetooth 5.0, GPS"
    }
  },
  {
    id: 5,
    name: "Professional Knife Set",
    description: "6-piece professional knife set with premium stainless steel blades and ergonomic handles.",
    price: 129.99,
    originalPrice: 149.99,
    onSale: true,
    image: "https://images.unsplash.com/photo-1593618998160-c4d5a4d81c79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "kitchenware",
    rating: 4.9,
    reviews: 67,
    reviewList: [
      {
        userName: "Sam K.",
        rating: 5,
        date: "2023-03-15",
        comment: "Incredible sharpness and balance. These knives make cooking a joy!"
      }
    ],
    details: [
      "Premium stainless steel blades",
      "Ergonomic handles",
      "Includes chef's knife, santoku, utility knife, paring knife, and shears",
      "Comes with storage block"
    ],
    specifications: {
      "Material": "High-carbon stainless steel",
      "Handle": "Pakkawood",
      "Includes": "6 pieces + storage block",
      "Care": "Hand wash recommended"
    }
  },
  {
    id: 6,
    name: "Vintage Leather Backpack",
    description: "Handcrafted vintage style leather backpack with multiple compartments and laptop sleeve.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "accessories",
    rating: 4.7,
    reviews: 94,
    reviewList: [
      {
        userName: "Riley P.",
        rating: 5,
        date: "2023-01-30",
        comment: "Beautiful craftsmanship and surprisingly spacious. Gets better with age!"
      }
    ],
    details: [
      "Genuine full-grain leather",
      "15\" laptop compartment",
      "Multiple interior pockets",
      "Adjustable shoulder straps"
    ],
    specifications: {
      "Material": "Full-grain leather",
      "Dimensions": "16\" x 12\" x 6\"",
      "Laptop Compatibility": "Up to 15\"",
      "Pockets": "3 exterior, 5 interior"
    }
  },
  {
    id: 7,
    name: "Organic Cotton Bedding Set",
    description: "Luxurious organic cotton bedding set with duvet cover and two pillow cases.",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1592229505726-ca121723b8ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "homegoods",
    rating: 4.6,
    reviews: 152,
    reviewList: [
      {
        userName: "Jordan B.",
        rating: 4,
        date: "2023-02-28",
        comment: "Incredibly soft and comfortable. Washes well but does wrinkle easily."
      }
    ],
    details: [
      "100% organic cotton",
      "300 thread count",
      "GOTS certified",
      "Available in multiple colors"
    ],
    specifications: {
      "Material": "Organic cotton",
      "Thread Count": "300",
      "Includes": "1 duvet cover, 2 pillow cases",
      "Care": "Machine washable"
    }
  },
  {
    id: 8,
    name: "Smart LED Desk Lamp",
    description: "Adjustable smart LED desk lamp with wireless charging pad and multiple light modes.",
    price: 69.99,
    originalPrice: 89.99,
    onSale: true,
    image: "https://images.unsplash.com/photo-1573297421044-f9404e1d0f6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "electronics",
    rating: 4.3,
    reviews: 87,
    reviewList: [
      {
        userName: "Casey T.",
        rating: 4,
        date: "2023-03-02",
        comment: "Great lamp with useful features. The wireless charging is convenient but a bit slow."
      }
    ],
    details: [
      "5 brightness levels",
      "4 lighting modes (reading, relaxing, studying, sleeping)",
      "Built-in wireless charging pad",
      "Touch controls"
    ],
    specifications: {
      "Power": "12W",
      "Wireless Charging": "10W Qi",
      "Color Temperature": "2700K-6000K",
      "Adjustable": "360° rotation"
    }
  }
];
