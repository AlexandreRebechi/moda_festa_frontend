import http from "../http-common";

class ReservaDataService {

   

    async get(id){

        console.log('ReservaDataService.get: ', id);
        return await http.get('/reserva/'+id);
    }

    async list(){

        console.log('ReservaDataService.list: ');
        return await http.get(`/listreserva`);
    }

    async delete(id){

        console.log('ReservaDataService.delete: ', id);
        return await http.get(`/deletereserva/`+id);
    }

    async update(data){

        console.log('ReservaDataService.update: ', data);
        return await http.post(`/updatereserva/`, data);
    }
    
    async create(data){

        console.log('ReservaDataService.create: ', data);
        return await http.post(`/insertreserva/`, data);

    }  

}

export default new ReservaDataService();