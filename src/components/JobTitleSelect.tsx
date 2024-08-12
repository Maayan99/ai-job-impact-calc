import { useState, useEffect } from 'react';
import { jobTitles } from '../utils/jobTitles';

interface JobTitleSelectProps {
    value: string;
    onChange: (value: string) => void;
}

export default function JobTitleSelect({ value, onChange }: JobTitleSelectProps) {
    const [search, setSearch] = useState('');
    const [filteredTitles, setFilteredTitles] = useState(jobTitles);

    useEffect(() => {
        const filtered = jobTitles.filter(title =>
            title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredTitles(filtered);
    }, [search]);

    return (
        <div className="relative">
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-300">
                Job Title
            </label>
            <input
                type="text"
                id="jobTitle"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search job titles..."
            />
            {search && (
                <ul className="absolute z-10 mt-1 w-full bg-gray-700 border border-gray-600 rounded-md max-h-60 overflow-auto">
                    {filteredTitles.map((title, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                            onClick={() => {
                                onChange(title);
                                setSearch(title);
                            }}
                        >
                            {title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
