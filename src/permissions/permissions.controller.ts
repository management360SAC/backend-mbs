import { Controller, Get, Query } from "@nestjs/common";
import { PermissionsService } from "./permissions.service";

@Controller("permissions")
export class PermissionsController {
  constructor(private readonly permsService: PermissionsService) {}

  @Get()
  findAll(@Query("q") q?: string) {
    return this.permsService.findAll();
  }
}
