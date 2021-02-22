import { bootstrapServer } from "./server";

bootstrapServer()
    .then(() => console.log("Server is running! 🚀"))
    .catch((error) => console.log(`${error} 🔥`));
