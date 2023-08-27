import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import z from "zod";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z.string().describe("the mood of the person who wrote the journal entry."),
    summary: z.string().describe("quick summary of the entire entry."),
    color: z
      .string()
      .describe(
        "a hexadecimal color code the represents the mood of the entry. Example #0101fe for blue representing happiness.",
      ),
    negative: z.boolean().describe("is the journal entry negative? (i.e. does it contain negative emotions?)"),
  }),
);

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
