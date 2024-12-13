<script lang="ts">
  import { fade } from 'svelte/transition';
import type {Tasks} from "../types";

let {tasks, toggleDone, removeTask}: {
    tasks: Tasks[];
    toggleDone: (task: Tasks) => void;
    removeTask: (id: string) => void;
  } = $props()
</script>

<section>
  {#each tasks as task}
    <article class="tasks" transition:fade>
      <label>
        <input type="checkbox" checked={task.done}
        onchange={()=> toggleDone(task)} >
      <span class:done={task.done}>{task.title}</span>  
      </label>
      <button onclick={()=> removeTask(task.id)} class="outline">Remove</button>
    </article>  
    {/each}
  </section>

  <style>
    .done {
      text-decoration: line-through;
    }
    .tasks{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  </style>