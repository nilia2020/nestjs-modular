import { firstValueFrom } from 'rxjs';
import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { environnments } from './environments';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environnments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    UsersModule,
    ProductsModule,
    HttpModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const request = http.get('https://jsonplaceholder.typicode.com/todos');
        const tasks = await firstValueFrom(request);
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
