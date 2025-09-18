import { useState } from "react"

export default function HistoryList({ data }: { data: any[] }) {
    const [currentSession, setcurrentSession] = useState<any>()
    return <>
        {data.map(item => <div
            key={item.id}
            className={`layout-transition ml-5 text-sm text-gray-500 cursor-pointer truncate mb-2 ${currentSession === item ? 'p-3 rounded-lg bg-gray-100 shadow-md' : ''}`}
            onClick={() => setcurrentSession(item)}
        >
            {item.req.prompt}
        </div>)}
    </>
}