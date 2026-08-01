import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../users/user.schema';
import { Category, CategoryDocument } from '../categories/category.schema';

const DEFAULT_CATEGORIES = [
  { name: 'Fitted', slug: 'fitted' },
  { name: 'Snapback', slug: 'snapback' },
  { name: 'Dad Cap', slug: 'dad-cap' },
  { name: 'Trucker', slug: 'trucker' },
  { name: 'Limited Drops', slug: 'limited-drops' },
  { name: 'Accessories', slug: 'accessories' },
];

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private config: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async onModuleInit() {
    const email = this.config.getOrThrow<string>('ADMIN_EMAIL').toLowerCase();
    const password = this.config.getOrThrow<string>('ADMIN_PASSWORD');
    const passwordHash = await bcrypt.hash(password, 10);
    await this.userModel.findOneAndUpdate(
      { email },
      { email, passwordHash, role: 'admin' },
      { upsert: true, new: true },
    );
    this.logger.log(`Admin user ready: ${email}`);

    const catCount = await this.categoryModel.countDocuments().exec();
    if (catCount === 0) {
      await this.categoryModel.insertMany(DEFAULT_CATEGORIES);
      this.logger.log('Seeded default categories');
    }
  }
}
