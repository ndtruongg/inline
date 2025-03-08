<template>
  <div class="editor-container mx-auto bg-white">
    <div class="toolbar mb-4 flex flex-wrap space-x-2 rounded-md bg-slate-50 p-2">
      <select v-model="heading" @change="applyHeading" title="Heading" class="rounded p-2">
        <option value="">Normal</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
      </select>
      <button
        :class="{ active: isActive('bold') }"
        @click="format('bold')"
        title="Bold"
        class="rounded p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linejoin="round"
            d="M6.75 3.744h-.753v8.25h7.125a4.125 4.125 0 0 0 0-8.25H6.75Zm0 0v.38m0 16.122h6.747a4.5 4.5 0 0 0 0-9.001h-7.5v9h.753Zm0 0v-.37m0-15.751h6a3.75 3.75 0 1 1 0 7.5h-6m0-7.5v7.5m0 0v8.25m0-8.25h6.375a4.125 4.125 0 0 1 0 8.25H6.75m.747-15.38h4.875a3.375 3.375 0 0 1 0 6.75H7.497v-6.75Zm0 7.5h5.25a3.75 3.75 0 0 1 0 7.5h-5.25v-7.5Z"
          />
        </svg>
      </button>

      <button
        :class="{ active: isActive('italic') }"
        @click="format('italic')"
        title="Italic"
        class="rounded p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5.248 20.246H9.05m0 0h3.696m-3.696 0 5.893-16.502m0 0h-3.697m3.697 0h3.803"
          />
        </svg>
      </button>

      <button
        :class="{ active: isActive('justifyLeft') }"
        @click="format('justifyLeft')"
        title="Align Left"
        class="rounded p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
          />
        </svg>
      </button>
      <button
        :class="{ active: isActive('justifyCenter') }"
        @click="format('justifyCenter')"
        title="Align Center"
        class="rounded p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
          />
        </svg>
      </button>
      <button
        :class="{ active: isActive('justifyRight') }"
        @click="format('justifyRight')"
        title="Align Right"
        class="rounded p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
          />
        </svg>
      </button>

      <button
        :class="{ active: isActive('insertUnorderedList') }"
        @click="format('insertUnorderedList')"
        title="Unordered List"
        class="rounded p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </button>
      <button
        :class="{ active: isActive('insertOrderedList') }"
        @click="format('insertOrderedList')"
        title="Ordered List"
        class="rounded p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99"
          />
        </svg>
      </button>
      <button @click="insertLink" title="Insert Link" class="rounded p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
          />
        </svg>
      </button>
      <button @click="showImageModal" title="Insert Image" class="rounded p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </button>
      <button @click="showVideoModal" title="Embed Video" class="rounded p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
      </button>

      <button @click="undo" title="Undo" class="rounded p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>
      </button>
      <button @click="redo" title="Redo" class="rounded p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
          />
        </svg>
      </button>
    </div>
    <div
      ref="editorContent"
      id="editor"
      contenteditable="true"
      class="editor"
      @input="handleInput"
      @mouseup="checkActiveCommands"
      @keyup="checkActiveCommands"
    >
      <p><br /></p>
    </div>
  </div>

  <ImageModal
    v-if="isImageModalVisible"
    @close="isImageModalVisible = false"
    @insert-image="insertImage"
  />
  <VideoModal
    v-if="isVideoModalVisible"
    @close="isVideoModalVisible = false"
    @insert-video="insertVideo"
  />
</template>

<script lang="ts" setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const editorContent = ref<HTMLElement | null>(null)
const content = ref<string>(props.modelValue)
const heading = ref<string>('')
const isImageModalVisible = ref<boolean>(false)
const isVideoModalVisible = ref<boolean>(false)

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== content.value) {
      content.value = newValue
      const editor = document.getElementById('editor')
      if (editor && editor.innerHTML !== newValue) {
        editor.innerHTML = newValue || '<p><br></p>'
      }
    }
  }
)

onMounted(() => {
  editorContent.value?.focus()
})

const handleInput = () => {
  ensureParagraph()
  checkActiveCommands()

  const editor = document.getElementById('editor')
  if (editor) {
    content.value = editor.innerHTML
    emit('update:modelValue', content.value)
  }
}

const ensureParagraph = () => {
  const editor = document.getElementById('editor') as HTMLElement
  if (!editor) return

  if (!editor.innerHTML.trim() || editor.childNodes.length === 0) {
    editor.innerHTML = '<p><br></p>'
    moveCursorToEnd(editor.firstChild as HTMLElement)
  }

  const nodes = Array.from(editor.childNodes)
  nodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const p = document.createElement('p')
      p.appendChild(node)
      editor.appendChild(p)
    } else if (
      node.nodeType === Node.ELEMENT_NODE &&
      (node as HTMLElement).tagName !== 'P' &&
      (node as HTMLElement).tagName !== 'FIGURE'
    ) {
      const p = document.createElement('p')
      p.appendChild(node)
      editor.appendChild(p)
    }
  })
}

