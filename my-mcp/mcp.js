import {
    McpServer,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import {StdioServerTransport} from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
    name: "add-server",
    version: "1.0.0"
});

server.registerTool(
    "add",
    {
        title: "Addition Tool",
        // This is the context that will be used to describe the tool is (Used by the LLM to determine when to use this tool). Shouldn't be too long. 1-3 sentences
        description: "Add two numbers together",
        // this helps the LLM understand the kind of data the tool required to function correctly.
        inputSchema: {
            a: z.number(),
            b: z.number()
        },
    },
    async ({a, b}) => {
        return {
            content: [{type: "text", text: String(a + b)}]
    }
});

const transport = new StdioServerTransport();
await server.connect(transport);
