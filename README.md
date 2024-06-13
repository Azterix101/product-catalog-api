# Product Catalog API

This is a product catalog management API built with Node.js, Express, and MongoDB. It uses AWS S3 for storing catalog JSON files and AWS SQS for handling catalog change notifications.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/product-catalog-api.git
   cd product-catalog-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following content:
   ```env
   PORT=3000
   MONGO_URI=your_mongo_connection_string
   SQS_QUEUE_URL=your_sqs_queue_url
   S3_BUCKET_NAME=your_s3_bucket_name
   AWS_ACCESS_KEY_ID=your_aws_access_key_id
   AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
   AWS_REGION=us-east-1
   ```

4. Start the application:
   ```bash
   npm start
   ```

## API Endpoints

### Product Routes

- `POST /products`: Create a new product.
- `PUT /products/:id`: Update a product.
- `DELETE /products/:id`: Delete a product.
- `GET /products/:id`: Get a product by ID.

### Category Routes

- `POST /categories`: Create a new category.
- `PUT /categories/:id`: Update a category.
- `DELETE /categories/:id`: Delete a category.
- `GET /categories/:id`: Get a category by ID.

### Catalog Route

- `GET /catalog/:ownerId`: Get the catalog JSON for an owner.

## AWS Configuration

- Ensure you have an S3 bucket and SQS queue set up in AWS.
- Update the `.env` file with your AWS credentials and resource details.

## Running the SQS Consumer

The consumer for processing SQS messages is automatically started when the server is running.
