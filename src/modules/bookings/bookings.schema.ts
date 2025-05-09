import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Booking extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  offerId: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  total: number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
