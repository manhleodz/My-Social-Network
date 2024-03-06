import React, { useEffect } from 'react'

export default function Community() {

  useEffect(() => {
    document.title = 'Danh sách cộng đồng'
  }, [])

  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      Community is coming soon!
    </div>
  )
}
