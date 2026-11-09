# Wakatobi Resort Logistics and 3D Bin Packing System

This project is a logistics management application designed for **Wakatobi Resort**. It helps the resort organize cargo data, transportation capacity, and item distribution for shipments to a remote island destination.

The system combines normal logistics administration with an AI-assisted **three-dimensional bin packing model**. A reinforcement-learning service based on a **Deep Q-Network (DQN)** evaluates possible item placements and returns a packing plan containing the selected container, item orientation, and 3D coordinates.

This repository contains the Nuxt frontend. It communicates with a separate backend and DQN prediction service at `http://localhost:8080/api/v1`; the model training and backend source code are not included here.

## Project purpose

Wakatobi Resort depends on carefully planned transportation because supplies must travel to an island location. Cargo can differ in size, weight, durability, urgency, expiry date, storage requirements, and allowed orientation. A manual packing process can leave unused space, overload a vehicle, or place fragile and urgent items poorly.

This application provides one place for logistics staff to:

- Record goods and their physical or operational properties
- Register available aircraft, vessels, vehicles, or other containers
- Prepare logistics data for the packing model
- Ask the DQN service to calculate a 3D placement plan
- Inspect model reward, utilization, success rate, and placement results
- Save approved placements as distribution records
- Maintain traceability between each item and its assigned transportation unit

The goal is to support safer, more consistent, and space-efficient cargo planning. The AI recommendation assists staff; operational constraints and final shipment approval should still be checked by a responsible user.

## Why 3D bin packing?

Three-dimensional bin packing assigns rectangular items to one or more containers. For every item, the model must decide:

1. Which transportation bin or container should hold it
2. Which allowed orientation should be used
3. Where it should be placed on the `x`, `y`, and `z` axes
4. Whether the placement fits inside the container without conflicting with other items

The application supplies item dimensions and operational attributes such as weight, expiry, urgency, and durability. The prediction response supplies the chosen bin, orientation, final dimensions, and placement coordinates. These values can then be stored as a distribution plan.

## DQN reinforcement-learning integration

A Deep Q-Network is a reinforcement-learning method that learns to select actions from a representation of the current environment. In this project, the environment represents the current packing state and an action represents a possible placement decision.

At a high level, the integration follows this process:

```text
Logistics records or CSV
          ↓
Data preparation in the AI page
          ↓
POST /api/v1/predict
          ↓
DQN-based 3D bin-packing service
          ↓
Reward, utilization, success rate, and placements
          ↓
User review and saved distribution records
```

The frontend does not train the DQN. It prepares input, calls the prediction endpoint, presents the returned metrics, and converts approved placement results into application records.

The expected prediction response includes:

- `reward`: the final reward returned for the packing run
- `reward_history`: reward values across the model's decision steps
- `cumulative_reward`: accumulated reward used by the chart
- `utilization_history`: container utilization during prediction
- `placement_success_rate`: percentage or ratio of items successfully placed
- `placements`: the final item-placement instructions

Each placement contains the item barcode, selected bin, container dimensions, orientation, final item dimensions, 3D coordinates, weight, expiry information, urgency, and durability.

> The exact DQN state representation, action space, reward function, neural-network architecture, training data, and model checkpoints belong to the external AI service and should be documented in that service's repository.

## Main features

### Logistics management

- Create, view, edit, and delete logistics records
- Store item identity, barcode, category, dimensions, volume, weight, and density
- Store fragility, stackability, orientation flexibility, durability, and packaging
- Track production date, expiry date, shelf life, and days to expiry
- Track origin, destination, distance, ETA, shipment urgency, and customer priority
- Store value, insurance, transport cost, storage cost, temperature, and humidity
- Mark supported land, sea, and air transport modes

### Transportation management

- Create, view, edit, and delete transportation records
- Store the transportation identity, name, and type
- Define container length, width, and height
- Define maximum weight and fuel capacity

### AI packing workflow

- Upload logistics input as a CSV file
- Generate a CSV from logistics already stored in the backend
- Limit the number of records included in a prediction
- Submit data to the DQN prediction endpoint
- Display reward and packing-quality metrics
- Display every predicted item placement in a table
- Match predicted barcodes to logistics database IDs
- Save approved placements as distribution records

### Account and navigation

- Login and global protected-route checks
- Current-user profile display and update
- Logout support
- Shared public and administration layouts
- Collapsible navigation for the main operational pages

## Current project status

The following areas are implemented in the frontend:

- Authentication flow
- Logistics CRUD interfaces
- Transportation CRUD interfaces
- DQN prediction request and result presentation
- Placement-to-distribution upload
- Distribution list display
- User profile and logout

The following areas are still placeholders or incomplete:

- Schedule management uses sample rows and is not connected to an API
- Role management does not yet contain permission-management controls
- Manual distribution create and edit pages are empty placeholders
- Distribution edit and delete controls are visual only
- Model training and model-version management are outside this repository

## Technology stack

- Nuxt 3 and Vue 3
- TypeScript
- Tailwind CSS 4
- Axios
- TanStack Vue Table
- VueUse
- Papa Parse for CSV input
- Chart.js and vue-chartjs for reward visualization
- External backend API and DQN inference service

## System architecture

