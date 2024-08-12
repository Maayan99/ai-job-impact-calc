import { useState } from 'react';
import { motion } from 'framer-motion';
import JobTitleSelect from './JobTitleSelect';
import FactorSlider from './FactorSlider';

export default function JobForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        jobDescription: '',
        jobTitle: '',
        userTitle: '',
        creativityFactor: 5,
        technicalFactor: 5,
        interpersonalFactor: 5,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 bg-gray-800 bg-opacity-50 p-8 rounded-lg shadow-lg backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div>
                <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-300 mb-2">
                    Job Description
                </label>
                <textarea
                    id="jobDescription"
                    name="jobDescription"
                    rows={4}
                    className="w-full px-3 py-2 text-gray-300 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    value={formData.jobDescription}
                    onChange={handleChange}
                    required
                />
            </div>

            <JobTitleSelect
                value={formData.jobTitle}
                onChange={(value) => setFormData(prev => ({ ...prev, jobTitle: value }))}
            />

            <div>
                <label htmlFor="userTitle" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Title
                </label>
                <input
                    type="text"
                    id="userTitle"
                    name="userTitle"
                    className="w-full px-3 py-2 text-gray-300 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    value={formData.userTitle}
                    onChange={handleChange}
                />
            </div>

            <FactorSlider
                name="creativityFactor"
                label="Creativity Required"
                value={formData.creativityFactor}
                onChange={(name, value) => setFormData(prev => ({ ...prev, [name]: value }))}
            />

            <FactorSlider
                name="technicalFactor"
                label="Technical Skills"
                value={formData.technicalFactor}
                onChange={(name, value) => setFormData(prev => ({ ...prev, [name]: value }))}
            />

            <FactorSlider
                name="interpersonalFactor"
                label="Interpersonal Skills"
                value={formData.interpersonalFactor}
                onChange={(name, value) => setFormData(prev => ({ ...prev, [name]: value }))}
            />

            <motion.button
                type="submit"
                className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-md shadow-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Calculate Impact
            </motion.button>
        </motion.form>
    );
}
