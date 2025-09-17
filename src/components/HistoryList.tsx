import { useState } from "react"

export default () => {
    const [currentSession, setcurrentSession] = useState<any>()
    return <>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map(item => <div
            key={item}
            className={`layout-transition ml-5 text-sm text-gray-500 cursor-pointer truncate mb-2 ${currentSession === item ? 'p-3 rounded-lg bg-gray-100 shadow-md' : ''}`}
            onClick={() => setcurrentSession(item)}
        >
            {'的撒旦撒旦给三安光电撒打的撒旦撒旦给三安光电撒打'}
        </div>)}
    </>
}