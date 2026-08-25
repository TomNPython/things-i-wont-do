import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function PageTransition() {
  const location = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(false)

    const frame = requestAnimationFrame(() => {
      setVisible(true)
    })

    return () => cancelAnimationFrame(frame)
  }, [location.pathname])

  return (
    <div className={`page-transition ${visible ? 'is-visible' : ''}`}>
      <span>PROCESSING MORAL COMMITMENT</span>
    </div>
  )
}

export default PageTransition