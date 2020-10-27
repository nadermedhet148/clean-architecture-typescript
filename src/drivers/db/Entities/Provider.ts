import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Product } from "./Product";
import { ProductProvider } from "./ProudctProvider";

@Entity()
export class Provider extends BaseEntity {
  @PrimaryGeneratedColumn()
  id;

  @Column("varchar")
  name: string;

  @OneToMany(
    (type) => ProductProvider,
    (productProvider) => productProvider.provider
  )
  products: Product[];
}
