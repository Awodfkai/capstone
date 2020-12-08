import boto3, botocore
from .config import Config

S3_KEY = Config.S3_KEY
S3_SECRET = Config.S3_SECRET
S3_BUCKET = Config.S3_BUCKET

s3 = boto3.client(
  "s3",
  aws_access_key_id=S3_KEY,
  aws_secret_access_key=S3_SECRET
)

def upload_file_to_s3(file, bucket_name=S3_BUCKET, acl="private"):
  print("bucket_name: ", bucket_name)
  try:
    s3.upload_fileobj(
      file,
      bucket_name,
      file.filename,
      ExtraArgs={
        "ACL": acl,
        "ContentType": file.content_type
      }
    )
  except Exception as e:
    print("Something Happened While Uploading to AWS: ", e)
    return e
  return "{}{}".format(Config["S3_LOCATION"], file.filename)

def getUploads():
  return s3.list_objects(Bucket=S3_BUCKET)