# Build stage: Use Maven with Eclipse Temurin JDK 21 to build the application
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy all project files into the container
COPY . .

# Build the project and skip tests to speed up the process
RUN mvn clean package -DskipTests

# Run stage: Use a lightweight Eclipse Temurin JDK 21 image to run the application
FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app

# Copy the built JAR file from the build stage to the run stage
COPY --from=build /app/target/*.jar app.jar

# Expose port 8080 for the application
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "app.jar"]
