import { useState } from 'react';
import JobTitleSelect from './JobTitleSelect';
import FactorSlider from './FactorSlider';

interface JobFormProps {
    onSubmit: (formData: any) => void;
}

export default function JobForm({ onSubmit }: JobFormProps) {
    const [formData, setFormData] = useState({
        jobDescription: '',
        jobTitle: '',
        userTitle: '',
        creativityFactor: 5,
        technicalFactor: 5,
        interpersonalFactor: 5,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSliderChange = (name: string, value: number) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-300">
                    Job Description
                </label>
                <textarea
                    id="jobDescription"
                    name="jobDescription"
                    rows={4}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
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
                <label htmlFor="userTitle" className="block text-sm font-medium text-gray-300">
                    Your Title
                </label>
                <input
                    type="text"
                    id="userTitle"
                    name="userTitle"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                    value={formData.userTitle}
                    onChange={handleChange}
                />
            </div>

            <FactorSlider
                name="creativityFactor"
                label="Creativity Required"
                value={formData.creativityFactor}
                onChange={handleSliderChange}
            />

            <FactorSlider
                name="technicalFactor"
                label="Technical Skills"
                value={formData.technicalFactor}
                onChange={handleSliderChange}
            />

            <FactorSlider
                name="interpersonalFactor"
                label="Interpersonal Skills"
                value={formData.interpersonalFactor}
                onChange={handleSliderChange}
            />

            <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Calculate Impact
            </button>
        </form>
    );
}