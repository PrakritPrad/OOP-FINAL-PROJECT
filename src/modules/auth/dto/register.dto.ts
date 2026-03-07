import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from '../../user/dto/create-user.dto';

// organizationId and lastLoginAt are intentionally excluded — lastLoginAt is system-managed
export class RegisterDto extends OmitType(CreateUserDto, ['organizationId', 'lastLoginAt'] as const) {}
