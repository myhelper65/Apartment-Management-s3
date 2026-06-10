# ==========================================
# STAGE 1: BUILD
# ==========================================
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests -B

# ==========================================
# STAGE 2: PRODUCTION RUN
# ==========================================
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Güvenlik ve Sistem Paketleri
RUN apk add --no-cache tzdata curl

# Non-root Kullanıcı
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=build /app/target/*.jar app.jar

# Dosya İzinleri (Sadece Okuma)
RUN chown appuser:appgroup app.jar && chmod 400 app.jar

USER appuser

# JVM Optimizasyonları
ENV JAVA_OPTS="-Xms256m -Xmx512m -XX:+UseG1GC -XX:+TieredCompilation -XX:TieredStopAtLevel=1 -Djava.security.egd=file:/dev/./urandom"

EXPOSE 8080

# Sağlık Kontrolü
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]