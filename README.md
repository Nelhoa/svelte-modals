# Really Flexible Modals with TailwindCSS!

Includes tooltips that work harmoniously with the modals.

Find the documentation on [the library's demo site](https://nelhoa-svelte-modals.vercel.app/)

# Objectifs

- Performant
- Facile à intégrer
- Manipulable
- Mieux typé
- Stackable
- Le tooltip devrait être intégré à la modale
- 

## Installation Guide

```bash
npm install @nelhoa/svelte-modals
```

For the modals to work correctly, your project must use TypeScript.

Modify your `tailwind.config.js` file to include the svelte-modals library:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}',
    './node_modules/@nelhoa/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
