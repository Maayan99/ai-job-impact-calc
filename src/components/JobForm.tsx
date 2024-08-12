import { useState } from 'react';
import { motion } from 'framer-motion';
import JobTitleSelect from './JobTitleSelect';

interface JobFormProps {
    onSubmit: (formData: any) => void;
    isLoading: boolean;
}

export default function JobForm({ onSubmit, isLoading }: JobFormProps) {
    const [formData, setFormData] = useState({
        jobDescription: '',
        jobTitle: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="space-y-8 bg-gray-800 bg-opacity-30 p-10 rounded-2xl shadow-2xl backdrop-blur-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div>
                <label htmlFor="jobTitle" className="block text-lg font-medium text-gray-300 mb-2">
                    Job Title
                </label>
                <JobTitleSelect
                    value={formData.jobTitle}
                    onChange={(value) => setFormData(prev => ({ ...prev, jobTitle: value }))}
                />
            </div>

            <div>
                <label htmlFor="jobDescription" className="block text-lg font-medium text-gray-300 mb-2">
                    Job Description
                </label>
                <div className="relative">
          <textarea
              id="jobDescription"
              name="jobDescription"
              rows={6}
              className="w-full px-4 py-3 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={formData.jobDescription}
              onChange={handleChange}
              required
              placeholder="Describe the main responsibilities and skills required for this job..."
              style={{
                  backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(100, 130, 255, 0.1) 0%, rgba(100, 130, 255, 0) 90%)',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-animation 15s ease infinite',
              }}
          />
                    <div className="absolute inset-0 rounded-lg pointer-events-none" style={{
                        background: 'linear-gradient(45deg, rgba(100, 130, 255, 0.1) 0%, rgba(100, 130, 255, 0) 100%)',
                        mixBlendMode: 'overlay',
                    }}></div>
                </div>
            </div>

            <motion.button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
            >
                {isLoading ? (
                    <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </span>
                ) : (
                    'Analyze AI Impact'
                )}
            </motion.button>
        </motion.form>
    );
}