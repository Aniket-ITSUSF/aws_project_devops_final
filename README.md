# Color Services Monorepo

Three simple microservices (red, blue, green), each returning its color and logging hits to MySQL.

- **QA pipeline** tests only the changed service on `develop`.
- **UAT pipeline** tests all services on a release tag (`vX.Y.Z-rc`).
- **Prod pipeline** deploys on final semantic tag (`vX.Y.Z`).
