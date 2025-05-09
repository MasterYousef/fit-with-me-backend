import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put,
} from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { Roles } from "src/decorator/role.decorator";
import { Public } from "src/decorator/public.decorator";
import user from "src/decorator/user.decorator";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";

@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @Roles("user")
  async createReview(
    @Body() body: CreateReviewDto,
    @user("_id") userId: string
  ) {
    const reviewData = { ...body, userId };
    return this.reviewsService.createReview(reviewData);
  }

  @Get()
  @Public()
  async getAllReviews() {
    return this.reviewsService.getAllReviews();
  }

  @Get(":id")
  @Public()
  async getReviewById(@Param("id") id: string) {
    return this.reviewsService.getReviewById(id);
  }

  @Delete(":id")
  @Roles("admin")
  async deleteReview(@Param("id") id: string) {
    return this.reviewsService.deleteReview(id);
  }

  @Put(":id")
  @Roles("user")
  async updateReview(
    @Param("id") id: string,
    @Body() body: UpdateReviewDto,
    @user("_id") userId: string
  ) {
    const reviewData = { ...body, userId };
    return this.reviewsService.updateReview(id, reviewData);
  }
}
