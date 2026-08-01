import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug: string;

  @Prop({ default: 'REWORRKED' })
  brand: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  compareAtPrice?: number;

  @Prop({ default: 0 })
  stock: number;

  @Prop({ default: 'draft', enum: ['draft', 'published'] })
  status: 'draft' | 'published';

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: '' })
  description: string;

  @Prop({ type: [String], default: [] })
  highlights: string[];

  @Prop({
    type: [{ key: String, value: String }],
    default: [],
  })
  specifications: { key: string; value: string }[];

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ default: '' })
  seoTitle: string;

  @Prop({ default: '' })
  seoDescription: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

export function toAdminProduct(doc: ProductDocument) {
  const o = doc.toObject();
  const images = o.images ?? [];
  return {
    id: String(o._id),
    name: o.name,
    slug: o.slug,
    brand: o.brand,
    category: o.category,
    price: o.price,
    compareAtPrice: o.compareAtPrice,
    stock: o.stock,
    status: o.status,
    thumb: images[0] ?? '',
    tags: o.tags ?? [],
    description: o.description ?? '',
    highlights: o.highlights ?? [],
    specifications: o.specifications ?? [],
    images,
    seoTitle: o.seoTitle ?? '',
    seoDescription: o.seoDescription ?? '',
  };
}
