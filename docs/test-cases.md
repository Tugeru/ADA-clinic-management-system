# ADA Test Case Alignment and Revised Draft

## 1. Alignment Findings Table

| Current Module | Action (Keep/Rename/Merge/Split/Remove/Add) | Reason | Source file |
| --- | --- | --- | --- |
| Login / Authentication | Keep | Implemented public route and auth API are present. | apps/web/src/app/routes.tsx, apps/api/src/app.ts |
| Dashboard | Keep | Implemented top-level route and navigation item. | apps/web/src/app/routes.tsx, apps/web/src/app/components/Layout.tsx |
| Patient Records | Keep | Implemented patients routes and students API exist. | apps/web/src/app/routes.tsx, apps/api/src/app.ts |
| Clinic Visits and Medicine Dispensing | Keep | Implemented visits module with dispensing flow. | apps/web/src/app/routes.tsx, apps/api/src/app.ts |
| Inventory Management | Keep | Implemented inventory, stock-in, and medicine management routes. | apps/web/src/app/routes.tsx, apps/api/src/app.ts |
| Alerts | Remove and Merge | No standalone alerts route; alert behavior is embedded in Dashboard, Inventory, and Analytics. | apps/web/src/app/routes.tsx |
| Analytics | Keep | Implemented top-level analytics route and page. | apps/web/src/app/routes.tsx |
| Export Reports | Rename and Reposition | Export is implemented as cross-cutting CSV capability through export endpoints. | apps/api/src/routes/export.routes.ts |
| Archive / Restore | Keep | Implemented archive route and related domain scope are present. | apps/web/src/app/routes.tsx, docs/dev-guidelines/Context_Overview.md |
| User Management | Move under Settings | Implemented as Settings tab: User Accounts. | apps/web/src/app/pages/Settings.tsx |
| Change Password | Move under Settings | Implemented as Settings tab: Account and Security. | apps/web/src/app/pages/Settings.tsx |
| Audit Log | Move under Settings | Implemented as Settings tab: Audit Log. | apps/web/src/app/pages/Settings.tsx, apps/api/src/app.ts |
| Stock Movements | Add | Dedicated stock movements route exists under inventory. | apps/web/src/app/routes.tsx |
| Settings: Academic Fields | Add | Implemented as Settings tab: Academic Fields with reference data API. | apps/web/src/app/pages/Settings.tsx, apps/api/src/app.ts |

---

## 2. Revised Full Markdown Document

# ADA TEST CASE DOCUMENT (REVISED)

## Module 1: Login / Authentication

**Project Name:** ADA: A Web-Based School Clinic Management System with Patient Record Archiving and Medicine Stock Monitoring  
**Module Name:** Login / Authentication  
**Environment:** Testing  
**Created By:** [Name]  
**Date of Creation:** [Date]  
**Date of Review:** [Date]  
**Test Case ID:** ADA-LOG-001  
**Test Scenario:** Verify successful login with valid credentials and dashboard redirect.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Valid Login | User account exists and is active. User is on Login page. | 1. Enter registered email address. 2. Enter correct password. 3. Click Login. | Email: registered user email. Password: valid password. | Login succeeds and user is redirected to Dashboard. |  |  |

**Test Case ID:** ADA-LOG-002  
**Test Scenario:** Verify login failure when password is incorrect.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Invalid Password | User account exists and is active. | 1. Enter registered email address. 2. Enter incorrect password. 3. Click Login. | Email: registered user email. Password: incorrect password. | Authentication error is shown and user stays on Login page. |  |  |

**Test Case ID:** ADA-LOG-003  
**Test Scenario:** Verify required field validation on Login form.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Empty Login Fields | User is on Login page. | 1. Leave email empty. 2. Leave password empty. 3. Click Login. | Email: empty. Password: empty. | Submission is blocked and required-field validation is displayed. |  |  |

---

## Module 2: Dashboard

**Project Name:** ADA: A Web-Based School Clinic Management System with Patient Record Archiving and Medicine Stock Monitoring  
**Module Name:** Dashboard  
**Environment:** Testing  
**Created By:** [Name]  
**Date of Creation:** [Date]  
**Date of Review:** [Date]  
**Test Case ID:** ADA-DASH-001  
**Test Scenario:** Verify dashboard summary data loads after login.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Load Dashboard | User is logged in. Visits and inventory data exist. | 1. Complete Login. 2. Open Dashboard. 3. Review summary cards and recent activity. | Existing patient, visit, and medicine records. | Dashboard shows summary indicators and recent activity without load errors. |  |  |

