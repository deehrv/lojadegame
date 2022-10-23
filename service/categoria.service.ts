import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "src/entities/categoria.entities";
import { DeleteResult, ILike, Repository } from "typeorm";


@Injectable()
export class CategoriaService{
    constructor(
        @InjectRepository(Categoria)
        private CategoriaRepository: Repository<Categoria>
    ){}

//Get All
    async findAll(): Promise<Categoria[]>{
        return await this.CategoriaRepository.find({
            relations: {
                produto: true
            }
        })
    }

//Get ID
    async findById(id: number): Promise<Categoria> {
        let categoria = await this.CategoriaRepository.findOne({
            where: {
                id
            },
            relations: {
                produto: true
            }
        })
        if (!Categoria)
            throw new HttpException('Categoria Inexistente',HttpStatus.NOT_FOUND)

            return categoria
    }

//Get Ativo (colocado por string pois não tem find por boolean)
    async findBySelecionado(selecionado: string): Promise<Categoria[]>{
        return await this.CategoriaRepository.find({
            where: {
                selecionado: ILike(`%${selecionado}%`)
            },
            relations: {
                produto: true
            }
        })
    }

//Post
    async create(categoria: Categoria): Promise<Categoria>{
        return this.CategoriaRepository.save(categoria)
    }

//Put
    async update(categoria: Categoria): Promise<Categoria>{
        let buscarCategoria = await this.findById(categoria.id)

        if(!buscarCategoria || !categoria.id)
        throw new HttpException('Tema Não Existe',HttpStatus.NOT_FOUND)

        return await this.CategoriaRepository.save(categoria)
    }

//Deletar linha 
    async delete(id: number): Promise<DeleteResult>{
        let buscarCategoria = await this.findById(id)

        if(!buscarCategoria)
            throw new HttpException('Tema não encontrada', HttpStatus.NOT_FOUND)

            return await this.CategoriaRepository.delete(id)
    }    

}