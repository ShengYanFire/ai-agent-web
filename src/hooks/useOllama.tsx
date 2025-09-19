import { ChatOllama } from '@langchain/ollama';
import { ChatMessageHistory } from 'langchain/memory';
import { useCallback, useRef, useState } from 'react';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { RunnableWithMessageHistory } from '@langchain/core/runnables';
import { tool } from "@langchain/core/tools";
import { AgentExecutor, createToolCallingAgent } from "langchain/agents";

const store = new Map();                    // 可替换为 Redis / File / DB
function getSessionHistory(sessionId: string) {
    if (!store.has(sessionId)) {
        store.set(sessionId, new ChatMessageHistory());
    }
    return store.get(sessionId);
}

// ---------- 1. 定义工具 ----------
const multiply = tool(
    ({ first_int, second_int }: any) => `${first_int * second_int}`,
    {
        name: "multiply",
        description: "两个整数相乘",
        schema: {
            type: "object",
            properties: {
                first_int: { type: "integer" },
                second_int: { type: "integer" }
            },
            required: ["first_int", "second_int"]
        }
    }
);


const prompt = ChatPromptTemplate.fromMessages([
    ["system", "你是一位数学助手，遇到乘法请调用工具。"],
    new MessagesPlaceholder("history"),
    ["human", "{input}"],
    new MessagesPlaceholder("agent_scratchpad")  // 添加这一行
]);

const llm = new ChatOllama({
    model: 'qwen3:8b',
    temperature: 0.7,
    streaming: true,               // 关键：打开流式
});

// 创建 ToolCalling Agent
const agent = createToolCallingAgent({
    llm,
    tools: [multiply],
    prompt,
    streamRunnable: true,
});

// 创建 Agent Executor - 这是关键部分
const agentExecutor = AgentExecutor.fromAgentAndTools({
    agent,
    tools: [multiply],
    verbose: false,
    returnIntermediateSteps: false, // 可选：返回中间步骤
    handleParsingErrors: true, // 处理解析错误
});

// 创建带历史记录的链
const chainWithHistory = new RunnableWithMessageHistory({
    runnable: agentExecutor,
    getMessageHistory: getSessionHistory,
    inputMessagesKey: "input",
    historyMessagesKey: "history"
});


export default function useOllama() {
    const [chatSession, setChatSession] = useState<any>()
    const abortControllerRef = useRef<AbortController | null>(null);
    const [historyList, sethistoryList] = useState<any[]>([])

    const chat = useCallback(async (prompt: string) => {

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
        abortControllerRef.current = new AbortController();
        const { signal } = abortControllerRef.current

        const eventStream = await chainWithHistory.streamEvents(
            { input: prompt },
            { configurable: { sessionId: '1001' }, signal, version: "v1" }
        );
        let str = ''
        for await (const event of eventStream) {


            if (event.event === "on_llm_stream") {
                str += event.data.chunk.content
            }
        }

        console.log(str, getSessionHistory('1001'));

    }, [])

    const abortChat = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
    }, []);

    return { chat, chatSession, abortChat }
}