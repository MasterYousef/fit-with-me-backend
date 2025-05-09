import { Body, Controller, Post, Req } from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import user from "src/decorator/user.decorator";

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
  @Post("webhook")
  async webhook(@Req() req: Request) {
    const event = req.body;
    const sig = req.headers["stripe-signature"];
    return this.bookingService.webhook(event, sig);
  }
}
