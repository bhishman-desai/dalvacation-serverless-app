/* Define the Cloud Run service using google_cloud_run_v2_service */
resource "google_cloud_run_v2_service" "dal_vacation_service" {
  name = "dal-vacation-service"

  location = var.region

  project = var.project_id

  /* Allowing direct access to the service from the internet */
  ingress = "INGRESS_TRAFFIC_ALL"

  template {
    scaling {
      /* Scaling config with min 0 and max 100 CPUs */
      min_instance_count = 0
      max_instance_count = 100
    }

    containers {
      /* Set the container image from Google Container Registry */
      image = "gcr.io/${var.project_id}/dal-vacation-service:latest"

      /* Environment Variables */
      env {
        name  = "FOO"
        value = "bar"
      }

      resources {
        /* Set the CPU limit to 1 vCPU */
        limits = {
          cpu    = "1"
          memory = "512Mi"
        }
      }
    }
  }

  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }

  /* Depends on cloud build to fetch and build image from github repo */
  depends_on = [google_cloudbuild_trigger.github_trigger]
}

/* Define a Cloud Build trigger for continuous deployment from GitHub */
resource "google_cloudbuild_trigger" "github_trigger" {
  name = "github-trigger"

  location = var.region

  /* Service Account */
  service_account = google_service_account.default.name

  /* GitHub Config */
  github {
    owner = "bhishman-desai"
    name  = "5410-Serverless"
    push {
      branch = "^main$"
    }
  }

  /* Build steps */
  build {
    step {
      /* Use Docker to build the image */
      name = "gcr.io/cloud-builders/docker"
      args = ["build", "-t", "gcr.io/${var.project_id}/dal-vacation-service:latest", "."]
      dir  = "Frontend" /* Specify the directory of the Dockerfile */
    }

    /* Specify the image to be pushed to Google Container Registry */
    images = ["gcr.io/${var.project_id}/dal-vacation-service:latest"]
  }
}

resource "google_service_account" "default" {
  account_id   = var.account_id
  project      = var.project_id
  display_name = "Service Account for project ${var.project_id}"
  description  = "This service account is used by the project ${var.project_id}"
}

