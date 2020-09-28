import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Category } from "./Category";
import { ProductProvider } from "./ProudctProvider";
import { Provider } from "./Provider";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id;

  @Column("varchar")
  name: string;

  @Column("varchar")
  image_url: string;

  @ManyToOne((type) => Category, (category) => category.products)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @OneToMany(
    (type) => ProductProvider,
    (productProvider) => productProvider.provider
  )
  providers: Provider[];
}
