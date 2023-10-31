import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class RoleGuardService {
  constructor(private readonly jwtService: JwtService) {}

  validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: '1234',
    })
  }
}
