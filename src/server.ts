import { app } from "./app.js";
import { PORT } from "./config/env.js";
import { connectDatabase } from "./config/database.js";

export async function startServer() {
    await connectDatabase();
    app.listen(PORT, () => {
    console.log(`[server] is running on port ${PORT}`)
    })
};


startServer();