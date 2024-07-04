// import { useState } from 'react'

import Busqueda from './componentes/Busqueda'
import { Container } from '@mui/material'
import { Provider } from 'react-redux';
import store from './lib/store';

function App() {
  return (
    <>
    <Provider store={store}>
      <Container sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignContent: 'flex-start'}}>
        <Busqueda />
      </Container>
    </Provider>
    </>
  )
}

export default App
