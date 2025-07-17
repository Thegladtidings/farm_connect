"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "./MarketplacePage.css"

const mockProducts = [
  {
    id: 1,
    name: "Organic Tomatoes",
    farmer: "Green Valley Farm",
    price: 4.5,
    unit: "lb",
    location: "California, USA",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=200",
    category: "Vegetables",
    organic: true,
    inStock: true,
    description: "Fresh, vine-ripened organic tomatoes",
  },
  {
    id: 2,
    name: "Fresh Corn",
    farmer: "Sunny Acres",
    price: 0.75,
    unit: "ear",
    location: "Iowa, USA",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=200",
    category: "Vegetables",
    organic: false,
    inStock: true,
    description: "Sweet corn harvested daily",
  },
  {
    id: 3,
    name: "Organic Apples",
    farmer: "Mountain Orchard",
    price: 3.25,
    unit: "lb",
    location: "Washington, USA",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=200",
    category: "Fruits",
    organic: true,
    inStock: true,
    description: "Crisp, sweet organic apples",
  },
  {
    id: 4,
    name: "Free-Range Eggs",
    farmer: "Happy Hen Farm",
    price: 6.0,
    unit: "dozen",
    location: "Vermont, USA",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=200",
    category: "Dairy & Eggs",
    organic: true,
    inStock: true,
    description: "Farm-fresh eggs from free-range hens",
  },
]

const MarketplacePage = () => {
  const [products, setProducts] = useState(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [cart, setCart] = useState([])

  const categories = ["all", "Vegetables", "Fruits", "Dairy & Eggs", "Pantry"]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.farmer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return a.name.localeCompare(b.name)
    }
  })

  const addToCart = (product) => {
    setCart((prev) => [...prev, product])
    console.log("Added to cart:", product)
  }

  return (
    <div className="marketplace-page">

      <div className="container">
        <div className="marketplace-content">
          <div className="page-header">
            <h1 className="page-title">Welcome to the Marketplace</h1>
            <p className="page-subtitle">Fresh produce directly from local farmers</p>
          </div>

          {/* Filters */}
          <div className="filters-section">
            <div className="filters-grid">
              <div className="search-box">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search products or farmers..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="filter-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
              <select className="filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
              <button className="filter-btn">🔧 More Filters</button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="products-grid">
            {sortedProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-image" />
                  {product.organic && <span className="organic-badge">Organic</span>}
                  {!product.inStock && (
                    <div className="out-of-stock-overlay">
                      <span className="out-of-stock-text">Out of Stock</span>
                    </div>
                  )}
                </div>
                <div className="product-info">
                  <div className="product-header">
                    <div>
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-farmer">👤 {product.farmer}</p>
                    </div>
                    <div className="product-price">
                      <span className="price">${product.price}</span>
                      <span className="price-unit">per {product.unit}</span>
                    </div>
                  </div>
                  <p className="product-description">{product.description}</p>
                  <div className="product-meta">
                    <div className="product-location">📍 {product.location}</div>
                    <div className="product-rating">⭐ {product.rating}</div>
                  </div>
                  <div className="product-actions">
                    <Link to={`/product/${product.id}`} className="btn btn-outline btn-sm">
                      View Details
                    </Link>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className="btn btn-primary btn-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="no-products">
              <div className="no-products-icon">🔍</div>
              <h3 className="no-products-title">No products found</h3>
              <p className="no-products-text">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MarketplacePage
