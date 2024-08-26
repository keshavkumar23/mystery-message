import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(request: Request) {
  try {
    const prompt =
    `Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.`;

    const result = await model.generateContent(prompt);
    const text = result.response?.text;
    return Response.json({
      success: true,
      message: text || "No response generated"
    },
      { status: 200 }
    )
  } catch (error) {
    console.log("Error suggesting: ", error);
    return Response.json({
      success: false,
      message: "Error suggesting"
    },
      { status: 500 }
    )
  }
}


// import { GoogleGenerativeAI } from "@google/generative-ai";


// const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// export async function POST(request) {
//   try {
//     const prompt = `
//     Create a list of three open-ended and engaging questions formatted as a single string.
//     Each question should be separated by '||'.
//     These questions are for an anonymous social messaging platform, like Qooh.me,
//     and should be suitable for a diverse audience. Avoid personal or sensitive topics,
//     focusing instead on universal themes that encourage friendly interaction.
//     For example, your output should be structured like this:
//     'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'.
//     Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.
//     `;

//     // Create a ReadableStream to stream the response
//     const stream = new ReadableStream({
//       async start(controller) {
//         let tokenCount = 0;
//         try {
//           // Generate content and stream tokens
//           const result = await model.generateContent({ prompt });
//           const tokens = result?.data?.tokens || [];

//           for (const token of tokens) {
//             if (tokenCount >= 400) {
//               break;
//             }
//             controller.enqueue(new TextEncoder().encode(token.text));
//             tokenCount += token.text.length;
//           }

//           controller.close();
//         } catch (error) {
//           console.error("Error generating or streaming tokens: ", error);
//           controller.error("Error generating or streaming tokens");
//         }
//       },
//     });

//     // Return the stream as a response
//     return new Response(stream, {
//       headers: {
//         "Content-Type": "text/plain; charset=utf-8",
//         "Transfer-Encoding": "chunked",
//       },
//     });

//   } catch (error) {
//     console.error("Error suggesting message: ", error);

//     return new Response(
//       JSON.stringify({
//         success: false,
//         message: "Error suggesting message",
//       }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }
