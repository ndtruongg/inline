<template>
  <div class="quill-editor-container">
    <QuillEditor 
      :content="props.modelValue"
      @update:content="onEditorContentChange"
      :toolbar="fullToolbar"
      contentType="html"
      :options="editorOptions"
    />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Viết nội dung của bạn ở đây...'
  }
});

// Handler for editor content changes
const onEditorContentChange = (content: string) => {
  emit('update:modelValue', content);
};

const fullToolbar = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["link", "image", "video"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ font: [] }],
  [{ align: [] }],
  ["blockquote", "code-block"],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ direction: "rtl" }],
  ["clean"],
];

const editorOptions = {
  modules: {
    clipboard: {
      matchVisual: false
    }
  },
  placeholder: props.placeholder,
  theme: 'snow',
  readOnly: false,
};
</script>

<style scoped>
.quill-editor-container {
  display: flex;
  flex-direction: column;
  font-size: 16px;
  position: relative; /* Add relative positioning to container */
}

.quill-editor-container :deep(.ql-container) {
  min-height: 400px;
  height: auto;
  flex: 1;
  overflow: auto;
  border: none; /* Remove container border */
}

.quill-editor-container :deep(.ql-toolbar) {
  border: none; /* Remove toolbar border */
  position: sticky; /* Make toolbar sticky */
  top: 0; /* Stick to top */
  z-index: 10; /* Ensure toolbar stays above content */
  background-color: white; /* Add background color to prevent content showing through */
}

.quill-editor-container :deep(.ql-editor) {
  min-height: 200px;
  height: auto;
  overflow: auto;
  padding: 12px 15px;
  font-size: 16px;
}
</style>
