export type Product = {
    id: number;
    name: string;
    category: string;
    location: string;
    quantity: number;
    price: number;
    color: string; // New property for color
  };
  
  const productData: Product[] = [
    {
      id: 1,
      name: "Dish Soap",
      category: "Toiletries",
      location: "Kitchen",
      quantity: 3,
      price: 4.99,
      color: "#FFB703", // Yellow-Orange
    },
    {
      id: 2,
      name: "Hammer",
      category: "Tools",
      location: "Garage",
      quantity: 1,
      price: 12.99,
      color: "#FB5607", // Bright Orange
    },
    {
      id: 3,
      name: "Paper Towels",
      category: "Groceries",
      location: "Pantry",
      quantity: 6,
      price: 8.49,
      color: "#8AC926", // Green
    },
    {
      id: 4,
      name: "Toilet Paper",
      category: "Toiletries",
      location: "Bathroom",
      quantity: 12,
      price: 10.99,
      color: "#FFBA08", // Light Yellow
    },
    {
      id: 5,
      name: "Extension Cord",
      category: "Electronics",
      location: "Living Room",
      quantity: 2,
      price: 14.99,
      color: "#3A86FF", // Blue
    },
    {
      id: 6,
      name: "Canned Beans",
      category: "Groceries",
      location: "Pantry",
      quantity: 4,
      price: 1.99,
      color: "#06D6A0", // Teal
    },
    {
      id: 7,
      name: "Light Bulbs",
      category: "Electronics",
      location: "Garage",
      quantity: 5,
      price: 5.99,
      color: "#8338EC", // Purple
    },
    {
      id: 8,
      name: "Shampoo",
      category: "Toiletries",
      location: "Bathroom",
      quantity: 2,
      price: 6.49,
      color: "#FF006E", // Pink
    },
    {
      id: 9,
      name: "Pliers",
      category: "Tools",
      location: "Garage",
      quantity: 1,
      price: 9.99,
      color: "#E63946", // Red
    },
    {
      id: 10,
      name: "Rice",
      category: "Groceries",
      location: "Pantry",
      quantity: 1,
      price: 11.49,
      color: "#06D6A0", // Teal (Same for groceries)
    },
    {
      id: 11,
      name: "Batteries",
      category: "Electronics",
      location: "Living Room",
      quantity: 10,
      price: 7.99,
      color: "#3A86FF", // Blue (Same for electronics)
    },
    {
      id: 12,
      name: "Mop & Bucket",
      category: "Cleaning Supplies",
      location: "Closet",
      quantity: 1,
      price: 25.99,
      color: "#118AB2", // Aqua
    },
  ];
  
  export default productData;
  