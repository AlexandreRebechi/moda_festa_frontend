
import http from "../http-common";

class PessoaDataService {

  
    async get(tipo){

        console.log('PessoaDataService.get: ', tipo);
        return await http.get('/login/'+tipo);
    }


}

export default new PessoaDataService();
