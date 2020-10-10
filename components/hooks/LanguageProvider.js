import React, {useState, useMemo, useContext, useEffect} from 'react';

const LanguageContext = React.createContext({});

const LanguageProvider = ({children}) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    console.log('setting language', language);
  }, [language]);

  const data = useMemo(() => [language, setLanguage], [language, setLanguage]);

  return (
    <LanguageContext.Provider value={data}>{children}</LanguageContext.Provider>
  );
};

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('language can only be used inside LanguageProvider');
  }
  return context;
};

export {LanguageProvider, useLanguage};
