import { Boot } from '@botorjs/boot';
import { ConfigCord } from './ConfigCord';
import { App } from './App';

export class Cord {
    private _boot: Boot;
    private _config: ConfigCord;
    private _app_config: App;

    public fire() {

    }


    public preload() {

    }

    public root() {
        
    }

    public get config(): ConfigCord {
        return this._config;
    }
}