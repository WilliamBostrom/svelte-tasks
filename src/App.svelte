<script lang="ts">
  import TasksForm from './components/tasks-form.svelte';
  import TasksList from './components/tasks-list.svelte';
  import type {Filter, Tasks} from "./types"

  let message = "Tasks App"
  let currentFilter = $state<Filter>("all");
//ts för säga att det är en array av tasks
  let tasks = $state<Tasks[]>([]);
//derieved för få fram x antal done
let totalDone = $derived(tasks.reduce((total, task) => total + Number(task.done), 0)
)

//Om du behöver ett värde som räknas ut automatiskt baserat på andra värden och logiken är mer än en enkel uträkning, kan du använda derived.by.

let filterTasks = $derived.by(() => {
  switch(currentFilter) {
    case "all": {
      return tasks;
    }
    case "done": {
      return tasks.filter((task) => task.done)
    }
    case "todo": {
      return tasks.filter((task) => !task.done)
    }
  }
  return tasks;
})

  function addTask(newTask: string){
    tasks.unshift({
      id:  crypto.randomUUID(),
      title: newTask,
      done: false
    })
  }

  function toggleDone(tasks: Tasks){
    tasks.done = !tasks.done;
  }

  function removeTask(id: string){
    const index = tasks.findIndex((task) => task.id === id)
    tasks.splice(index, 1)
  }
</script>

{#snippet filterButton(filter: Filter )}
<button onclick={() => currentFilter =filter} class="secondary filterButton"
  class:contrast={currentFilter === filter} 
    >{filter}</button>
{/snippet}

<main>
  <h1>{message}</h1>
  <TasksForm {addTask}/>
  {#if tasks.length}
  <div class="button-container">
  {@render filterButton("all")}
  {@render filterButton("todo")}
  {@render filterButton("done")}
  </div>
  <p>{totalDone}/ {tasks.length} tasks completed</p>
  {:else}
  <p>Add a task to get started</p>
  {/if}

  <TasksList tasks={filterTasks} {toggleDone} {removeTask} />
</main>

<style>
  main {
    margin: 1rem auto;
    max-width: 800px;
  }

  .button-container {
    display: flex;
    justify-content: end;
    margin-bottom: 1rem;
    gap: 0.5rem;
  }

  .filterButton {
    text-transform: capitalize;
  }
</style>