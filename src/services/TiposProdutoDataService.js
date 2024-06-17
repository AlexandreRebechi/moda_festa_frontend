import http from "../http-common";

class TiposProdutoDataService {

    async get(id){

        console.log('TipoProdutoDataService.get: ', id);
        return await http.get('/tiposproduto/'+id);
    }

    async list(){

        console.log('TipoProdutoDataService.list: ');
        return await http.get(`/listtipoproduto`);
    }

    async delete(id){

        console.log('TipoProdutoDataService.delete: ', id);
        return await http.get(`/deletetiposproduto/`+id);
    }

    async update(data){

        console.log('TipoProdutoDataService.update: ', data);
        return await http.post(`/updatetiposproduto/`, data);
    }
    
    async create(data){

        console.log('TipoProdutoDataService.create: ', data);
        return await http.post(`/inserttiposproduto/`, data);

    }  

}

export default new TiposProdutoDataService();