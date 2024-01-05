import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Profile() {
  
  const username = useParams().username;

  useEffect(() => {
    document.title = username;
  }, [username])
  return (
    <div>Profile</div>
  )
}
