import { motion } from 'framer-motion';
import { FaWhatsapp, FaTwitter } from 'react-icons/fa';

interface ResultDisplayProps {
    score: number;
    jobTitle: string;
    jobDescription: string;
    comment: string;
}

export default function ResultDisplay({ score, jobTitle, jobDescription, comment }: ResultDisplayProps) {
    const getScoreColor = (score: number) => {
        if (score <= 3) return 'from-green-400 to-green-600';
        if (score <= 7) return 'from-yellow-400 to-yellow-600';
        return 'from-red-400 to-red-600';
    };

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    const shareText = `My job as a ${jobTitle} has an AI impact score of ${score}/10. ${comment}.\n\nCheck it out here: ${shareUrl}`;
    const encodedShareText = encodeURIComponent(shareText);

    const whatsappShareUrl = `https://wa.me/?text=${encodedShareText}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedShareText}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 bg-opacity-30 p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-lg border border-gray-700"
        >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                AI Impact Results
            </h2>
            <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-center text-gray-300">
                {jobTitle}
            </h3>
            <div className="mb-6">
                <div className="text-lg sm:text-xl font-semibold mb-2 text-center">Impact Score: {score}/10</div>
                <motion.div
                    className="w-full h-4 sm:h-6 bg-gray-700 rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${getScoreColor(score)}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${score * 10}%` }}
                        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    />
                </motion.div>
            </div>
            <motion.p
                className="text-base sm:text-lg text-gray-300 mb-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
            >
                {comment}
            </motion.p>
            <div className="text-sm text-gray-400 mb-6 bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-gray-300">Job Description:</h4>
                <p>{jobDescription}</p>
            </div>
            <motion.div
                className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
            >
                <a
                    href={whatsappShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-green-600 text-white text-base sm:text-lg rounded-lg hover:bg-green-700 transition transform hover:scale-105"
                >
                    <FaWhatsapp className="mr-2" /> Share on WhatsApp
                </a>
                <a
                    href={twitterShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-400 text-white text-base sm:text-lg rounded-lg hover:bg-blue-500 transition transform hover:scale-105"
                >
                    <FaTwitter className="mr-2" /> Share on Twitter
                </a>
            </motion.div>
        </motion.div>
    );
}