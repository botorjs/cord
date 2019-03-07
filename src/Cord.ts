import { Boot, TypeContainer } from '@botorjs/boot';
import { ConfigCord } from './ConfigCord';
import { App } from './App';
import * as path from 'path';
import { Env } from './Env';


/**
 *  Cord is backgroud connect to component
 * 
 */
export class Cord {
    private _boot: Boot;
    private _config: ConfigCord;
    private _app_config: App;
    private _env: Env;

    /**
     *  contructor object cord with config, if config default is null, when it will create config default
     *  
     * @param config config corder
     */
    constructor(config: ConfigCord = null) {
        this._boot = new Boot();
        if(config == null) {
            this._config = new ConfigCord();
        } else {
            this._config = config;
        }
    }

    /**
     * call event to system notification start application
     */
    public fire(): Cord {
        this._boot.hook.emit("start");
        return this;
    }

    /**
     * get Boot
     */
    public get boot(): Boot {
        return this._boot;
    }

    /**
     *  Preload application, it will load the ServiceProvider to Boot and load Alisa to boot
     *  Load environment and file .env (defaul config) to Env and add to IoC of Boot
     */
    public preload(): Cord {
        this._env = new Env(this._config);
        this._boot.ioc.singleton(Env.name, this._env as any, TypeContainer.Contant);
        this._boot.alias.add(Env, Env.name);
        this._boot.ioc.singleton("ROOT", this._config.root as any);
        const file_app = path.join(this._config.root, this._config.start_folder, this._config.app_file);
        var app = require(file_app);
        this._app_config = app as App;
        this._boot.loader.add(this._app_config.providers);
        for(var key of Object.keys(this._app_config.aliases)) {
            this._boot.alias.add(key, this._app_config.aliases[key]);
        }
        this._boot.preload();
        return this;
    }

    /**
     *  set folder root of appliction
     * 
     * @param root folder root of application
     */
    public root(root: string): Cord {
        this._config.root = root;
        return this;
    }

    /**
     * get config cord
     */
    public get config(): ConfigCord {
        return this._config;
    }
}