```text
┌──────────────────────────────┐
│ Nuxt 3 frontend              │
│                              │
│ Logistics and transport CRUD │
│ CSV preparation              │
│ Prediction result review     │
│ Distribution records         │
└──────────────┬───────────────┘
               │ HTTP / JSON / multipart CSV
               ▼
┌──────────────────────────────┐
│ Backend API                  │
│ http://localhost:8080/api/v1 │
│                              │
│ Authentication               │
│ Logistics data               │
│ Transportation data          │
│ Distribution data            │
│ DQN prediction endpoint      │
└──────────────┬───────────────┘
               │ Model inference
               ▼
┌──────────────────────────────┐
│ DQN 3D bin-packing model     │
│                              │
│ Select bin                   │
│ Select orientation           │
│ Select x, y, z placement     │
│ Return rewards and metrics   │
└──────────────────────────────┘
```

## Application workflow

1. A staff member signs in at `/login`.
2. The global middleware verifies the session through `/api/v1/me`.
3. Staff maintain the item catalog on the logistics pages.
4. Staff maintain available containers on the transportation pages.
5. On `/ai-model`, staff upload a CSV or create one from stored logistics records.
6. The frontend sends the CSV to `/api/v1/predict` as multipart form data.
7. The DQN service evaluates the packing state and returns placements and metrics.
8. Staff inspect the placement table, reward history, utilization, and success rate.
9. Approved placements are matched to logistics records by barcode.
10. The frontend saves each placement through `/api/v1/distributions`.
11. Saved assignments are visible on the distribution page.

## Main routes

| Route | Purpose |
| --- | --- |
| `/` | Wakatobi Resort service landing page |
| `/login` | Staff authentication |
| `/logistic` | Logistics inventory list |
| `/logistic/create` | Create a logistics item |
| `/logistic/:id` | Edit a logistics item |
| `/transportation` | Transportation and container list |
| `/transportation/create` | Create a transportation record |
| `/transportation/:id` | Edit a transportation record |
| `/ai-model` | Prepare data, run DQN prediction, and review placements |
| `/distribution` | View saved 3D placement assignments |
| `/employee` | View or update the current staff profile |
| `/schedule` | Schedule interface placeholder |
| `/roles` | Role-management placeholder |

## Expected backend endpoints

All paths use the `http://localhost:8080/api/v1` base URL.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/login` | Create an authenticated session |
| `POST` | `/logout` | End the current session |
| `GET`, `PUT` | `/me` | Read or update the current user |
| `GET`, `POST` | `/logistics` | List or create logistics items |
| `GET`, `PUT`, `DELETE` | `/logistics/:id` | Read, update, or delete one item |
| `GET`, `POST` | `/transportation` | List or create transportation records |
| `GET`, `PUT`, `DELETE` | `/transportation/:id` | Read, update, or delete one transportation record |
| `GET`, `POST` | `/distributions` | List or save packing placements |
| `POST` | `/predict` | Run DQN-based 3D bin-packing inference using a CSV file |

## Requirements

- Node.js 20 or newer
- npm
- Backend API running at `http://localhost:8080`
- DQN inference service connected to the backend prediction endpoint
- Backend CORS and authentication configured for the frontend origin

## Installation

Install the project dependencies:

```bash
npm install
```

The AI page also imports Papa Parse and the chart libraries. If they are not present in the current dependency installation, add them with:

```bash
npm install papaparse chart.js vue-chartjs
npm install --save-dev @types/papaparse
```

## Run locally

Start the backend and prediction service first. Then start the frontend:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production commands

```bash
# Build the production application
npm run build

# Preview the production build locally
npm run preview

# Generate static output when supported by the deployment
npm run generate
```

## CSV input

The CSV header names must match the fields read by `convertRowToLogistic` in `pages/ai-model.vue`. Important groups include:

- Identity: logistics code, name, barcode, and batch number
- Geometry: length, width, height, volume, weight, and density
- Packing behavior: fragility, stackability, orientation flexibility, and durability
- Time: production date, expiry date, remaining days, and shelf life
- Delivery: origin, destination, distance, ETA, urgency, and priority
- Environment: temperature, humidity, and packaging type
- Transport modes: land, sea, and air flags
- Cost and value: item value, insurance, storage cost, and transport cost

Keep header names and data types consistent with the backend schema. An invalid or missing value can produce an incorrect placement or cause prediction to fail.

## Project structure

```text
assets/css/       Shared Tailwind styles and landing-page animations
components/       Navigation, logistics table, and reward chart
layout/           Public and administration page shells
middleware/       Global authentication guard
models/           API response types and runtime JSON validators
pages/            Nuxt routes and operational screens
plugins/          Shared Axios API client
public/           Wakatobi images, icons, and sample documents
```

## API configuration

The API URL is currently written directly in:

- `plugins/axios.ts`
- `middleware/auth.global.ts`
- `pages/ai-model.vue`

For deployment, move it to Nuxt runtime configuration so development, testing, and production can use different services:

```ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8080/api/v1'
    }
  }
})
```

## Notes for contributors

- Treat DQN output as a recommendation until all real-world load and safety constraints are validated.
- Keep logistics barcodes unique because prediction placements are mapped back to database records by barcode.
- Keep generated model interfaces and their `typeMap` validators synchronized with backend response changes.
- Document changes to the DQN state, actions, reward function, or output schema in both the AI service and this integration guide.
- Add explicit loading, empty, validation, and error states before production deployment.
