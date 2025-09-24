import { useEffect, useState } from 'react'
import HistoryList from '@/components/HistoryList'
import ChatInput from '@/components/ChatInput'
import { Logs, MessageSquarePlus, PanelLeft } from 'lucide-react'
import useOllama from '@/hooks/useOllama'
import ChatContent from './components/ChatContent'

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { chat, chatReq, abortChat } = useOllama()

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
              <PanelLeft
                className='w-6 cursor-pointer rounded-md p-1 text-gray-500 hover:bg-gray-100'
                onClick={() => setIsCollapsed(true)}
              />
            </div>

            <div className='layout-transition flex justify-center gap-2 border-1 border-gray-300 rounded-2xl p-2 cursor-pointer mt-3 text-gray-600 hover:bg-gray-100 hover:shadow-md'>
              <MessageSquarePlus className='w-4  text-gray-500' />
              新建会话
            </div>

            <div className='flex gap-2 items-center mt-6 mb-2 text-gray-600'>
              <Logs className='w-4 text-gray-500' />
              历史会话
            </div>
          </div>

          <div className='scrollbar-hide overflow-auto flex-1'>
            <HistoryList data={[]} />
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
              <PanelLeft
                className='w-6 cursor-pointer rounded-md p-1 text-gray-500 hover:bg-gray-100'
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCollapsed(false)
                }}
              />

              <MessageSquarePlus

                className='w-6 cursor-pointer rounded-md p-1 text-gray-500 hover:bg-gray-200'
              />

            </>}
            <div className='truncate'>
              {'chatSession?.title'}
            </div>
          </div>
          <div className='flex-2'></div>
        </div>

        <div className='overflow-auto flex h-full'>
          <div className='flex-1'></div>
          <div className='flex-5 flex flex-col'>
            <div className='scrollbar-hide flex-1 overflow-auto  mb-3'>
              {/* {historyList.map((item: any) => <>
                <div className='mt-3'>{item.req.prompt}</div>
                <div className='mt-3'>{item.res.map((res: any) => res.response)}</div>
              </>)} */}
              {/* {chatSession?.data.map((item: any) => <>
                <div className='mt-3'>{item.req.prompt}</div>
                <div className='mt-3'>{item.res.map((res: any) => res.response)}</div>
              </>)} */}
              <ChatContent data={chatReq} />
            </div>
            <ChatInput chat={chat} abortChat={abortChat} />
          </div>
          <div className='flex-1'></div>
        </div>
      </div>
    </div>
  </>
}

export default App
