import * as React from 'react';

import DrawerMenu from './components/menu/DrawerMenu';
import NavBar from './components/menu/NavBar';
import {UserPermissionsProvider} from './components/hooks/UserPermissionsProvider';
import {LanguageProvider} from './components/hooks/LanguageProvider';

function App() {
  return (
    <>
      <UserPermissionsProvider>
        <LanguageProvider>
          <NavBar />
          <DrawerMenu />
        </LanguageProvider>
      </UserPermissionsProvider>
    </>
  );
}

export default App;
