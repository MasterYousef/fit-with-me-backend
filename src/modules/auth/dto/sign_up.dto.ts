import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsNumberString,
} from "class-validator";

class SignUp {
  @IsNotEmpty({ message: "Username is required" })
  @IsString({ message: "Username must be a string" })
  @MaxLength(100, { message: "Username must be at most 50 characters long" })
  username: string;
  @IsNotEmpty({ message: "Email is required" })
  @IsString({ message: "Email must be a string" })
  @MaxLength(255, { message: "Email must be at most 255 characters long" })
  email: string;
  @IsNotEmpty({ message: "Password is required" })
  @IsString({ message: "Password must be a string" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password: string;
  @IsNotEmpty({ message: "please confirm your Password" })
  confirmPassword: string;
  @IsNotEmpty({ message: "Role is required" })
  role: "user";
  @IsNotEmpty({ message: "Phone number is required" })
  @IsNumberString({}, { message: "Phone number must be a string of digits" })
  @MaxLength(20, { message: "Phone must be at most 20 characters long" })
  phone: string;
}
export default SignUp;
