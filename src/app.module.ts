import { Module, MiddlewareConsumer, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./modules/auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { configDotenv } from "dotenv";
import { ResInterceptor } from "./interceptors/res.interceptor";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CloudinaryService } from "./cloudinary/cloudinary.service";
import { EmailModule } from "./email/email.module";
import { CoachModule } from "./modules/coach/coach.module";
import { CourseModule } from "./modules/course/course.module";
import { OffersModule } from "./modules/offers/offers.module";
import { BookingsModule } from "./modules/bookings/bookings.module";
import { rawBodyMiddleware } from "./middlewares/raw-body.middleware";
import { json } from "body-parser";

configDotenv({ path: "./src/config/config.env" });

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "./config/config.env",
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGO_KEY"),
      }),
      inject: [ConfigService],
    }),
    EmailModule.forRoot({
      host: "EMAIL_HOST",
      port: "EMAIL_PORT",
      secure: true,
      auth: {
        user: "EMAIL_USER",
        pass: "EMAIL_PASS",
      },
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
    AuthModule,
    EmailModule,
    CoachModule,
    CourseModule,
    OffersModule,
    BookingsModule,
  ],
  providers: [
    {
      provide: "APP_INTERCEPTOR",
      useClass: ResInterceptor,
    },
    CloudinaryService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(rawBodyMiddleware, json({ limit: "1mb" })) // Apply raw body middleware
      .forRoutes("bookings/webhook");
  }
}