**Test Case ID:** ADA-DASH-002  
**Test Scenario:** Verify dashboard stock and expiry alert indicators are displayed.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Dashboard Alert Indicators | At least one medicine is low in stock or near expiry. | 1. Open Dashboard. 2. Locate stock and expiry alert section. 3. Check listed items. | Medicine with stock below reorder threshold or near-expiry batch. | Dashboard displays corresponding alert indicators for affected medicines. |  |  |

---

## Module 3: Patient Records

**Project Name:** ADA: A Web-Based School Clinic Management System with Patient Record Archiving and Medicine Stock Monitoring  
**Module Name:** Patient Records  
**Environment:** Testing  
**Created By:** [Name]  
**Date of Creation:** [Date]  
**Date of Review:** [Date]  
**Test Case ID:** ADA-PAT-001  
**Test Scenario:** Verify creation of a new patient record with valid data.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Add New Patient Record | User is logged in and on Patients module. | 1. Click Add Patient. 2. Enter all required profile fields. 3. Click Save. | Valid patient profile values. | New patient record is saved and appears in Patients list. |  |  |

**Test Case ID:** ADA-PAT-002  
**Test Scenario:** Verify required-field validation when adding a patient.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Missing Required Patient Fields | User is on Add Patient form. | 1. Leave at least one required field empty. 2. Click Save. | Incomplete patient profile values. | Save is blocked and validation messages are displayed for required fields. |  |  |

**Test Case ID:** ADA-PAT-003  
**Test Scenario:** Verify patient search returns matching records.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Search Patient Record | Patient records exist. | 1. Open Patients list. 2. Enter a name keyword in search. 3. Execute search. | Search keyword: patient first or last name. | Matching patient records are listed. |  |  |

**Test Case ID:** ADA-PAT-004  
**Test Scenario:** Verify editing an existing patient record updates stored values.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Update Patient Record | Existing patient record is available. | 1. Open selected patient record. 2. Edit one field. 3. Click Save or Update. | Valid updated patient field value. | Updated value is saved and visible in patient details/list. |  |  |

---

## Module 4: Clinic Visits and Medicine Dispensing

**Project Name:** ADA: A Web-Based School Clinic Management System with Patient Record Archiving and Medicine Stock Monitoring  
**Module Name:** Clinic Visits and Medicine Dispensing  
**Environment:** Testing  
**Created By:** [Name]  
**Date of Creation:** [Date]  
**Date of Review:** [Date]  
**Test Case ID:** ADA-VIS-001  
**Test Scenario:** Verify recording a clinic visit with valid required fields.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Record Clinic Visit | Patient exists. User is on New Visit form. | 1. Select patient. 2. Enter required visit details. 3. Click Save. | Valid visit details: complaint, action taken, timestamps. | Visit record is created and appears in Visits list/history. |  |  |

**Test Case ID:** ADA-VIS-002  
**Test Scenario:** Verify required-field validation on visit form.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Missing Required Visit Details | User is on New Visit form. | 1. Leave a required visit field empty. 2. Click Save. | Incomplete visit details. | Save is blocked and validation message is displayed. |  |  |

**Test Case ID:** ADA-VIS-003  
**Test Scenario:** Verify dispensed medicines are recorded under the visit.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Dispense Medicine in Visit | Patient exists. Medicine stock is available. | 1. Open visit form. 2. Add medicine line and quantity. 3. Save visit. | Medicine ID and valid dispense quantity. | Visit details include dispensed medicine line entries. |  |  |

**Test Case ID:** ADA-VIS-004  
**Test Scenario:** Verify medicine stock is reduced after dispensing during a visit.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Deduct Stock After Dispensing | Inventory batch exists with sufficient stock. | 1. Record visit with dispensed medicine. 2. Save visit. 3. Open inventory details for same medicine. | Dispense quantity less than or equal to available stock. | Inventory stock reflects deduction and stock movement is recorded. |  |  |

