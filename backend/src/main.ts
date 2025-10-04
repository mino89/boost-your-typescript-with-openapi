import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend
  app.enableCors({
    origin: "http://localhost:4200",
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Swagger/OpenAPI setup
  const config = new DocumentBuilder()
    .setTitle("Pet Store API")
    .setDescription("Pet Store API with OpenAPI specification")
    .setVersion("1.0")
    .addTag("pets")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(3000);
  console.log("Backend running on http://localhost:3000");
  console.log("API docs available at http://localhost:3000/api/docs");
}
bootstrap();
