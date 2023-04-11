<route lang="yaml">
meta:
  layout: false
</route>

<script lang="ts" setup>
import api from '@/api'
import dayjs from '@/utils/dayjs'
import type { messageType } from '@/types'
import useMessageStore from '@/store/modules/messages'
const messageStore = useMessageStore()
const state = reactive({
  loading: false,
  content: '',
})

const item: messageType = {
  id: 1,
  content: '欢迎光临，你可以向我提问。',
  created: dayjs().valueOf(),
}
const list = ref<messageType[]>([])
const form = reactive({
  model: 'gpt-3.5-turbo',
  messages: [
    {
      role: 'user',
      content: '',
    },
  ],
})
function send() {
  // 发送
  if (state.loading) {
    return false
  }
  state.loading = true
  list.value.push({ ...item, ...{ id: 0, content: state.content } })
  form.messages[0].content = state.content
  state.content = ''
  api.post('/chat/completions', form).then(({ data: { id, choices, created } }) => {
    state.loading = false
    list.value.push({
      id,
      content: choices[0].message.content,
      created,
    })
    saveMessage()
  })
}

function saveMessage() {
  messageStore.setMessages(list.value)
}

onMounted(() => {
  const { messages } = messageStore
  if (messages.length === 0) {
    messages.push({ ...item })
  }
  list.value = messages
})
</script>

<template>
  <div class="flex flex-col h-100vh">
    <div class="flex-1">
      <div v-for="item in list" :key="item.id" class="flex b-b-1 b-#eee b-b-solid p-y-3 p-x-2">
        <div class="relative h-[30px] w-[30px] p-1 rounded-sm text-white flex items-center justify-center" :class="item.id ? 'bg-#10a37f' : 'bg-#999 order-2'">
          <svg-icon v-if="item.id" name="chat" size="6" />
          <span v-else>我</span>
        </div>
        <div class="flex-1 px-2" :class="{ 'text-right': !item.id }">
          <div class="text-3 color-gray">
            {{ dayjs(item.created).format('YYYY/MM/DD hh:mm:ss') }}
          </div>
          <div class="m-t-1 rounded-md overflow-hidden">
            <highlightjs autodetect :code="item.content" />
          </div>
        </div>
      </div>
      <div v-show="state.loading" class="p-2 text-center">
        loading...
      </div>
    </div>
    <div class="bg-#333 p-2 flex">
      <input v-model="state.content" class="p-2 b-none flex-1 text-5" type="text" @keyup.enter="send">
      <button :disabled="state.loading" class="bg-blue text-white text-5 b-none p-x-10 p-y-2 disabled:bg-gray" @click="send">
        发送
      </button>
    </div>
  </div>
</template>
