import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { RoleGuardService } from './role-guard.service'

@Injectable()
export class RoleGuardGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return false
  }
}

@Injectable()
export class AuthGuards implements CanActivate {
  constructor(private readonly roleGuardService: RoleGuardService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest()
      const { authorization }: any = request.headers

      if (!authorization || authorization.trim() === '') {
        throw new UnauthorizedException('Please provide token')
      }

      const decoded = this.roleGuardService.validateToken(authorization.split(' ')[1])

      return true
    } catch (error) {
      console.log('auth error - ', error.message)
      throw new ForbiddenException(error.message || 'session expired! Please sign In')
    }
  }
}
