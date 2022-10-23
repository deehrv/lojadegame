import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Produto } from "src/entities/produto.entities";

import { ProdutoService } from "../service/produto.service";

@Controller("/produto")
export class ProdutoController{
    constructor(private readonly ProdutoService: ProdutoService){}

//Get All
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise <Produto[]> {
        return this.ProdutoService.findAll();
    }

//Get ID
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id',ParseIntPipe) id:number): Promise<Produto>{
        return this.ProdutoService.findByID(id)
    }

//Get Marca
    @Get('/marca/:marca')
    @HttpCode(HttpStatus.OK)
    findByTitulo(@Param('marca')marca:string): Promise<Produto[]>{
        return this.ProdutoService.findByMarca(marca)
    }

//Post
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() produto: Produto): Promise<Produto>{
        return this.ProdutoService.create(produto)
    }

//Put
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() produto: Produto): Promise<Produto>{
        return this.ProdutoService.update(produto)
    }

//Delete
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.ProdutoService.delete(id)
    }
}