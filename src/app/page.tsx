'use client';
import { useState } from 'react';
import JobForm from '../components/JobForm';
import ResultDisplay from '../components/ResultDisplay';
import { motion } from 'framer-motion';

export default function Home() {
    const [score, setScore] = useState<number | null>(null);
    const [comment, setComment] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (formData: any) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/calculate-impact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setScore(data.score);
            setComment(data.comment);
            setDescription(formData.jobDescription);
        } catch (error) {
            console.error('Error calculating impact:', error);
            // Handle error (e.g., show error message to user)
        } finally {
            setIsLoading(false);
        }
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
                    <JobForm onSubmit={handleSubmit} isLoading={isLoading} />
                ) : (
                    <ResultDisplay score={score} jobDescription={description} comment={comment} />
                )}
            </motion.div>
        </div>
    );
}