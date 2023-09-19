import { CompletionCreateParams } from "openai/resources/chat/index";

export const functions: CompletionCreateParams.Function[] = [
  {
    name: "get_knowledge_base",
    description:
      "Get articles from a database related to the query",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "The query entered by the user to match the knowledge base",
        },
      },
      required: [],
    },
  },
];

async function get_knowledge_base(query: string) {
  let response;
  try {
    response = await fetch(
        `http://127.0.0.1:3300/query/${query}`,
    );

  }
  catch (e) {
    console.log(e)
  }

  let data = await response.json();
  data = data.query.map((item: any) => item[0].page_content)
  return {
    ...data,
  };
}


export async function runFunction(name: string, args: any) {
  switch (name) {
    case "get_knowledge_base":
      return await get_knowledge_base(args.query);
    default:
      return null;
  }
}
