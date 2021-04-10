import { Message } from 'element-ui'

declare module 'vue/types/vue' {
  interface Vue {
    $message: typeof Message
  }
}
