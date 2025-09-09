import { useState } from 'react'
import './App.css'
import siderCollapsedSvg from './assets/sider_collapsed.svg'
import addChatSvg from './assets/add_chat.svg'

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  return <>
    <div className='w-screen h-screen flex  bg-gray-50'>
      <div className={`${!isCollapsed ? 'w-70' : 'w-0'} overflow-hidden text-ellipsis whitespace-nowrap transform duration-300 ease-in-out`}>
        <div className='m-3 pt-3 mr-0'>
          <div className='flex justify-between items-center'>
            <img src='/ai-agent.svg' className='w-8' />
            <img
              src={siderCollapsedSvg}
              className='w-6 text-gray-100  cursor-pointer rounded-lg p-1 hover:bg-gray-200'
              onClick={() => setIsCollapsed(true)}
            />
          </div>

          <div className='flex justify-center gap-2 border-1 border-gray-300 rounded-2xl p-2 cursor-pointer mt-3 text-gray-600 hover:bg-gray-100 hover:shadow-md transform duration-300 ease-in-out'>
            <img
              src={addChatSvg}
              className='w-6 text-gray-100  cursor-pointer rounded-lg p-1'
            />
            新建会话
          </div>
        </div>
      </div>

      <div className='flex-1 bg-white rounded-lg m-3 p-3 bg-gradient-to-tr form-white to-blue-100  transform duration-300 ease-in-out'>
        <div className='flex items-center gap-2 h-8'>
          {isCollapsed && <>
            <img
              src={siderCollapsedSvg}
              className='w-6 text-gray-100  cursor-pointer rounded-lg p-1 rotate-180 hover:bg-gray-200'
              onClick={() => setIsCollapsed(false)}
            />
            <img
              src={addChatSvg}
              className='w-6 text-gray-100  cursor-pointer rounded-lg p-1 hover:bg-gray-200'
              onClick={() => { }}
            />
          </>}
          <div className=' max-w-100 overflow-hidden text-ellipsis whitespace-nowrap'>主要题目主要题目主要题目主要题主要题目主要题目主要题目主要题目主要题目主要题目主要题目主要题目主要题目主要题目主要题目主要题目主要题目主要题目主要题目主要题目主要题目主要题目目主要题目主要题目</div>
        </div>
      </div>
    </div>
  </>
}

export default App
