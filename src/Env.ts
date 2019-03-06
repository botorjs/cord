import * as dotenv from 'dotenv';
import * as _ from 'lodash';
import { ConfigCord } from './ConfigCord';
import * as path from 'path';

export class Env {

    private _config: ConfigCord; 

    constructor(config: ConfigCord) {
        this._config = config;
        dotenv.config({ path: path.join(this._config.root, this._config.env_file) });
    }


    /**
     * Get value for a given key from the `process.env`
     * object.
     *
     * @method get
     *
     * @param  {String} key
     * @param  {Mixed} [defaultValue = null]
     *
     * @return {Mixed}
     */
    get (key, defaultValue = null) {
        return _.get(process.env, key, defaultValue)
    }

    /**
     * Set value for a given key inside the `process.env`
     * object. If value exists, will be updated
     *
     * @method set
     *
     * @param  {String} key
     * @param  {Mixed} value
     *
     * @return {void}
     */
    public set (key, value) {
        _.set(process.env, key, value)
    }

}