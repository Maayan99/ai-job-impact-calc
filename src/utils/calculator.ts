import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function calculateImpactScore(formData: any): Promise<{ score: number; comment: string }> {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are an AI job impact analyst. Given a job description, estimate the likelihood of AI taking over this job on a scale of 1 to 10, and provide a brief, one-sentence comment explaining the score." },
                { role: "user", content: `Job Title: ${formData.jobTitle}\nJob Description: ${formData.jobDescription}` }
            ],
            max_tokens: 100,
        });

        const content = response.choices[0].message.content || "";
        const [scoreStr, comment] = content.split('\n');
        const score = Math.min(Math.max(parseInt(scoreStr) || 5, 1), 10);

        return { score, comment: comment.trim() };
    } catch (error) {
        console.error('Error calculating impact score:', error);
        return { score: 5, comment: "Unable to generate a comment due to an error." };
    }
}