**Test Case ID:** ADA-VIS-005  
**Test Scenario:** Verify guardian release details are stored for sent-home disposition.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Record Patient Release to Guardian | Visit disposition is sent-home. | 1. Select sent-home disposition. 2. Enter guardian details. 3. Save visit. | Guardian name, relationship, and release timestamp. | Guardian release fields are stored in visit record. |  |  |

---

## Module 5: Inventory Management

**Project Name:** ADA: A Web-Based School Clinic Management System with Patient Record Archiving and Medicine Stock Monitoring  
**Module Name:** Inventory Management  
**Environment:** Testing  
**Created By:** [Name]  
**Date of Creation:** [Date]  
**Date of Review:** [Date]  
**Test Case ID:** ADA-INV-001  
**Test Scenario:** Verify stock-in creates a new batch entry.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Record Stock-In | User is logged in. Medicine exists in catalog. | 1. Open Inventory Stock-In page. 2. Select medicine. 3. Enter batch, expiry, and quantity. 4. Click Save. | Valid batch number, future expiry date, positive quantity. | Stock-in is recorded and inventory quantity increases accordingly. |  |  |

**Test Case ID:** ADA-INV-002  
**Test Scenario:** Verify stock-in quantity validation rejects invalid values.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Invalid Stock Quantity | User is on stock-in form. | 1. Enter zero or negative quantity. 2. Click Save. | Quantity: 0 or negative number. | Validation error is displayed and stock-in is not saved. |  |  |

**Test Case ID:** ADA-INV-003  
**Test Scenario:** Verify adding a medicine to catalog succeeds with valid values.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Add Medicine Catalog Entry | User is on Add Medicine page. | 1. Enter required medicine details. 2. Click Save. | Name, purpose/description, and reorder threshold. | New medicine appears in active inventory catalog. |  |  |

**Test Case ID:** ADA-INV-004  
**Test Scenario:** Verify archiving a medicine removes it from active inventory list.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Archive Medicine | Active medicine exists in inventory. | 1. Select medicine in Inventory list. 2. Click Archive. 3. Confirm action. | Existing active medicine record. | Medicine is no longer shown in active inventory and becomes available in Archive view. |  |  |

**Test Case ID:** ADA-INV-005  
**Test Scenario:** Verify near-expiry and low-stock indicators appear in inventory views.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Inventory Alert Indicators | At least one batch is near expiry or one item is below reorder threshold. | 1. Open Inventory list. 2. Locate affected medicines. 3. Review status indicators. | Medicine below reorder threshold or batch nearing expiry date. | Inventory displays status indicators for low-stock or near-expiry conditions. |  |  |

---

## Module 6: Stock Movements

**Project Name:** ADA: A Web-Based School Clinic Management System with Patient Record Archiving and Medicine Stock Monitoring  
**Module Name:** Stock Movements  
**Environment:** Testing  
**Created By:** [Name]  
**Date of Creation:** [Date]  
**Date of Review:** [Date]  
**Test Case ID:** ADA-STM-001  
**Test Scenario:** Verify stock movement history displays recorded IN and OUT transactions.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| View Stock Movements | Inventory has at least one stock-in or dispense transaction. | 1. Open Inventory Movements page. 2. Apply default filters. 3. Review movement list. | Existing IN and OUT stock transactions. | Movement table lists transaction type, medicine, quantity, and timestamps. |  |  |

**Test Case ID:** ADA-STM-002  
**Test Scenario:** Verify stock movement CSV export downloads with selected filters.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Export Stock Movements CSV | Stock movement records exist. | 1. Open Stock Movements page. 2. Set date range and optional type filter. 3. Click Export CSV. | Start date, end date, movement type. | CSV file is downloaded for the selected filter range. |  |  |

---

## Module 7: Analytics

**Project Name:** ADA: A Web-Based School Clinic Management System with Patient Record Archiving and Medicine Stock Monitoring  
**Module Name:** Analytics  
**Environment:** Testing  
**Created By:** [Name]  
**Date of Creation:** [Date]  
**Date of Review:** [Date]  
**Test Case ID:** ADA-ANA-001  
**Test Scenario:** Verify analytics page displays KPI summaries from existing data.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Display Analytics KPIs | System has patient, visit, and inventory data. | 1. Open Analytics page. 2. Review KPI cards and summary panels. | Existing clinic activity and inventory records. | Analytics KPIs and summaries render without data-load errors. |  |  |

