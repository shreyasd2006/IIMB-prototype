import { launch } from "./cdp.mjs";
const b = await launch({ width: 1440, height: 900 });
b.on((d) => { if (d.method === "Runtime.consoleAPICalled" && d.params.type === "warning") console.log(d.params.args.map((a) => a.value).join(" | ")); });
await b.goto("http://127.0.0.1:8767/" + process.argv[2], 7000);
b.close();
