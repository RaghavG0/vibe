/**
 * Role Toggle Component
 * 
 * Allows switching between customer, retailer, and wholesaler views.
 * Mainly for demonstration purposes.
 */

'use client';

import { useState } from 'react';

type UserRole = 'customer' | 'retailer' | 'wholesaler';

interface RoleToggleProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export function RoleToggle({ currentRole, onRoleChange }: RoleToggleProps) {
  const roles: { value: UserRole; label: string; icon: string }[] = [
    { value: 'customer', label: 'Customer', icon: '🛒' },
    { value: 'retailer', label: 'Retailer', icon: '🏪' },
    { value: 'wholesaler', label: 'Wholesaler', icon: '🏭' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">View as:</h3>
      <div className="flex gap-2">
        {roles.map((role) => (
          <button
            key={role.value}
            onClick={() => onRoleChange(role.value)}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
              currentRole === role.value
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-1">{role.icon}</span>
            {role.label}
          </button>
        ))}
      </div>
    </div>
  );
}
