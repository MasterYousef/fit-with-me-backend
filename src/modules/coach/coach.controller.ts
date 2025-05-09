import { Controller, Get, Post, Param, Put, Delete, Req } from "@nestjs/common";
import { CoachService } from "./coach.service";
import { CreateCoachDto } from "./dto/create-coach.dto";
import { File } from "src/decorator/file.decorator";
import { plainToInstance } from "class-transformer";
import errors from "src/validations/file.validation";
import { Roles } from "src/decorator/role.decorator";
import { Public } from "src/decorator/public.decorator";
import { UpdateCoachDto } from "./dto/update-coach.dto";

@Controller("coach")
export class CoachController {
  constructor(private readonly coachService: CoachService) {}

  @Post()
  @Roles("admin")
  async create(@Req() req: Request, @File() buffer: Buffer) {
    const createCoachDto = plainToInstance(CreateCoachDto, req.body);
    await errors(createCoachDto);
    return this.coachService.create(createCoachDto, buffer);
  }

  @Get()
  @Public()
  findAll() {
    return this.coachService.findAll();
  }

  @Get(":id")
  @Public()
  findOne(@Param("id") id: string) {
    return this.coachService.findOne(id);
  }

  @Put(":id")
  @Roles("admin")
  async update(
    @Param("id") id: string,
    @Req() req: Request,
    @File() buffer: Buffer
  ) {
    const updateCoachDto = plainToInstance(UpdateCoachDto, req.body);
    await errors(updateCoachDto);
    return this.coachService.update(id, updateCoachDto, buffer);
  }

  @Delete(":id")
  @Roles("admin")
  remove(@Param("id") id: string) {
    return this.coachService.remove(id);
  }
}
