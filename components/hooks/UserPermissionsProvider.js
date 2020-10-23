import React, {
  useState,
  useCallback,
  useMemo,
  useContext,
  useEffect,
} from 'react';

const UserPermissionsContext = React.createContext({});

const UserPermissionsProvider = ({children}) => {
  const [userPermissions, setUserPermissions] = useState({loggedIn: false});

  useEffect(() => {}, [userPermissions]);

  const loginUser = useCallback((user) => {
    console.log(
      'im UserPermissionsProvider, start von loginUser(), user: ',
      user,
    );
    setUserPermissions(user);
    console.log('im UserPermissionsProvider, end von loginUser() ');
  });

  const logoutUser = useCallback(() => {
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
