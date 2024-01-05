import React from 'react';

import NavigateBar from '../NavigateBar/NavigateBar';

export default function Layout({ children }) {

  return (
    <div className="h-full bg-gray-100 relative">
      <div className="flex flex-col h-screen">
        <div className=" z-40" id='sidebar'>
          <NavigateBar />
        </div>
        <main className=" w-full h-full bg-gray-100" id='children'>{children}</main>
      </div>
    </div>
  )
}
