<script>
  import { onMount } from 'svelte';
  import {
    getSupportedLanguages,
    i18n as originalI18n,
    setLanguage
  } from 'web-translate';

  import { i18n } from './stores';

  export let disabled = false;
  export let onChange = () => {};

  let languageCode;
  let languages = {};
  let languageNames = [];

  onMount(async () => {
    languages = await getSupportedLanguages();
    languageNames = Object.keys(languages);
  });

  async function handleChange(event) {
    languageCode = event.target.value;
    try {
      await setLanguage(languageCode);
      // Doing this is enough to trigger interpolations that use $i18n to re-render!
      i18n.set(originalI18n);
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
    <select {disabled} on:change={handleChange} value={languageCode}>
      {#each languageNames as name}
        <option value={languages[name]}>{name}</option>
      {/each}
    </select>
  </div>
{/if}
