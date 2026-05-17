import { useState } from 'react'
import { getServerSession, type Session } from "next-auth"
import { signOut } from "next-auth/react"

import AIToolsLayout from '../../components/ai-tools-layout'
import SystemMessage from '../../components/chat/system-message'
import { availableModels, ModelSelector } from '../../components/chat/model-selector'
import ChatArea from '../../components/chat/chat-area'
import InputArea from '../../components/chat/input-area'
import { authOptions } from "../api/auth/[...nextauth]"

const ChatScreen = ({ session }: { session: Session }) => {
  const [selectedModel, setSelectedModel] = useState(availableModels[0]);
  const [systemMessage, setSystemMessage] = useState('You are ChatGPT, a general language model that can provide assistance on a variety of subjects. Focus on being helpful, informative, and engaging.');
  const [messagesList, setMessagesList] = useState([
    { role: 'system', content: systemMessage }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [responseLoading, setResponseLoading] = useState(false);

  const onSubmitMessage = async () => {
    setMessagesList((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: inputValue },
    ]);
    const inputValueCopy = inputValue;
    setInputValue('');
    setResponseLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel,
          previousMessages: messagesList,
          message: inputValueCopy
        }),
      });
      if (response.ok) {
        const responseData = await response.json();
        const assistantMessage = responseData.message;
  
        setMessagesList((prevMessages) => [
          ...prevMessages,
          { role: 'assistant', content: assistantMessage },
        ]);
      } else {
        console.error(`Error: ${response.statusText}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
      } else {
        console.error('An unexpected error occurred.');
      }
    } finally {
      setResponseLoading(false);
    }
  };
  return (
    <AIToolsLayout title="AI Portfolio - Chat" session={session} signOut={signOut}>
      <div className="flex flex-col">
      <ModelSelector model={selectedModel} onChange={setSelectedModel}/>
      <SystemMessage systemMessage={systemMessage} setSystemMessage={setSystemMessage}/>
      <ChatArea messages={messagesList}/>
      <InputArea inputValue={inputValue} setInputValue={setInputValue} onSubmitMessage={onSubmitMessage} responseLoading={responseLoading}/>
    </div>
    </AIToolsLayout>
    
  );
};

export default ChatScreen

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}
