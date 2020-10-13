import React, {useState, useMemo, useContext, useEffect} from 'react';

const MessagesContext = React.createContext({});

const MessagesProvider = ({children}) => {
  const [messages, setMessages] = useState({});
  const [allMessages, setAllMessages] = useState({});

  function isEmptyObject(value) {
    if (!value) {
      console.log(
        'MessagesProvider, isEmptyObject(), variable "value" erfibt false!',
      );
      return true;
    }
    return (
      !value ||
      (Object.keys(value).length === 0 && value.constructor === Object)
    );
  }

  useEffect(() => {
    console.log('MessagesProvider: trace:');
    console.trace();
    console.log(
      'MessagesProvider: userEffect() setting messages. MESSAGES: ',
      messages,
      'ALL MESSAGES: ',
      allMessages,
    );
    if (isEmptyObject(messages) && !isEmptyObject(allMessages)) {
      console.log(
        'MessagesProvider: userEffect() Fall I: "messages" leer, "allMessages" mit Inhalt',
      );
      setMessages(allMessages.es);
    } else if (!isEmptyObject(messages) && isEmptyObject(allMessages)) {
      console.log(
        'MessagesProvider: userEffect() Fall II: "messages" mit Inhalt, "allMessages" leer',
      );
      setAllMessages(messages);
    } else {
      console.log(
        'MessagesProvider: userEffect() Fall III: beide leer oder beide mit Werten',
      );
    }
  }, [messages]);

  const data = useMemo(() => [messages, setMessages, setAllMessages], [
    messages,
    setMessages,
  ]);

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
