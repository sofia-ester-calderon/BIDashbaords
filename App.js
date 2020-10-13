import * as React from 'react';

import DrawerMenu from './components/menu/DrawerMenu';
import NavBar from './components/menu/NavBar';
import {UserPermissionsProvider} from './components/hooks/UserPermissionsProvider';
import {LanguageProvider} from './components/hooks/LanguageProvider';
import {CompanyProvider} from './components/hooks/CompanyProvider';
import {MessagesProvider} from './components/hooks/MessagesProvider';

function App() {
  return (
    <>
      <UserPermissionsProvider>
        <CompanyProvider>
          <LanguageProvider>
            <MessagesProvider>
              <NavBar />
              <DrawerMenu />
            </MessagesProvider>
          </LanguageProvider>
        </CompanyProvider>
      </UserPermissionsProvider>
    </>
  );
}

export default App;
