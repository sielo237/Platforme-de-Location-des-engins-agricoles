import React from 'react'

const Container = ({className ,children}) => {
  return (
    <div className={`h-full w-[90%] mx-auto ${className}`}>
        {children}
    </div>
  )
}

export default Container