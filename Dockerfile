# Single-stage build for backend
FROM maven:3.10.1-jdk-17
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests -q
EXPOSE 8080
CMD ["java", "-jar", "target/shoppers-backend-0.0.1-SNAPSHOT.jar"]