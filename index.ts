import express, { Express, Request, Response, NextFunction } from "express";
import body_parser from "body-parser";
import cors from "cors";
import cookie_parser from "cookie-parser";
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import db from "./DB/db";
import { check_auth } from "./helper/check_auth";
import auth_service from "./services/auth/index";
import company_service from "./services/company/index";
import product_service from "./services/product/index";
import basket_service from "./services/basket/index";
import general_service from "./services/general/index";
import search_service from "./services/search/index";
import chat_service from "./services/chat/index";
import profile_service from "./services/customer/index";
import path from "path";
import http from "http";
import socket from "socket.io";
import { chat_server } from "./services/chat/IoServer";

const app: Express = express();

const server = http.createServer(app);
const io = new socket.Server(server, {
  cors: {
    origin: "*",
  },
});

chat_server(io);

app.use(cors({ credentials: true, origin: true }));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(cookie_parser());

app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.headers["authorization"], req.headers["Authorization"]);
    const result: any = await check_auth(
      req.headers["authorization"] ||
        req.cookies?.[process.env.COOKIE_NAME || "cookie"],
      async (dec) => {
        return true;
      }
    );

    if (result.status == 200 && result?.decoded?.id) {
      const users: any[] = await db.execute(
        `SELECT id,first_name,last_name,phone from user where id=${result?.decoded?.id}`
      );

      if (users?.[0]?.[0]) req.query.user = users[0][0];
      else req.query.user = {};
    }
  } catch (e) {
  } finally {
    next();
  }
});

app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", auth_service);
app.use("/company", company_service);
app.use("/product", product_service);
app.use("/basket", basket_service);
app.use("/general", general_service);
app.use("/search", search_service);
app.use("/chat", chat_service);
app.use("/profile", profile_service);
app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "welcome" });
});

server.listen(process.env.PORT ? +process.env.PORT : 8000);
