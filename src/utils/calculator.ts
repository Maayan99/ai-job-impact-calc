import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function calculateImpactScore(formData: any): Promise<{ score: number; comment: string }> {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a harsh and brutally honest AI job impact analyst. Given a job description, assess the likelihood of AI taking over this job on a scale of 1 to 10, with 10 being certain replacement by AI. Be critical and pessimistic in your analysis. Provide a 1-sentence explanation: on the current impact, on near-future developments, and on long-term outlook. Format your response as 'Score: X\nExplanation: [Your 1-sentence explanation here]'" },
                { role: "user", content: `Job Title: ${formData.jobTitle}\nJob Description: ${formData.jobDescription}` }
            ],
            max_tokens: 200,
        });

        const content = response.choices[0].message.content || "";
        const scoreMatch = content.match(/Score:\s*(\d+)/i);
        const explanationMatch = content.match(/Explanation:\s*([\s\S]*)/i);

        const score = scoreMatch ? Math.min(Math.max(parseInt(scoreMatch[1]), 1), 10) : 5;
        const comment = explanationMatch ? explanationMatch[1].trim() : "No explanation provided.";

        return { score, comment };
    } catch (error) {
        console.error('Error calculating impact score:', error);
        return { score: 5, comment: "Unable to generate a score and comment due to an error." };
    }
}