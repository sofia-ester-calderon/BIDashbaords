import React, {useState, useCallback, useMemo, useContext} from 'react';

const UserPermissionsContext = React.createContext({});

const UserPermissionsProvider = ({children}) => {
  const [userPermissions, setUserPermissions] = useState({loggedIn: false});

  const loginUser = useCallback((user) => {
    console.log('logging in user', user);
    setUserPermissions({
      id: user.id,
      loggedIn: true,
      role: user.role,
      companyID: user.companyID,
      language: user.language,
    });
  });

  const logoutUser = useCallback(() => {
    console.log('logging out user');
    setUserPermissions({
      loggedIn: false,
    });
  });

  const userFunctions = {loginUser, logoutUser};

  const data = useMemo(() => [userPermissions, userFunctions], [
    userPermissions,
    userFunctions,
  ]);

  return (
    <UserPermissionsContext.Provider value={data}>
      {children}
    </UserPermissionsContext.Provider>
  );
};

const useUserPermissions = () => {
  const context = useContext(UserPermissionsContext);
  if (context === undefined) {
    throw new Error('useUserPermissions can only be used inside UserProvider');
  }
  return context;
};

export {UserPermissionsProvider, useUserPermissions};
