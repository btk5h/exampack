import express from "express";
import { createServer } from "vite";
import { copyAssets, readAsset } from "../build/assets";
import { generateViteConfig } from "../config/vite";

function serveAssignmentHandler(vite) {
  return async (req, res) => {
    const url = req.originalUrl;
  
    try {
      let template = await readAsset("exampack.html");
  
      // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
      //    also applies HTML transforms from Vite plugins, e.g. global preambles
      //    from @vitejs/plugin-react-refresh
      template = await vite.transformIndexHtml(url, template);
  
      // 3. Load the server entry. vite.ssrLoadModule automatically transforms
      //    your ESM source code to be usable in Node.js! There is no bundling
      //    required, and provides efficient invalidation similar to HMR.
      const { default: { render } } = await vite.ssrLoadModule("/.exampack/assignment.svelte");
  
      // 4. render the app HTML. This assumes entry-server.js's exported `render`
      //    function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()
      const { html, css } = render({ variant: req.params.variant });
  
      // 5. Inject the app-rendered HTML into the template.
      template = template.replace("exampack:body", html);
      template = template.replace("exampack:css", css.code);
  
      // 6. Send the rendered HTML back.
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      // If an error is caught, let Vite fix the stracktrace so it maps back to
      // your actual source code.
      vite.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e.message);
    }
  };
}


export async function startServer() {
  copyAssets();

  const app = express();
  const config = generateViteConfig();
  const vite = await createServer(config);

  app.use(vite.middlewares);

  app.get("/assignments/:variant", serveAssignmentHandler(vite));

  app.listen(3000);
}