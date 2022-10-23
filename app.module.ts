import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria.modulo';
import { Categoria } from './entities/categoria.entities';
import { Produto } from './entities/produto.entities';
import { ProdutoModule } from './produto.modulo';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host:'localhost',
      port: 3306,
      username:'root',
      password: 'debora12345',
      database: 'db_lojagame',
      entities: [Produto,Categoria],
      synchronize: true
      
    }),
    ProdutoModule,
    CategoriaModule
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}