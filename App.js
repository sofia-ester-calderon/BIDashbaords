import * as React from 'react';

import DrawerMenu from './components/menu/DrawerMenu';
import NavBar from './components/menu/NavBar';
import {UserPermissionsProvider} from './components/hooks/UserPermissionsProvider';
import {LanguageProvider} from './components/hooks/LanguageProvider';
import {MessagesProvider} from './components/hooks/MessagesProvider';

function App() {
  return (
    <>
      <UserPermissionsProvider>
        <LanguageProvider>
          <MessagesProvider>
            <NavBar />
            <DrawerMenu />
          </MessagesProvider>
        </LanguageProvider>
      </UserPermissionsProvider>
    </>
  );
}

export default App;
