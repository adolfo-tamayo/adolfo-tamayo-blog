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
      <div className="bg-gray-300 text-black p-4">
        {!isEditing ? (
          <span onClick={handleClick} className="cursor-pointer">
            {systemMessage}
          </span>
        ) : (
          <input
            type="text"
            autoFocus
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            className="w-full p-2 rounded"
          />
        )}
      </div>
    );
  };  
export default SystemMessage