// Modal.js
import React from 'react'

function Modal({ isOpen, children, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle max-w-xs w-full sm:max-w-lg">
        <div className='w-full text-right'>
            <button 
            onClick={onClose}
            className="py-2 px-4 text-black rounded-lg"
            >
            X
            </button>
        </div>
        {children}
        </div>
    </div>
    </div>
  )
}

export default Modal