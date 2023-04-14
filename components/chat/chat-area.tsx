import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import copy from 'clipboard-copy';
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type ChatMessage = {
    content: string,
    role: string
}
interface ChatAreaProps {
    messages: ChatMessage[]
}
const ChatArea = ({ messages }: ChatAreaProps) => {
    const renderCodeBlock = (code: string) => {
      const languageRegex = /\`\`\`(\w+)\n/;
      const languageMatch = code.match(languageRegex);
      const language = languageMatch ? languageMatch[1] : 'plaintext';
      const codeWithoutLanguage = code.replace(languageRegex, '').replace(/```$/, '').trim();

      return (
        <div className="relative">
          <SyntaxHighlighter language={language} style={dark}>
            {codeWithoutLanguage}
          </SyntaxHighlighter>
          <button
            onClick={() => copy(codeWithoutLanguage)}
            className="absolute top-0 right-0 bg-gray-200 p-1 text-xs"
          >
            Copy
          </button>
        </div>
      );    
    };

    const renderMessage = (message: ChatMessage, index: any) => {
      if (message.role === 'system') {
        return (
          <div key={index} className="text-xs text-center my-2">
            {message.content}
          </div>
        );
      } else if (message.role === 'assistant') {
        const segments = message.content.split(/(```[\s\S]*?```)/g);

        const messageContent = segments.map((segment, index) => {
          if (segment.startsWith('```') && segment.endsWith('```')) {
            return renderCodeBlock(segment)
          } else {
            return (
            <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose prose-sm">
            { segment }
            </ReactMarkdown>)
          }
        });
          return (
            <div key={index} className="flex items-start my-2">
              <div className="bg-blue-200 text-black rounded-lg p-2">
                {messageContent}
              </div>
          </div>
          );
      } else if (message.role === 'user') {
        return (
          <div key={index} className="flex items-start justify-end my-2">
            <div className="bg-green-200 text-black rounded-lg p-2">
              {message.content}
            </div>
          </div>
        );
      }
    };
  
    return (
      <div className="flex-1 bg-gray-100 p-4 overflow-auto">
        {messages.map((message, index) => renderMessage(message, index))}
      </div>
    );
  };
export default ChatArea;