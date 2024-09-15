import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetResolver } from './pet/pet.resolver';
import { PetModule } from './pet/pet.module';
import { OwnerModule } from './owner/owner.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './owner/entities/owner.entity';
import { Pet } from './pet/entities/pet.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'datastore.db',
      entities: [Owner, Pet],
      synchronize: true,
    }),
    PetModule,
    OwnerModule,
  ],
  controllers: [AppController],
  providers: [AppService, PetResolver],
})
export class AppModule {}
