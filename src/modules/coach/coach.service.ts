import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Coach, CoachDocument } from "./coach.schema";
import { CreateCoachDto } from "./dto/create-coach.dto";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { CustomException } from "src/exceptions/custom.exception";

@Injectable()
export class CoachService {
  constructor(
    @InjectModel(Coach.name) private coachModel: Model<CoachDocument>,
    private readonly CloudinaryService: CloudinaryService
  ) {}

  async create(createCoachDto: CreateCoachDto, buffer: Buffer): Promise<Coach> {
    if (!buffer) {
      throw new CustomException("Image is required", 404);
    }
    const image = await this.CloudinaryService.upload_image(buffer, "Coach");
    createCoachDto.image = image;
    const newCoach = new this.coachModel(createCoachDto);
    return newCoach.save();
  }

  findAll(): Promise<Coach[]> {
    return this.coachModel.find().exec();
  }

  async findOne(id: string): Promise<Coach> {
    const coach = await this.coachModel.findById(id).exec();
    if (!coach) {
      throw new CustomException("Coach not found", 404);
    }
    return coach;
  }

  async update(
    id: string,
    updateCoachDto: Partial<CreateCoachDto>,
    buffer?: Buffer
  ): Promise<Coach> {
    if (buffer) {
      const coach = await this.coachModel.findById(id);
      if (!coach) {
        throw new CustomException("Coach not found", 404);
      }
      if (coach.image) {
        const public_id = coach.image.split("/").pop().split(".")[0];
        const image = await this.CloudinaryService.replaceImage(
          public_id,
          "Coach",
          buffer
        );
        updateCoachDto.image = image;
      } else {
        const image = await this.CloudinaryService.upload_image(
          buffer,
          "Coach"
        );
        updateCoachDto.image = image;
      }
    }
    const updatedCoach = await this.coachModel
      .findByIdAndUpdate(id, updateCoachDto, { new: true })
      .exec();
    if (!updatedCoach) {
      throw new CustomException("Coach not found", 404);
    }
    return updatedCoach;
  }

  async remove(id: string): Promise<object> {
    const deletedCoach = await this.coachModel.findByIdAndDelete(id).exec();
    if (!deletedCoach) {
      throw new CustomException("Coach not found", 404);
    }
    const url = deletedCoach.image.split("/");
    const public_id = `${url[url.length - 3]}/${url[url.length - 2]}/${url[url.length - 1].replace(".png", "")}`;
    await this.CloudinaryService.delete_image(public_id);
    return { message: "Coach deleted successfully" };
  }
}
