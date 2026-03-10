# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

## ADA: Web-Based Clinic Records and Medicine Inventory Management System

### Cabantian Stand Alone Senior High School

------------------------------------------------------------------------

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) document describes the
functional and non-functional requirements of the ADA (Clinic Records
and Medicine Inventory Management System). This document serves as the
official reference for developers and stakeholders.

### 1.2 Scope

ADA is a web-based, mobile-responsive system designed to:

-   Digitalize student clinic visit records
-   Manage medicine inventory in real time
-   Track student pull-outs and emergency releases
-   Generate clinic and inventory summary reports

The system replaces manual logbooks and spreadsheet-based tracking
currently used by the school clinic.

### 1.3 Intended User

The system is designed for a single user role only:

-   Clinic In-Charge (Administrator)

No teacher or principal roles are included in this version.

### 1.4 Definitions and Acronyms

-   RBAC -- Role-Based Access Control
-   UAT -- User Acceptance Testing

------------------------------------------------------------------------

## 2. Overall Description

### 2.1 Product Perspective

The system is a standalone web-based application accessible via browser.
It uses:

-   Frontend: Web-based user interface
-   Backend: Server-side API
-   Database: Relational database for storing clinic and inventory
    records

### 2.2 Product Functions

The system will:

-   Create and manage student health profiles
-   Log clinic visits with time-in and time-out
-   Automatically deduct medicine stock upon dispensing
-   Track medicine expiration and stock levels
-   Generate clinic visit summaries
-   Generate medicine usage and stock reports

### 2.3 User Characteristics

The Clinic In-Charge:

-   Has basic computer literacy
-   Is familiar with manual clinic documentation
-   Requires a simple and intuitive interface
-   Needs fast record retrieval and inventory monitoring

### 2.4 Operating Environment

-   Web browser (Chrome, Edge, Firefox)
-   Hosted server environment
-   Internet or local network access

### 2.5 Constraints

-   Must be cost-efficient
-   Must comply with Data Privacy Act of 2012
-   Must be simple and user-friendly
-   Must operate with a single authenticated user account

------------------------------------------------------------------------

## 3. Functional Requirements

### 3.1 Patient Management Module

FR-01: The system shall allow the Clinic In-Charge to create, update,
and archive student health profiles.

FR-02: The system shall log clinic visits including: - Student name -
Date - Time-in - Time-out - Health concern - Action taken - Medicine
dispensed - Remarks

FR-03: The system shall record emergency pull-outs including: - Name of
releasing guardian - Relationship to student - Timestamp of release

FR-04: The system shall allow viewing of complete visit history per
student.

------------------------------------------------------------------------

### 3.2 Medicine Inventory Module

FR-05: The system shall record stock-in transactions with: - Medicine
name - Description/purpose - Batch number (if applicable) - Expiration
date - Quantity added

FR-06: The system shall automatically deduct stock when medicine is
dispensed during visit logging.

FR-07: The system shall display low-stock alerts when quantity falls
below a predefined threshold.

FR-08: The system shall flag medicines nearing expiration (30 days
before expiration date).

FR-09: The system shall generate medicine usage reports and current
stock summaries.

------------------------------------------------------------------------

### 3.3 Reporting Module

FR-10: The system shall generate a monthly clinic visit summary report.

FR-11: The system shall generate a medicine consumption report.

FR-12: The system shall generate a low-stock report for replenishment
planning.

------------------------------------------------------------------------

## 4. Non-Functional Requirements

### 4.1 Performance

-   Record retrieval must be under 2 seconds.
-   The system must handle multiple visit entries without performance
    degradation.

### 4.2 Security

-   The system must require secure login authentication.
-   Passwords must be hashed using industry-standard encryption.
-   Access to the system is restricted to the Clinic In-Charge only.

### 4.3 Usability

-   The interface must be simple and intuitive.
-   Dropdown menus must be used where applicable to reduce manual
    typing.
-   The system must be mobile-responsive.

### 4.4 Reliability

-   The system must maintain data integrity during stock deduction and
    visit logging.
-   Data must not be lost during system errors.

### 4.5 Maintainability

-   The system must follow modular architecture.
-   Code must be documented for future updates.

------------------------------------------------------------------------

## 5. Data Requirements

### 5.1 Student Table

-   student_id (Primary Key)
-   full_name
-   grade_level
-   section
-   date_of_birth
-   gender
-   known_medical_conditions

### 5.2 Visit Table

-   visit_id (Primary Key)
-   student_id (Foreign Key)
-   date
-   time_in
-   time_out
-   complaint
-   action_taken
-   medicine_dispensed
-   remarks
-   released_to_name
-   released_to_relationship

### 5.3 Inventory Table

-   medicine_id (Primary Key)
-   medicine_name
-   description
-   batch_number
-   stock_quantity
-   expiration_date
-   reorder_threshold

------------------------------------------------------------------------

## 6. System Interfaces

### 6.1 User Interface Pages

-   Login Page
-   Dashboard
-   Student Management Page
-   Visit Logging Page
-   Inventory Management Page
-   Reports Page

### 6.2 External Interfaces

-   Web browser interface only
-   No third-party integrations required for MVP

------------------------------------------------------------------------

## 7. Assumptions and Dependencies

-   The Clinic In-Charge has access to a computer or mobile device.
-   Internet access is available during system operation.
-   Existing manual records may be encoded manually into the system.

------------------------------------------------------------------------


------------------------------------------------------------------------

## 9. Approval

This document serves as the baseline requirements for the ADA system
(Clinic Records and Medicine Inventory Management only). Any changes
must be documented in the change log.

------------------------------------------------------------------------

END OF DOCUMENT
