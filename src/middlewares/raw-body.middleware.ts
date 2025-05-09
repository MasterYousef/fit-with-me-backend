import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { json } from "body-parser";

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

export const rawBodyMiddleware = json({
  verify: (req: any, res, buf) => {
    if (req.originalUrl === "/bookings/webhook") {
      req.rawBody = buf.toString();
    }
  },
});
