import { useState } from "react"

export default () => {
    const [currentSession, setcurrentSession] = useState<any>()
    return <>
        <div className='ml-7 text-sm text-gray-500 cursor-pointer '>
            {[1, 2, 3, 4, 5].map(item => <>
                <div
                    key={item}
                    className={`layout-transition overflow-ellipsis mt-2  ${currentSession === item ? 'p-3 rounded-lg bg-gray-100 shadow-md' : ''}`}
                    onClick={() => setcurrentSession(item)}
                >
                    {'的撒旦撒旦给三安光电撒打的撒旦撒旦给三安光电撒打'}
                </div>
            </>)}
        </div>
    </>
}