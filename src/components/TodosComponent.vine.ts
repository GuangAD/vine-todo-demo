import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { Ref } from 'vue'
import TodoFooter from './TodoFooter.vine'
import TodoHeader from './TodoHeader.vine'
import TodoItem from './TodoItem.vine'

function TodosComponent() {
  const todos = ref<IToDo[]>([])
  const route = useRoute()

  const filters = {
    all: (todos: Ref<IToDo[]>) => todos,
    active: (todos: Ref<IToDo[]>) => todos.value.filter((todo) => !todo.completed),
    completed: (todos: Ref<IToDo[]>) => todos.value.filter((todo) => todo.completed)
  }

  const activeTodos = computed(() => filters.active(todos))
  const completedTodos = computed(() => filters.completed(todos))
  const filteredTodos = computed(() => {
    switch (route.name) {
      case 'active':
        return activeTodos
      case 'completed':
        return completedTodos
      default:
        return todos
    }
  })

  const toggleAllModel = computed({
    get() {
      return activeTodos.value.length === 0
    },
    set(value) {
      todos.value.forEach((todo) => {
        todo.completed = value
      })
    }
  })

  function uuid() {
    let uuid = ''
    for (let i = 0; i < 32; i++) {
      const random = (Math.random() * 16) | 0

      if (i === 8 || i === 12 || i === 16 || i === 20) uuid += '-'

      uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16)
    }
    return uuid
  }

  function addTodo(value: string) {
    todos.value.push({
      completed: false,
      title: value,
      id: uuid()
    })
  }

  function deleteTodo(todo: IToDo) {
    todos.value = todos.value.filter((t) => t !== todo)
  }

  function toggleTodo(todo: IToDo, value: boolean) {
    todo.completed = value
  }

  function editTodo(todo: IToDo, value: string) {
    todo.title = value
  }

  function deleteCompleted() {
    todos.value = todos.value.filter((todo) => !todo.completed)
  }

  return vine`
  <TodoHeader @add-todo="addTodo" />
    <main class="main" v-show="todos.length > 0">
        <div class="toggle-all-container">
            <input type="checkbox" id="toggle-all-input" class="toggle-all" v-model="toggleAllModel" :disabled="filteredTodos.value.length === 0"/>
            <label class="toggle-all-label" htmlFor="toggle-all-input"> Toggle All Input </label>
        </div>
        <ul class="todo-list">
            <TodoItem v-for="(todo, index) in filteredTodos.value" :key="todo.id" :todo="todo" :index="index"
                @delete-todo="deleteTodo" @edit-todo="editTodo" @toggle-todo="toggleTodo" />
        </ul>
    </main>
    <TodoFooter :todos="todos" @delete-completed="deleteCompleted" />
  `
}

export default TodosComponent
