import { useEffect, useState } from 'react'
import siderCollapsedSvg from '@/assets/sider_collapsed.svg'
import addChatSvg from '@/assets/add_chat.svg'
import historySvg from '@/assets/history.svg'
import HistoryList from '@/components/HistoryList'
import usePostStreamJSON from '@/hooks/usePostStreamJSON'
import ChatInput from './components/chatInput'

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { status, error, data, historyList, post, abort, initHistory, selectHistoryItem } = usePostStreamJSON<any, any>()

  return <>
    <div className='w-screen h-screen flex  bg-gray-50'>
      <div className={`layout-transition ${!isCollapsed ? 'w-70' : 'w-0'}`}>
        <div className='truncate m-3 pt-3 mr-0'>
          <div className='flex justify-between items-center'>
            <img src='/ai-agent.svg' className='w-8' />
            <img
              src={siderCollapsedSvg}
              className='w-6   cursor-pointer rounded-lg p-1 hover:bg-gray-200'
              onClick={() => setIsCollapsed(true)}
            />
          </div>

          <div className='layout-transition flex justify-center gap-2 border-1 border-gray-300 rounded-2xl p-2 cursor-pointer mt-3 text-gray-600 hover:bg-gray-100 hover:shadow-md'>
            <img
              src={addChatSvg}
              className='w-4'
            />
            新建会话
          </div>

          <div className='flex gap-2 items-center mt-6 text-gray-600'>
            <img src={historySvg} className='w-5' />
            历史会话
          </div>
          <HistoryList />
        </div>
      </div>

      <div className='layout-transition flex-1 flex flex-col m-3 p-3 rounded-lg bg-gradient-to-tr form-white to-blue-100'>
        <div className='flex items-center gap-2 h-8'>
          {isCollapsed && <>
            <img
              src={siderCollapsedSvg}
              className='w-6 cursor-pointer rounded-lg p-1 rotate-180 hover:bg-gray-200'
              onClick={() => setIsCollapsed(false)}
            />
            <img
              src={addChatSvg}
              className='w-6 cursor-pointer rounded-lg p-1 hover:bg-gray-200'
              onClick={() => { }}
            />
          </>}
          <div className='w-100 truncate'>
            主要题目主要题目主要题目主要题主要题目主要题目主要题目主要题目主要题目主要题目主要题目主要
            题目主要题目主要题目主要题目主要题目主要题目主要题目主要题目主要题目主要题目主要题目目主要
            题目主要题目
          </div>
        </div>

        <div className='flex-1 mt-3 mb-3 overflow-auto scrollbar-hide'>

          {historyList.map((item, index) => <>
            <div>{item.req.prompt}</div>
            <div>{item.res.map((res, index) => res.response)}</div>
          </>)}
        </div>

        <ChatInput post={post} status={status} abort={abort} />
      </div>
    </div>
  </>
}

export default App
