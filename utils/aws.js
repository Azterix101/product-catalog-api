const AWS = require("aws-sdk");
const { Product, Category } = require("../models");

AWS.config.update({ region: process.env.AWS_REGION });
const s3 = new AWS.S3();
const sqs = new AWS.SQS();

const queueUrl = process.env.SQS_QUEUE_URL;
const bucketName = process.env.S3_BUCKET_NAME;

async function publishCatalogChange(ownerId) {
  const params = {
    MessageBody: JSON.stringify({ owner: ownerId }),
    QueueUrl: queueUrl,
  };

  await sqs.sendMessage(params).promise();
}

async function processMessages() {
  const params = {
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 10,
    WaitTimeSeconds: 20,
  };

  const data = await sqs.receiveMessage(params).promise();
  if (data.Messages) {
    for (const message of data.Messages) {
      const body = JSON.parse(message.Body);
      const ownerId = body.owner;

      const categories = await Category.find({ owner: ownerId }).lean();
      const products = await Product.find({ owner: ownerId }).lean();

      const catalog = {
        owner: ownerId,
        catalog: categories.map((category) => ({
          category_title: category.title,
          category_description: category.description,
          items: products.filter(
            (product) => product.category.toString() === category._id.toString()
          ),
        })),
      };

      const s3Params = {
        Bucket: bucketName,
        Key: `catalogs/${ownerId}.json`,
        Body: JSON.stringify(catalog),
        ContentType: "application/json",
      };

      await s3.putObject(s3Params).promise();

      await sqs
        .deleteMessage({
          QueueUrl: queueUrl,
          ReceiptHandle: message.ReceiptHandle,
        })
        .promise();
    }
  }
}

setInterval(processMessages, 10000);

module.exports = { publishCatalogChange };
