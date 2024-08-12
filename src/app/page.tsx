'use client'
import { useState } from 'react';
import JobForm from '../components/JobForm';
import ResultDisplay from '../components/ResultDisplay';
import { motion } from 'framer-motion';

export default function Home() {
    const [score, setScore] = useState<number | null>(null);
    const [description, setDescription] = useState<string>('');

    const handleSubmit = async (formData: any) => {
        // Simulate API call (replace with actual API call)
        const calculatedScore = Math.floor(Math.random() * 10) + 1;
        setScore(calculatedScore);
        setDescription(formData.jobDescription);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl"
            >
                <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    AI Job Impact Calculator
                </h1>
                {score === null ? (
                    <JobForm onSubmit={handleSubmit} />
                ) : (
                    <ResultDisplay score={score} jobDescription={description} />
                )}
            </motion.div>
        </div>
    );
}