const format = (command: string, value: string | undefined = undefined) => {
  document.execCommand(command, false, value)
  checkActiveCommands()
}

const insertLink = () => {
  const url = prompt('Enter the link URL:')
  if (url) {
    format('createLink', url)
  }
}

const insertImage = (url: string, label: string) => {
  const editor = document.getElementById('editor') as HTMLElement
  if (!editor) return

  // Tạo figure chứa ảnh và caption
  const figure = document.createElement('figure')
  figure.innerHTML = `<img src="${url}" alt="${label}" /><figcaption>${label}</figcaption>`

  // Thêm một dòng mới (thẻ <p>) sau ảnh
  const newParagraph = document.createElement('p')
  newParagraph.innerHTML = '<br>' // Tạo khoảng trống để xuống dòng

  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0 || selection.rangeCount === 1) {
    editor.appendChild(figure)
    editor.appendChild(newParagraph)
    moveCursorToEnd(newParagraph) // Đưa con trỏ xuống dòng mới
    return
  }

  const range = selection.getRangeAt(0)
  range.deleteContents()
  range.insertNode(figure)
  range.insertNode(newParagraph)

  moveCursorToEnd(newParagraph) // Di chuyển con trỏ ra khỏi <figure>
}

// Hàm di chuyển con trỏ ra khỏi <figure>
const moveCursorToEnd = (element: HTMLElement) => {
  const range = document.createRange()
  const selection = window.getSelection()

  range.selectNodeContents(element)
  range.collapse(false) // Đặt con trỏ sau nội dung của element
  selection?.removeAllRanges()
  selection?.addRange(range)
}

const insertVideo = (url: string) => {
  if (!url) return

  // Convert YouTube URL from watch?v= to embed/ format
  const youtubeEmbedUrl = url.replace('watch?v=', 'embed/')

  // Create iframe HTML string exactly as in the working example
  const iframe = `<iframe width="560" height="315" src="${youtubeEmbedUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`

  // Use the exact same function as in the working example
  insertHTMLAtCursor(iframe)
}

// Helper function exactly as in the working example
const insertHTMLAtCursor = (html: string) => {
  try {
    const range = window.getSelection()?.getRangeAt(0)
    if (!range) return

    const fragment = range.createContextualFragment(html)
    range.deleteContents()
    range.insertNode(fragment)
  } catch (error) {
    console.error('Error inserting HTML:', error)
  }
}

const applyHeading = () => {
  if (heading.value) {
    format('formatBlock', `<${heading.value}>`)
  } else {
    format('formatBlock', '<p>')
  }
}

const showImageModal = () => {
  isImageModalVisible.value = true
}

const showVideoModal = () => {
  isVideoModalVisible.value = true
}

const activeCommands = ref<string[]>([])

const checkActiveCommands = () => {
  activeCommands.value = [
    'bold',
    'italic',
    'insertUnorderedList',
    'insertOrderedList',
    'justifyLeft',
    'justifyCenter',
    'justifyRight',
    'undo',
    'redo'
  ].filter((command) => document.queryCommandState(command))
}

const isActive = (command: string) => {
  return activeCommands.value.includes(command)
}

const undo = () => {
  document.execCommand('undo')
}

const redo = () => {
  document.execCommand('redo')
}
</script>

<style lang="scss">
.editor-container {
  // @apply max-w-4xl;
}

.toolbar button,
.toolbar select {
  @apply cursor-pointer rounded px-2 py-1;
}

.toolbar button:hover,
.toolbar select:hover {
  @apply bg-gray-200;
}

.toolbar button.active {
  @apply bg-blue-200;
}

.editor {
  @apply min-h-[300px] py-4 outline-none;
}

.editor ul {
  @apply ml-5 list-disc;
}

.editor ol {
  @apply ml-5 list-decimal;
}

.editor {
  h1 {
    font-size: 2.5rem; /* 40px */
  }

  h2 {
    font-size: 2rem; /* 32px */
  }

  h3 {
    font-size: 1.75rem; /* 28px */
    font-weight: 600;
  }

  h4 {
    font-size: 1.5rem; /* 24px */
  }

  p {
    font-size: 1rem; /* 16px */
    line-height: 1.6; /* Giúp dễ đọc hơn */
  }

  a {
    @apply text-blue-800 underline;
  }
}
</style>
