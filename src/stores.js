import { writable } from 'svelte/store';
import { i18n as originalI18n } from 'web-translate';

export const i18n = writable(originalI18n);
