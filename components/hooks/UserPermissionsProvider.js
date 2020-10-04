import React, {useState, useCallback, useMemo, useContext} from 'react';

const UserPermissionsContext = React.createContext({});

const UserPermissionsProvider = ({children}) => {
  const [userPermissions, setUserPermissions] = useState({loggedIn: false});

  const loginUser = useCallback((user) => {
    setUserPermissions({
      loggedIn: true,
      role: user.role,
      companyID: user.companyID,
    });
  });

  const logoutUser = useCallback(() => {
    setUserPermissions({
      loggedIn: false,
      role: null,
      companyID: null,
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
