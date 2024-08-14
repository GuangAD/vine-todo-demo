export default function ToDoHeader() {
  const emit = vineEmits<{
    'add-todo': [value: string]
  }>()

  function handleKeyUpEnter(event: KeyboardEvent) {
    emit('add-todo', (event.target as HTMLInputElement).value)
    ;(event.target as HTMLInputElement).value = ''
  }

  return vine`
  <header class="header">
    <RouterLink to="/"><h1>todos</h1></RouterLink>
    <input
            type="text"
            class="new-todo"
            autofocus
            autocomplete="off"
            placeholder="What needs to be done?"
            @keyup.enter="handleKeyUpEnter($event)"
      />
  </header>
  `
}
// ToDoHeader
