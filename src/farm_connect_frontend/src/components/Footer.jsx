import React from 'react'
import './Footer.css'
import { Link } from "react-router-dom"

function Footer() {
  return (
    <div>
         {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <span className="logo-icon">🌱</span>
                <span className="logo-text">FarmConnect</span>
              </div>
              <p className="footer-description">
                Revolutionizing agriculture through blockchain technology and direct farmer-consumer connections.
              </p>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Platform</h4>
              <ul className="footer-links">
                <li>
                  <Link to="/marketplace">Marketplace</Link>
                </li>
                <li>
                  <Link to="/farmers">For Farmers</Link>
                </li>
                <li>
                  <Link to="/consumers">For Consumers</Link>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Support</h4>
              <ul className="footer-links">
                <li>
                  <Link to="/help">Help Center</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link to="/docs">Documentation</Link>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Legal</h4>
              <ul className="footer-links">
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms">Terms of Service</Link>
                </li>
                <li>
                  <Link to="/security">Security</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 FarmConnect. All rights reserved. Powered by ICP Blockchain.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer