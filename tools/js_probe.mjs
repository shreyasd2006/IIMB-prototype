import { launch } from "./cdp.mjs";
const [path, expr] = process.argv.slice(2);
const b = await launch({ width: 1440, height: 900 });
await b.goto("http://127.0.0.1:8767/" + path, 6000);
console.log(await b.evaluate(expr));
b.close();
