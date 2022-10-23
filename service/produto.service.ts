import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "src/entities/produto.entities";
import { DeleteResult, ILike, Repository } from "typeorm";


@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private ProdutoRepository: Repository<Produto>
    ){}

//Get All
    async findAll(): Promise <Produto[]>{
        return await this.ProdutoRepository.find({
            relations:{
                categoria: true
            }
        })
       }

//Get ID
    async findByID(id:number): Promise<Produto>{
        let produto = await this.ProdutoRepository.findOne({
            where: {id},
            relations:{
                categoria: true
            }
        })
        if (!produto)
            throw new HttpException('Produto Inexistente',HttpStatus.NOT_FOUND)

            return produto
    }

//Get Marca
    async findByMarca(marca:string): Promise<Produto[]>{
        return await this.ProdutoRepository.find({
            where: {
                marca: ILike(`%${marca}%`)
            }
        })
    }
    

//Post
    async create(produto:Produto): Promise<Produto>{
        return this.ProdutoRepository.save(produto)
    }

//Put
    async update(produto:Produto): Promise<Produto>{
        let buscarProduto = await this.findByID(produto.id)

        if(!buscarProduto || !produto.id)
        throw new HttpException('Produto Inexistente',HttpStatus.NOT_FOUND)

        return await this.ProdutoRepository.save(produto)
    }

//Delet
    async delete(id:number): Promise<DeleteResult>{
        let buscarProduto = await this.findByID(id)

        if(!buscarProduto)
            throw new HttpException('Produto Inexistente',HttpStatus.NOT_FOUND)

            return await this.ProdutoRepository.delete(id)
    }
}