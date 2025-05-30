import {
  Body,
  Controller,
  Post,
  RawBodyRequest,
  Req,
  Get,
  Param,
  Delete,
} from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import user from "src/decorator/user.decorator";
import { Public } from "src/decorator/public.decorator";
import { Request } from "express"; // Ensure Express types are used for Request
import { FastifyRequest } from "fastify";
import { Roles } from "src/decorator/role.decorator";

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
  async webhook(@Req() req: RawBodyRequest<FastifyRequest>) {
    const event = req.rawBody; // Use rawBody instead of parsed body
    const sig = req.headers["stripe-signature"];
    return this.bookingService.webhook(event, sig);
  }

  @Get()
  @Roles("admin")
  async getAllBookings() {
    return this.bookingService.getAllBookings();
  }

  @Get(":id")
  @Roles("admin")
  async getBookingById(@Param("id") id: string) {
    return this.bookingService.getBookingById(id);
  }

  @Delete(":id")
  @Roles("admin")
  async deleteBooking(@Param("id") id: string) {
    return this.bookingService.deleteBooking(id);
  }
}
