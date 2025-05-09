import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { CourseController } from "./course.controller";
import { CourseService } from "./course.service";
import { Course, CourseSchema } from "./course.schema";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
  ],
  controllers: [CourseController],
  providers: [CourseService, CloudinaryService],
})
export class CourseModule {}
