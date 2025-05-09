import { Module } from "@nestjs/common";
import { BookingsController } from "./bookings.controller";
import { BookingsService } from "./bookings.service";
import { StripeService } from "./stripe.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Booking, BookingSchema } from "./bookings.schema";
import { User, user_schema } from "../auth/auth.schema";
import { Offer, OfferSchema } from "../offers/offers.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: User.name, schema: user_schema },
      { name: Offer.name, schema: OfferSchema },
    ]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService, StripeService],
})
export class BookingsModule {}
