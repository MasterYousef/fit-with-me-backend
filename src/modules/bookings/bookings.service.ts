import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Booking } from "./bookings.schema";
import { Model } from "mongoose";
import { StripeService } from "./stripe.service";
import { User } from "../auth/auth.schema";
import { Offer } from "../offers/offers.schema";
import { CustomException } from "src/exceptions/custom.exception";

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private readonly booking: Model<Booking>,
    @InjectModel(User.name) private readonly user: Model<User>,
    @InjectModel(Offer.name) private readonly offer: Model<Offer>,
    private readonly stripe: StripeService
  ) {}
  async payment(userId: string, offerId: string, origin: string) {
    const userData = await this.user.findById(userId);
    if (!userData) {
      throw new CustomException("User not found", 404);
    }
    const offerData = await this.offer.findById(offerId).populate({
      path: "course",
      select: "price title",
    });
    if (!offerData) {
      throw new CustomException("Offer not found", 404);
    }
    const totalPrice = offerData.course.price;
    const sessionUrl = await this.stripe.createCheckoutSession(
      userId,
      offerData,
      totalPrice,
      origin
    );
    return sessionUrl;
  }
  async webhook(body: any, sig: any) {
    const { userId, totalPrice, offer } = await this.stripe.handleWebhook(
      body,
      sig
    );
    const booking = new this.booking({
      userId,
      total: totalPrice,
      offerId: offer,
      date: new Date(),
    });
    return booking.save();
  }

  async getAllBookings() {
    return this.booking.find();
  }

  async getBookingById(id: string) {
    const booking = await this.booking.findById(id);
    if (!booking) {
      throw new CustomException("Booking not found", 404);
    }
    return booking;
  }

  async deleteBooking(id: string) {
    const result = await this.booking.findByIdAndDelete(id);
    if (!result) {
      throw new CustomException("Booking not found", 404);
    }
    return { message: "Booking deleted successfully" };
  }
}
