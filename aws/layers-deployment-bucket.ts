import { AWS } from '@serverless/typescript';

export const LayerDeploymentBucketCF: AWS['resources']['Resources'] = {
    LayerDeploymentBucket: {
        Type: "AWS::S3::Bucket",
        Properties: {
            BucketName: "layers-dev-deployment"
        },
    }

}
