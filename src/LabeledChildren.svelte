<script>
  export let className = '';
  export let label = '';
</script>

<style>
  .container {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;

    box-sizing: border-box;
    font-size: 14px;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
  }

  label {
    color: black;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
</style>

<div class={'container ' + className}>
  <label class="title">{label}</label>
  <slot />
</div>
