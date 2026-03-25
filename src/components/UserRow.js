import React from 'react';
import { Link } from 'react-router-dom';

const UserRow = ({ user }) => {
  return (
    <tr className="hover:bg-gray-100">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{user.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.phone}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.company.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <Link to={`/user/${user.id}`} className="text-indigo-600 hover:text-indigo-900">
          View Details
        </Link>
      </td>
    </tr>
  );
};

export default UserRow;