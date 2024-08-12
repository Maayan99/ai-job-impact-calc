import { motion } from 'framer-motion';
import { FaWhatsapp, FaTwitter } from 'react-icons/fa';

interface ResultDisplayProps {
    score: number;
    jobDescription: string;
    comment: string;
}

export default function ResultDisplay({ score, jobDescription, comment }: ResultDisplayProps) {
    const getScoreColor = (score: number) => {
        if (score <= 3) return 'from-green-400 to-green-600';
        if (score <= 7) return 'from-yellow-400 to-yellow-600';
        return 'from-red-400 to-red-600';
    };

    const shareText = `My job has an AI impact score of ${score}/10. ${comment}`;
    const encodedShareText = encodeURIComponent(shareText);

    const whatsappShareUrl = `https://wa.me/?text=${encodedShareText}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedShareText}`;

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
            <p className="text-gray-300 mb-6 text-center">{comment}</p>
            <div className="text-sm text-gray-400 mb-6">
                <h3 className="font-semibold mb-2">Job Description Analysis:</h3>
                <p>{jobDescription}</p>
            </div>
            <div className="flex justify-center space-x-4">
                <a
                    href={whatsappShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                    <FaWhatsapp className="mr-2" /> Share on WhatsApp
                </a>
                <a
                    href={twitterShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition"
                >
                    <FaTwitter className="mr-2" /> Share on Twitter
                </a>
            </div>
        </motion.div>
    );
}