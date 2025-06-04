'use client'

import type { User } from '@/services/auth-service'
import { useEffect, useRef, useState } from 'react'

interface AvatarDropdownProps {
  user: User
  onLogout: () => void
}

export default function AvatarDropdown({ user, onLogout }: AvatarDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    setIsOpen(false)
    onLogout()
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        <img
          src="/imgs/Avatar.png"
          alt="User Avatar"
          width={36}
          height={36}
          className="rounded-full ring-2 ring-gray-200 transition-all duration-200 hover:ring-gray-300"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-64 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
          <div className="border-b border-gray-100 px-4 py-2">
            <div className="flex items-center gap-3">
              <img src="/imgs/Avatar.png" alt="User Avatar" width={32} height={32} className="rounded-full" />
              <div>
                <p className="text-sm font-medium text-gray-900">Account</p>
                <p className="truncate text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="py-1">
            <button
              onClick={handleLogout}
              className="w-full cursor-pointer px-4 py-2 text-left text-sm text-red-600 transition-colors duration-150 hover:bg-red-50"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
