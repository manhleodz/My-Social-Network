import React, { useEffect } from 'react'

export default function NotFound() {

  useEffect(() => {
    document.title = 'Not Found';
  }, [])

  return (
    <div>NotFound</div>
  )
}
