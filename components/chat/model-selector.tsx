export const availableModels = [
    "gpt-3.5-turbo"
];
interface ModelSelectorProps {
    model: string,
    onChange: (model: string) => void
}
export const ModelSelector = ({model, onChange}: ModelSelectorProps) => {
    const handleModelChange = (e: { target: { value: any; }; }) => {
        onChange(e.target.value);
    };

    return (
        <div className="flex flex-col gap-2 rounded-lg border border-border bg-background/70 p-4 sm:flex-row sm:items-center sm:justify-between">
        <label htmlFor="model-selector" className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
            Model
        </label>
        <select
            id="model-selector"
            className="h-10 rounded-md border border-border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            value={model}
            onChange={handleModelChange}
        >
            {availableModels.map((availableModel) => (
            <option key={availableModel} value={availableModel}>
                {availableModel}
            </option>
            ))}
        </select>
        </div>
);
};
