"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const feed_routes_1 = require("./routes/feed.routes");
const article_routes_1 = __importDefault(require("./routes/article.routes"));
const user_routes_1 = require("./routes/user.routes");
const user_feed_router_1 = require("./routes/user-feed.router");
const { ATLAS_URI } = process.env;
if (!ATLAS_URI) {
    console.error('No ATLAS_URI environment variable has been defined in config.env');
    process.exit(1);
}
(0, database_1.connectToDatabase)(ATLAS_URI)
    .then((db) => {
    const app = (0, express_1.default)();
    const PORT = process.env.PORT || 5200;
    app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
    app.use(express_1.default.json());
    app.use('/feeds', feed_routes_1.feedRouter);
    app.use('/users', user_routes_1.userRouter);
    app.use('/user-feeds', user_feed_router_1.userFeedRouter);
    app.use('/articles', (0, article_routes_1.default)(db));
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

})
    .catch(console.error);
