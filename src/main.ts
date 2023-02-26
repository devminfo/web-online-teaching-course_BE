// registers aliases, DON'T REMOVE THIS LINE!
import 'module-alias/register';

import morgan from 'morgan';
import * as path from 'path';
import { ExpressPeerServer } from 'peer';

import UserService from '@authorization/a1-user/user.service';
import GroupDetailService from '@authorization/a6-group-detail/group-detail.service';
import GroupApiService from '@authorization/a7-group-api/group-api.service';
import commonConstants from '@constant/common.constants';
import ValidationExceptions from '@exception/validation.exceptions';
import AllExceptionsFilter from '@filter/all-exceptions.filter';
import RolesGuard from '@guard/roles.guard';
import { ShareFunction } from '@helper/static-function';
import RedisIoAdapter from '@lazy-module/websocket-custom/websocket-custom-redis.adapter';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import AppModule from './route/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // enableCors
  app.enableCors();

  // Validation pipe in global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => new ValidationExceptions(errors),
    }),
  );

  // Catch all Exceptions
  app.useGlobalFilters(new AllExceptionsFilter());

  // morgan logger
  app.use(
    morgan(
      process.env.NODE_ENV === 'production'
        ? ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
        : ':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms',
    ),
  );

  // socket peerjs
  {
    const peerConfig = { debug: true } as any;
    const peerServer = ExpressPeerServer(app.getHttpServer(), peerConfig);
    app.use('/peerjs', peerServer);
  }

  // set public file
  if (!ShareFunction.checkIsConfigS3Storage()) {
    app.useStaticAssets(path.join(__dirname, '..', 'public'), {
      prefix: '/static/',
    });
  }

  // check config redis for socket
  if (
    ShareFunction.isConfigRedis()
    && ShareFunction.isConfigWebsocket()
    && ShareFunction.isEnableWebsocket()
  ) {
    const redisIoAdapter = new RedisIoAdapter(app);
    await redisIoAdapter.connectToRedis();
    app.useWebSocketAdapter(redisIoAdapter);
  }

  // get port app running
  const port = process.env.SERVER_PORT || commonConstants.server.port;

  // config swagger
  const options = new DocumentBuilder()
    .setDescription('The boilerplate API for nestjs devs')
    .setVersion('1.0')
    .addBearerAuth({
      in: 'header',
      type: 'http',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);

  if (ShareFunction.isEnableSwagger()) {
    SwaggerModule.setup('api', app, document);
  }

  // Protected routes with roles guard
  const rolesGuard = app.get<RolesGuard>(RolesGuard);
  app.useGlobalGuards(rolesGuard);

  // run app
  await app.listen(port, async () => {
    console.log(
      `The server is running on ${port} port: http://${commonConstants.server.ip}:${port}/api`,
    );
  });

  const httpAdapter = app.getHttpAdapter();
  const router = httpAdapter.getInstance()._router;

  await app.get<GroupDetailService>(GroupDetailService).seed(router);
  await app.get<GroupApiService>(GroupApiService).seed(router);
  // await app
  //   .get<UserService>(UserService)
  //   .seedAdminAndResetAuthorization(router);
}

bootstrap();
