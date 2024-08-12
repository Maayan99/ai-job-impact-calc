import { NextResponse } from 'next/server';
import { calculateImpactScore } from '@/utils/calculator';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { score, comment } = await calculateImpactScore(body);
        return NextResponse.json({ score, comment });
    } catch (error) {
        console.error('Error calculating impact score:', error);
        return NextResponse.json({ error: 'Error calculating impact score' }, { status: 500 });
    }
}