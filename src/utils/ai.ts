import { OpenAI } from "langchain/llms/openai";

export const analyze = async (prompt: string) => {
  const model = new OpenAI({
    temperature: 0,
    modelName: "gpt-3.5-turbo",
    configuration: {
      basePath: "https://api.chatanywhere.cn/v1",
      apiKey: process.env.OPENAI_API_KEY,
    },
  });
  const result = await model.call(prompt);

  console.log("result: ", result);
};
