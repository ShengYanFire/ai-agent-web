import { Input, Select } from "antd"
import { useState } from "react"
import { SendOutlined } from "@ant-design/icons"

export default () => {
    const [model, setModel] = useState('qwen3:8b')
    return <>
        <div className="border-1 border-gray-300 rounded-2xl p-2 ">
            <Input.TextArea
                autoSize={{ minRows: 2, maxRows: 4 }}
                placeholder="请输入内容"
                variant="borderless"
                className="bg-white-100 scrollbar-hide focus:outline-none"
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
                    />
                </div>
            </div>
        </div>
    </>
}