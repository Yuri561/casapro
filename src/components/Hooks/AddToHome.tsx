import React, { useEffect, useState } from "react"

const AddToHomeButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsVisible(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()

    const { outcome } = await deferredPrompt.userChoice
    if (outcome === "accepted") {
      console.log("User accepted the install prompt")
    } else {
      console.log("User dismissed the install prompt")
    }

    setDeferredPrompt(null)
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <button
      onClick={handleInstall}
      className="mt-4 px-6 py-3 bg-teal-500 text-white rounded-xl font-bold shadow hover:bg-teal-600 transition"
    >
      Add Casa Pro to Home Screen
    </button>
  )
}

export default AddToHomeButton
