import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/github-dark.css";
import DOMPurify from "dompurify";

export default function ChatContent({ data }: { data:string }) {
    // 安全：过滤危险 HTML
    const safeMd = DOMPurify.sanitize(data, { ADD_TAGS: ["code"], ADD_ATTR: ["class"] });

    return <>
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
        >
            {safeMd || "答案将实时显示在这里…"}
        </ReactMarkdown>
    </>
}