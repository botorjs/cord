import { ServiceProvider, Boot } from '@botorjs/boot';
import { ServiceTest } from './Service';

export class ProviderTest extends ServiceProvider {
    
    register(app: Boot) {
        app.ioc.singleton(ServiceTest.name, ServiceTest)
        app.alias.add("service", ServiceTest);
    }

    boot(app: Boot) {
        const service = app.ioc.get<ServiceTest>(ServiceTest);
        service.inc();
    }
}