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

  useEffect(() => {
    console.log('new user permissions', userPermissions);
  }, [userPermissions]);

  const loginUser = useCallback((user) => {
    setUserPermissions(user);
  });

  const logoutUser = useCallback(() => {
    setUserPermissions({
      loggedIn: false,
    });
  });

  const setUserCompany = useCallback((company) => {
    setUserPermissions({
      ...userPermissions,
      company,
      language: company.language,
    });
  });

  const setLanguage = useCallback((language) => {
    setUserPermissions({
      ...userPermissions,
      language,
    });
  });

  const userFunctions = {loginUser, logoutUser, setUserCompany, setLanguage};

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
