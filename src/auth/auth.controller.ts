import { Body, Controller, Post, Headers, UseGuards, Req } from "@nestjs/common";
import { AuthForgetDTO } from "src/auth/dto/auth-forget.dto";
import { AuthResetDTO } from "src/auth/dto/auth-reset.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthGuard } from "./guards/auth.guard";
import { User } from "./decorators/user.deorator";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ){}

    @Post('login')
    async login(@Body() {email, password}: AuthLoginDTO){
        return this.authService.login(email, password)
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDTO){
        return this.authService.register(body);
    }

    @Post('forget')
    async forget(@Body() {email}: AuthForgetDTO){
        return this.authService.forget(email);
    }

    @Post('reset')
    async reset(@Body() {password, token}: AuthResetDTO){
        return this.authService.reset(password, token);
    }
    
    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User('id') user){
        return {user};
    }
}