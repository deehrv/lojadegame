import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Categoria } from "src/entities/categoria.entities";
import { CategoriaService } from "../service/categoria.service";


@Controller("/Categoria")
export class CategoriaController{
    constructor(private readonly CategoriaService: CategoriaService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categoria[]>{
        return this.CategoriaService.findAll()
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id',ParseIntPipe) id:number): Promise<Categoria>{
        return this.CategoriaService.findById(id)
    }

    @Get('/selecionado/:selecionado')
    @HttpCode(HttpStatus.OK)
    findBySelecionado(@Param('selecionado')selecionado:string): Promise<Categoria[]>{
        return this.CategoriaService.findBySelecionado(selecionado)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() Categoria:Categoria): Promise<Categoria>{
        return this.CategoriaService.create(Categoria)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() Categoria: Categoria): Promise<Categoria>{
        return this.CategoriaService.update(Categoria)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.CategoriaService.delete(id)
    }
}