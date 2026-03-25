import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../services/api';

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const userData = await fetchUsers();
        setUsers(userData);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setError('Failed to load users. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedUsers = useMemo(() => {
    let filteredUsers = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filteredUsers.sort((a, b) => {
      let aValue, bValue;
      
      if (sortConfig.key === 'name') {
        aValue = a.name;
        bValue = b.name;
      } else if (sortConfig.key === 'company') {
        aValue = a.company.name;
        bValue = b.company.name;
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filteredUsers;
  }, [users, searchTerm, sortConfig]);

  const UserRow = ({ user }) => {
    const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    
    return (
      <tr className="fade-in">
        <td>
          <div className="user-info">
            <div className="user-avatar">{initials}</div>
            <div className="user-details">
              <span className="user-name">{user.name}</span>
              <span className="user-username">@{user.username}</span>
            </div>
          </div>
        </td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>
          <div>
            <div>{user.company.name}</div>
            <div className="text-xs text-muted">{user.company.bs}</div>
          </div>
        </td>
        <td>
          <Link to={`/user/${user.id}`} className="action-button">
            <i className="fas fa-eye"></i>
            View Details
          </Link>
        </td>
      </tr>
    );
  };

  if (loading) {
    return (
      <div className="page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <span className="loading-text">Loading users...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <div className="container">
          <div className="error-container">
            <i className="fas fa-exclamation-triangle error-icon"></i>
            <h2 className="error-title">Error Loading Users</h2>
            <p className="error-message">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="retry-button"
            >
              <i className="fas fa-redo"></i>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="page-header">
        <div className="container">
          <div className="header-content">
            <div>
              <h1 className="header-title">User Directory</h1>
              <p className="header-subtitle">Browse and search through our user database</p>
            </div>
          </div>
        </div>
      </header>

      <main className="page-content">
        <div className="container">
          {/* Search Section */}
          <section className="page-section">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <div className="stats-container">
                <div className="stats-text">
                  Showing <span className="stats-number">{filteredAndSortedUsers.length}</span> of{' '}
                  <span className="stats-number">{users.length}</span> users
                </div>
              </div>
            </div>
          </section>

          {/* Users Table */}
          <section className="page-section">
            <div className="table-container">
              <div className="table-wrapper">
                <table className="table">
                  <thead>
                    <tr>
                      <th 
                        className="sortable"
                        onClick={() => handleSort('name')}
                      >
                        Name
                        <span className={`sort-icon ${sortConfig.key === 'name' ? sortConfig.direction : ''}`}></span>
                      </th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th 
                        className="sortable"
                        onClick={() => handleSort('company')}
                      >
                        Company
                        <span className={`sort-icon ${sortConfig.key === 'company' ? sortConfig.direction : ''}`}></span>
                      </th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedUsers.map(user => (
                      <UserRow key={user.id} user={user} />
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredAndSortedUsers.length === 0 && (
                <div className="empty-state">
                  <i className="fas fa-search empty-icon"></i>
                  <h3 className="empty-title">No users found</h3>
                  <p className="empty-message">Try adjusting your search terms</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;