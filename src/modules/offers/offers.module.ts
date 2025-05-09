import { MongooseModule } from "@nestjs/mongoose";
import { Offer, OfferSchema } from "./offers.schema";
import { Coach, CoachSchema } from "../coach/coach.schema";
import { Course, CourseSchema } from "../course/course.schema";
import { Module } from "@nestjs/common";
import { OffersService } from "./offers.service";
import { OffersController } from "./offers.controller";
import { Review, ReviewSchema } from "../reviews/reviews.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Offer.name, schema: OfferSchema },
      { name: Coach.name, schema: CoachSchema },
      { name: Course.name, schema: CourseSchema },
      { name: Review.name, schema: ReviewSchema },
    ]),
  ],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
