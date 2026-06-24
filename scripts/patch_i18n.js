const fs = require('fs');

// 1. Update routing.ts
let routing = fs.readFileSync('src/i18n/routing.ts', 'utf8');
routing = routing.replace(/locales:\s*\["en",\s*"te"\]/, 'locales: ["en", "te", "hi", "ta", "kn", "ml"]');
fs.writeFileSync('src/i18n/routing.ts', routing);

// 2. Update middleware.ts
let middleware = fs.readFileSync('src/middleware.ts', 'utf8');
middleware = middleware.replace(/\/\(te\|en\)\/:path\*/, '/(te|en|hi|ta|kn|ml)/:path*');
fs.writeFileSync('src/middleware.ts', middleware);

// 3. Update request.ts
let request = fs.readFileSync('src/i18n/request.ts', 'utf8');
request = request.replace(/locale as "en" \| "te"/, 'locale as "en" | "te" | "hi" | "ta" | "kn" | "ml"');
fs.writeFileSync('src/i18n/request.ts', request);

// 4. Update layout.tsx
let layout = fs.readFileSync('src/app/[locale]/layout.tsx', 'utf8');
layout = layout.replace(/locale as "en" \| "te"/, 'locale as "en" | "te" | "hi" | "ta" | "kn" | "ml"');
fs.writeFileSync('src/app/[locale]/layout.tsx', layout);

console.log("Routing patched successfully.");
