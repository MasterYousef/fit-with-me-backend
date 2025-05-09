import { Injectable, NestMiddleware, Logger } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { json } from "body-parser";

const logger = new Logger("RawBodyMiddleware");

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    if (req.originalUrl === "/bookings/webhook") {
      req.rawBody = "";
      req.on("data", (chunk) => {
        req.rawBody += chunk;
      });
      req.on("end", () => {
        next();
      });
    } else {
      next();
    }
  }
}
