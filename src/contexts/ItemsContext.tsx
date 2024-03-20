import { createContext, useEffect, useRef, useState } from 'react'

export interface ListItem {
  firstName: string
  id: number
  image: string
  lastName: string
}

interface ItemsContextType {
  listItems: ListItem[]
  loadMoreItems: () => void
  hasFetchedAll: boolean
  loaderRef: React.RefObject<HTMLDivElement>
}

export const ItemsContext = createContext({} as ItemsContextType)

interface ItemsProviderProps {
  children: React.ReactNode
}

export function ItemsProvider({ children }: ItemsProviderProps) {
  const [listItems, setListItems] = useState([])
  const [skipParam, setSkipParam] = useState(-10)
  const [hasFetchedAll, setHasFetchedAll] = useState(false)
  const loaderRef = useRef(null)

  useEffect(() => {
    if (skipParam >= 0) {
      const url = `https://dummyjson.com/users?limit=10&skip=${skipParam}&select=firstName,lastName,email,phone,image`

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setListItems((state) => [...state, ...data.users])

          if (data.total === listItems.length + 10) {
            setHasFetchedAll(true)
          }
        })
    }
  }, [skipParam])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0]
      if (first.isIntersecting) {
        loadMoreItems()
      }
    })

    const currentLoader = loaderRef.current
    if (currentLoader) {
      observer.observe(currentLoader)
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader)
      }
    }
  }, [])

  const loadMoreItems = () => {
    setSkipParam((prevSkipParam) => prevSkipParam + 10)
  }

  return (
    <ItemsContext.Provider
      value={{ listItems, loadMoreItems, hasFetchedAll, loaderRef }}
    >
      {children}
    </ItemsContext.Provider>
  )
}
