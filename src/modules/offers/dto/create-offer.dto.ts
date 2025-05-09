import { IsMongoId, IsNotEmpty } from "class-validator";

export class CreateOfferDto {
  @IsNotEmpty({ message: "coach id is required" })
  @IsMongoId()
  coach: string;

  @IsNotEmpty({ message: "course id is required" })
  @IsMongoId()
  course: string;
}
