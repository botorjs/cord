import { expect } from "chai";
import { Cord } from '../src/Cord';
import { ConfigCord } from "../src/ConfigCord";
import { ServiceTest } from "./start/Service";
import { Env } from "../src/Env";

var config: ConfigCord = new ConfigCord();
config.env_file = "test.env";

var cord: Cord = null;

describe('Cord test', function() {

    before(function () {
        cord = new Cord(config);
    })

    after(function(){
        cord = null;
    })

    it('set root and get config', function() {
        cord.root(__dirname);
        var config = cord.config;
        expect(config.root).to.eql(__dirname);
    });

    it('test preload cord', function() {
        cord.preload();
        var service =  cord.boot.get<ServiceTest>(ServiceTest);
        expect(service.count).to.eql(1);
        service.sub();
        expect(service.count).to.eql(0);
    });


    it('get env', function() {
        var env: Env = cord.boot.get<Env>(Env);
        var val =  env.get("TEST_ENV");
        expect(val).to.eql("test");
    });


    it('fire cord', function() {
        cord.boot.hook.on("start", () => {
            expect(true).to.eql(true);
        })
        cord.fire();
    });

    it('cord not config', function() {
        cord = new Cord();
        expect(cord.config).to.not.eql(null);
    });
 
});