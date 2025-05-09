import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type user_document = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, maxlength: 100 })
  username: string;

  @Prop({ required: true, unique: true, maxlength: 255 })
  email: string;

  @Prop({ required: true, maxlength: 20 })
  phone: string;

  @Prop({ required: true, maxlength: 255 })
  password: string;

  @Prop({ required: true, enum: ["admin", "user"] })
  role: string;

  @Prop()
  image: string;

  @Prop()
  resetCode: number;

  @Prop({ default: false })
  resetStatus: boolean;

  @Prop()
  codeExpire: Date;

  @Prop()
  passwordChangeAt: Date;
}

export const user_schema = SchemaFactory.createForClass(User);
