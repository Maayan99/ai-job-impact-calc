import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function calculateImpactScore(formData: any): Promise<number> {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are an AI job impact analyst. Given a job description and related factors, estimate the likelihood of AI taking over this job on a scale of 1 to 10." },
                { role: "user", content: `Job Title: ${formData.jobTitle}\nJob Description: ${formData.jobDescription}\nCreativity Factor: ${formData.creativityFactor}\nTechnical Factor: ${formData.technicalFactor}\nInterpersonal Factor: ${formData.interpersonalFactor}` }
            ],
            max_tokens: 50,
        });

        const aiScore = parseInt(response.choices[0].message.content || "5");
        return Math.min(Math.max(aiScore, 1), 10);  // Ensure score is between 1 and 10
    } catch (error) {
        console.error('Error calculating impact score:', error);
        return 5;  // Return a default score if there's an error
    }
}