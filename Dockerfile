FROM node:22-alpine AS frontend
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

FROM maven:3.9-eclipse-temurin-21 AS backend
WORKDIR /app
COPY pom.xml ./
COPY src/main/java ./src/main/java
COPY src/main/resources ./src/main/resources
COPY --from=frontend /frontend/dist ./src/main/resources/static
RUN mvn -B -DskipTests package

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=backend /app/target/civic-issue-management-0.0.1-SNAPSHOT.jar ./app.jar
USER 10001
CMD ["java", "-jar", "app.jar"]
