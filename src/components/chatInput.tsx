import { Input, message, Select } from "antd"
import { useState } from "react"
import { LoadingOutlined, SendOutlined } from "@ant-design/icons"
import type { Status } from "@/hooks/usePostStreamJSON"
import stopSvg from '@/assets/stop.svg'

const { TextArea } = Input

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
            message.warning('请稍等，正在处理中...')
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
            <TextArea
                autoSize={{ minRows: 2, maxRows: 4 }}
                placeholder="请输入内容，Shift+Enter 换行"
                variant="borderless"
                className="bg-white-100 scrollbar-hide focus:outline-none"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            <div className="flex justify-end mt-1">
                <div className="flex justify-end gap-2 items-center">
                    <Select
                        value={model}
                        onChange={setModel}
                        variant="borderless"
                        options={[{ value: 'qwen3:8b' }, { value: 'deepseek-coder' }]}
                        className="hover:bg-blue-50 rounded-full  "
                    />
                    {(status === 'idle' || status === 'done') && <SendOutlined
                        className="cursor-pointer p-2 rounded-md hover:bg-blue-50"
                        onClick={handleSendMessage}
                    />}

                    {status === 'loading' && <img
                        src={stopSvg}
                        className="w-9 p-2 cursor-pointer rounded-md hover:bg-blue-50"
                        onClick={abort}
                    />}
                </div>
            </div>
        </div>
    </>
}