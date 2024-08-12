interface ResultDisplayProps {
    score: number;
    jobDescription: string;
}

export default function ResultDisplay({ score, jobDescription }: ResultDisplayProps) {
    const getScoreColor = (score: number) => {
        if (score <= 3) return 'bg-green-500';
        if (score <= 7) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const getImplicationText = (score: number) => {
        if (score <= 3) return 'Low risk of AI impact. Your job is likely safe for the foreseeable future.';
        if (score <= 7) return 'Moderate risk of AI impact. Some aspects of your job may be automated in the coming years.';
        return 'High risk of AI impact. Your job may be significantly affected by AI in the near future.';
    };

    return (
        <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Results</h2>
            <div className="mb-4">
                <div className="text-lg font-semibold mb-2">AI Impact Score: {score}/10</div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                        className={`h-2.5 rounded-full ${getScoreColor(score)}`}
                        style={{ width: `${score * 10}%` }}
                    ></div>
                </div>
            </div>
            <p className="text-gray-300 mb-4">{getImplicationText(score)}</p>
            <div className="text-sm text-gray-400">
                <h3 className="font-semibold mb-2">Job Description Analysis:</h3>
                <p>{jobDescription}</p>
            </div>
        </div>
    );
}