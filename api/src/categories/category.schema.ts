import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

export function toAdminCategory(
  doc: CategoryDocument,
  productCount = 0,
) {
  const o = doc.toObject();
  return {
    id: String(o._id),
    name: o.name,
    slug: o.slug,
    productCount,
  };
}
