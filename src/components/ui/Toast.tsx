import { useCart } from '../../context/CartContext'

export default function Toast() {
  const { showToast, toastMessage, dismissToast } = useCart()

  if (!showToast) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] animate-slide-up">
      <div className="bg-black text-white px-6 py-3.5 rounded-xl shadow-lg flex items-center gap-3 text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        {toastMessage}
        <button onClick={dismissToast} className="ml-2 text-white/50 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
