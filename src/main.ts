import * as log4js from 'log4js';
import logger from './utils/logger';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { FastifyAdapter } from '@nestjs/core/adapters';
import { join } from 'path';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { NestFactory } from '@nestjs/core';
import { seoMiddleware } from 'express-middleware-seo';
// import * as history from 'connect-history-api-fallback';
import * as netjet from 'netjet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    netjet({
      cache: {
        max: 100,
      },
    }),
  );
  app.use(
    seoMiddleware({
      enable: true,
      render: {
        useReady: true,
        renderTimeout: 10000,
      },
    }),
  );
  // app.use(history());
  app.setViewEngine('twig');
  const options = new DocumentBuilder()
    .setTitle('API example')
    .setDescription('The API description')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);
  app.useStaticAssets(join(__dirname, '/public/'));
  app.setBaseViewsDir(join(__dirname, '/views/'));
  // app.useStaticAssets({
  //   root: join(__dirname, 'public'),
  //   prefix: '/public/',
  // });
  // app.setViewEngine({
  //   engine: {
  //     handlebars: require('hbs'),
  //   },
  //   templates: join(__dirname, 'templates'),
  // });
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.use(log4js.connectLogger(logger, { level: 'info' }));
  await app.listen(3010, () => {
    logger.info('http://localhost:3010');
  });
}
bootstrap();
