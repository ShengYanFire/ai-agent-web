import { Input, Select } from "antd"
import { useState } from "react"
import { SendOutlined } from "@ant-design/icons"

const { TextArea } = Input

export default () => {
    const [model, setModel] = useState('qwen3:8b')
    const [inputValue, setInputValue] = useState('')
    
    const handleSendMessage = () => {
        if (inputValue.trim()) {
            console.log('发送消息:', inputValue, '使用模型:', model)
            // 实际项目中这里会调用API发送消息
            setInputValue('') // 发送后清空输入框
        }
    }
    
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (e.shiftKey) {
                // Shift+Enter 换行，由浏览器默认处理
                return
            } else {
                // Enter 发送消息
                e.preventDefault() // 阻止默认行为（换行）
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
                    <SendOutlined
                        className="cursor-pointer p-2 rounded-md hover:bg-blue-50"
                        onClick={handleSendMessage}
                    />
                </div>
            </div>
        </div>
    </>
}