# Cord
[![Build Status](https://travis-ci.org/botorjs/cord.svg?branch=master)](https://travis-ci.org/botorjs/cord)
[![Coverage Status](https://coveralls.io/repos/github/botorjs/cord/badge.svg?branch=master)](https://coveralls.io/github/botorjs/cord?branch=master)

### Library that core of Botorjs is connect component using [Boot](https://github.com/botorjs/boot)

# Installation
```
npm install @botorjs/cord --save
```

# Setup and Example

* Folder
```
project
└───services
│   │   Service.ts
└───providers
│   │   ProviderTest.ts
└───start
│   │   app.ts
|
│   .env
|   index.ts
```

* Service.ts
```js

    export class ServiceTest {
        private _count: number;

        constructor() {
            this._count = 0;
        }

        public get count(): number {
            return this._count
        }

        public inc() {
            this._count++;
        }

        public sub() {
            this._count--;
        }
    }

```

* ProviderTest.ts
```js

    import { ServiceProvider, Boot } from '@botorjs/boot';
    import { ServiceTest } from '../services/Service';

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

```

* app.ts
```js
    import { App } from '@botorjs/cord';
    import { ProviderTest } from '../providers/ProviderTest';

    const app: App = {
        providers: [
            ProviderTest
        ],
        aliases: {
            "APP_PATH": "ROOT",
        },
    }
    export = app;

```

* .env
```
    TEST_ENV=test
```

* index.ts
```js

    import { App, Cord } from '@botorjs/cord';


    var cord: Cord = new Cord();

    cord.boot.hook.on("start", () => {
        console.log("start work");
    })

    cord.root(__dirname)
        .preload()
        .fire();

    var service =  cord.boot.get<ServiceTest>(ServiceTest);
    expect(service.count).to.eql(1);
    service.sub();
    expect(service.count).to.eql(0);

    var env: Env = cord.boot.get<Env>(Env);
    var val =  env.get("TEST_ENV");
    expect(val).to.eql("test");
```

# API

## Cord
* Cord is backgroud connect to component

| Property   |      Description      |
|---------- |:-------------|------|
| config  |  get config cord | 
| boot |    get Boot   | 
| root(folder) | set folder root of appliction | 
| preload() | Preload application, it will load the ServiceProvider to Boot and load Alisa to boot. Load environment and file .env (defaul config) to Env and add to IoC of Boot |
| fire | call event to system notification start application |

## Env
* load config in file `.env`(default) to environment and get set environment

| Property   |      Description      |
|---------- |:-------------|------|
| get  |  get value environment | 
| set |   set value environment  | 

## ConfigCord
* load config in file `.env`(default) to environment and get set environment

| Property   |      Description      | Defaul |
|---------- |:-------------|------|------------|
| start_folder  |  Folder the file start is config input of component | "start"  |
| app_file |   sFile config provider of Boot  | "app.ts" |
| root |   Root folder of application  |  null |
| env_file |   File environment of application  | ".env" |

## App
* Config default of App

| Property   |      Description      |
|---------- |:-------------|------|
| providers  |  the ServiceProvider of Boot | 
| aliases |   the alias of Boot | 
