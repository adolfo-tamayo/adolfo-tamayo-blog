import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import copy from 'clipboard-copy';
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CodeHighlighter = SyntaxHighlighter as any;

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
          <CodeHighlighter language={language} style={dark}>
            {codeWithoutLanguage}
          </CodeHighlighter>
          <button
            onClick={() => copy(codeWithoutLanguage)}
            className="absolute right-2 top-2 rounded-md border border-border bg-background px-2 py-1 text-xs"
          >
            Copy
          </button>
        </div>
      );    
    };

    const renderMessage = (message: ChatMessage, index: any) => {
      if (message.role === 'assistant') {
        const segments = message.content.split(/(```[\s\S]*?```)/g);

        const messageContent = segments.map((segment, index) => {
          if (segment.startsWith('```') && segment.endsWith('```')) {
            return <div key={index}>{renderCodeBlock(segment)}</div>
          } else {
            return (
            <div key={index} className="prose prose-sm">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                { segment }
              </ReactMarkdown>
            </div>)
          }
        });
          return (
            <div key={index} className="my-3 flex items-start">
              <div className="max-w-3xl rounded-lg border border-border bg-background/70 p-4 leading-7">
                {messageContent}
              </div>
          </div>
          );
      } else if (message.role === 'user') {
        return (
          <div key={index} className="my-3 flex items-start justify-end">
            <div className="max-w-3xl rounded-lg bg-foreground p-4 leading-7 text-background">
              {message.content}
            </div>
          </div>
        );
      }
    };

    const visibleMessages = messages.filter((message) => message.role !== "system");
  
    return (
      <div className="min-h-72 flex-1 overflow-auto rounded-lg border border-border bg-muted/25 p-4">
        {visibleMessages.length > 0 ? (
          visibleMessages.map((message, index) => renderMessage(message, index))
        ) : (
          <div className="flex min-h-56 items-center justify-center text-center text-sm text-muted-foreground">
            Conversation output appears here.
          </div>
        )}
      </div>
    );
  };
export default ChatArea;
