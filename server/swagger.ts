export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Hackathon_Ing_SUAI Document Processor API",
    version: "1.0.0",
    description: "AI-powered document processing API supporting images, PDFs, and ZIP archives",
    contact: {
      name: "Hackathon Team",
      email: "support@hackathon.example.com",
    },
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Development server",
    },
  ],
  tags: [
    {
      name: "Upload",
      description: "File upload operations",
    },
    {
      name: "Processing",
      description: "Task status and management",
    },
    {
      name: "Download",
      description: "Result download operations",
    },
  ],
  paths: {
    "/api/upload": {
      post: {
        tags: ["Upload"],
        summary: "Upload files for processing",
        description: "Upload one or more files (images, PDFs, ZIP archives) for AI processing. Returns a task ID for tracking progress.",
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  files: {
                    type: "array",
                    items: {
                      type: "string",
                      format: "binary",
                    },
                    description: "Files to upload (images, PDFs, ZIP archives)",
                  },
                },
                required: ["files"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Files uploaded successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    taskId: {
                      type: "string",
                      format: "uuid",
                      description: "Unique task identifier for tracking progress",
                    },
                    message: {
                      type: "string",
                      example: "Files uploaded successfully",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Bad request - invalid files or missing data",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          "500": {
            description: "Server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/api/status/{taskId}": {
      get: {
        tags: ["Processing"],
        summary: "Get task processing status",
        description: "Retrieve the current status and progress of a processing task",
        parameters: [
          {
            name: "taskId",
            in: "path",
            required: true,
            description: "Task ID returned from upload endpoint",
            schema: {
              type: "string",
              format: "uuid",
            },
          },
        ],
        responses: {
          "200": {
            description: "Task status retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ProcessingTask",
                },
              },
            },
          },
          "404": {
            description: "Task not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/api/tasks": {
      get: {
        tags: ["Processing"],
        summary: "Get all processing tasks",
        description: "Retrieve a list of all processing tasks (task history)",
        responses: {
          "200": {
            description: "Tasks retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/ProcessingTask",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/download/{taskId}": {
      get: {
        tags: ["Download"],
        summary: "Download processed files",
        description: "Download processed files as a ZIP archive. Only available for completed tasks.",
        parameters: [
          {
            name: "taskId",
            in: "path",
            required: true,
            description: "Task ID returned from upload endpoint",
            schema: {
              type: "string",
              format: "uuid",
            },
          },
        ],
        responses: {
          "200": {
            description: "ZIP file with processed documents",
            content: {
              "application/zip": {
                schema: {
                  type: "string",
                  format: "binary",
                },
              },
            },
          },
          "404": {
            description: "Task not found or files not available",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          "500": {
            description: "Error creating archive",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      ProcessingTask: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description: "Unique task identifier",
          },
          status: {
            type: "string",
            enum: ["pending", "processing", "completed", "failed"],
            description: "Current task status",
          },
          progress: {
            type: "number",
            minimum: 0,
            maximum: 100,
            description: "Processing progress percentage",
          },
          fileCount: {
            type: "number",
            description: "Total number of files",
          },
          processedCount: {
            type: "number",
            description: "Number of files processed so far",
          },
          originalFileName: {
            type: "string",
            nullable: true,
            description: "Original filename (if single file)",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "Task creation timestamp",
          },
          completedAt: {
            type: "string",
            format: "date-time",
            nullable: true,
            description: "Task completion timestamp",
          },
          error: {
            type: "string",
            nullable: true,
            description: "Error message if task failed",
          },
        },
        required: [
          "id",
          "status",
          "progress",
          "fileCount",
          "processedCount",
          "createdAt",
        ],
      },
      Error: {
        type: "object",
        properties: {
          error: {
            type: "string",
            description: "Error message",
          },
          message: {
            type: "string",
            description: "Detailed error description",
          },
        },
      },
    },
  },
};
