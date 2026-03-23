import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdatePasswordDto, UpdateUserDto } from "../users/dto/users.dto";
import { toUserResponse } from "./users.mapper";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get("options")
  async options(@Query("role") role?: string) {
    return this.usersService.listOptions({ role });
  }

  @Get(":id")
  async getOne(@Param("id", ParseIntPipe) id: number) {
    const u = await this.usersService.getById(id);
    return toUserResponse(u);
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const u = await this.usersService.create(dto);
    const full = await this.usersService.getById(u.id);
    return toUserResponse(full);
  }

  @Patch(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    const u = await this.usersService.update(id, dto);
    const full = await this.usersService.getById(u.id);
    return toUserResponse(full);
  }

  @Patch(":id/password")
  async updatePassword(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdatePasswordDto,
  ) {
    await this.usersService.updatePassword(id, dto);
    return { ok: true };
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  // ✅ tu listado paginado se queda igual
  @Get()
  list(
    @Query("q") q?: string,
    @Query("role") role?: string,
    @Query("status") status?: "active" | "inactive",
    @Query("page") page = "1",
    @Query("pageSize") pageSize = "10",
    @Query("sort") sort = "created_at",
    @Query("order") order = "desc",
  ) {
    return this.usersService.list({
      q,
      role,
      status,
      page: Number(page),
      pageSize: Number(pageSize),
      sort,
      order,
    });
  }
}
