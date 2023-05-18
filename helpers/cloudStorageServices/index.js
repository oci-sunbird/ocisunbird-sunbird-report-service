
/**
 * @file        - Entry file referencing Storage Service
 * @description - Entry file referencing Storage Service
 * @exports     - `AzureStorageService`, `AWSStorageService` and `GoogleStorageService`
 * @author      - RAJESH KUMARAVEL
 * @since       - 5.0.0
 * @updated     - 5.0.0
 * @version     - 1.0.0
 */

const cloudService  = require('client-cloud-services');
const { envVariables } = require('../envHelpers');
const cloudProvider = envVariables.sunbird_cloud_storage_provider;

/**
 * Based on Environment Cloud Provider value
 * Export respective Storage Service
 */
if (!cloudProvider) throw new Error("Cloud Storage Service - Provider is not initialized");
switch (cloudProvider) {
  case 'azure':
    let azureConfig = {
      identity: envVariables.sunbird_azure_account_name,
      credential: envVariables.sunbird_azure_account_key,
      reportsContainer: envVariables.sunbird_azure_report_container_name,
      labelsContainer: envVariables.sunbird_azure_resourceBundle_container_name
    };
    let azureClient = cloudService.init('azure');
    const azureStorage = new azureClient(azureConfig);
    exports.CLOUD_CLIENT = azureStorage;
    break;
  case 'aws':
    let awsConfig = {
      identity: envVariables.sunbird_aws_access_key,
      credential: envVariables.sunbird_aws_secret_key,
      region: envVariables.sunbird_aws_region,
      containerName: envVariables.sunbird_aws_bucket_name,
      reportsContainer: envVariables.sunbird_aws_reports,
      labelsContainer: envVariables.sunbird_aws_labels
    };
    let awsClient = cloudService.init('aws');
    const awsStorage = new awsClient(awsConfig);
    exports.CLOUD_CLIENT = awsStorage;
    break;
  case 'gcloud':
    let gcpConfig = {
      identity: envVariables.sunbird_gcloud_client_email,
      credential: envVariables.sunbird_gcloud_private_key,
      projectId: envVariables.sunbird_gcloud_projectId,
      containerName: envVariables.sunbird_gcloud_bucket_name,
      reportsContainer: envVariables.sunbird_gcloud_reports,
      labelsContainer: envVariables.sunbird_gcloud_labels
    };
    let gcpClient = cloudService.init('gcloud');
    const gcpStorage = new gcpClient(gcpConfig);
    exports.CLOUD_CLIENT = gcpStorage;
    break;
/* add support for OCI as cloud provider */
  case 'oci':
    let ociConfig = {
      identity: envHelper.sunbird_oci_access_key,
      credential: envHelper.sunbird_oci_secret_key,
      containerName: envHelper.sunbird_oci_bucket_name,
      endpoint: envHelper.sunbird_oci_endpoint,
      region: envHelper.sunbird_oci_region,
      reportsContainer: envHelper.sunbird_oci_reports,
      labelsContainer: envHelper.sunbird_oci_labels
    };
    let ociClient = cloudService.init('oci');
    const ociStorage = new ociClient(ociConfig);
    exports.CLOUD_CLIENT = ociStorage;
    break;
  default:
    throw new Error("Cloud Storage Service - Provider is not initialized or supported");
    break;
}
