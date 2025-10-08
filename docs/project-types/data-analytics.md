# 📊 Data & Analytics Guide

**Last updated:** 2025-10-05

## Prerequisites

- Programming fundamentals (Python or JavaScript preferred)
- Basic understanding of databases and SQL
- Familiarity with data structures and algorithms
- Understanding of statistics basics
- For advanced sections: knowledge of distributed systems and machine learning concepts
- Experience with data visualization libraries helpful

## Overview

Data and analytics applications process, analyze, and visualize data to provide insights and drive decision-making. This guide covers everything from simple dashboards to complex data pipelines and machine learning platforms.

**Complexity Levels:** 2-5
**Timeline:** 1 week - 12+ months
**Budget:** $20 - $50,000+/month

> **Note:** Pricing and service limits mentioned in this guide are subject to change. See the [Technology Matrix pricing disclaimer](../technology-matrix.md#hosting--deployment-matrix) for more details.

---

## Data Application Types

### Analytics Dashboards (Level 2-3)
**Visualize and explore data**

- Business intelligence dashboards
- Real-time monitoring
- KPI tracking
- Customer analytics
- Sales/marketing reports

### Data Pipelines (Level 3-4)
**ETL/ELT data processing**

- Data ingestion and transformation
- Real-time streaming
- Batch processing
- Data warehousing
- Event processing

### Data Science Platforms (Level 4-5)
**ML/AI and advanced analytics**

- Machine learning pipelines
- Predictive analytics
- Recommendation engines
- Computer vision
- Natural language processing

---

## Technology Stacks by Level

### Level 2: Simple Dashboard (1-2 weeks)

#### Spreadsheets + Visualization
```
Data Source: Google Sheets, Airtable
Visualization: Looker Studio (free), Tableau Public
Updates: Manual or API sync
Hosting: Cloud-based (no hosting needed)
```

**Use case:** Small teams, simple metrics

#### Low-Code Platforms
```
Tools: Retool, Bubble, AppSmith
Database: PostgreSQL, Airtable, Google Sheets
Authentication: Built-in
Hosting: Platform-provided
```

**Use case:** Internal tools, admin dashboards

### Level 3: Custom Dashboard (1-2 months)

#### Modern Stack
```
Frontend: Next.js + Recharts/Tremor
Backend: Next.js API Routes or tRPC
Database: PostgreSQL (Neon, Supabase)
Cache: Redis (Upstash)
Real-time: WebSockets or Server-Sent Events
Auth: NextAuth.js, Clerk
Hosting: Vercel, Railway
```

#### Alternative: Metabase/Superset
```
Platform: Metabase (open-source BI)
Database: PostgreSQL, MySQL, MongoDB
Deployment: Docker, Railway
Auth: Built-in or SSO
```

### Level 4: Data Pipeline (3-6 months)

#### Streaming Pipeline
```
Ingestion: Apache Kafka, AWS Kinesis, Redpanda
Processing: Apache Flink, Spark Streaming
Storage: PostgreSQL, ClickHouse, BigQuery
Cache: Redis
Orchestration: Apache Airflow, Prefect
Monitoring: Prometheus + Grafana
Hosting: Kubernetes, AWS, GCP
```

#### Batch Pipeline
```
Ingestion: Fivetran, Airbyte, custom scripts
Transformation: dbt (data build tool)
Warehouse: Snowflake, BigQuery, Redshift
Orchestration: Apache Airflow, Dagster
Visualization: Looker, Tableau, Power BI
```

### Level 5: ML Platform (6+ months)

```
Data Lake: AWS S3, Google Cloud Storage
Processing: Apache Spark, Dask
Feature Store: Feast, Tecton
ML Framework: TensorFlow, PyTorch, Scikit-learn
Model Serving: TensorFlow Serving, MLflow, Seldon
Orchestration: Kubeflow, MLflow
Monitoring: Evidently, Arize
Infrastructure: Kubernetes, GPU clusters
```

---

## Building Analytics Dashboards

### Step 1: Data Modeling

#### Define Metrics
```typescript
interface Metric {
  id: string;
  name: string;
  query: string;
  unit: string;
  format: 'number' | 'currency' | 'percentage';
}

const metrics: Metric[] = [
  {
    id: 'mrr',
    name: 'Monthly Recurring Revenue',
    query: 'SELECT SUM(amount) FROM subscriptions WHERE status = "active"',
    unit: 'USD',
    format: 'currency',
  },
  {
    id: 'active_users',
    name: 'Active Users',
    query: 'SELECT COUNT(DISTINCT user_id) FROM events WHERE created_at >= NOW() - INTERVAL 30 DAY',
    unit: 'users',
    format: 'number',
  },
];
```

#### Database Schema for Analytics
```sql
-- Events table (for tracking)
CREATE TABLE events (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID,
  event_type VARCHAR(100),
  properties JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_events_user ON events(user_id);
CREATE INDEX idx_events_type ON events(event_type);
CREATE INDEX idx_events_created ON events(created_at DESC);

-- Materialized views for performance
CREATE MATERIALIZED VIEW daily_metrics AS
SELECT
  DATE(created_at) as date,
  COUNT(DISTINCT user_id) as active_users,
  COUNT(*) as total_events,
  COUNT(*) FILTER (WHERE event_type = 'purchase') as purchases
FROM events
GROUP BY DATE(created_at);

CREATE UNIQUE INDEX ON daily_metrics(date);

-- Refresh strategy
REFRESH MATERIALIZED VIEW CONCURRENTLY daily_metrics;
```

### Step 2: Data Fetching

#### Server-Side Data Fetching (Next.js)
```typescript
// app/dashboard/page.tsx
import { sql } from '@vercel/postgres';

async function getMetrics() {
  const { rows } = await sql`
    SELECT
      (SELECT COUNT(*) FROM users WHERE created_at >= NOW() - INTERVAL '30 days') as new_users,
      (SELECT SUM(amount) FROM orders WHERE created_at >= NOW() - INTERVAL '30 days') as revenue,
      (SELECT COUNT(*) FROM orders WHERE created_at >= NOW() - INTERVAL '30 days') as orders
  `;

  return rows[0];
}

export default async function DashboardPage() {
  const metrics = await getMetrics();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard
        title="New Users"
        value={metrics.new_users}
        change="+12%"
      />
      <MetricCard
        title="Revenue"
        value={`$${metrics.revenue.toLocaleString()}`}
        change="+8%"
      />
      <MetricCard
        title="Orders"
        value={metrics.orders}
        change="+15%"
      />
    </div>
  );
}
```

#### Real-Time Data (WebSockets)
```typescript
// Server
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  const interval = setInterval(async () => {
    const metrics = await getLiveMetrics();
    ws.send(JSON.stringify(metrics));
  }, 5000); // Update every 5 seconds

  ws.on('close', () => clearInterval(interval));
});

// Client
const useRealtimeMetrics = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      setMetrics(JSON.parse(event.data));
    };

    return () => ws.close();
  }, []);

  return metrics;
};
```

### Step 3: Visualization

#### Charts with Recharts
```typescript
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function RevenueChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#8884d8"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
```

#### Modern Dashboard UI (Tremor)
```typescript
import { Card, Title, Text, Metric, AreaChart } from '@tremor/react';

export function Dashboard() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <Text>Revenue</Text>
        <Metric>$45,231</Metric>
        <Text className="text-green-500">+12.3% from last month</Text>
      </Card>

      <Card className="col-span-full">
        <Title>Revenue Over Time</Title>
        <AreaChart
          className="mt-4 h-72"
          data={chartData}
          index="date"
          categories={["Revenue"]}
          colors={["blue"]}
          valueFormatter={(value) => `$${value.toLocaleString()}`}
        />
      </Card>
    </div>
  );
}
```

---

## Data Pipeline Architecture

### ETL Process

#### Extract (Data Sources)
```typescript
// Extract from API
async function extractFromAPI() {
  const response = await fetch('https://api.example.com/data');
  return response.json();
}

// Extract from database
async function extractFromDB() {
  return await db.query('SELECT * FROM source_table WHERE updated_at > $1', [
    lastSync,
  ]);
}

// Extract from files (S3)
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

async function extractFromS3(bucket: string, key: string) {
  const s3 = new S3Client({ region: 'us-east-1' });
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  const response = await s3.send(command);

  const data = await response.Body.transformToString();
  return JSON.parse(data);
}
```

#### Transform (Data Processing)
```typescript
// Clean and transform data
function transformData(rawData: any[]) {
  return rawData
    .filter((row) => row.status === 'active')
    .map((row) => ({
      id: row.id,
      name: row.name.trim().toLowerCase(),
      email: row.email.toLowerCase(),
      revenue: parseFloat(row.revenue),
      created_at: new Date(row.created_at),
      // Enrich with calculated fields
      lifetime_value: calculateLTV(row),
      cohort: getCohort(row.created_at),
    }))
    .filter((row) => row.revenue > 0);
}

// Data validation
import { z } from 'zod';

const recordSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  revenue: z.number().positive(),
  created_at: z.date(),
});

function validateAndTransform(data: unknown[]) {
  return data
    .map((row) => {
      try {
        return recordSchema.parse(row);
      } catch (error) {
        console.error('Validation failed:', error);
        return null;
      }
    })
    .filter(Boolean);
}
```

#### Load (Data Warehouse)
```typescript
// Bulk insert to PostgreSQL
async function loadToDB(data: any[]) {
  const values = data.map((row) => [
    row.id,
    row.name,
    row.email,
    row.revenue,
    row.created_at,
  ]);

  await db.query(
    `INSERT INTO analytics.users (id, name, email, revenue, created_at)
     VALUES ${values.map((_, i) => `($${i * 5 + 1}, $${i * 5 + 2}, $${i * 5 + 3}, $${i * 5 + 4}, $${i * 5 + 5})`).join(', ')}
     ON CONFLICT (id) DO UPDATE SET
       name = EXCLUDED.name,
       email = EXCLUDED.email,
       revenue = EXCLUDED.revenue,
       updated_at = NOW()`,
    values.flat()
  );
}

// Load to BigQuery
import { BigQuery } from '@google-cloud/bigquery';

async function loadToBigQuery(data: any[]) {
  const bigquery = new BigQuery();
  const dataset = bigquery.dataset('analytics');
  const table = dataset.table('users');

  await table.insert(data);
}
```

### Orchestration (Apache Airflow)

```python
from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'data-team',
    'retries': 3,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    'daily_etl_pipeline',
    default_args=default_args,
    description='Daily ETL pipeline for analytics',
    schedule_interval='0 2 * * *',  # Run at 2 AM daily
    start_date=datetime(2025, 1, 1),
    catchup=False,
)

def extract_data(**context):
    # Extract logic
    pass

def transform_data(**context):
    # Transform logic
    pass

def load_data(**context):
    # Load logic
    pass

extract_task = PythonOperator(
    task_id='extract',
    python_callable=extract_data,
    dag=dag,
)

transform_task = PythonOperator(
    task_id='transform',
    python_callable=transform_data,
    dag=dag,
)

load_task = PythonOperator(
    task_id='load',
    python_callable=load_data,
    dag=dag,
)

extract_task >> transform_task >> load_task
```

---

## Real-Time Analytics

### Streaming with Apache Kafka

```typescript
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'analytics-app',
  brokers: ['localhost:9092'],
});

// Producer (send events)
const producer = kafka.producer();

async function trackEvent(event: AnalyticsEvent) {
  await producer.send({
    topic: 'user-events',
    messages: [
      {
        key: event.userId,
        value: JSON.stringify(event),
      },
    ],
  });
}

// Consumer (process events)
const consumer = kafka.consumer({ groupId: 'analytics-processor' });

await consumer.subscribe({ topic: 'user-events' });

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    const event = JSON.parse(message.value.toString());

    // Process event (store, aggregate, etc.)
    await processEvent(event);

    // Update real-time metrics
    await updateMetrics(event);
  },
});
```

### Stream Processing (Apache Flink/Spark)

```python
from pyspark.sql import SparkSession  # PySpark Streaming
from pyspark.sql.functions import window, col, count, avg

spark = SparkSession.builder \
    .appName("RealtimeAnalytics") \
    .getOrCreate()

events = spark.readStream \  # Read from Kafka
    .format("kafka") \
    .option("kafka.bootstrap.servers", "localhost:9092") \
    .option("subscribe", "user-events") \
    .load()

from pyspark.sql.functions import from_json  # Parse JSON
from pyspark.sql.types import StructType, StringType, TimestampType

schema = StructType() \
    .add("user_id", StringType()) \
    .add("event_type", StringType()) \
    .add("timestamp", TimestampType())

parsed = events.select(
    from_json(col("value").cast("string"), schema).alias("data")
).select("data.*")

windowed = parsed \  # Windowed aggregation
    .withWatermark("timestamp", "10 minutes") \
    .groupBy(
        window("timestamp", "5 minutes"),
        "event_type"
    ) \
    .count()

query = windowed.writeStream \  # Write to sink
    .outputMode("update") \
    .format("console") \
    .start()

query.awaitTermination()
```

---

## Machine Learning Pipelines

### Feature Engineering

```python
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

df = pd.read_csv('customer_data.csv')  # Load data

# Feature engineering
df['days_since_signup'] = (pd.Timestamp.now() - df['signup_date']).dt.days
df['avg_order_value'] = df['total_spent'] / df['order_count']
df['is_churned'] = df['last_order_date'] < (pd.Timestamp.now() - pd.Timedelta(days=90))

df = pd.get_dummies(df, columns=['country', 'plan_type'])  # Encode categoricals

scaler = StandardScaler()  # Scale features
feature_cols = ['days_since_signup', 'avg_order_value', 'order_count']
df[feature_cols] = scaler.fit_transform(df[feature_cols])

X = df.drop(['is_churned', 'user_id'], axis=1)  # Train/test split
y = df['is_churned']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
```

### Model Training & Serving

```python
from sklearn.ensemble import RandomForestClassifier  # Train model
import mlflow

mlflow.set_experiment("churn_prediction")

with mlflow.start_run():
    model = RandomForestClassifier(n_estimators=100, max_depth=10)  # Train
    model.fit(X_train, y_train)

    accuracy = model.score(X_test, y_test)  # Evaluate
    mlflow.log_metric("accuracy", accuracy)

    mlflow.sklearn.log_model(model, "model")  # Log model

from fastapi import FastAPI  # Serve predictions
import joblib

app = FastAPI()
model = joblib.load('model.pkl')

@app.post("/predict")
async def predict(features: dict):
    X = pd.DataFrame([features])
    prediction = model.predict_proba(X)[0]

    return {
        "churn_probability": float(prediction[1]),
        "retain_probability": float(prediction[0])
    }
```

---

## Data Warehouse Architecture

### Modern Data Stack

```
Sources → Fivetran/Airbyte → Snowflake/BigQuery → dbt → BI Tools
```

#### dbt Transformation
```sql
-- models/marts/customer_metrics.sql
{{
    config(
        materialized='table'
    )
}}

WITH customer_orders AS (
    SELECT
        customer_id,
        COUNT(*) as order_count,
        SUM(amount) as total_spent,
        MIN(created_at) as first_order,
        MAX(created_at) as last_order
    FROM {{ ref('orders') }}
    GROUP BY customer_id
),

customer_events AS (
    SELECT
        user_id,
        COUNT(*) FILTER (WHERE event_type = 'page_view') as page_views,
        COUNT(*) FILTER (WHERE event_type = 'add_to_cart') as cart_adds
    FROM {{ ref('events') }}
    GROUP BY user_id
)

SELECT
    u.id as customer_id,
    u.email,
    u.created_at as signup_date,
    COALESCE(o.order_count, 0) as lifetime_orders,
    COALESCE(o.total_spent, 0) as lifetime_value,
    COALESCE(e.page_views, 0) as total_page_views,
    DATEDIFF(day, o.last_order, CURRENT_DATE) as days_since_last_order,
    CASE
        WHEN o.last_order IS NULL THEN 'never_purchased'
        WHEN DATEDIFF(day, o.last_order, CURRENT_DATE) > 90 THEN 'churned'
        ELSE 'active'
    END as customer_status
FROM {{ ref('users') }} u
LEFT JOIN customer_orders o ON u.id = o.customer_id
LEFT JOIN customer_events e ON u.id = e.user_id
```

---

## Monitoring & Observability

### Metrics Collection (Prometheus)

```typescript
import { register, Counter, Histogram } from 'prom-client';

// Custom metrics
const requestCounter = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

const queryDuration = new Histogram({
  name: 'db_query_duration_seconds',
  help: 'Database query duration',
  labelNames: ['query_type'],
});

// Middleware to track requests
app.use((req, res, next) => {
  res.on('finish', () => {
    requestCounter.inc({
      method: req.method,
      route: req.route?.path || 'unknown',
      status: res.statusCode,
    });
  });
  next();
});

// Track query performance
async function executeQuery(query: string) {
  const end = queryDuration.startTimer();
  const result = await db.query(query);
  end({ query_type: 'select' });
  return result;
}

// Expose metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
```

### Visualization (Grafana)

```json
{
  "dashboard": {
    "title": "Analytics Dashboard",
    "panels": [
      {
        "title": "Request Rate",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])"
          }
        ]
      },
      {
        "title": "Query Performance",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(db_query_duration_seconds_bucket[5m]))"
          }
        ]
      }
    ]
  }
}
```

---

## Best Practices

### Data Quality
```typescript
// Data validation
function validateData(record: any) {
  const issues = [];

  if (!record.id) issues.push('Missing ID');
  if (!record.timestamp) issues.push('Missing timestamp');
  if (record.value < 0) issues.push('Invalid value');

  return {
    valid: issues.length === 0,
    issues,
  };
}

// Data freshness check
async function checkDataFreshness() {
  const latestRecord = await db.query(
    'SELECT MAX(created_at) as latest FROM events'
  );

  const ageMinutes = (Date.now() - latestRecord.latest) / 1000 / 60;

  if (ageMinutes > 30) {
    await alertDataTeam('Data pipeline may be stalled');
  }
}
```

### Performance Optimization
```sql
-- Partitioning for large tables
CREATE TABLE events (
    id BIGSERIAL,
    user_id UUID,
    event_type VARCHAR(100),
    created_at TIMESTAMP
) PARTITION BY RANGE (created_at);

CREATE TABLE events_2025_01 PARTITION OF events
    FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

-- Indexes for common queries
CREATE INDEX idx_events_user_time ON events(user_id, created_at DESC);
CREATE INDEX idx_events_type_time ON events(event_type, created_at DESC);
```

---

## Common Pitfalls

1. **No data governance** → Inconsistent, unreliable data
2. **Over-engineering** → Start simple, add complexity as needed
3. **Ignoring data quality** → Garbage in, garbage out
4. **No monitoring** → Pipelines break silently
5. **Poor performance** → Slow queries, expensive compute
6. **Security gaps** → Exposed sensitive data
7. **No documentation** → Knowledge locked in heads
8. **Vendor lock-in** → Hard to migrate

---

## Further Resources

- [Data Engineering Zoomcamp](https://github.com/DataTalksClub/data-engineering-zoomcamp)
- [dbt Documentation](https://docs.getdbt.com/)
- [Apache Airflow](https://airflow.apache.org/)
- [MLOps Guide](https://ml-ops.org/)
- [Designing Data-Intensive Applications](https://dataintensive.net/)

---

*Next: Explore [Architecture Patterns](../architecture-patterns.md) or [Security Guide](../security-guide.md)*
