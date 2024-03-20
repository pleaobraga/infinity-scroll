import { ListContainer } from './ListContainer'
import { ItemsProvider } from './contexts/ItemsContext'

export default function App() {
  return (
    <div className="App">
      <ItemsProvider>
        <ListContainer />
      </ItemsProvider>
    </div>
  )
}
