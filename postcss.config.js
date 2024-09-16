// postcss.config.js
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"

export default {
  plugins: [
    tailwindcss("./src/styles/tailwind.config.js"), // Ange rätt sökväg här
    autoprefixer,
  ],
}
