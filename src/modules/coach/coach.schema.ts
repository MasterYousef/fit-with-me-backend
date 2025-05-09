import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Coach {
  @Prop({ required: true, maxlength: 100 })
  name: string;

  @Prop({ required: true, maxlength: 255 })
  email: string;

  @Prop({ required: true, maxlength: 20 })
  phone: string;

  @Prop({ required: true })
  experience: number;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ required: true, maxlength: 100 })
  specialization: string;

  @Prop({ required: true })
  image: string;
}

export type CoachDocument = Coach & Document;
export const CoachSchema = SchemaFactory.createForClass(Coach);
