import * as React from 'react';

import DrawerMenu from './components/menu/DrawerMenu';
import NavBar from './components/menu/NavBar';
import {UserPermissionsProvider} from './components/hooks/UserPermissionsProvider';
import {LanguageProvider} from './components/hooks/LanguageProvider';
import {CompanyProvider} from './components/hooks/CompanyProvider';

function App() {
  return (
    <>
      <UserPermissionsProvider>
        <CompanyProvider>
          <LanguageProvider>
            <NavBar />
            <DrawerMenu />
          </LanguageProvider>
        </CompanyProvider>
      </UserPermissionsProvider>
    </>
  );
}

export default App;
