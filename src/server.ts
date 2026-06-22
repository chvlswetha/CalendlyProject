import { app } from "./app.js";
import { PORT } from "./config/env.js";
import { connectDatabase } from "./config/database.js";


export async function startServer() {
    await connectDatabase();
    app.listen(PORT, async () => {
    console.log(`[server] is running on port ${PORT}`);
    });
}


startServer().catch(error => {
    console.error('[Server] Fialed to start',error);
    process.exit(1);
});