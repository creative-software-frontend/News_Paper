import React from 'react';

const UserRow = ({ user }) => {
  return (
    <tr
      key={user.id}
      className="hover:bg-gray-50 transition-colors duration-200 group"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-medium text-gray-900">{user.id}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex ">
          {user.image ? (
            <img
              src={`http://localhost:5000${user.image}`}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover border border-gray-200 shadow-sm"
              onError={e => {
                e.target.src =
                  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCA0QzE5LjU4MTcgNCAxNiA3LjU4MTcyIDE2IDEyQzE2IDE2LjQxODMgMTkuNTgxNyAyMCAyNCAyMEMyOC40MTgzIDIwIDMyIDE2LjQxODMgMzIgMTJDMzIgNy41ODE3MiAyOC40MTgzIDQgMjQgNFoiIGZpbGw9IiNEOEUxRTkiLz4KPHBhdGggZD0iTTQyIDQ2VjQyQzQyIDM2LjQ3NzIgMzcuNTIyOCAzMiAzMiAzMkgxNkMxMC40NzcyIDMyIDYgMzYuNDc3MiA2IDQyVjQ2IiBmaWxsPSIjRDhFMUU5Ii8+Cjwvc3ZnPgo=';
              }}
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
              <span className="text-sm font-medium text-gray-500">
                {user.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{user.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{user.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            user.role === 'admin'
              ? 'bg-purple-100 text-purple-800'
              : user.role === 'moderator'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {user.role}
        </span>
      </td>
    </tr>
  );
};

export default UserRow;
