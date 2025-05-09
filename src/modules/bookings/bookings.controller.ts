import { Body, Controller, Post, Req } from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import user from "src/decorator/user.decorator";
import { Public } from "src/decorator/public.decorator";
import { Request } from "express"; // Ensure Express types are used for Request

// Extend the Request interface to include rawBody
declare module "express" {
  export interface Request {
    rawBody?: string;
  }
}

@Controller("bookings")
export class BookingsController {
  constructor(private readonly bookingService: BookingsService) {}
  @Post()
  payment(
    @Req() req: Request,
    @Body() body: CreateBookingDto,
    @user("_id") userId: string
  ) {
    const originUrl =
      req.headers["origin"] ||
      req.headers["referer"] ||
      "http://localhost:3000";
    return this.bookingService.payment(userId, body.offerId, originUrl);
  }
  @Public()
  @Post("webhook")
  async webhook(@Req() req: Request) {
    const event = req.rawBody; // Use rawBody instead of parsed body
    const sig = req.headers["stripe-signature"];
    return this.bookingService.webhook(event, sig);
  }
}
