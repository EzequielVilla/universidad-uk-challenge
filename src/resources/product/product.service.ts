import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './product.repository';
import { MongoObjectId } from './../../lib/common/types';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.create(createProductDto);
  }

  async findById(id: MongoObjectId) {
    return await this.productRepository.findById(id);
  }
  async findAll() {
    return await this.productRepository.findAll();
  }

  async update(id: MongoObjectId, updateProductDto: UpdateProductDto) {
    return await this.productRepository.update(id, updateProductDto);
  }

  async remove(id: MongoObjectId) {
    return await this.productRepository.delete(id);
  }
}
