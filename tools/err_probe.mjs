import { launch } from "./cdp.mjs";
const b = await launch({ width: 1440, height: 900 });
b.on((d) => { if (d.method === "Runtime.exceptionThrown") console.log(d.params.exceptionDetails.exception?.description); });
await b.goto("http://127.0.0.1:8767/" + process.argv[2], 7000);
b.close();
