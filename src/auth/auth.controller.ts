import { UsersService } from 'src/users/users.service';
import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public, ResponseMessage, User } from "src/decorator/customize";
import { LocalAuthGuard } from "./local-auth.guard";
import { RegisterUserDto } from "src/users/dto/create-user.dto";
import { Response,Request, response } from "express";
import { IUser } from "src/users/users.interface";

@Controller("auth")
export class AuthController {
  constructor(
    private authService : AuthService
    ) {}



    @Public()
    @ResponseMessage("Register a new user")
    @Post('/register')
    register(@Body() registerUserDto : RegisterUserDto) {
      return this.authService.register(registerUserDto);
    }




    @Public()
    @UseGuards(LocalAuthGuard)
    @ResponseMessage("User Login")
    @Post('/login')
    async login(
      @Req() req,
      @Res({ passthrough: true }) response: Response) {
      return this.authService.login(req.user,response);
    }

    @ResponseMessage("Get user Information")
    @Get("/account")
    handelGetAccount(@User() user:IUser){
      return {user}
    }

    @Public()
    @ResponseMessage("Get user by refresh token")
    @Get("/refresh")
    handleRefreshToken(@Req() request:Request, @Res({ passthrough: true }) response: Response){
      const refreshToken=request.cookies["refresh_token"];
      return this.authService.processNewToken(refreshToken,response)
    }

    @ResponseMessage("Logout User")
    @Post("/logout")
    handleLogout(
      @Res({passthrough: true}) response:Response,
      @User() user:IUser
    ){
      return this.authService.logout(response,user);
    }


 
}
