<script>
  import {onMount} from 'svelte';

  import {getSupportedLanguages, setLanguage} from 'web-translate';

  export let disabled = false;
  export let languageCode;
  export let onChange = () => {};

  let languages = {};
  let languageNames = [];

  onMount(async () => {
    languages = await getSupportedLanguages();
    languageNames = Object.keys(languages);
    console.log('languageNames =', languageNames);
    changeLanguage(languageCode);
  });

  async function changeLanguage(code) {
    await setLanguage(code);
    languageCode = code;
  }

  function handleChange(event) {
    changeLanguage(event.target.value);
    if (onChange) onChange(event);
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  select {
    background-color: white;
    /* Chrome doesn't honor border-radius on select elements. */
    border-radius: 4;
    font-size: 14px;
    height: 24px;
  }
</style>

{#if languageNames.length > 0}
  <div class="container">
    <select {disabled} on:change={handleChange} value={languageCode}>
      {#each languageNames as name}
        <option value={languages[name]}>{name}</option>
      {/each}
    </select>
  </div>
{/if}
