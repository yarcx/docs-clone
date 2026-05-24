import React from 'react'
interface AuthLayoutProps {
    children: React.ReactNode
}

const layout = ({children}: AuthLayoutProps) => {
  return <div>{children}</div>;
}

export default layout