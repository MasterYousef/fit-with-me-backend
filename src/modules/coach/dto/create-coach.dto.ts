import {
  IsString,
  IsEmail,
  IsInt,
  MaxLength,
  Min,
  IsNotEmpty,
  IsPhoneNumber,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateCoachDto {
  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name is required" })
  @MaxLength(100, { message: "Name must not exceed 100 characters" })
  name: string;

  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Email is required" })
  @MaxLength(255, { message: "Email must not exceed 255 characters" })
  email: string;

  @IsNotEmpty({ message: "Phone is required" })
  @IsPhoneNumber("EG", { message: "Phone must be a Egyptian number" })
  @MaxLength(20, { message: "Phone must not exceed 20 characters" })
  phone: string;
  @IsNotEmpty({ message: "Experience is required" })
  @Type(() => Number)
  @IsInt({ message: "Experience must be an integer" })
  @Min(0, { message: "Experience must be at least 0" })
  experience: number;

  @IsString({ message: "Specialization must be a string" })
  @IsNotEmpty({ message: "Specialization is required" })
  @MaxLength(100, { message: "Specialization must not exceed 100 characters" })
  specialization: string;

  image: string;
}
