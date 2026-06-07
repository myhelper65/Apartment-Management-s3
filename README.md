Here is a professional, complete, and production-ready `README.md` for your project. It cleanly documents the architecture, data flows, technology stack, environment configurations, API references, and deployment execution scripts.

---

# Property & Apartment Management Ecosystem

A responsive full-stack application built to seamlessly track multi-family communities, organize apartment units, manage work orders (items), and process operational maintenance invoices. The application runs as a completely localized, multi-container Docker architecture, abstracting infrastructure burdens away from end consumers.

---

## 🏗️ Architecture & Core System Flows

The application follows a modern cloud-native decouple-and-persist pattern:

```text
  [ Frontend Client ] ───────( REST HTTP / JSON )───────► [ Spring Boot API ]
   React 18 + Tailwind                                         │          │
                                                               │          │
                            ( Metadata Persistence )           │          │ ( Multipart Stream )
                                                               ▼          ▼
                                                       [(PostgreSQL)]   [ AWS S3 ]

```

### 1. Unified Client Flow

The client-side interface operates via a lightweight, stateful Single Page Application (SPA). It dynamically shifts state through a hierarchy tree (`Community ──► Apartment ──► Work Orders / Items`). Actions such as updating work order status trigger instant backend synchronization and update the UI locally using optimistic UI adjustments.

### 2. Multi-Part Asset Upload Flow

When a user adds an item containing receipt images or documents:

1. The client constructs a multi-part `FormData` stream.
2. The Spring Boot backend accepts the stream, isolates binary attachments, and pipes files directly to an **AWS S3 bucket** folder setup partitioned by hierarchy (`communityName/apartmentId/...`).
3. S3 returns a unique file tracking key. The backend calculates the absolute content access URL, links it to the asset record, and commits the transaction to **PostgreSQL**.

---

## 🛠️ Technology Stack

* **Frontend:** React 18 Engine (UMD compilation via Babel), Tailwind CSS UI Engine.
* **Backend Core:** Java 21 (Eclipse Temurin JVM Base), Spring Boot 3.x, Spring Data JPA.
* **Database Layer:** PostgreSQL 15 Relational Database (Alpine Image Core).
* **Object Storage:** AWS SDK v2 for S3 Blob Storage Management.
* **Orchestration:** Docker Engine & Docker Compose (Optimized Multi-Stage Builds).

---

## 📦 Data Schema Structure

The application's relational graph maps data down a structural tree with strict cascading controls:

* **Community Entity:** Represents a managed property complex (e.g., "Victory Lakes"). Holds a one-to-many relationship mapping down to unit apartments.
* **Apartment Entity:** Represents an individual physical unit (e.g., "A2", "H3"). Tracks work-order associations mapped directly via string-based primary identification keys.
* **ApartmentItem Entity:** Tracks individual maintenance tasks, inventory purchases, or work invoices. Contains properties for `title`, `price`, `date`, `notes`, `status` (`Todo`, `In Progress`, `Complete`), `productImageUrl`, and `invoiceImageUrl`.

---

## 🚀 Local Prerequisites

Consumers only require one global dependency installed to spin up and view this entire infrastructure ecosystem locally:

* [Docker Desktop (with Compose Engine)](https://www.docker.com/products/docker-desktop/)

---

## ⚙️ Configuration & Environment Variables

The stack reads settings dynamically using runtime architecture variables. To provision infrastructure pipelines, open your `docker-compose.yml` file and supply operational values for the cloud layer under the `app` service environment properties:

```yaml
# Inside docker-compose.yml
- AWS_BUCKET_NAME=your-actual-s3-bucket-name
- AWS_REGION=us-east-1
- AWS_ACCESS_KEY_ID=your_aws_access_key_here
- AWS_SECRET_ACCESS_KEY=your_aws_secret_key_here

```

*Note: Database connectivity, containerized network bindings, credentials, and memory buffer boundaries are completely pre-configured out of the box.*

---

## 💻 Orchestration & Operation Commands

Execute these operational commands within the root directory (where `docker-compose.yml` and `Dockerfile` are stored):

### Spin Up the Application Stack

Triggers cached dependency checks, compiles Java code natively under SDK 21, links internal storage containers, checks health validations, and spawns the ecosystem:

```bash
docker compose up --build

```

### Stop the Infrastructure Environment

Shuts down processing containers safely while maintaining persistent database storage inside your safe local volume scope:

```bash
docker compose down

```

### Clean Rebuild of the Environment

Forces Maven to re-verify dependencies offline and ignores previously saved image cache blocks:

```bash
docker compose build --no-cache

```

Once running, the application can be accessed instantly by navigating to your local port layer:
👉 **`http://localhost:8080`**

---

## 📑 API Reference & Endpoints

All ecosystem API request interactions utilize standard JSON structures or Multi-part Request payload streams:

### 🏙️ Community Control Controller

| Method | Endpoint | Description | Payload |
| --- | --- | --- | --- |
| `GET` | `/api/communities` | Fetches the complete relational data tree. | None |
| `POST` | `/api/communities` | Provisions a new Community instance. | JSON Body |
| `POST` | `/api/communities/{id}/apartments` | Adds a new unit Apartment into a targeted Community tracking node. | JSON Body |
| `DELETE` | `/api/communities/{id}` | Purges a community, cascading deletion to all nested elements. | None |

### 🚪 Apartment Unit Controller

| Method | Endpoint | Description | Payload |
| --- | --- | --- | --- |
| `GET` | `/api/apartments` | Lists all indexed apartment unit keys globally. | None |
| `POST` | `/api/apartments` | Registers a raw apartment identity node. | JSON Body |
| `DELETE` | `/api/apartments/{id}` | Drops unit mappings. | None |

### 🛠️ Work Order & Maintenance (Item) Controller

| Method | Endpoint | Description | Payload |
| --- | --- | --- | --- |
| `POST` | `/api/apartments/{apartmentId}/items` | Creates a work order item, streams multi-part documents to AWS S3, and links database relationships. | `Multipart/Form-Data` |
| `PUT` | `/api/items/{itemId}/status` | Updates the status state string (`Todo`, `In Progress`, `Complete`) for an item. | Query Parameter (`?status=`) |
| `DELETE` | `/api/items/{id}` | Deletes a work order and drops metadata hooks. | None |

---

## ⚡ Performance Optimizations Implemented

This software distribution layout includes advanced configurations built to enhance pipeline efficiency:

1. **Dependency Stratification:** The `Dockerfile` separates the dependency verification layer (`pom.xml`) from active code development. Code updates re-compile in seconds without downloading external JAR files again.
2. **JVM Optimization Tuning:** The execution layer injects `-XX:+TieredCompilation -XX:TieredStopAtLevel=1` directly into runtime operations, speeding up Spring Boot container startup times.
3. **Database Health Validation Hooks:** The API engine container uses `condition: service_healthy` rules to wait for PostgreSQL's internal `pg_isready` query test before launching, preventing startup runtime errors.
4. **PostgreSQL RAM Optimization:** Embedded database parameters bypass container resource limitations, increasing query caching pools via optimized allocation settings (`shared_buffers=256MB`).