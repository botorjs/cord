import { Boot } from '@botorjs/boot';
import { ConfigCord } from './ConfigCord';
import { App } from './App';
import path from 'path';

export class Cord {
    private _boot: Boot;
    private _config: ConfigCord;
    private _app_config: App;

    constructor(config: ConfigCord = null) {
        this._boot = new Boot();
        if(config == null) {
            this._config = new ConfigCord();
        } else {
            this._config = config;
        }
    }

    public fire(): Cord {
        this._boot.hook.emit("start");
        return this;
    }


    public preload(): Cord {
        const file_app = path.join(this._config.root, this._config.app_file, this._config.app_file);
        var app = require(file_app);
        this._app_config = app as App;
        this._boot.loader.add(this._app_config.provivders);
        for(var key of Object.keys(this._app_config.aliases)) {
            this._boot.alias.add(key, this._app_config.aliases[key]);
        }
        this._boot.preload();
        return this;
    }

    public root(root: string): Cord {
        this._config.root = root;
        return this;
    }

    public get config(): ConfigCord {
        return this._config;
    }
}