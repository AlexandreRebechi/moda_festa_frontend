
import http from "../http-common";

class ClienteDataService {

    async authenticate(data){

        console.log('ClienteDataService.authenticate: ', data);
        const response = await http.post(`/logincliente`, data);
        return response;
    }

    async get(id){

        console.log('ClienteDataService.get: ', id);
        return await http.get('/cliente/'+id);
    }

    async list(){

        console.log('ClienteDataService.list: ');
        return await http.get(`/listcliente`);
    }

    async delete(id){

        console.log('ClienteDataService.delete: ', id);
        return await http.get(`/deletecliente/`+id);
    }

    async update(data){

        console.log('ClienteDataService.update: ', data);
        return await http.post(`/updatecliente/`, data);
    }
    
    async create(data){

        console.log('ClienteDataService.create: ', data);
        return await http.post(`/insertcliente/`, data);

    }  

}

export default new ClienteDataService();
