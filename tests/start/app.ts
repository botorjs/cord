import { App } from '../../src/App';
import { ProviderTest } from './ProviderTest';

const app: App = {
    providers: [
        ProviderTest
    ],
    aliases: {
        "APP_PATH": "ROOT",
    },
}
export = app;