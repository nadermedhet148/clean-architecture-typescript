import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn, OneToMany
} from "typeorm";
import { Product } from "./Product";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id;

  @Column("varchar")
  name: string;


  @OneToMany(
    type => Product,
    product => product.category,
  )
  products : Product[];

  @ManyToOne(
    type => Category,
    product => product.parent,
  )
  @JoinColumn({ name: "parent_id" })
  parent : Category;

  
  
}
