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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white flex items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl z-10"
            >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
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