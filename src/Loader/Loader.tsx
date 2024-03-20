import { useContext } from 'react'

import { ItemsContext } from '../contexts/ItemsContext'

import './Loader.styles.css'

export function Loader() {
  const { loaderRef } = useContext(ItemsContext)

  return (
    <div
      ref={loaderRef}
      className="loader"
    >
      Loading...
    </div>
  )
}
