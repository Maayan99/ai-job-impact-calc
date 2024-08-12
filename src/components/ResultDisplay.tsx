import { motion } from 'framer-motion';

export default function ResultDisplay({ score, jobDescription }) {
    const getScoreColor = (score) => {
        if (score <= 3) return 'from-green-400 to-green-600';
        if (score <= 7) return 'from-yellow-400 to-yellow-600';
        return 'from-red-400 to-red-600';
    };

    const getImplicationText = (score) => {
        if (score <= 3) return 'Low risk of AI impact. Your job is likely safe for the foreseeable future.';
        if (score <= 7) return 'Moderate risk of AI impact. Some aspects of your job may be automated in the coming years.';
        return 'High risk of AI impact. Your job may be significantly affected by AI in the near future.';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 bg-opacity-50 p-8 rounded-lg shadow-lg backdrop-blur-sm"
        >
            <h2 className="text-2xl font-bold mb-6 text-center">AI Impact Results</h2>
            <div className="mb-6">
                <div className="text-lg font-semibold mb-2 text-center">Impact Score: {score}/10</div>
                <motion.div
                    className="w-full h-4 bg-gray-700 rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${getScoreColor(score)}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${score * 10}%` }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    />
                </motion.div>
            </div>
            <p className="text-gray-300 mb-6 text-center">{getImplicationText(score)}</p>
            <div className="text-sm text-gray-400">
                <h3 className="font-semibold mb-2">Job Description Analysis:</h3>
                <p>{jobDescription}</p>
            </div>
        </motion.div>
    );
}