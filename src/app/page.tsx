import { useState } from 'react';
import Head from 'next/head';
import JobForm from '../components/JobForm';
import ResultDisplay from '../components/ResultDisplay';
import { calculateImpactScore } from '../utils/calculator';

export default function Home() {
  const [score, setScore] = useState<number | null>(null);
  const [description, setDescription] = useState<string>('');

  const handleSubmit = async (formData: any) => {
    const calculatedScore = await calculateImpactScore(formData);
    setScore(calculatedScore);
    setDescription(formData.jobDescription);
  };

  return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Head>
          <title>AI Job Impact Calculator</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-center">AI Job Impact Calculator</h1>
          <JobForm onSubmit={handleSubmit} />
          {score !== null && <ResultDisplay score={score} jobDescription={description} />}
        </main>
      </div>
  );
}