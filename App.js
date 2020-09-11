import * as React from 'react';

import DrawerMenu from './components/menu/DrawerMenu';
import NavBar from './components/menu/NavBar';
import {UserPermissionsProvider} from './components/hooks/UserPermissionsProvider';

function App() {
  return (
    <>
      <UserPermissionsProvider>
        <NavBar />
        <DrawerMenu />
      </UserPermissionsProvider>
    </>
  );
}

export default App;
