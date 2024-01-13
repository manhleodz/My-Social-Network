import React, { useEffect } from 'react'

export default function Community() {

  useEffect(() => {
    document.title = 'Danh sách cộng đồng'
  }, [])

  return (
    <div>Community</div>
  )
}
