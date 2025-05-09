import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CoachController } from "./coach.controller";
import { CoachService } from "./coach.service";
import { Coach, CoachSchema } from "./coach.schema";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Coach.name, schema: CoachSchema }]),
  ],
  controllers: [CoachController],
  providers: [CoachService, CloudinaryService],
})
export class CoachModule {}
