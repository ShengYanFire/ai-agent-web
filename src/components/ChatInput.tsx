import { useState } from "react"
import type { Status } from "@/hooks/usePostStreamJSON"
import ModelSelect from "./ModelSelect"
import { Textarea } from "./ui/textarea"
import { cn } from "@/lib/utils"
import { CirclePause, Send } from "lucide-react"

export default ({ post, status, abort }: {
    post: (url: string, body: any) => void,
    status: Status,
    abort: () => void
}) => {
    const [model, setModel] = useState('qwen3:8b')
    const [inputValue, setInputValue] = useState('')

    const handleSendMessage = () => {
        if (status === 'idle' || status === 'done') {
            if (inputValue.trim()) {
                post('/api/generate', { model, "prompt": inputValue, "stream": true })
                setInputValue('')
            }
        } else {
            // message.warning('请稍等，正在处理中...')
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (e.shiftKey) {
                return
            } else {
                e.preventDefault()
                handleSendMessage()
            }
        }
    }

    return <>
        <div className="border-1 border-gray-300 rounded-2xl p-2 ">
            <Textarea
                placeholder="请输入内容，Shift+Enter 换行"
                className={cn('scrollbar-hide max-h-32 border-0 p-1 shadow-none  resize-none focus-visible:ring-0')}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            <div className="flex justify-end mt-1">
                <div className="flex justify-end gap-1 items-center">
                    <ModelSelect model={model} setModel={setModel} />

                    {(status === 'idle' || status === 'done' || status === 'error') && <>
                        <Send
                            className="w-8 h-8 p-1  cursor-pointer rounded-md text-gray-600 hover:bg-blue-100"
                            onClick={handleSendMessage}
                        />
                    </>}

                    {status === 'loading' && <>
                        <CirclePause
                            className="w-8 h-8 p-1 cursor-pointer rounded-md text-gray-600 hover:bg-blue-100"
                            onClick={abort}
                        />
                    </>}
                </div>
            </div>
        </div>
    </>
}