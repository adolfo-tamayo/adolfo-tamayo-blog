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
        if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
          e.preventDefault();
          if (inputValue.trim() !== '') {
            onSubmitMessage()
          }
      }
    };

    return (
        <div className="rounded-lg border border-border bg-background/70 p-4">
        <textarea
            className="min-h-28 w-full resize-y rounded-md border border-border bg-background p-3 text-sm leading-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            placeholder="Write a prompt..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
        />
        <div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>Enter sends. Shift Enter adds a line.</span>
          <button
            type="button"
            disabled={responseLoading || inputValue.trim() === ""}
            onClick={onSubmitMessage}
            className="cursor-pointer rounded-md border border-border px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            {responseLoading ? "Thinking" : "Send"}
          </button>
        </div>
        </div>
    );
};
export default InputArea
