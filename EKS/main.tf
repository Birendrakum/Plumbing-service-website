module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "eks-vpc"
  cidr = "10.0.0.0/16"

  azs = ["us-east-1a", "us-east-1b", "us-east-1c"]
  public_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  private_subnets = ["10.0.10.0/24", "10.0.11.0/24", "10.0.12.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = true

  tags = {
    Name = "eks-vpc"
  }
}

module "eks" {
  source = "terraform-aws-modules/eks/aws"
  version = "20.13.1"

  cluster_name = var.cluster_name
  cluster_version = "1.27"
  subnet_ids = module.vpc.private_subnets
  vpc_id = module.vpc.vpc_id

  enable_irsa = true
  cluster_endpoint_public_access = true

  eks_managed_node_groups = {
    default {
      desired_capacity = 2
      max_capacity = 3
      min_capacity = 1
      instance_types = ["t3.medium"]
    }
  }
}