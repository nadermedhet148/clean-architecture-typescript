import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Product } from "./Product";
import { Provider } from "./Provider";

@Entity()
export class ProductProvider extends BaseEntity {
  @PrimaryGeneratedColumn()
  id;

  @ManyToOne((type) => Product, (product) => product.providers)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ManyToOne((type) => Provider, (provider) => provider.products)
  @JoinColumn({ name: "provider_id" })
  provider: Provider;
  
  @Column("double")
  price: number;

  @Column("boolean")
  available: boolean;

}
