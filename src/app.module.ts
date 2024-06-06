import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: 'richard.grimes@ethereal.email',
          pass: 'N6UmYMTdg1TBkx9E6N'
      },
      tls: {
        // Configuração para ignorar certificados autoassinados
        rejectUnauthorized: false,
      },

    },
      defaults: {
        from: '"Reifiner" <richard.grimes@ethereal.email>',
      }, 
      template: {
        dir: process.cwd() + '/dist/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {provide: APP_GUARD, useClass: ThrottlerGuard}
  ],
  exports: [AppService]
})
export class AppModule {}
