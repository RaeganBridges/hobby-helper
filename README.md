
  # Convert Draft Flow to Code

  This is a code bundle for Convert Draft Flow to Code. The original project is available at https://www.figma.com/design/0ttvwp2ZIoiZmO917iMfyc/Convert-Draft-Flow-to-Code.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the Vite dev server (open the URL it prints, often `http://localhost:5173`).

  **Note:** This app is built with Vite + React. A plain Python static server (`python3 -m http.server`) serves the raw `index.html` and **cannot** compile `.tsx` files, so you will not see the real UI. To preview a production build on port 8000:

  ```bash
  npm run build
  cd dist && python3 -m http.server 8000
  ```
  