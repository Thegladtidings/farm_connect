import React from "react"
import { useParams, Link } from "react-router-dom"
import "./ProductDescription.css"

// Reuse the same mock data for now
const mockProducts = [
  {
    id: 1,
    name: "Organic Tomatoes",
    farmer: "Green Valley Farm",
    price: 4.5,
    unit: "lb",
    location: "California, USA",
    rating: 4.8,
    image: "/placeholder.svg?height=400&width=400",
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
    image: "/placeholder.svg?height=400&width=400",
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
    image: "/placeholder.svg?height=400&width=400",
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
    image: "/placeholder.svg?height=400&width=400",
    category: "Dairy & Eggs",
    organic: true,
    inStock: true,
    description: "Farm-fresh eggs from free-range hens",
  },
]

function ProductDescription() {
  const { id } = useParams()
  const product = mockProducts.find((p) => p.id === parseInt(id))

  if (!product) {
    return (
      <div className="container">
        <h2>Product not found</h2>
        <Link to="/" className="btn">Back to Marketplace</Link>
      </div>
    )
  }

  return (
    <div className="product-description-page">
      <div className="container">
        <Link to="/" className="btn btn-sm">← Back to Marketplace</Link>
        <div className="product-details">
          <div className="product-image-section">
            <img src={product.image} alt={product.name} className="product-detail-image" />
            {product.organic && <span className="organic-badge">Organic</span>}
          </div>
          <div className="product-info-section">
            <h2 className="product-name">{product.name}</h2>
            <p className="product-farmer">By: {product.farmer}</p>
            <p className="product-description">{product.description}</p>
            <p><strong>Price:</strong> ${product.price} / {product.unit}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Location:</strong> {product.location}</p>
            <p><strong>Rating:</strong> ⭐ {product.rating}</p>
            <p><strong>Status:</strong> {product.inStock ? "In Stock" : "Out of Stock"}</p>
            <button disabled={!product.inStock} className="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDescription
