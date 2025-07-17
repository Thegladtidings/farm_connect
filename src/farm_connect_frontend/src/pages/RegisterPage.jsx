"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthClient } from "@dfinity/auth-client"
import { createActor } from "../../../declarations/farm_connect_backend" // Adjust if needed
import "./RegisterPage.css"

const RegisterPage = () => {
  const navigate = useNavigate()
  const [userType, setUserType] = useState("consumer")
  const [principalId, setPrincipalId] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    farmName: "",
    farmSize: "",
    cropTypes: "",
    description: "",
    agreeToTerms: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      const authClient = await AuthClient.create()

      await authClient.login({
        identityProvider:
          import.meta.env.VITE_DFX_NETWORK === "ic"
            ? "https://identity.ic0.app"
            : `http://localhost:4943/?canisterId=${import.meta.env.VITE_CANISTER_ID_INTERNET_IDENTITY}`,
             derivationOrigin: "http://localhost:3000",
        onSuccess: async () => {
          console.log("hi")
          const identity = await authClient.getIdentity()
          const principal = identity.getPrincipal().toText()
          setPrincipalId(principal)

          const actor = createActor(import.meta.env.VITE_CANISTER_ID_FARM_CONNECT_FRONTEND, {
            agentOptions: { identity },
          })

    const result = await actor.register_user(
            principal.toText(),                // wallet_address (as string)
      userType,                          // user_type
      formData.name,
      formData.email,
      formData.phone,
      formData.address,
      formData.city,
      formData.state,
      formData.zipCode,
      userType === "farmer" ? [formData.farmName] : [],
      userType === "farmer" ? [formData.farmSize] : [],
      userType === "farmer" ? [formData.cropTypes] : [],
      userType === "farmer" ? [formData.description] : []
            )
          

console.log(result)
          if (result?.ok) {
            console.log(result)
            setSuccess("Registration successful!")
            navigate("/login")
          } else {
            setError(result?.err || "Registration failed.")
          }
        },
        onError: (err) => {
          console.error("Login failed", err)
          setError("Authentication failed.")
          setLoading(false)
        },
      })
    } catch (err) {
      console.error("Registration error:", err)
      setError("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <Link to="/" className="logo">
            <span className="logo-icon">🌱</span>
            <span className="logo-text">FarmConnect</span>
          </Link>
          <h1 className="register-title">Join FarmConnect</h1>
          <p className="register-subtitle">Create your account and start trading on the blockchain</p>
        </div>

        <div className="register-card">
          <div className="card-header">
            <h2 className="card-title">Account Registration</h2>
            <p className="card-description">Choose your account type and provide your information for blockchain verification</p>
          </div>

          <div className="card-content">
            <form onSubmit={handleSubmit} className="register-form">
              {/* User Type */}
              <div className="user-type-section">
                <label className="label">I am a:</label>
                <div className="user-type-grid">
                  <div className={`user-type-card ${userType === "farmer" ? "active" : ""}`} onClick={() => setUserType("farmer")}>
                    <div className="user-type-icon">👨‍🌾</div>
                    <h3 className="user-type-title">Farmer</h3>
                    <p className="user-type-description">Sell your produce directly</p>
                  </div>
                  <div className={`user-type-card ${userType === "consumer" ? "active" : ""}`} onClick={() => setUserType("consumer")}>
                    <div className="user-type-icon">👤</div>
                    <h3 className="user-type-title">Consumer</h3>
                    <p className="user-type-description">Buy fresh produce directly</p>
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div className="form-section">
                <h3 className="section-title">👤 Personal Information</h3>
                <div className="form-grid">
                  {[
                    ["name", "Full Name *"],
                    ["email", "Email Address *", "email"],
                    ["phone", "Phone Number *"],
                  ].map(([id, label, type = "text"]) => (
                    <div className="form-group" key={id}>
                      <label htmlFor={id} className="label">{label}</label>
                      <input
                        id={id}
                        type={type}
                        className="input"
                        value={formData[id]}
                        onChange={(e) => handleInputChange(id, e.target.value)}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Address Info */}
              <div className="form-section">
                <h3 className="section-title">📍 Address Information</h3>
                <div className="form-group">
                  <label htmlFor="address" className="label">Street Address *</label>
                  <input
                    id="address"
                    className="input"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                  />
                </div>
                <div className="form-grid form-grid-3">
                  {["city", "state", "zipCode"].map((field) => (
                    <div className="form-group" key={field}>
                      <label htmlFor={field} className="label">{field.charAt(0).toUpperCase() + field.slice(1)} *</label>
                      <input
                        id={field}
                        className="input"
                        value={formData[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Farmer Fields */}
              {userType === "farmer" && (
                <div className="form-section">
                  <h3 className="section-title">🌱 Farm Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="farmName" className="label">Farm Name *</label>
                      <input
                        id="farmName"
                        className="input"
                        value={formData.farmName}
                        onChange={(e) => handleInputChange("farmName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="farmSize" className="label">Farm Size (acres) *</label>
                      <input
                        id="farmSize"
                        type="number"
                        className="input"
                        value={formData.farmSize}
                        onChange={(e) => handleInputChange("farmSize", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="cropTypes" className="label">Crop Types *</label>
                    <input
                      id="cropTypes"
                      className="input"
                      value={formData.cropTypes}
                      onChange={(e) => handleInputChange("cropTypes", e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description" className="label">Farm Description</label>
                    <textarea
                      id="description"
                      className="input textarea"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Terms */}
              <div className="checkbox-group">
                <input
                  id="terms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
                />
                <label htmlFor="terms" className="checkbox-label">
                  I agree to the <Link to="/terms" className="link">Terms of Service</Link> and <Link to="/privacy" className="link">Privacy Policy</Link>
                </label>
              </div>

              {/* Messages */}
              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}

              {/* Submit */}
              <button
                type="submit"
                className={`btn btn-primary btn-full ${!formData.agreeToTerms || loading ? "disabled" : ""}`}
                disabled={!formData.agreeToTerms || loading}
              >
                {loading ? "Registering..." : "Create Account & Register on Blockchain"}
              </button>
            </form>

            <div className="login-link">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="link">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
