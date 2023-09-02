import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/config';
const API_KEY = '12345678';
const API_KEY_PROD = 'PROD126548SA';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        // Para mysql "configService.mysql"
        const { url } = configService.postgres;
        return {
          // Para mysql: type: 'mysql'
          type: 'postgres',
          url: url,
          //En producción se utilizan migraciones para controlar los cambios
          synchronize: false,
          autoLoadEntities: process.env.NODE_ENV === 'prod' ? false : true,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { url } = configService.postgres;
        const client = new Client({
          connectionString: url,
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
