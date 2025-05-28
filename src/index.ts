import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getProblemStart } from "./conexions/ApiChallenge.js";
import { createTools } from "./tools/tools.js";
import dotenv from "dotenv";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
dotenv.config();

export const server = new McpServer({
  name: "desafio-adereso-mcp-server",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});


async function main() {
  createTools(server);
  const transport = new StdioServerTransport(

  );
  await server.connect(transport);

  console.assert("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});


