import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Coach } from "../coach/coach.schema";
import { Course } from "../course/course.schema";

@Schema()
export class Offer extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Coach", required: true })
  coach: Coach;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true })
  course: Course;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
