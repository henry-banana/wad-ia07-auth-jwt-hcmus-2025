import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Global() // Đánh dấu module này là global để có thể sử dụng ở bất kỳ đâu trong ứng dụng
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}