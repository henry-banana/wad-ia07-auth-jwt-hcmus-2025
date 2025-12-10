import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { ConfigService } from "@nestjs/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private config: ConfigService) {
    const connectionString = config.get<string>("DATABASE_URL");
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);

    super({
      adapter,
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log("✅ Database connected");
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log("❌ Database disconnected");
  }

  // Dùng để xóa sạch dữ liệu trong database
  async cleanDatabase() {
    if (process.env.NODE_ENV === "production") return;

    const models = Reflect.ownKeys(this).filter((key) => key[0] !== "_");
    return Promise.all(models.map((modelKey) => this[modelKey].deleteMany()));
  }
}