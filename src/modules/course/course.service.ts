import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Course, CourseDocument } from "./course.schema";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { CustomException } from "src/exceptions/custom.exception";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    private readonly CloudinaryService: CloudinaryService
  ) {}

  findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseModel.findById(id).exec();
    if (!course) {
      throw new CustomException("Course not found", 404);
    }
    return course;
  }
  async create(
    createCourseDto: CreateCourseDto,
    buffer: Buffer
  ): Promise<Course> {
    if (!buffer) {
      throw new CustomException("Image is required", 404);
    }
    const image = await this.CloudinaryService.upload_image(buffer, "Course");
    createCourseDto.image = image;
    const newCourse = new this.courseModel(createCourseDto);
    return newCourse.save();
  }

  async update(
    id: string,
    UpdateCourse: Partial<UpdateCourseDto>,
    buffer: Buffer
  ): Promise<Course> {
    if (buffer) {
      const course = await this.courseModel.findById(id);
      if (!course) {
        throw new CustomException("Coach not found", 404);
      }
      if (course.image) {
        const public_id = course.image.split("/").pop().split(".")[0];
        const image = await this.CloudinaryService.replaceImage(
          public_id,
          "Course",
          buffer
        );
        UpdateCourse.image = image;
      } else {
        const image = await this.CloudinaryService.upload_image(
          buffer,
          "Course"
        );
        UpdateCourse.image = image;
      }
    }
    const updatedCourse = await this.courseModel
      .findByIdAndUpdate(id, UpdateCourse, { new: true })
      .exec();
    if (!updatedCourse) {
      throw new CustomException("Course not found", 404);
    }
    return updatedCourse;
  }

  async remove(id: string): Promise<object> {
    const deletedCourse = await this.courseModel.findByIdAndDelete(id).exec();
    if (!deletedCourse) {
      throw new CustomException("course not found", 404);
    }
    const url = deletedCourse.image.split("/");
    const public_id = `${url[url.length - 3]}/${url[url.length - 2]}/${url[url.length - 1].replace(".png", "")}`;
    await this.CloudinaryService.delete_image(public_id);
    return { message: "course deleted successfully" };
  }
}
