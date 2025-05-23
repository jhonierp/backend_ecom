import { Injectable } from '@nestjs/common';
import { CrudProductService } from '../services/crudProduct.service';
import { CreateOrUpdateProductDto } from '../dto/product.dto';
import { ProductEntity } from 'src/shared/entities/product.entity';
import { CrudSubCategoryService } from 'src/subcategory/services/crudSubCategory.service';
import { CrudImageProductService } from '../services/crudImageProduct.service';
import { ProductImageEntity } from 'src/shared/entities/ProductImage.entity';

@Injectable()
export class CrudProductUseCase {
  constructor(
    private readonly crudProductService: CrudProductService,
    private readonly crudSubcategoryService: CrudSubCategoryService,
    private readonly crudImageProductService: CrudImageProductService,
  ) {}

  async create(productDto: CreateOrUpdateProductDto): Promise<ProductEntity> {
    const subcategory = await this.crudSubcategoryService.findOne(
      productDto.subcategoryId,
    );

    const product: ProductEntity = {
      name: productDto.name,
      description: productDto.description,
      price: productDto.price,
      subcategory,
      images: [], // se agregan después
    };

    const savedProduct = await this.crudProductService.create(product);

    const images: ProductImageEntity[] = productDto.imageUrls.map((url) => ({
      url,
      product: savedProduct,
    }));

    await this.crudImageProductService.create(images);

    return savedProduct;
  }

  async findAll() {
    return await this.crudProductService.findAll();
  }

  async findOne(id: number) {
    return await this.crudProductService.findOne(id);
  }

  async update(productDto: CreateOrUpdateProductDto): Promise<ProductEntity> {
    // 1. Obtener la subcategoría
    const subcategory = await this.crudSubcategoryService.findOne(
      productDto.subcategoryId,
    );

    // 2. Cargar el producto con imágenes actuales
    const productExist = await this.crudProductService.findOne(productDto.id); // con imágenes

    // 3. Mapear las URLs nuevas a un Set para comparación rápida
    const newImageUrls = new Set(productDto.imageUrls);

    // 4. Filtrar imágenes que se deben conservar (las que ya existen y están en newImageUrls)
    const imagesToKeep = productExist.images.filter((image) =>
      newImageUrls.has(image.url),
    );

    // 5. Detectar URLs nuevas (que no están en las imágenes actuales)
    const existingImageUrls = new Set(imagesToKeep.map((img) => img.url));
    const imagesToAdd = productDto.imageUrls
      .filter((url) => !existingImageUrls.has(url))
      .map((url) => ({
        url,
        product: productExist,
      }));

    // 6. Actualizar datos básicos del producto
    productExist.name = productDto.name;
    productExist.description = productDto.description;
    productExist.price = productDto.price;
    productExist.subcategory = subcategory;

    // 7. Actualizar la colección de imágenes (mantener las que se conservan + agregar las nuevas)
    productExist.images = [...imagesToKeep, ...imagesToAdd];

    // 8. Guardar producto y cascada de imágenes (asegúrate que la entidad tenga cascade: true en imágenes)
    return await this.crudProductService.update(productExist.id, productExist);
  }

  async delete(id: number) {
    await this.crudImageProductService.deleteByProductId(id); // Eliminar imágenes primero
    return await this.crudProductService.delete(id);
  }
}
