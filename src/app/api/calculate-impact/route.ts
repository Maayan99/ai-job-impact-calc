import type { NextApiRequest, NextApiResponse } from 'next';
import { calculateImpactScore } from '@/utils/calculator';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const score = await calculateImpactScore(req.body);
            res.status(200).json({ score });
        } catch (error) {
            res.status(500).json({ error: 'Error calculating impact score' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}