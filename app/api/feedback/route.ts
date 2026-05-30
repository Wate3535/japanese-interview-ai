
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const messages =
      body.messages;

    const completion =
      await openai.chat.completions.create({
        model: 'gpt-4o-mini',

        messages: [
          {
            role: 'system',

            content: `
You are a professional Japanese HR interviewer.

Analyze the interview conversation.

Return ONLY valid JSON.

Format:

{
  "overallScore": 85,
  "grammar": 80,
  "keigo": 75,
  "confidence": 90,
  "naturalness": 85,
  "hr_impression": 88,
  "strengths": [
    "..."
  ],
  "weakPoints": [
    "..."
  ],
  "improvements": [
    "..."
  ]
}
`,
          },

          {
            role: 'user',

            content: JSON.stringify(
              messages
            ),
          },
        ],

        temperature: 0.3,

        response_format: {
          type: 'json_object',
        },
      });

    const feedback =
      JSON.parse(
        completion.choices[0]
          .message.content ||
          '{}'
      );

    return Response.json(
      feedback
    );
  } catch (error) {
    console.error(
      'FEEDBACK ERROR:',
      error
    );

    return Response.json(
      {
        error:
          'Feedback generation failed',
      },
      {
        status: 500,
      }
    );
  }
}

