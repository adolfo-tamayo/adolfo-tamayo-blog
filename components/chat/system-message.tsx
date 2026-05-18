import { useState } from "react";

interface SystemMessageProps {
    systemMessage: string,
    setSystemMessage: (systemMessage: string) => void
}
const SystemMessage = ({systemMessage, setSystemMessage}: SystemMessageProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(systemMessage);
  
    const handleClick = () => {
      setIsEditing(true);
    };
  
    const handleBlur = () => {
      setIsEditing(false);
      setSystemMessage(inputValue);
    };
  
    const handleChange = (e: any) => {
      setInputValue(e?.target?.value);
    };
  
    const handleKeyPress = (e: any) => {
      if (e.key === 'Enter' && !(e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleBlur();
      }
    };
  
    return (
      <div className="rounded-lg border border-border bg-background/70 p-4">
        <p className="mb-2 text-sm uppercase tracking-[0.18em] text-muted-foreground">
          System
        </p>
        {!isEditing ? (
          <button
            type="button"
            onClick={handleClick}
            className="w-full cursor-pointer text-left text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground"
          >
            {systemMessage}
          </button>
        ) : (
          <input
            type="text"
            autoFocus
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyPress}
            className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          />
        )}
      </div>
    );
  };  
export default SystemMessage
