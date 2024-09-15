import { Injectable } from '@nestjs/common';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Pet } from './entities/pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from 'src/owner/entities/owner.entity';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
    @InjectRepository(Owner)
    private ownerRepository: Repository<Owner>,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(createPetInput: CreatePetInput) {
    const pet = new Pet();
    pet.name = createPetInput.name;
    pet.age = createPetInput.age;
    const owner = await this.ownerRepository.findOne({
      where: { id: createPetInput.ownerId },
    });
    pet.owners = owner;
    return this.petRepository.save(pet);
  }

  findAll() {
    return this.petRepository.find({ relations: ['owners'] });
  }

  findOne(id: number) {
    return this.petRepository.findOne({ where: { id }, relations: ['owners'] });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: number, updatePetInput: UpdatePetInput) {
    await this.petRepository.update(id, updatePetInput);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.petRepository.delete(id);
  }
}
