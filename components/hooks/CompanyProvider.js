import React, {useState, useMemo, useContext, useEffect} from 'react';

const CompanyContext = React.createContext({});

const CompanyProvider = ({children}) => {
  const [company, setCompany] = useState();

  useEffect(() => {}, [company]);

  const data = useMemo(() => [company, setCompany], [company, setCompany]);

  return (
    <CompanyContext.Provider value={data}>{children}</CompanyContext.Provider>
  );
};

const useCompany = () => {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('Company can only be used inside CompanyProvider');
  }
  return context;
};

export {CompanyProvider, useCompany};
