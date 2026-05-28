
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey:
    process.env.OPENAI_API_KEY,
});

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const answer =
      body.answer;

    const interviewType =
      body.interviewType ||
      'General Japanese Interview';

    // GPT RESPONSE
    const completion =
      await openai.chat.completions.create({
        model: 'gpt-4o-mini',

        messages: [
          {
            role: 'system',

            content: `
You are a real Japanese HR interviewer from a Japanese company.

Your personality:
- Professional
- Calm
- Friendly
- Natural
- Human-like
- Native Japanese speaker

Rules:
- Speak ONLY Japanese
- Never use English
- Never say you are AI
- Keep responses conversational
- Ask only ONE question at a time
- React naturally
- Sound like a real Japanese HR interviewer
`,
          },

          {
            role: 'user',

            content: answer,
          },
        ],

        temperature: 0.9,

        max_tokens: 150,
      });

    const aiText =
      completion.choices[0]
        .message.content ||
      'すみません、もう一度お願いします。';

    // D-ID TALKING AVATAR
    const didResponse =
      await fetch(
        'https://api.d-id.com/talks',
        {
          method: 'POST',

          headers: {
            Authorization: `Basic ${process.env.DID_API_KEY}`,

            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            source_url:
              'https://create-images-results.d-id.com/DefaultPresenters/Noelle_f/image.jpeg',

            script: {
              type: 'text',

              provider: {
                type: 'microsoft',

                voice_id:
                  'ja-JP-NanamiNeural',
              },

              input: aiText,
            },
          }),
        }
      );

    const didData =
      await didResponse.json();

    return Response.json({
      result: aiText,

      talkId:
        didData.id,
    });
  } catch (error: unknown) {
    console.error(
      'OPENAI/D-ID ERROR:',
      error
    );

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'AI request failed',
      },
      {
        status: 500,
      }
    );
  }
}

