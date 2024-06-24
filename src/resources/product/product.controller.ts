import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { MongoObjectId } from 'src/lib/common/types';
import { ValidateUpdateDTO } from 'src/lib/common/validate-update-dto.decorator';
import { ProductSchema } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Version('1')
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Version('1')
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Version('1')
  @Get(':id')
  findOne(@Param('id') id: MongoObjectId) {
    return this.productService.findById(id);
  }

  @Version('1')
  @Patch(':id')
  update(
    @Param('id') id: MongoObjectId,
    @ValidateUpdateDTO(ProductSchema) updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Version('1')
  @Delete(':id')
  remove(@Param('id') id: MongoObjectId) {
    return this.productService.remove(id);
  }
}
