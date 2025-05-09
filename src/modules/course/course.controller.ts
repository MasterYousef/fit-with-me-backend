import { Controller, Get, Post, Param, Put, Delete, Req } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { File } from "src/decorator/file.decorator";
import { plainToInstance } from "class-transformer";
import errors from "src/validations/file.validation";
import { Public } from "src/decorator/public.decorator";
import { Roles } from "src/decorator/role.decorator";

@Controller("courses")
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @Roles("admin")
  async create(@Req() req, @File() buffer: Buffer) {
    const data = plainToInstance(CreateCourseDto, req.body);
    await errors(data);
    return this.courseService.create(data, buffer);
  }

  @Get()
  @Public()
  findAll() {
    return this.courseService.findAll();
  }
  @Get(":id")
  @Public()
  findOne(@Param("id") id: string) {
    return this.courseService.findOne(id);
  }

  @Roles("admin")
  @Put(":id")
  async update(@Param("id") id: string, @Req() req, @File() buffer: Buffer) {
    const data = plainToInstance(UpdateCourseDto, req.body);
    await errors(data);
    return this.courseService.update(id, data, buffer);
  }

  @Delete(":id")
  @Roles("admin")
  remove(@Param("id") id: string) {
    return this.courseService.remove(id);
  }
}
