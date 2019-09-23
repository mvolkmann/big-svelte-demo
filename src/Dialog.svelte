<script>
  /*global dialogPolyfill: false */

  import { onMount } from 'svelte';

  export let canClose = true;
  export let className = '';
  export let icon = null;
  export let onClose = () => {};
  export let open = false;
  export let style = {};
  export let title = '';

  $: {
    console.log({ dialog, open });
    if (dialog) {
      if (open) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    }
  }

  const cn = 'dialog' + (className ? ' ' + className : '');
  let dialog;

  onMount(() => {
    // Register the dialog with the polyfill which is
    // required by browsers that lack native support.
    if (typeof dialogPolyfill !== 'undefined') {
      dialogPolyfill.registerDialog(dialogRef.current);
    }
  });

  function close() {
    console.log('Dialog.svelte close: dialog =', dialog);
    if (onClose) onClose();
    dialog.close();
  }
</script>

<style>
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

  .body {
    padding: 0.5rem;
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
    color: darkgray;
    font-size: 24px;
    margin-right: 0.5rem;
    outline: none;
    padding: 0;
  }

  .close-btn:hover {
    background-color: transparent;
  }

  .error-dialog .title {
    color: red;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    box-sizing: border-box;
    width: 100%;
  }

  section {
    margin: 0;
  }

  .title {
    display: flex;
    align-items: center;
    background-color: cornflowerblue;
    color: white;
    font-size: 14px;
    margin-right: 1rem;
    padding: 0.5rem;
  }

  ::backdrop, /* for native <dialog> */
dialog + .backdrop /* for dialog-polyfill */ {
    /* a transparent shade of gray */
    background-color: rgba(0, 0, 0, 0.2);
  }
</style>

<dialog bind:this={dialog} class={cn} {style}>
  {#if icon || title}
    <header>
      <div class="title">
        {#if icon}{icon}{/if}
        {title}
      </div>
      {#if canClose}
        <button class="close-btn" on:click={close}>&#x2716;</button>
      {/if}
    </header>
  {/if}
  <section class="body">
    <div>open = {open}</div>
    <slot />
  </section>
</dialog>
