import { motion } from 'framer-motion';

export default function FactorSlider({ name, label, value, onChange }) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-2">
                {label}
            </label>
            <div className="relative">
                <input
                    type="range"
                    id={name}
                    name={name}
                    min="1"
                    max="10"
                    value={value}
                    onChange={(e) => onChange(name, parseInt(e.target.value))}
                    className="w-full appearance-none bg-gray-700 h-2 rounded-full outline-none"
                />
                <motion.div
                    className="absolute top-0 left-0 w-4 h-4 bg-blue-500 rounded-full -mt-1 pointer-events-none"
                    style={{ left: `calc(${(value - 1) * 11.1111}% - 8px)` }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-400">
                <span>1</span>
                <span>5</span>
                <span>10</span>
            </div>
        </div>
    );
}
