import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      {/* HEADER HERE */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Outlet />
      </LocalizationProvider>
      {/* FOOTER HERE */}
    </>
  )
}

export default App
