import { writeFileSync } from 'fs'

writeFileSync(
  'src/index.css',
  `@tailwind base;
@tailwind components;
@tailwind utilities;

html,body{font-family:sans-serif;background:#fff;color:#111;margin:0;padding:0}
#root{min-height:100vh;display:flex;flex-direction:column}`
)

console.log('✅ Clean index.css generated before build')
