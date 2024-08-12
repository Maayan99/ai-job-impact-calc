import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { jobTitles } from '../utils/jobTitles';

export default function JobTitleSelect({ value, onChange }) {
    const [search, setSearch] = useState('');
    const [filteredTitles, setFilteredTitles] = useState(jobTitles);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const filtered = jobTitles.filter(title =>
            title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredTitles(filtered);
    }, [search]);

    return (
        <div className="relative">
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-300 mb-2">
                Job Title
            </label>
            <input
                type="text"
                id="jobTitle"
                className="w-full px-3 py-2 text-gray-300 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                placeholder="Search job titles..."
            />
            <AnimatePresence>
                {isOpen && search && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-10 mt-1 w-full bg-gray-700 border border-gray-600 rounded-md max-h-60 overflow-auto shadow-lg"
                    >
                        {filteredTitles.map((title, index) => (
                            <motion.li
                                key={index}
                                className="px-4 py-2 hover:bg-gray-600 cursor-pointer transition"
                                whileHover={{ backgroundColor: 'rgba(75, 85, 99, 0.5)' }}
                                onClick={() => {
                                    onChange(title);
                                    setSearch(title);
                                    setIsOpen(false);
                                }}
                            >
                                {title}
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}
