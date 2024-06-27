/* Define a variable for the GCP project ID */
variable "project_id" {
  description = "The GCP project ID"
  type        = string
}

/* Define a variable for the GCP region */
variable "region" {
  description = "The GCP region"
  type        = string
  default     = "us-central1"
}

/* Define the email */
variable "account_id" {
  description = "The Service account ID"
  type        = string
  default = "service-account"
}


