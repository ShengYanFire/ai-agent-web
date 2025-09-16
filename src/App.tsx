import { useEffect, useState } from 'react'
import siderCollapsedSvg from '@/assets/sider_collapsed.svg'
import addChatSvg from '@/assets/add_chat.svg'
import historySvg from '@/assets/history.svg'
import HistoryList from '@/components/HistoryList'
import usePostStreamJSON from '@/hooks/usePostStreamJSON'
import ChatInput from '@/components/ChatInput'

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { status, error, data, historyList, post, abort, initHistory, selectHistoryItem } = usePostStreamJSON<any, any>()

  // 添加窗口大小变化监听
  useEffect(() => {
    // 定义处理窗口大小变化的函数
    const handleResize = () => {
      // 当窗口宽度小于1024px时自动收起侧边栏
      if (window.innerWidth < 1024) {
        setIsCollapsed(true)
      } else {
        // 当窗口宽度大于等于768px时自动展开侧边栏
        setIsCollapsed(false)
      }
    }

    // 初始化时执行一次
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <>
    <div className='w-screen h-screen flex bg-gray-50'>
      <div className={`layout-transition ${!isCollapsed ? 'w-70' : 'w-0'} h-full absolute rounded-tr-2xl rounded-br-2xl bg-gray-50 z-1 shadow-lg lg:relative`}>
        <div className='flex flex-col p-3 pt-6 pb-6 h-full'>
          <div className='overflow-hidden'>
            <div className='flex justify-between items-center'>
              <img src='./ai-agent.svg' className='w-8' />
              <img
                src={siderCollapsedSvg}
                className='w-6 cursor-pointer rounded-lg p-1 hover:bg-gray-200'
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

            <div className='flex gap-2 items-center mt-6 mb-2 text-gray-600'>
              <img src={historySvg} className='w-5' />
              历史会话
            </div>
          </div>

          <div className='scrollbar-hide overflow-auto flex-1'>
            <HistoryList />
          </div>
        </div>
      </div>

      <div
        className='layout-transition overflow-auto flex-1 flex flex-col m-3 p-3 rounded-lg bg-gradient-to-tr form-white to-blue-100'
        onClick={() => { if (window.innerWidth < 1024) setIsCollapsed(true) }}
      >
        <div className='flex'>
          <div className='flex-1 flex items-center gap-2 h-8 overflow-hidden'>
            {isCollapsed && <>
              <img
                src={siderCollapsedSvg}
                className='w-6 cursor-pointer rounded-lg p-1 rotate-180 hover:bg-gray-200'
                onClick={(e) => { e.stopPropagation(); setIsCollapsed(false) }}
              />
              <img
                src={addChatSvg}
                className='w-6 cursor-pointer rounded-lg p-1 hover:bg-gray-200'
                onClick={() => { }}
              />
            </>}
            <div className='truncate'>
              主要题目主要题目主要题目主要题主要题目12312321
            </div>
          </div>
          <div className='flex-2'></div>
        </div>

        <div className='overflow-auto flex h-full'>
          <div className='flex-1'></div>
          <div className='flex-5 flex flex-col'>
            <div className='scrollbar-hide flex-1 overflow-auto  mb-3'>
              {historyList.map((item: any) => <>
                <div className='mt-3'>{item.req.prompt}</div>
                <div className='mt-3'>{item.res.map((res: any) => res.response)}</div>
              </>)}
            </div>
            <ChatInput post={post} status={status} abort={abort} />
          </div>
          <div className='flex-1'></div>
        </div>
      </div>
    </div>
  </>
}

export default App
