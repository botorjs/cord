import { expect } from "chai";
import { Env } from "../src/Env";
import { ConfigCord } from "../src/ConfigCord";

var env: Env = null;
var config: ConfigCord = new ConfigCord();
config.root = __dirname;
config.env_file = "test.env";

describe('Env test', function() {

    before(function () {
        env = new Env(config);
    })

    after(function(){
        env = null;
    })

    it('get env', function() {
       var val = env.get("TEST_ENV");
       expect(val).to.eql("test");
    });

    it('set env', function() {
        env.set("TEST_ENV", "test_2");
        var val =  env.get("TEST_ENV");
        expect(val).to.eql("test_2");
     });
 
});