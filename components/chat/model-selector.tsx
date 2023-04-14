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
        <div className="bg-gray-500 text-white p-4">
        <label htmlFor="model-selector" className="mr-2">
            Select model:
        </label>
        <select
            id="model-selector"
            className="bg-white text-black p-1 rounded"
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

