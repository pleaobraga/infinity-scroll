import './ListContainer.styles.css'
import { ListItem } from '../ListItem'
import { Loader } from '../Loader'
import { useContext } from 'react'
import { ItemsContext } from '../contexts/ItemsContext'

export function ListContainer() {
  const { hasFetchedAll, listItems } = useContext(ItemsContext)

  return (
    <ul className="list-container">
      {listItems.map(({ firstName, id, image, lastName }) => {
        return (
          <li key={id}>
            <ListItem
              firstName={firstName}
              id={id}
              image={image}
              lastName={lastName}
            />
          </li>
        )
      })}
      {!hasFetchedAll && <Loader />}
    </ul>
  )
}
