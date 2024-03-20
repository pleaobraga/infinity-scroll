import './ListItem.styles.css'

export interface ListItemProps {
  firstName: string
  id: number
  image: string
  lastName: string
}

export function ListItem({ firstName, id, image, lastName }: ListItemProps) {
  return (
    <div className="list-item">
      <img
        height={40}
        width={40}
        src={image}
        alt={`${firstName} ${lastName}`}
      />
      <div className="text-container">
        <span>{id}:</span>
        <span>{firstName}</span>
        <span>{lastName}</span>
      </div>
    </div>
  )
}
