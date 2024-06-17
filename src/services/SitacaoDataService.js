import http from "../http-common";

class SitacaoDataService {


    async get(id){

        console.log('SitacaoDataService.get: ', id);
        return await http.get('/sitacao/'+id);
    }

    async list(){

        console.log('SitacaoDataService.list: ');
        return await http.get(`/listsitacao`);
    }

    async delete(id){

        console.log('SitacaoDataService.delete: ', id);
        return await http.get(`/deletesitacao/`+id);
    }

    async update(data){

        console.log('SitacaoDataService.update: ', data);
        return await http.post(`/updatesitacao/`, data);
    }
    
    async create(data){

        console.log('SitacaoDataService.create: ', data);
        return await http.post(`/insertsitacao/`, data);

    }  

}

export default new SitacaoDataService();