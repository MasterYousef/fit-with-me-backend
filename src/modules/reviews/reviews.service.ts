import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Review } from "./reviews.schema";
import { Offer } from "../offers/offers.schema";
import { CustomException } from "src/exceptions/custom.exception";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
    @InjectModel(Offer.name) private readonly offerModel: Model<Offer>
  ) {}

  async createReview(data: any) {
    const offerExists = await this.offerModel.findById(data.offerId);
    if (!offerExists) {
      throw new CustomException("Offer not found", 404);
    }
    const review = new this.reviewModel(data);
    return review.save();
  }

  async getAllReviews() {
    return this.reviewModel.find();
  }

  async getReviewById(id: string) {
    return this.reviewModel.findById(id);
  }

  async deleteReview(id: string) {
    return this.reviewModel.findByIdAndDelete(id);
  }

  async updateReview(id: string, data: any) {
    const review = await this.reviewModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!review) {
      throw new CustomException("Review not found", 404);
    }
    return review;
  }
}
