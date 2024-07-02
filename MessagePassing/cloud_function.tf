/* Module to create a Cloud Function triggered by Pub/Sub */
resource "google_storage_bucket_object" "function_zip" {
  name   = "function.zip"
  bucket = google_storage_bucket.function_bucket.name
  source = "./function_code/function.zip"
}

resource "google_cloudfunctions_function" "complaint_function" {
  name                  = "complaintFunction"
  description           = "Function to handle and forward complaints"
  runtime               = var.function_runtime
  available_memory_mb   = var.function_memory
  source_archive_bucket = google_storage_bucket.function_bucket.name
  source_archive_object = google_storage_bucket_object.function_zip.name
  entry_point           = var.function_entry_point
  event_trigger {
    event_type = "google.pubsub.topic.publish"
    resource   = google_pubsub_topic.complaint_topic.name
  }
}

resource "google_project_iam_member" "pubsub_invoker" {
  project = var.project_id
  role    = "roles/pubsub.publisher"
  member  = "serviceAccount:${google_cloudfunctions_function.complaint_function.service_account_email}"
}

resource "google_project_iam_member" "firestore_writer" {
  project = var.project_id
  role    = "roles/datastore.user"
  member  = "serviceAccount:${google_cloudfunctions_function.complaint_function.service_account_email}"
}
