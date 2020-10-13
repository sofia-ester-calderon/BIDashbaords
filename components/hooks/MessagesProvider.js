import React, {useState, useMemo, useContext, useEffect} from 'react';

const MessagesContext = React.createContext({});

const MessagesProvider = ({children}) => {
  const [messages, setMessages] = useState({});

  useEffect(() => {}, [messages]);

  const data = useMemo(() => [messages, setMessages], [messages, setMessages]);

  return (
    <MessagesContext.Provider value={data}>{children}</MessagesContext.Provider>
  );
};

const useMessages = () => {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error('messages can only be used inside MessagesProvider');
  }
  return context;
};

export {MessagesProvider, useMessages};
