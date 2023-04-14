interface InputAreaProps {
    inputValue: string,
    responseLoading: boolean,
    setInputValue: (inputValue: string) => void
    onSubmitMessage: () => void
}
const InputArea = ({inputValue, responseLoading, setInputValue, onSubmitMessage}: InputAreaProps) => {
    const handleKeyPress = (e: {
      ctrlKey: any; key: string; shiftKey: any; preventDefault: () => void; 
    }) => {
        if (responseLoading) return;
        if (e.key === 'Enter' && !e.ctrlKey) {
          e.preventDefault();
          if (inputValue.trim() !== '') {
            onSubmitMessage()
          }
      }
    };

    return (
        <div className="bg-gray-200 p-4">
        <textarea
            className="w-full h-20 p-2 rounded"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
        />
        </div>
    );
};
export default InputArea