import React from 'react'

export default function Modal({isOpen, onClose, children}) {
  return (
    <>
        {isOpen && (
            <div className="fixed inset-0 mx-auto my-auto flex items-center justify-center z-50">
                    <div className="absolute bg-slate-200 p-4 rounded-lg z-10 text-right">
                        <button className='text-black font-semibold hover:text-gray-700 focus:outline-none mr-2' onClick={onClose}>
                            X
                        </button>
                        {children}
                    </div>

            </div>
        )}
    </>
  )
}
