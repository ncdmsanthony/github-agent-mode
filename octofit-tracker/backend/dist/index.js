"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const url_1 = require("./utils/url");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'OctoFit backend is running' });
});
app.get('/api/base-url', (_req, res) => {
    res.json({ baseUrl: (0, url_1.getApiBaseUrl)() });
});
app.use('/api', routes_1.default);
async function startServer() {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log('Connected to MongoDB');
        app.listen(port, '0.0.0.0', () => {
            console.log(`Backend listening on port ${port}`);
            console.log(`API base URL: ${(0, url_1.getApiBaseUrl)()}`);
        });
    }
    catch (error) {
        console.error('Failed to start server', error);
        process.exit(1);
    }
}
startServer();
