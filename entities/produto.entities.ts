import { IsNotEmpty, MaxLength } from "class-validator";
import {Entity, PrimaryGeneratedColumn,Column,ManyToOne} from "typeorm";
import { Categoria } from "./categoria.entities";

@Entity({name: "tb_produto"})
    export class Produto{
        @PrimaryGeneratedColumn()
        id: number

        @IsNotEmpty()
        @MaxLength(100)
        @Column({length:100, nullable: false})
        marca:string

        @IsNotEmpty()
        @MaxLength(100)
        @Column({length:200, nullable: false})
        modelo:string

        @IsNotEmpty()
        @MaxLength(25)
        @Column({length:50, nullable: false})
        cor:string

        //Utilização de decimal (new)
        @Column("decimal", { precision: 9, scale: 2 })
        preco: number

        //dafult como falso
        @Column({default:0})
        ativo:boolean

        @ManyToOne (() => Categoria, (categoria) => categoria.produto, {
            onDelete: "CASCADE"
        })
        categoria: Categoria 
    }