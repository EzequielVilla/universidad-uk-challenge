import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MongoObjectId } from './../../lib/common/types';
import { UpdateProductDto } from './dto/update-product.dto';

export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const newProduct = new this.productModel({ ...createProductDto });
      return await newProduct.save();
    } catch (error) {
      console.log('ERROR_CREATING_PRODUCT', error);
      throw new HttpException('ERROR_CREATING_PRODUCT', HttpStatus.BAD_REQUEST);
    }
  }

  async findById(id: MongoObjectId) {
    try {
      const queryResponse = await this.productModel.findById(id);

      if (!queryResponse) {
        throw new HttpException('PRODUCT_NOT_FOUND', HttpStatus.NOT_FOUND);
      }
      return queryResponse;
    } catch (error) {
      if (error.message === 'PRODUCT_NOT_FOUND') {
        console.log(error, { id });
        throw error;
      }
      console.log('ERROR_FINDING_PRODUCT', error);
      throw new HttpException('ERROR_FINDING_PRODUCT', HttpStatus.BAD_REQUEST);
    }
  }
  async findAll() {
    try {
      return await this.productModel.find();
    } catch (error) {
      console.log('ERROR_FINDING_PRODUCTS', error);
      throw new HttpException('ERROR_FINDING_PRODUCTS', HttpStatus.BAD_REQUEST);
    }
  }
  async update(id: MongoObjectId, updateProductDto: UpdateProductDto) {
    try {
      const queryResponse = await this.productModel.updateOne(
        { _id: id },
        { ...updateProductDto },
      );
      if (queryResponse.matchedCount === 0) {
        throw new HttpException('PRODUCT_NOT_FOUND', HttpStatus.NOT_FOUND);
      }
      return 'PRODUCT_UPDATED_SUCCESSFULLY';
    } catch (error) {
      if (error.message === 'PRODUCT_NOT_FOUND') {
        console.log(error, { id });
        throw error;
      }
      console.log('ERROR_UPDATING_PRODUCT', error);
      throw new HttpException('ERROR_UPDATING_PRODUCT', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: MongoObjectId) {
    try {
      const queryResponse = await this.productModel.findByIdAndDelete(id);
      if (!queryResponse) {
        throw new HttpException('PRODUCT_NOT_FOUND', HttpStatus.NOT_FOUND);
      }
      return queryResponse;
    } catch (error) {
      if (error.message === 'PRODUCT_NOT_FOUND') {
        console.log(error, { id });
        throw error;
      }
      console.log('ERROR_DELETING_PRODUCT', error);
      throw new HttpException('ERROR_DELETING_PRODUCT', HttpStatus.BAD_REQUEST);
    }
  }
}
