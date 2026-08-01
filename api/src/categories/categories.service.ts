import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument, toAdminCategory } from './category.schema';
import { Product, ProductDocument } from '../products/product.schema';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findAll() {
    const docs = await this.categoryModel.find().sort({ name: 1 }).exec();
    const counts = await this.productModel.aggregate<{
      _id: string;
      count: number;
    }>([{ $group: { _id: '$category', count: { $sum: 1 } } }]);
    const map = new Map(counts.map((c) => [c._id, c.count]));
    return docs.map((d) => toAdminCategory(d, map.get(d.name) ?? 0));
  }

  async create(dto: CreateCategoryDto) {
    const doc = await this.categoryModel.create({
      name: dto.name.trim(),
      slug: dto.slug.toLowerCase().trim(),
    });
    return toAdminCategory(doc, 0);
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const doc = await this.categoryModel
      .findByIdAndUpdate(
        id,
        {
          ...(dto.name ? { name: dto.name.trim() } : {}),
          ...(dto.slug ? { slug: dto.slug.toLowerCase().trim() } : {}),
        },
        { new: true },
      )
      .exec();
    if (!doc) throw new NotFoundException('Category not found');
    const count = await this.productModel.countDocuments({ category: doc.name });
    return toAdminCategory(doc, count);
  }

  async remove(id: string) {
    const doc = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!doc) throw new NotFoundException('Category not found');
    return { ok: true };
  }

  count() {
    return this.categoryModel.countDocuments().exec();
  }
}
