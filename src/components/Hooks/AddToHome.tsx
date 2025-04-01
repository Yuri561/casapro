import React, { useEffect, useState } from "react"

const AddToHomeButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showButton, setShowButton] = useState(false)
  const [showIosTip, setShowIosTip] = useState(true)

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  const isIos = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
  const isInStandaloneMode = "standalone" in window.navigator && (window.navigator as any).standalone
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowButton(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      console.log("✅ User accepted the install prompt")
    } else {
      console.log("❌ User dismissed the install prompt")
    }

    setDeferredPrompt(null)
    setShowButton(false)
  }

  if (isIos && !isInStandaloneMode && isSafari && showIosTip) {
    return (
      <div className="fixed bottom-4 left-4 right-4 bg-white text-gray-800 border p-4 rounded-xl shadow-lg text-sm flex items-center justify-between z-50">
        <span>
          To install <strong>Casa Pro</strong>, tap <strong>Share</strong> and then <strong>"Add to Home Screen"</strong>.
        </span>
        <button
          onClick={() => setShowIosTip(false)}
          className="ml-4 text-xs text-gray-500 hover:underline"
        >
          Dismiss
        </button>
      </div>
    )
  }

  if (!showButton) return null

  return (
    <button
      onClick={handleInstall}
      className="inline-flex cursor-pointer items-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-teal-500 border border-transparent rounded-xl hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 shadow-md"
    >
      {isMobile ? "Add to Home Screen" : "Add to Desktop"}
    </button>
  )
}

export default AddToHomeButton
