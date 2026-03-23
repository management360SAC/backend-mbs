import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { SellersService } from "./sellers.service";
import { CreateSellerDto } from "./dto/create-seller.dto";
import { UpdateSellerDto } from "./dto/update-seller.dto";

@Controller("marketing/sellers")
export class SellersController {
  constructor(private readonly service: SellersService) {}

  @Post()
  create(@Body() dto: CreateSellerDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(Number(id));
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateSellerDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(Number(id));
  }
}
