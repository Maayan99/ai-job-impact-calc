interface FactorSliderProps {
    name: string;
    label: string;
    value: number;
    onChange: (name: string, value: number) => void;
}

export default function FactorSlider({ name, label, value, onChange }: FactorSliderProps) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-300">
                {label}
            </label>
            <input
                type="range"
                id={name}
                name={name}
                min="1"
                max="10"
                value={value}
                onChange={(e) => onChange(name, parseInt(e.target.value))}
                className="mt-1 block w-full"
            />
            <div className="mt-2 flex justify-between text-xs text-gray-400">
                <span>1</span>
                <span>5</span>
                <span>10</span>
            </div>
        </div>
    );
}
