import { Type } from "class-transformer";
import { IsString, IsNotEmpty, MaxLength, IsNumber } from "class-validator";

export class CreateCourseDto {
  @IsString({ message: "Title must be a string" })
  @IsNotEmpty({ message: "Title is required" })
  @MaxLength(100, { message: "Title must not exceed 100 characters" })
  title: string;

  @IsString({ message: "Description must be a string" })
  @IsNotEmpty({ message: "Description is required" })
  @MaxLength(500, { message: "Description must not exceed 500 characters" })
  description: string;

  @IsNotEmpty({ message: "Duration is required" })
  @Type(() => Number)
  @IsNumber({}, { message: "Duration must be a number" })
  duration: string;

  @IsNumber({}, { message: "Price must be a number" })
  @Type(() => Number)
  @IsNotEmpty({ message: "Price is required" })
  price: number;

  image: string;
}
