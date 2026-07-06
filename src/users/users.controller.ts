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
  Req,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdatePasswordDto, UpdateUserDto } from "../users/dto/users.dto";
import { toUserResponse } from "./users.mapper";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AuditService } from "../audit/audit.service";

@UseGuards(JwtAuthGuard)
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly audit: AuditService,
  ) {}

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
  async create(@Body() dto: CreateUserDto, @Req() req: any) {
    const u = await this.usersService.create(dto);
    const full = await this.usersService.getById(u.id);
    await this.audit.log({ tenantSlug: req.user.tenantSlug, userId: req.user.sub, userEmail: req.user.email, action: "USER_CREATED", module: "users", entity: "User", entityId: Number(u.id), result: "success" });
    return toUserResponse(full);
  }

  @Patch(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateUserDto, @Req() req: any) {
    const u = await this.usersService.update(id, dto);
    const full = await this.usersService.getById(u.id);
    await this.audit.log({ tenantSlug: req.user.tenantSlug, userId: req.user.sub, userEmail: req.user.email, action: "USER_UPDATED", module: "users", entity: "User", entityId: id, result: "success" });
    return toUserResponse(full);
  }

  @Patch(":id/password")
  async updatePassword(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdatePasswordDto,
    @Req() req: any,
  ) {
    await this.usersService.updatePassword(id, dto);
    await this.audit.log({ tenantSlug: req.user.tenantSlug, userId: req.user.sub, userEmail: req.user.email, action: "USER_PASSWORD_CHANGED", module: "users", entity: "User", entityId: id, result: "success" });
    return { ok: true };
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number, @Req() req: any) {
    const result = await this.usersService.remove(id);
    await this.audit.log({ tenantSlug: req.user.tenantSlug, userId: req.user.sub, userEmail: req.user.email, action: "USER_DELETED", module: "users", entity: "User", entityId: id, result: "success" });
    return result;
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