**Test Case ID:** ADA-ANA-002  
**Test Scenario:** Verify analytics date filtering updates usage insights.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Filter Inventory Usage Insights | System has medicine dispensing records across multiple dates. | 1. Open Analytics page. 2. Set date filter range. 3. Apply filter. | Valid date range with known records. | Analytics view updates and shows usage insights for selected range. |  |  |

---

## Module 8: Archive / Restore

**Project Name:** ADA: A Web-Based School Clinic Management System with Patient Record Archiving and Medicine Stock Monitoring  
**Module Name:** Archive / Restore  
**Environment:** Testing  
**Created By:** [Name]  
**Date of Creation:** [Date]  
**Date of Review:** [Date]  
**Test Case ID:** ADA-ARC-001  
**Test Scenario:** Verify archiving a patient record moves it out of active patient views.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Archive Patient Record | Active patient record exists. | 1. Open patient profile. 2. Click Archive. 3. Confirm action. | Existing active patient record. | Patient is removed from active list and appears in archive records. |  |  |

**Test Case ID:** ADA-ARC-002  
**Test Scenario:** Verify restoring an archived patient returns it to active records.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Restore Archived Patient | Archived patient record exists. | 1. Open Archive page. 2. Select archived patient. 3. Click Restore. | Existing archived patient record. | Patient is restored and appears again in active patient views. |  |  |

---

## Module 9: Settings - Account and Security

**Project Name:** ADA: A Web-Based School Clinic Management System with Patient Record Archiving and Medicine Stock Monitoring  
**Module Name:** Settings - Account and Security  
**Environment:** Testing  
**Created By:** [Name]  
**Date of Creation:** [Date]  
**Date of Review:** [Date]  
**Test Case ID:** ADA-SET-ACC-001  
**Test Scenario:** Verify password change succeeds with valid current and new password.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Change Password Successfully | User is logged in. | 1. Open Settings. 2. Select Account and Security tab. 3. Enter current password. 4. Enter and confirm new password. 5. Click Save. | Valid current password and valid new password. | Password update succeeds and confirmation message is displayed. |  |  |

**Test Case ID:** ADA-SET-ACC-002  
**Test Scenario:** Verify password change is rejected when current password is incorrect.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Incorrect Current Password | User is logged in. | 1. Open Account and Security tab. 2. Enter incorrect current password. 3. Enter valid new password. 4. Click Save. | Incorrect current password and valid new password. | Password update is rejected and an error message is displayed. |  |  |

---

## Module 10: Settings - User Accounts

**Project Name:** ADA: A Web-Based School Clinic Management System with Patient Record Archiving and Medicine Stock Monitoring  
**Module Name:** Settings - User Accounts  
**Environment:** Testing  
**Created By:** [Name]  
**Date of Creation:** [Date]  
**Date of Review:** [Date]  
**Test Case ID:** ADA-SET-USR-001  
**Test Scenario:** Verify creating a user account from User Accounts tab.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Create User Account | Logged-in user has permission to manage users. | 1. Open Settings. 2. Select User Accounts tab. 3. Click Add User. 4. Enter required fields. 5. Click Save. | Valid user profile and account details. | New user account is created and appears in User Accounts list. |  |  |

**Test Case ID:** ADA-SET-USR-002  
**Test Scenario:** Verify updating user active status from User Accounts tab.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Update User Status | Existing user account exists. Logged-in user can manage users. | 1. Open User Accounts tab. 2. Select user. 3. Toggle status to active or inactive. 4. Confirm update. | Existing user account and target status value. | User status is updated and reflected in account list. |  |  |

---

## Module 11: Settings - Academic Fields

**Project Name:** ADA: A Web-Based School Clinic Management System with Patient Record Archiving and Medicine Stock Monitoring  
**Module Name:** Settings - Academic Fields  
**Environment:** Testing  
**Created By:** [Name]  
**Date of Creation:** [Date]  
**Date of Review:** [Date]  
**Test Case ID:** ADA-SET-REF-001  
**Test Scenario:** Verify creating a new academic reference value.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Create Academic Field Value | Logged-in user can access Academic Fields tab. | 1. Open Settings. 2. Select Academic Fields tab. 3. Choose reference type. 4. Enter new value. 5. Click Save. | Reference type and valid new value (for example, strand or section). | New academic reference value is saved and listed under selected type. |  |  |

