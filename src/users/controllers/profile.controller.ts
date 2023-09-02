import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';
import { PayloadToken } from 'src/auth/models/token.model';
import { OrderService } from '../services/orders.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags()
@Controller('profile')
export class ProfileController {
  constructor(private orderService: OrderService) {}
  @Roles(Role.CUSTOMER)
  @Get('my-orders')
  getOrders(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.orderService.ordersByCustomer(user.sub);
  }
}
