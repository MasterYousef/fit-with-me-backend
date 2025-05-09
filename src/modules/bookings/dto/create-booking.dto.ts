import { IsNotEmpty, IsMongoId } from "class-validator";

export class CreateBookingDto {
  @IsNotEmpty({ message: "offer id is required" })
  @IsMongoId({ message: "invalid offer id" })
  offerId: string;
}
