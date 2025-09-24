import { useEffect } from "react";

export default function Analytics() {

  const VITE_ENABLE_ANALYTICS = import.meta.env.VITE_ENABLE_ANALYTICS || false

  useEffect(() => {
    if (!VITE_ENABLE_ANALYTICS) {
      return
    }
    const script = document.createElement("script")
    script.src = "https://analytics.jonasvps.xyz/script.js"
    script.setAttribute("data-website-id", "4a539771-01ca-4ccd-9bc3-d58edf64b225")
    script.defer = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div></div>
  )
}

