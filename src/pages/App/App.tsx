import { Outlet } from 'react-router-dom'
import useCharacter from '../../hooks/useCharacter'

function App() {
  const character = useCharacter("TheMoonmaidensFaithful");

  return (
    <>
      {/* HEADER HERE */}
      <Outlet />
      {/* FOOTER HERE */}
    </>
  )
}

export default App
