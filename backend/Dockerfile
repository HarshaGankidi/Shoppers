# Multi-stage build for backend
FROM maven:3.9.6-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests -q

FROM openjdk:17
WORKDIR /app
COPY --from=build /app/target/shoppers-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]