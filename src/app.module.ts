import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './subcategory/subcategory.module';

@Module({
  imports: [
    SharedModule.forRoot(),
    AuthModule,
    UsersModule,
    CategoryModule,
    SubCategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
