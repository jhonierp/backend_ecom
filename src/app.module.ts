import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './subcategory/subcategory.module';
import { ProductModule } from './product/product.module';
import { SpecificationTypeModule } from './specification-type/specification-type.module';
import { SpecificationModule } from './specification/specification.module';
import { TitleModule } from './title/title.module';
import { ProductSpecificationModule } from './product-specification/product-specification.module';

@Module({
  imports: [
    SharedModule.forRoot(),
    AuthModule,
    UsersModule,
    CategoryModule,
    SubCategoryModule,
    ProductModule,
    SpecificationTypeModule,
    SpecificationModule,
    TitleModule,
    ProductSpecificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
