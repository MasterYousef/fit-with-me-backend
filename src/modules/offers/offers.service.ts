import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Offer } from "./offers.schema";
import { CreateOfferDto } from "./dto/create-offer.dto";
import { CustomException } from "../../exceptions/custom.exception";
import { Coach } from "../coach/coach.schema";
import { Course } from "../course/course.schema";

@Injectable()
export class OffersService implements OnModuleInit {
  constructor(
    @InjectModel(Offer.name) private readonly offerModel: Model<Offer>,
    @InjectModel(Coach.name) private readonly coachModel: Model<Coach>,
    @InjectModel(Course.name) private readonly courseModel: Model<Course>
  ) {}

  async onModuleInit() {
    this.coachModel.watch().on("change", async (change) => {
      if (change.operationType === "delete") {
        await this.offerModel
          .deleteMany({ coach: change.documentKey._id })
          .exec();
      }
    });

    this.courseModel.watch().on("change", async (change) => {
      if (change.operationType === "delete") {
        await this.offerModel
          .deleteMany({ course: change.documentKey._id })
          .exec();
      }
    });
  }

  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
    const { coach, course } = createOfferDto;

    const coachExists = await this.coachModel.exists({ _id: coach });
    if (!coachExists) {
      throw new CustomException("Invalid coach ID", 400);
    }

    const courseExists = await this.courseModel.exists({ _id: course });
    if (!courseExists) {
      throw new CustomException("Invalid course ID", 400);
    }

    const createdOffer = new this.offerModel(createOfferDto);
    return createdOffer.save();
  }

  async findAll(): Promise<Offer[]> {
    return this.offerModel
      .find()
      .populate({ path: "coach", select: "id name image" })
      .populate({ path: "course", select: "id price image title" })
      .exec();
  }

  async findOne(id: string): Promise<Offer> {
    const offer = await this.offerModel
      .findById(id)
      .populate({ path: "coach", select: "id name image" })
      .populate({ path: "course", select: "id price image title" })
      .exec();
    if (!offer) {
      throw new CustomException(`Offer with ID ${id} not found`, 404);
    }
    return offer;
  }

  async update(id: string, createOfferDto: CreateOfferDto): Promise<Offer> {
    const { coach, course } = createOfferDto;

    const coachExists = await this.coachModel.exists({ _id: coach });
    if (!coachExists) {
      throw new CustomException("Invalid coach ID", 400);
    }

    const courseExists = await this.courseModel.exists({ _id: course });
    if (!courseExists) {
      throw new CustomException("Invalid course ID", 400);
    }

    const updatedOffer = await this.offerModel
      .findByIdAndUpdate(id, createOfferDto, { new: true })
      .exec();
    if (!updatedOffer) {
      throw new CustomException(`Offer with ID ${id} not found`, 404);
    }
    return updatedOffer;
  }

  async remove(id: string): Promise<void> {
    const result = await this.offerModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new CustomException(`Offer with ID ${id} not found`, 404);
    }
  }
}
