export const IAMRoles = {
    AuroraRole: {
        Type: 'AWS::IAM::Role',
        Properties: {
            AssumeRolePolicyDocument: {
                Version: "2012-10-17",
                Statement: [
                    {
                        Effect: 'Allow',
                        Principal: {
                            Service: 'lambda.amazonaws.com'
                        },
                        Action: ['sts:AssumeRole']
                    }
                ]
            },
            Policies: [
                {
                    PolicyName: "EmbeddedInlinePolicy",
                    PolicyDocument: {
                        Version: "2012-10-17",
                        Statement: [
                            {
                                "Effect": "Allow",
                                "Action": [
                                    "secretsmanager:GetSecretValue",
                                    "rds-data:ExecuteSql",
                                    "rds-data:ExecuteStatement",
                                    "rds-data:BatchExecuteStatement",
                                    "rds-data:BeginTransaction",
                                    "rds-data:CommitTransaction",
                                    "rds-data:RollbackTransaction",
                                    "secretsmanager:CreateSecret",
                                    "secretsmanager:ListSecrets",
                                    "secretsmanager:GetRandomPassword"
                                ],
                                "Resource": "*"
                            }
                        ]
                    }
                }
            ],
        },
    }
};
//# sourceMappingURL=IAM-aurora.js.map