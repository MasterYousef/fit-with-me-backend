import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { OffersService } from "./offers.service";
import { CreateOfferDto } from "./dto/create-offer.dto";
import { Public } from "src/decorator/public.decorator";
import { Roles } from "src/decorator/role.decorator";

@Controller("offers")
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  @Roles("admin")
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(createOfferDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.offersService.findAll();
  }

  @Get(":id")
  @Public()
  findOne(@Param("id") id: string) {
    return this.offersService.findOne(id);
  }

  @Put(":id")
  @Roles("admin")
  update(@Param("id") id: string, @Body() createOfferDto: CreateOfferDto) {
    return this.offersService.update(id, createOfferDto);
  }

  @Delete(":id")
  @Roles("admin")
  remove(@Param("id") id: string) {
    return this.offersService.remove(id);
  }
}
