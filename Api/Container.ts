class Container {
    services: object;
    
    constructor(){
        this.services = {};
    }

    service(name: string, cb: (c: Container) => object){
        Object.defineProperty(this, name, {
            get: () => {
                if(!this.services.hasOwnProperty(name)){
                    this.services[name] = cb(this);
                }

                return this.services[name];
            },
            configurable: true,
            enumerable: true
        });

        return this;
    }
}