<script>
  import {onMount} from 'svelte';
  import {getSupportedLanguages, setLanguage} from 'web-translate';

  import {languageStore} from './stores';

  export let disabled = false;
  export let onChange = () => {};

  //let languageCode;
  let languages = {};
  let languageNames = [];

  onMount(async () => {
    languages = await getSupportedLanguages();
    languageNames = Object.keys(languages);
  });

  async function handleChange(event) {
    const code = event.target.value;
    console.log('LanguageSelect.svelte handleChange: code =', code);
    try {
      await setLanguage(code);
      languageStore.set(code);
      if (onChange) onChange(event);
    } catch (e) {
      console.error('LanguageSelect handleChange: e =', e);
    }
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
    <select {disabled} on:change={handleChange} value={$languageStore}>
      {#each languageNames as name}
        <option value={languages[name]}>{name}</option>
      {/each}
    </select>
  </div>
{/if}
