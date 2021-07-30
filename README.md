# Quarkus, React, and automatic type generation

This is a proof of concept, not polished in any way. 
The project contains Quarkus backend that serves a REST endpoint and generates TypeScript types for the frontend. 
The frontend is using React with TypeScript and Vite.

## Run in development mode

For development mode, **run the frontend and backend separately**, starting with the backend. 

**Backend**

```
cd backend
./mvnw compile typescript-generator:generate quarkus:run
```

**Frontend**

```
cd frontend
npm install
npm run dev
```

With the development servers running, changes will get automatically deployed.

### Regereating types

Types are not yet automatically generated during development time. Run `./mvnw typescript-generator:generate` in the backend folder to re-generate.

## Production build

You can deploy the frontend and backend separately or together as a single app that serves both the frontend assets and the API. 

### As a single app

```
cd backend
./mvnw package -Pmonolith
```

You can run the built application with:

```
java -jar target/quarkus-app/quarkus-run.jar
```

### Separately

The app expects the API to be available on the same host, under `/api`. If you want to deploy it at a different URL, change the frontend code accordingly. 

Build the frontend with:

```
cd frontend 
npm run build
```

Serve the contents of `dist` on a static file server of your choice. 

Build the backend with:

```
cd backend
./mvnw package 
```

Deploy the JAR. 

You can also use the `native` profile to build a native image, see https://quarkus.io/guides/building-native-image.