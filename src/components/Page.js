import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default function Page({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer/>
    </>
  )
}