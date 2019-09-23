<script>
  /*global dialogPolyfill: false */
  import { onMount } from 'svelte';

  export let className = '';
  export let open = false;
  export let title = '';

  let dialog;

  onMount(() => {
    // Register the dialog with the polyfill which is
    // required by browsers that lack native support.
    if (typeof dialogPolyfill !== 'undefined') {
      dialogPolyfill.registerDialog(dialog);
    }
  });
</script>

<style>
  :root {
    --header-color: white;
    --padding: 1rem;
  }

  dialog {
    /* These properties center the dialog in the browser window. */
    display: table;
    position: absolute;
    top: 50%;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -50%);

    border: none;
    box-shadow: 0 0 10px darkgray;
    padding: 0;
  }

  button {
    margin: 0 5px;
  }

  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 0.5rem;
  }

  .close-btn {
    background-color: transparent;
    border: none;
    color: var(--header-color);
    font-size: 24px;
    outline: none;
    padding: 0;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: cornflowerblue;
    box-sizing: border-box;
    color: var(--header-color);
    font-size: 24px;
    font-weight: bold;
    padding: var(--padding);
    width: 100%;
  }

  section {
    padding: var(--padding);
  }

  ::backdrop, /* for native <dialog> */
  dialog + .backdrop /* for dialog-polyfill */ {
    /* a transparent shade of gray */
    background-color: rgba(0, 0, 0, 0.3);
  }
</style>

{#if open}
  <dialog bind:this={dialog} class={'dialog ' + className}>
    <header>
      {title}
      <button class="close-btn" on:click={() => (open = false)}>
        &#x2716;
      </button>
    </header>
    <section class="body">
      <slot />
    </section>
  </dialog>
{/if}
