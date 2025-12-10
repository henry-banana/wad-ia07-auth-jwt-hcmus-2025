import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  Response,
  UnauthorizedException,
} from "@nestjs/common";
import type { Response as ExpressResponse } from "express";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async register(
    @Body() registerDto: RegisterDto,
    @Response({ passthrough: true }) res: ExpressResponse
  ) {
    const result = await this.authService.register(registerDto);

    // Set refresh token as HTTP-only cookie
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/api/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return only access token and user (NO refresh token in response body)
    return {
      user: result.user,
      accessToken: result.accessToken,
    };
  }

  @Post("login")
  async login(
    @Body() loginDto: LoginDto,
    @Response({ passthrough: true }) res: ExpressResponse
  ) {
    const result = await this.authService.login(loginDto);

    // Set refresh token as HTTP-only cookie
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/api/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return only access token and user (NO refresh token in response body)
    return {
      user: result.user,
      accessToken: result.accessToken,
    };
  }

  @Post("refresh")
  async refreshTokens(
    @Request() req,
    @Response({ passthrough: true }) res: ExpressResponse
  ) {
    // Get refresh token from cookie
    const refreshToken = req.cookies["refreshToken"];

    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token is required");
    }

    const tokens = await this.authService.refreshTokens(refreshToken);

    // Update cookie with new refresh token
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/api/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Return only access token
    return {
      accessToken: tokens.accessToken,
    };
  }

  @Post("logout")
  @UseGuards(JwtAuthGuard)
  async logout(
    @Request() req,
    @Response({ passthrough: true }) res: ExpressResponse
  ) {
    const refreshToken = req.cookies["refreshToken"];

    if (refreshToken) {
      await this.authService.logout(req.user.id, refreshToken);
    }

    // Clear cookie - phải match các options khi set
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/api/auth/refresh",
    });

    return { message: "Logout successful" };
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return this.authService.getProfile(req.user.id);
  }
}