**Test Case ID:** ADA-SET-REF-002  
**Test Scenario:** Verify deleting an academic reference value removes it from active list.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Delete Academic Field Value | Existing academic reference value is present. | 1. Open Academic Fields tab. 2. Select existing value. 3. Click Delete. 4. Confirm action. | Existing reference value. | Selected value is removed from active list. |  |  |

---

## Module 12: Settings - Audit Log

**Project Name:** ADA: A Web-Based School Clinic Management System with Patient Record Archiving and Medicine Stock Monitoring  
**Module Name:** Settings - Audit Log  
**Environment:** Testing  
**Created By:** [Name]  
**Date of Creation:** [Date]  
**Date of Review:** [Date]  
**Test Case ID:** ADA-SET-AUD-001  
**Test Scenario:** Verify audit entries are displayed in Audit Log tab.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| View Audit Log | System has audit records. User can access Settings. | 1. Open Settings. 2. Select Audit Log tab. 3. Review listed entries. | Existing audit trail records. | Audit entries are displayed with action and timestamp information. |  |  |

**Test Case ID:** ADA-SET-AUD-002  
**Test Scenario:** Verify audit filters return matching audit entries.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Filter Audit Log | Audit entries exist across different dates or actions. | 1. Open Audit Log tab. 2. Set action or date filters. 3. Apply filters. | Action filter and date range filter values. | Audit list refreshes and shows records matching selected filter criteria. |  |  |

---

## Module 13: Export CSV Capabilities (Cross-Cutting)

**Project Name:** ADA: A Web-Based School Clinic Management System with Patient Record Archiving and Medicine Stock Monitoring  
**Module Name:** Export CSV Capabilities  
**Environment:** Testing  
**Created By:** [Name]  
**Date of Creation:** [Date]  
**Date of Review:** [Date]  
**Test Case ID:** ADA-EXP-001  
**Test Scenario:** Verify visits CSV export endpoint returns downloadable CSV with filtered records.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Export Visits CSV | Visits exist within selected date range. | 1. Call export route for visits CSV. 2. Provide date range query parameters. 3. Download response file. | startDate, endDate, optional studentId and includeArchived. | Response is CSV file containing visit rows that match filters. |  |  |

**Test Case ID:** ADA-EXP-002  
**Test Scenario:** Verify medicines CSV export supports summary and batches detail modes.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Export Medicines CSV | Medicine records exist. | 1. Call medicines CSV export route. 2. Send detail mode parameter. 3. Download response file. | detail: summary or batches, includeInactive: true or false. | CSV is generated in selected detail mode and download succeeds. |  |  |

**Test Case ID:** ADA-EXP-003  
**Test Scenario:** Verify stock movements CSV export returns records for requested date range and type.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Export Stock Movements CSV | Stock movement records exist. | 1. Call stock movements CSV export route. 2. Provide start and end dates. 3. Provide movement type filter. | startDate, endDate, type: IN or OUT or ADJUST or ALL. | CSV contains stock movement rows matching the supplied filter values. |  |  |

**Test Case ID:** ADA-EXP-004  
**Test Scenario:** Verify audit log CSV export returns audit records for selected filters.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Export Audit Log CSV | Audit records exist. | 1. Open Settings Audit Log tab or call audit export route. 2. Apply filters. 3. Trigger CSV export. | action filter, date range filter, optional user filter. | CSV is downloaded with audit rows matching selected criteria. |  |  |

---

## 3. Brief Change Log

- Removed standalone Alerts module and merged alert scenarios into Dashboard and Inventory modules.
- Added Stock Movements as a dedicated module aligned with implemented route.
- Reorganized User Management, Change Password, and Audit Log into Settings submodules.
- Added missing Settings Academic Fields coverage.
- Reframed Export as cross-cutting CSV capability aligned with implemented export endpoints.
- Standardized IDs to module-based prefixes and sequential numbering within each module.
- Normalized wording to use consistent Login terminology and testable expected results.
- Kept required detailed table columns unchanged and left Actual Result and Status blank in all cases.
