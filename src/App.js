import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Star,
  ArrowRight,
  Zap,
  Shield,
  Truck,
} from "lucide-react";

const TechTopia = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]); // ✅ cart state
  const [page, setPage] = useState("home"); // ✅ home | cart | payment

  // ✅ Add to cart logic
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) return removeFromCart(id);
    setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)));
  };

  const categories = [
    { name: "Laptops", icon: "💻", color: "from-blue-500 to-purple-600" },
    { name: "Smartphones", icon: "📱", color: "from-green-500 to-teal-600" },
    { name: "Gaming Mice", icon: "🎙️", color: "from-red-500 to-pink-600" },
    { name: "Keyboards", icon: "⌨️", color: "from-yellow-500 to-orange-600" },
    { name: "Speakers", icon: "🔊", color: "from-purple-500 to-indigo-600" },
    { name: "Headphones", icon: "🎧", color: "from-teal-500 to-cyan-600" },
  ];

  const featuredProducts = [
  // Laptops
  {
    id: 1,
    name: "UltraBook Pro X1",
    category: "Laptop",
    price: 1299,
    originalPrice: 1499,
    rating: 4.8,
    image: "💻",
    features: ["16GB RAM", "Intel i7", "512GB SSD"],
  },
  {
    id: 2,
    name: "Gaming Laptop RTX",
    category: "Laptop",
    price: 1899,
    originalPrice: 2099,
    rating: 4.9,
    image: "🎮",
    features: ["32GB RAM", "RTX 4070", "1TB SSD"],
  },

  // Smartphones
  {
    id: 3,
    name: "Galaxy Prime 5G",
    category: "Mobile",
    price: 899,
    originalPrice: 999,
    rating: 4.6,
    image: "📱",
    features: ["5G Ready", "128GB Storage", "50MP Camera"],
  },
  {
    id: 4,
    name: "iPhone 15 Pro",
    category: "Mobile",
    price: 1199,
    originalPrice: 1299,
    rating: 4.7,
    image: "🍎",
    features: ["A17 Bionic", "256GB Storage", "48MP Camera"],
  },

  // Accessories - Mice
  {
    id: 5,
    name: "Gaming Beast Mouse",
    category: "Mouse",
    price: 79,
    originalPrice: 99,
    rating: 4.9,
    image: "🖱️",
    features: ["RGB Lighting", "16000 DPI", "Wireless"],
  },
  {
    id: 6,
    name: "Pro Wireless Mouse",
    category: "Mouse",
    price: 99,
    originalPrice: 129,
    rating: 4.5,
    image: "🖲️",
    features: ["Bluetooth", "Ergonomic Design", "Fast Charging"],
  },

  // Accessories - Keyboards
  {
    id: 7,
    name: "Mechanical Pro Keyboard",
    category: "Keyboard",
    price: 149,
    originalPrice: 199,
    rating: 4.8,
    image: "⌨️",
    features: ["Blue Switches", "RGB", "Hot-swappable"],
  },
  {
    id: 8,
    name: "Compact Wireless Keyboard",
    category: "Keyboard",
    price: 89,
    originalPrice: 119,
    rating: 4.3,
    image: "🔠",
    features: ["Slim Design", "Bluetooth 5.0", "Rechargeable"],
  },

  // Audio - Headphones
  {
    id: 9,
    name: "Noise Cancelling Headphones",
    category: "Headphones",
    price: 249,
    originalPrice: 299,
    rating: 4.7,
    image: "🎧",
    features: ["ANC", "30hrs Battery", "Wireless"],
  },
  {
    id: 10,
    name: "Gaming Headset Pro",
    category: "Headphones",
    price: 179,
    originalPrice: 199,
    rating: 4.6,
    image: "🎮🎧",
    features: ["7.1 Surround", "Noise Cancelling Mic", "RGB"],
  },

  // Audio - Speakers
  {
    id: 11,
    name: "Portable Bluetooth Speaker",
    category: "Speaker",
    price: 99,
    originalPrice: 129,
    rating: 4.4,
    image: "🔊",
    features: ["10hrs Battery", "Waterproof", "Deep Bass"],
  },
  {
    id: 12,
    name: "Home Theater Soundbar",
    category: "Speaker",
    price: 349,
    originalPrice: 399,
    rating: 4.8,
    image: "📻",
    features: ["Dolby Atmos", "Bluetooth 5.1", "Subwoofer"],
  },
];


  const heroSlides = [
    {
      title: "Next-Gen Gaming Setup",
      subtitle: "Elevate your gaming experience",
      cta: "Shop Gaming",
      gradient: "from-purple-600 via-blue-600 to-indigo-700",
    },
    {
      title: "Productivity Powerhouse",
      subtitle: "Tools for the modern professional",
      cta: "View Laptops",
      gradient: "from-emerald-600 via-teal-600 to-cyan-700",
    },
    {
      title: "Audio Excellence",
      subtitle: "Immerse yourself in crystal clear sound",
      cta: "Explore Audio",
      gradient: "from-red-600 via-pink-600 to-rose-700",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // ✅ Page Rendering
  const renderPage = () => {
    if (page === "cart") {
      const total = cart.reduce((s, p) => s + p.price * p.qty, 0);
      return (
        <div className="max-w-5xl mx-auto py-12 px-4">
          <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{item.image}</span>
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-500">${item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-semibold">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div className="flex justify-between items-center mt-6 text-lg font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setPage("payment")}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (page === "payment") {
      return (
        <div className="max-w-3xl mx-auto py-12 px-4">
          <h2 className="text-3xl font-bold mb-6">Payment Options</h2>
          <div className="space-y-4">
            <label className="block p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="radio" name="payment" className="mr-2" /> UPI
            </label>
            <label className="block p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="radio" name="payment" className="mr-2" /> Net Banking
            </label>
            <label className="block p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="radio" name="payment" className="mr-2" /> Credit /
              Debit Card
            </label>
            <label className="block p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="radio" name="payment" className="mr-2" /> Cash on
              Delivery
            </label>
          </div>

          <button
            onClick={() => alert("✅ Payment Successful!")}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Pay Now
          </button>
        </div>
      );
    }

    // Default Home Page
    return (
      <>
        {/* Hero Section */}
        <section className="relative h-[500px] overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-90`}
              ></div>
              <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
                <h2 className="text-4xl md:text-6xl font-bold mb-6">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
                <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-100 transition">
                  {slide.cta}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Categories */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Shop by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  className={`p-6 bg-gradient-to-br ${cat.color} rounded-lg text-center text-white font-semibold shadow hover:scale-105 transition`}
                >
                  <span className="text-4xl block mb-2">{cat.icon}</span>
                  {cat.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Featured Products
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
                >
                  <div className="text-6xl text-center mb-4">
                    {product.image}
                  </div>
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-gray-500 text-sm">{product.category}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{product.rating}</span>
                  </div>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {product.features.map((f, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <span className="text-xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      <span className="text-sm line-through text-gray-500 ml-2">
                        ${product.originalPrice}
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setPage("home")}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TechTopia
              </h1>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <button
                className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setPage("cart")}
              >
                <ShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.reduce((s, p) => s + p.qty, 0)}
                  </span>
                )}
              </button>

              <button
                className="md:hidden p-2 text-gray-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Page Rendering */}
      {renderPage()}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <p>© 2025 TechTopia. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TechTopia;
