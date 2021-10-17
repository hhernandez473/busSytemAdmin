import api from './api';

class ControlService {
    //get services
    get( url ) {
        return api.get(url);
    }

    //post services
    post( url, body ) {
        return api.post( url, body );
    }

}

export default new ControlService();