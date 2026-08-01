import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument, toAdminProduct } from './product.schema';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findAll(q?: string, status?: string) {
    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { slug: { $regex: q, $options: 'i' } },
      ];
    }
    const docs = await this.productModel.find(filter).sort({ updatedAt: -1 }).exec();
    return docs.map(toAdminProduct);
  }

  async findOne(id: string) {
    const doc = await this.productModel.findById(id).exec();
    if (!doc) throw new NotFoundException('Product not found');
    return toAdminProduct(doc);
  }

  async findBySlug(slug: string, publishedOnly = false) {
    const filter: Record<string, unknown> = {
      slug: slug.toLowerCase().trim(),
    };
    if (publishedOnly) filter.status = 'published';
    const doc = await this.productModel.findOne(filter).exec();
    if (!doc) throw new NotFoundException('Product not found');
    return toAdminProduct(doc);
  }

  async findPublished(q?: string, category?: string) {
    const filter: Record<string, unknown> = { status: 'published' };
    if (category) filter.category = category;
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { slug: { $regex: q, $options: 'i' } },
      ];
    }
    const docs = await this.productModel.find(filter).sort({ updatedAt: -1 }).exec();
    return docs.map(toAdminProduct);
  }

  async create(dto: CreateProductDto) {
    const doc = await this.productModel.create({
      ...dto,
      slug: dto.slug.toLowerCase().trim(),
      brand: dto.brand ?? 'REWORRKED',
      stock: dto.stock ?? 0,
      status: dto.status ?? 'draft',
      tags: dto.tags ?? [],
      highlights: dto.highlights ?? [],
      specifications: dto.specifications ?? [],
      images: dto.images ?? [],
    });
    return toAdminProduct(doc);
  }

  async update(id: string, dto: UpdateProductDto) {
    const doc = await this.productModel
      .findByIdAndUpdate(
        id,
        {
          ...dto,
          ...(dto.slug ? { slug: dto.slug.toLowerCase().trim() } : {}),
        },
        { new: true },
      )
      .exec();
    if (!doc) throw new NotFoundException('Product not found');
    return toAdminProduct(doc);
  }

  async remove(id: string) {
    const doc = await this.productModel.findByIdAndDelete(id).exec();
    if (!doc) throw new NotFoundException('Product not found');
    return { ok: true };
  }

  count() {
    return this.productModel.countDocuments().exec();
  }
}
