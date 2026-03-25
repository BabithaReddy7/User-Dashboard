import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchUserById } from '../services/api';

const UserDetail = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const userData = await fetchUserById(id);
        setUser(userData);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setError('User not found');
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [id]);

  if (loading) {
    return (
      <div className="page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <span className="loading-text">Loading user details...</span>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="page">
        <div className="container">
          <div className="error-container">
            <i className="fas fa-user-slash error-icon"></i>
            <h2 className="error-title">User Not Found</h2>
            <p className="error-message">The user you're looking for doesn't exist.</p>
            <Link to="/" className="retry-button">
              <i className="fas fa-arrow-left"></i>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="page">
      <main className="page-content">
        <div className="container">
          <Link to="/" className="back-button">
            <i className="fas fa-arrow-left"></i>
            Back to Dashboard
          </Link>

          <div className="detail-card fade-in">
            {/* User Header */}
            <div className="detail-header">
              <div className="detail-header-content">
                <div className="user-avatar detail-avatar">{initials}</div>
                <div>
                  <h1 className="detail-title">{user.name}</h1>
                  <p className="detail-subtitle">@{user.username}</p>
                  <p className="detail-company">{user.company.name}</p>
                </div>
              </div>
            </div>

            {/* User Details */}
            <div className="detail-body">
              <div className="detail-section">
                <h2 className="detail-section-title">
                  <i className="fas fa-address-card detail-section-icon"></i>
                  Contact Information
                </h2>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Email</span>
                    <span className="detail-value">{user.email}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Phone</span>
                    <span className="detail-value">{user.phone}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Website</span>
                    <a 
                      href={`http://${user.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="detail-value detail-link"
                    >
                      {user.website}
                    </a>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h2 className="detail-section-title">
                  <i className="fas fa-map-marker-alt detail-section-icon"></i>
                  Address
                </h2>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Street</span>
                    <span className="detail-value">
                      {user.address.street}, {user.address.suite}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">City</span>
                    <span className="detail-value">{user.address.city}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Zipcode</span>
                    <span className="detail-value">{user.address.zipcode}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Latitude</span>
                    <span className="detail-value">{user.address.geo.lat}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Longitude</span>
                    <span className="detail-value">{user.address.geo.lng}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h2 className="detail-section-title">
                  <i className="fas fa-building detail-section-icon"></i>
                  Company Details
                </h2>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Company Name</span>
                    <span className="detail-value">{user.company.name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Catch Phrase</span>
                    <span className="detail-value">{user.company.catchPhrase}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Business</span>
                    <span className="detail-value">{user.company.bs}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDetail;