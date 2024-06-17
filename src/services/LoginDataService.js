import http from "../http-common";

class LoginDataService{
    async authenticate(data){

        console.log('LoginDataService.authenticate: ', data);
        const response = await http.post(`/login`, data);
        return response;
    }

}

export default new LoginDataService();