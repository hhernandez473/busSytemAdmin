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

    //put services
    put( url, body ) {
        return api.put( url, body );
    }

    //put services
    del( url ) {
        return api.delete( url );
    }

}

export default new ControlService();