import React from 'react'

const Loader = ({ isLoading }) => {
  return (
    <div className={`${isLoading ? 'opacity-100' : 'opacity-0'} fixed inset-0 flex items-center justify-center z-50`}>
      <div className="w-20 h-20 animate-spin rounded-full border-t-2 border-b-2 border-purple-500"></div>
    </div>
  )
}

export default Loader
