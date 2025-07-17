import { Link } from "react-router-dom"
import Header from "../components/Header"
import "./HomePage.css"
import Footer from "../components/Footer"

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Direct Farm-to-Consumer Trading
              <span className="hero-subtitle">Powered by Web3</span>
            </h1>
            <p className="hero-description">
              Connect farmers directly with consumers using blockchain technology. Ensure fair prices, eliminate
              intermediaries, and guarantee transaction integrity with ICP smart contracts.
            </p>
            <div className="hero-buttons">
              <div className="hero-navigation">
              <Link to="/register?type=farmer" className="btn btn-primary btn-lg">
                I'm a Farmer
              </Link>
              <Link to="/register?type=consumer" className="btn btn-secondary btn-lg">
                I'm a Consumer
              </Link>
              </div>
              <div className="hero-marketplace">
                <Link className="marketplace-desc" to='/marketplace'>Check the marketplace? </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="container">
          <h2 className="section-title">Why Choose FarmChain?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3 className="feature-title">Secure Transactions</h3>
              <p className="feature-description">
                ICP smart contracts ensure every transaction is secure, transparent, and immutable on the blockchain.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3 className="feature-title">No Intermediaries</h3>
              <p className="feature-description">
                Direct trading between farmers and consumers eliminates middlemen and reduces costs for everyone.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3 className="feature-title">Fair Pricing</h3>
              <p className="feature-description">
                Smart contracts enforce fair pricing mechanisms and prevent price manipulation by any party.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section" id="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3 className="step-title">Register</h3>
              <p className="step-description">
                Sign up as a farmer or consumer and verify your identity on the blockchain.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3 className="step-title">List/Browse</h3>
              <p className="step-description">
                Farmers list products with smart contract pricing. Consumers browse the marketplace.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3 className="step-title">Trade</h3>
              <p className="step-description">
                Execute trades through ICP smart contracts with automatic escrow and dispute resolution.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h3 className="step-title">Deliver</h3>
              <p className="step-description">
                Complete delivery and release funds automatically through smart contract verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits-section" id="benefits">
        <div className="container">
          <div className="benefits-content">
            <div className="benefits-text">
              <h2 className="section-title">Benefits for Everyone</h2>
              <div className="benefits-list">
                <div className="benefit-item">
                  <div className="benefit-icon">✅</div>
                  <div>
                    <h3 className="benefit-title">For Farmers</h3>
                    <p className="benefit-description">
                      Get fair prices, direct access to consumers, and guaranteed payments through smart contracts.
                    </p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">✅</div>
                  <div>
                    <h3 className="benefit-title">For Consumers</h3>
                    <p className="benefit-description">
                      Access fresh produce directly from farms at fair prices with quality guarantees.
                    </p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">✅</div>
                  <div>
                    <h3 className="benefit-title">For Everyone</h3>
                    <p className="benefit-description">
                      Transparent, secure, and efficient trading powered by blockchain technology.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="benefits-highlight">
              <div className="highlight-icon">⚡</div>
              <h3 className="highlight-title">Powered by ICP</h3>
              <p className="highlight-description">
                Our platform leverages Internet Computer Protocol (ICP) smart contracts to ensure decentralized, secure,
                and efficient transactions between farmers and consumers.
              </p>
            </div>
          </div>
        </div>
      </section>     
    </div>
  )
}

export default HomePage
