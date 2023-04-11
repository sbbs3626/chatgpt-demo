/*
 * @Author: Alan.zheng
 * @Date: 2023-04-06 11:23:43
 * @Last Modified by: Alan.zheng
 * @Last Modified time: 2023-04-06 14:11:03
 */
import type { messageType } from '@/types'
const useMessageStore = defineStore(
  // 唯一ID
  'Message',
  {
    state: () => ({
      messages: useStorage('messages', [] as messageType[], localStorage, { mergeDefaults: true }),
    }),
    actions: {
      // 设置网页标题
      setMessages(data: messageType[]) {
        this.messages = data
      },
    },
  },
)

export default useMessageStore
