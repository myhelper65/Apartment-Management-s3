package com.apartmentmanager.apartmentmanager.exceptions;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 1. Handle our custom Not Found Exception
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Object> handleResourceNotFound(ResourceNotFoundException ex) {
        return buildErrorResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    // 2. Handle AWS S3 & File Processing Errors
    @ExceptionHandler({S3Exception.class, IOException.class})
    public ResponseEntity<Object> handleS3AndIOExceptions(Exception ex) {
        // We log the real error but send a safe message to the user
        System.err.println("S3/IO Error: " + ex.getMessage());
        return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "File storage service is currently unavailable. Please try again later.");
    }

    // 3. Handle File Size Exceeded (e.g. User uploads a 50MB file)
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<Object> handleMaxSizeException(MaxUploadSizeExceededException ex) {
        return buildErrorResponse(HttpStatus.PAYLOAD_TOO_LARGE, "One or more files exceed the maximum allowed size (15MB).");
    }

    // 4. Handle PostgreSQL Database Errors (Connection lost, Constraints violated)
    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<Object> handleDatabaseExceptions(DataAccessException ex) {
        System.err.println("Database Error: " + ex.getMessage());
        return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "A database error occurred while saving your data.");
    }

    // 5. Catch-All for any other unexpected bugs/crashes
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGlobalException(Exception ex) {
        ex.printStackTrace(); // Print to console for debugging
        return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected system error occurred.");
    }

    // Helper method to format the JSON response nicely for the frontend
    private ResponseEntity<Object> buildErrorResponse(HttpStatus status, String message) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", status.value());
        body.put("error", status.getReasonPhrase());
        body.put("message", message);
        return new ResponseEntity<>(body, status);
    }
}