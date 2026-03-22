import { google } from "googleapis";
import { Readable } from "stream";

// ─── Custom Errors ───────────────────────────────────────────────────────────

export class GoogleDriveNotConfiguredError extends Error {
  constructor() {
    super("Google Drive service account is not configured");
    this.name = "GoogleDriveNotConfiguredError";
  }
}

export class GoogleDriveUploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GoogleDriveUploadError";
  }
}

// ─── Auth ────────────────────────────────────────────────────────────────────

/**
 * Get a Google Drive-scoped auth client.
 * Uses `drive.file` scope — only allows access to files created by or
 * explicitly shared with the service account.
 *
 * Throws GoogleDriveNotConfiguredError if GOOGLE_SERVICE_ACCOUNT is missing.
 */
function getDriveAuth() {
  const creds = process.env.GOOGLE_SERVICE_ACCOUNT;
  if (!creds) {
    throw new GoogleDriveNotConfiguredError();
  }

  const parsed = JSON.parse(creds) as {
    client_email: string;
    private_key: string;
  };

  return new google.auth.JWT({
    email: parsed.client_email,
    key: parsed.private_key,
    scopes: ["https://www.googleapis.com/auth/drive.file"],
  });
}

// ─── Upload ──────────────────────────────────────────────────────────────────

/**
 * Upload a file to a specific Google Drive folder.
 *
 * @param folderId - Google Drive folder ID to upload into
 * @param fileName - Name for the uploaded file (e.g., "bank-statement-20260322T154500Z.csv")
 * @param content  - File content as a Buffer
 * @param mimeType - MIME type (e.g., "text/csv")
 * @returns The uploaded file's Google Drive file ID
 *
 * @throws GoogleDriveNotConfiguredError — when GOOGLE_SERVICE_ACCOUNT is missing
 * @throws GoogleDriveUploadError — when the upload fails for any reason
 */
export async function uploadFileToDrive(
  folderId: string,
  fileName: string,
  content: Buffer,
  mimeType: string
): Promise<string> {
  const auth = getDriveAuth();
  const drive = google.drive({ version: "v3", auth });

  try {
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [folderId],
      },
      media: {
        mimeType,
        body: Readable.from(content),
      },
      fields: "id,name",
    });

    const fileId = response.data.id;
    if (!fileId) {
      throw new GoogleDriveUploadError(
        "Upload completed but no file ID was returned"
      );
    }

    console.log(
      `[google-drive] uploaded "${fileName}" to folder ${folderId} (file ID: ${fileId})`
    );
    return fileId;
  } catch (error) {
    // Re-throw our own errors
    if (
      error instanceof GoogleDriveNotConfiguredError ||
      error instanceof GoogleDriveUploadError
    ) {
      throw error;
    }

    // Wrap unexpected Google API errors
    const message =
      error instanceof Error ? error.message : "Unknown upload error";
    console.error(`[google-drive] upload failed: ${message}`);
    throw new GoogleDriveUploadError(`Upload failed: ${message}`);
  }
}
