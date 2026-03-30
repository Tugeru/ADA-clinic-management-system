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
    | Valid Login | User account exists and is active. User is on Login page. | 1. Click the Email field and type the registered email address. 2. Click the Password field and type the correct password. 3. Click the Sign in button. | S1 (Email field): `admin@ada.clinic`.<br>S2 (Password field): `ada_admin_2025`.<br>S3 (Button clicked): `Sign in`. | Login succeeds and user is redirected to Dashboard. |  |  |

**Test Case ID:** ADA-LOG-002  
**Test Scenario:** Verify login failure when password is incorrect.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Invalid Password | User account exists and is active. | 1. Click the Email field and type a valid registered email address. 2. Click the Password field and type an incorrect password. 3. Click the Sign in button. | S1 (Email field): `admin@ada.clinic`.<br>S2 (Password field): `wrong_password_123`.<br>S3 (Button clicked): `Sign in`. | Authentication error is shown and user stays on Login page. |  |  |

**Test Case ID:** ADA-LOG-003  
**Test Scenario:** Verify required field validation on Login form.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Empty Login Fields | User is on Login page. | 1. Click the Email field and leave it blank. 2. Click the Password field and leave it blank. 3. Click the Sign in button. | S1 (Email field): `` (empty).<br>S2 (Password field): `` (empty).<br>S3 (Button clicked): `Sign in`. | Submission is blocked and required-field validation is displayed. |  |  |

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
| Load Dashboard | User is logged in. Visits and inventory data exist. | 1. Click Dashboard in the left navigation. 2. Click the range filter dropdown and select Last 30 Days. 3. Review the KPI cards and recent activity widgets. | S1 (Navigation clicked): `Dashboard`.<br>S2 (Range filter): `Last 30 Days`.<br>S3 (Data used): existing visit, patient, and medicine records in the selected range. | Dashboard shows summary indicators and recent activity without load errors. |  |  |

**Test Case ID:** ADA-DASH-002  
**Test Scenario:** Verify dashboard stock and expiry alert indicators are displayed.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Dashboard Alert Indicators | At least one medicine is low in stock or near expiry. | 1. Click Dashboard in the left navigation. 2. Scroll to the low-stock and expiry alert section. 3. Check that the listed medicine entries match expected alert conditions. | S1 (Navigation clicked): `Dashboard`.<br>S2 (Data used): medicine `Paracetamol 500mg`, stock `4`, reorder threshold `10`.<br>S3 (Data used): batch `PARA-0426`, expiration date `2026-04-15`. | Dashboard displays corresponding alert indicators for affected medicines. |  |  |

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
| Add New Patient Record | User is logged in and on Patients module. | 1. Click the Add Patient button. 2. Fill required fields on the form (First Name, Last Name, Date of Birth, Gender, Parent/Guardian Name, Contact Number). 3. Click the Save Patient button. | S1 (Button clicked): `Add Patient`.<br>S2 (Fields entered): First Name `Juan`, Last Name `Dela Cruz`, Date of Birth `2008-08-15`, Gender `Male`, Parent/Guardian Name `Maria Dela Cruz`, Contact Number `09171234567`.<br>S3 (Button clicked): `Save Patient`. | New patient record is saved and appears in Patients list. |  |  |

**Test Case ID:** ADA-PAT-002  
**Test Scenario:** Verify required-field validation when adding a patient.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Missing Required Patient Fields | User is on Add Patient form. | 1. Click the Add Patient button to open the form. 2. Leave required fields (First Name and Last Name) empty while filling optional fields. 3. Click the Save Patient button. | S1 (Button clicked): `Add Patient`.<br>S2 (Fields entered): First Name `` (empty), Last Name `` (empty), Date of Birth `2008-08-15`, Gender `Male`.<br>S3 (Button clicked): `Save Patient`. | Save is blocked and validation messages are displayed for required fields. |  |  |

**Test Case ID:** ADA-PAT-003  
**Test Scenario:** Verify patient search returns matching records.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Search Patient Record | Patient records exist. | 1. Open the Patients list page. 2. Click the Search by Name field and type a patient name keyword. 3. Press Enter (or wait for filter refresh) and review results. | S1 (Page opened): `Patients` list.<br>S2 (Search field input): `Dela Cruz`.<br>S3 (Data used for verification): matching patient names containing `Dela Cruz`. | Matching patient records are listed. |  |  |

**Test Case ID:** ADA-PAT-004  
**Test Scenario:** Verify editing an existing patient record updates stored values.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Update Patient Record | Existing patient record is available. | 1. In Patients list, open an existing patient record and click Edit. 2. Update one field (for example, Last Name). 3. Click the Update Patient button. | S1 (Record opened): patient `Juan Dela Cruz`.<br>S2 (Field updated): Last Name from `Dela Cruz` to `Delos Santos`.<br>S3 (Button clicked): `Update Patient`. | Updated value is saved and visible in patient details/list. |  |  |

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
| Record Clinic Visit | Patient exists. User is on New Visit form. | 1. In the patient search field, type a patient name and select the patient from the dropdown. 2. Fill required visit fields (Time In and Chief Complaint) and enter Assessment / Intervention. 3. Click the Save Visit button. | S1 (Patient selected): `Juan Delos Santos`.<br>S2 (Fields entered): Time In `09:10`, Chief Complaint `Headache`, Assessment / Intervention `Rested patient and hydrated`.<br>S3 (Button clicked): `Save Visit`. | Visit record is created and appears in Visits list/history. |  |  |

**Test Case ID:** ADA-VIS-002  
**Test Scenario:** Verify required-field validation on visit form.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Missing Required Visit Details | User is on New Visit form. | 1. Select a patient from the patient search dropdown. 2. Leave at least one required field empty (for example, Chief Complaint). 3. Click the Save Visit button. | S1 (Patient selected): `Juan Delos Santos`.<br>S2 (Fields entered): Time In `09:15`, Chief Complaint `` (empty).<br>S3 (Button clicked): `Save Visit`. | Save is blocked and validation message is displayed. |  |  |

**Test Case ID:** ADA-VIS-003  
**Test Scenario:** Verify dispensed medicines are recorded under the visit.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Dispense Medicine in Visit | Patient exists. Medicine stock is available. | 1. Select patient and fill required visit details on New Visit form. 2. Click + Add Medicine, select a medicine line item, and enter quantity. 3. Click the Save Visit button. | S1 (Visit fields entered): Patient `Juan Delos Santos`, Time In `10:00`, Chief Complaint `Fever`.<br>S2 (Medicine line data): Medicine `Paracetamol 500mg`, Quantity `2`.<br>S3 (Button clicked): `Save Visit`. | Visit details include dispensed medicine line entries. |  |  |

**Test Case ID:** ADA-VIS-004  
**Test Scenario:** Verify medicine stock is reduced after dispensing during a visit.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Deduct Stock After Dispensing | Inventory batch exists with sufficient stock. | 1. Create a new visit and fill required fields for an existing patient. 2. Click + Add Medicine, select a medicine with known stock, and enter dispense quantity. 3. Click Save Visit, then open Inventory and verify updated quantity for the same medicine. | S1 (Visit data): Patient `Juan Delos Santos`, Time In `10:30`, Chief Complaint `Body pain`.<br>S2 (Dispense data): Medicine `Paracetamol 500mg`, Stock before `25`, Quantity dispensed `3`.<br>S3 (Verification data): Expected stock after save `22`. | Inventory stock reflects deduction and stock movement is recorded. |  |  |

**Test Case ID:** ADA-VIS-005  
**Test Scenario:** Verify guardian release details are stored for sent-home disposition.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Record Patient Release to Guardian | Visit disposition is sent-home. | 1. Fill required visit fields on New Visit form. 2. Select the disposition option Sent Home. 3. Enter guardian release fields and click Save Visit. | S1 (Visit data): Patient `Juan Delos Santos`, Time In `11:00`, Chief Complaint `Stomachache`.<br>S2 (Disposition selected): `Sent Home`.<br>S3 (Release fields): Guardian Name `Maria Dela Cruz`, Relationship `Mother`, Release Time `11:25`. | Guardian release fields are stored in visit record. |  |  |

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
| Record Stock-In | User is logged in. Medicine exists in catalog. | 1. On Inventory page, click the Stock In button. 2. In the stock-in form, select medicine and fill Batch Number, Expiration Date, and Quantity. 3. Click the Save button. | S1 (Button clicked): `Stock In`.<br>S2 (Fields entered): Medicine `Paracetamol 500mg`, Batch Number `PARA-0626`, Expiration Date `2026-06-30`, Quantity `100`.<br>S3 (Button clicked): `Save`. | Stock-in is recorded and inventory quantity increases accordingly. |  |  |

**Test Case ID:** ADA-INV-002  
**Test Scenario:** Verify stock-in quantity validation rejects invalid values.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Invalid Stock Quantity | User is on stock-in form. | 1. Click the Stock In button to open stock-in form. 2. Select a medicine and enter Quantity as zero or a negative value. 3. Click the Save button. | S1 (Button clicked): `Stock In`.<br>S2 (Fields entered): Medicine `Paracetamol 500mg`, Batch Number `PARA-0626`, Expiration Date `2026-06-30`, Quantity `0`.<br>S3 (Button clicked): `Save`. | Validation error is displayed and stock-in is not saved. |  |  |

**Test Case ID:** ADA-INV-003  
**Test Scenario:** Verify adding a medicine to catalog succeeds with valid values.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Add Medicine Catalog Entry | User is on Add Medicine page. | 1. On Inventory page, click + Add Medicine. 2. Fill Medicine Name, Purpose/Description, Unit, and Reorder Level fields. 3. Click the Save Medicine button. | S1 (Button clicked): `+ Add Medicine`.<br>S2 (Fields entered): Medicine Name `Cetirizine 10mg`, Purpose `Allergy relief`, Unit `tablet`, Reorder Level `20`.<br>S3 (Button clicked): `Save Medicine`. | New medicine appears in active inventory catalog. |  |  |

**Test Case ID:** ADA-INV-004  
**Test Scenario:** Verify archiving a medicine removes it from active inventory list.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Archive Medicine | Active medicine exists in inventory. | 1. In Inventory list, locate the target medicine row and open row actions. 2. Click the Archive action for that row. 3. In confirmation dialog, click Confirm Archive. | S1 (Target row): Medicine `Cetirizine 10mg` (active).<br>S2 (Action clicked): `Archive`.<br>S3 (Dialog action clicked): `Confirm Archive`. | Medicine is no longer shown in active inventory and becomes available in Archive view. |  |  |

**Test Case ID:** ADA-INV-005  
**Test Scenario:** Verify near-expiry and low-stock indicators appear in inventory views.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Inventory Alert Indicators | At least one batch is near expiry or one item is below reorder threshold. | 1. Open Inventory page. 2. Use Search by medicine name to find a known low-stock or near-expiry item. 3. Review status and expiry badges in the medicine row. | S1 (Page opened): `Inventory`.<br>S2 (Search input): `Paracetamol`.<br>S3 (Data used for verification): stock `4` vs reorder threshold `10`, expiration date `2026-04-15`. | Inventory displays status indicators for low-stock or near-expiry conditions. |  |  |

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
| View Stock Movements | Inventory has at least one stock-in or dispense transaction. | 1. From Inventory, click the Stock Movements button. 2. Set Period filter to Last 30 Days and Type filter to ALL. 3. Review movement table rows for IN and OUT entries. | S1 (Button clicked): `Stock Movements`.<br>S2 (Filters selected): Period `Last 30 Days`, Type `ALL`.<br>S3 (Data used for verification): existing transactions with types `IN` and `OUT`. | Movement table lists transaction type, medicine, quantity, and timestamps. |  |  |

**Test Case ID:** ADA-STM-002  
**Test Scenario:** Verify stock movement CSV export downloads with selected filters.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Export Stock Movements CSV | Stock movement records exist. | 1. Open Stock Movements page. 2. Select Period Last 30 Days, Type OUT, and optional medicine filter. 3. Click the Export CSV button. | S1 (Page opened): `Stock Movements`.<br>S2 (Filters selected): Period `Last 30 Days` (startDate `2026-02-27`, endDate `2026-03-28`), Type `OUT`, Medicine `Paracetamol 500mg`.<br>S3 (Button clicked): `Export CSV`. | CSV file is downloaded for the selected filter range. |  |  |

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
| Display Analytics KPIs | System has patient, visit, and inventory data. | 1. Click Analytics in the left navigation. 2. Click the Clinic Summary tab. 3. Review KPI cards and summary panels. | S1 (Navigation clicked): `Analytics`.<br>S2 (Tab selected): `Clinic Summary`.<br>S3 (Data used): existing patient, visit, and inventory records for current period. | Analytics KPIs and summaries render without data-load errors. |  |  |

**Test Case ID:** ADA-ANA-002  
**Test Scenario:** Verify analytics date filtering updates usage insights.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Filter Inventory Usage Insights | System has medicine dispensing records across multiple dates. | 1. Open Analytics page and click the Medicine Usage Rankings tab. 2. Set Period dropdown to Custom. 3. Enter custom start and end dates, then apply/confirm the date filter. | S1 (Tab selected): `Medicine Usage Rankings`.<br>S2 (Period selected): `Custom`.<br>S3 (Date inputs): Start Date `2026-03-01`, End Date `2026-03-28`. | Analytics view updates and shows usage insights for selected range. |  |  |

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
| Archive Patient Record | Active patient record exists. | 1. In Patients list, open the target patient row/profile. 2. Click the Archive action for that patient. 3. In confirmation dialog, click Confirm Archive. | S1 (Target record): patient `Juan Delos Santos` (active).<br>S2 (Action clicked): `Archive`.<br>S3 (Dialog action clicked): `Confirm Archive`. | Patient is removed from active list and appears in archive records. |  |  |

**Test Case ID:** ADA-ARC-002  
**Test Scenario:** Verify restoring an archived patient returns it to active records.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Restore Archived Patient | Archived patient record exists. | 1. Open Archive page and click the Patients tab. 2. Locate the archived patient row. 3. Click Restore for that row. | S1 (Page/tab opened): `Archive` > `Patients`.<br>S2 (Target row): patient `Juan Delos Santos` (archived).<br>S3 (Action clicked): `Restore`. | Patient is restored and appears again in active patient views. |  |  |

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
| Change Password Successfully | User is logged in. | 1. Open Settings and click Account and Security tab. 2. Fill Current Password, New Password, and Confirm New Password fields. 3. Click the Update Password button. | S1 (Tab selected): `Account and Security`.<br>S2 (Fields entered): Current Password `ada_admin_2025`, New Password `AdaSecure!2026`, Confirm New Password `AdaSecure!2026`.<br>S3 (Button clicked): `Update Password`. | Password update succeeds and confirmation message is displayed. |  |  |

**Test Case ID:** ADA-SET-ACC-002  
**Test Scenario:** Verify password change is rejected when current password is incorrect.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Incorrect Current Password | User is logged in. | 1. Open Settings and click Account and Security tab. 2. Fill Current Password with an incorrect value, then fill New Password and Confirm New Password with matching valid values. 3. Click the Update Password button. | S1 (Tab selected): `Account and Security`.<br>S2 (Fields entered): Current Password `wrong_current_pw`, New Password `AdaSecure!2026`, Confirm New Password `AdaSecure!2026`.<br>S3 (Button clicked): `Update Password`. | Password update is rejected and an error message is displayed. |  |  |

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
| Create User Account | Logged-in user has permission to manage users. | 1. Open Settings and click User Accounts tab. 2. Click Add User, then fill Full Name, Email, Initial Password, and Confirm Password fields. 3. Toggle Can manage users as needed and click Create Account. | S1 (Tab selected): `User Accounts`.<br>S2 (Fields entered): Full Name `Nurse Lia Ramos`, Email `lia.ramos@ada.clinic`, Initial Password `LiaTemp!2026`, Confirm Password `LiaTemp!2026`.<br>S3 (Checkbox/button): Can manage users `Enabled`, Button `Create Account`. | New user account is created and appears in User Accounts list. |  |  |

**Test Case ID:** ADA-SET-USR-002  
**Test Scenario:** Verify updating user active status from User Accounts tab.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Update User Status | Existing user account exists. Logged-in user can manage users. | 1. Open Settings and click User Accounts tab. 2. Locate the target user row in the table. 3. Click Deactivate (or Activate) in row actions and confirm status change in the table badge. | S1 (Tab selected): `User Accounts`.<br>S2 (Target row): Email `lia.ramos@ada.clinic`, Current Status `Active`.<br>S3 (Action/result): Click `Deactivate`, Expected Status `Inactive`. | User status is updated and reflected in account list. |  |  |

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
| Create Academic Field Value | Logged-in user can access Academic Fields tab. | 1. Open Settings and click Academic Fields tab. 2. Select a reference category tab (for example, Strands). 3. Fill Value and Label fields, then click + Add Entry. | S1 (Tab selected): `Academic Fields`.<br>S2 (Reference category): `Strands`.<br>S3 (Fields/button): Value `STEM`, Label `Science, Technology, Engineering and Mathematics`, Button `+ Add Entry`. | New academic reference value is saved and listed under selected type. |  |  |

**Test Case ID:** ADA-SET-REF-002  
**Test Scenario:** Verify deleting an academic reference value removes it from active list.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Delete Academic Field Value | Existing academic reference value is present. | 1. Open Settings and click Academic Fields tab. 2. Select the reference category where the target value exists. 3. In the target row, click Delete and confirm the delete prompt. | S1 (Tab selected): `Academic Fields`.<br>S2 (Category/target value): Category `Strands`, Value `STEM`.<br>S3 (Action clicked): `Delete` then `Confirm Delete`. | Selected value is removed from active list. |  |  |

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
| View Audit Log | System has audit records. User can access Settings. | 1. Open Settings and click Audit Log tab. 2. Set filters to Action Type = All Actions and Entity Type = All Entities. 3. Review listed audit entries in the table. | S1 (Tab selected): `Audit Log`.<br>S2 (Filters selected): Action Type `All Actions`, Entity Type `All Entities`.<br>S3 (Data used): existing audit trail entries with timestamps and actions. | Audit entries are displayed with action and timestamp information. |  |  |

**Test Case ID:** ADA-SET-AUD-002  
**Test Scenario:** Verify audit filters return matching audit entries.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Filter Audit Log | Audit entries exist across different dates or actions. | 1. Open Settings and click Audit Log tab. 2. Select Action Type and Entity Type filter values. 3. Wait for the table to refresh and verify filtered results. | S1 (Tab selected): `Audit Log`.<br>S2 (Filters selected): Action Type `Archive`, Entity Type `Patient`.<br>S3 (Data used for verification): returned rows where action is `Archive` and entity is `Patient`. | Audit list refreshes and shows records matching selected filter criteria. |  |  |

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
| Export Visits CSV | Visits exist within selected date range. | 1. Open Visits page and set period/date filter from UI controls. 2. Click Export Visits CSV to trigger the visits export request. 3. Save the downloaded CSV file. | S1 (Filters selected): Period `This Month`, startDate `2026-03-01`, endDate `2026-03-28`, includeArchived `false`.<br>S2 (Request params used): `startDate=2026-03-01`, `endDate=2026-03-28` (optional `studentId` not set).<br>S3 (Download): Filename pattern `visits-*.csv`. | Response is CSV file containing visit rows that match filters. |  |  |

**Test Case ID:** ADA-EXP-002  
**Test Scenario:** Verify medicines CSV export supports summary and batches detail modes.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Export Medicines CSV | Medicine records exist. | 1. Open Inventory page. 2. Select export detail mode from dropdown, then click Export CSV. 3. Save the downloaded CSV file. | S1 (Page opened): `Inventory`.<br>S2 (Export options used): detail `batches`, includeInactive `false`.<br>S3 (Download): Filename pattern `medicines-*.csv`. | CSV is generated in selected detail mode and download succeeds. |  |  |

**Test Case ID:** ADA-EXP-003  
**Test Scenario:** Verify stock movements CSV export returns records for requested date range and type.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Export Stock Movements CSV | Stock movement records exist. | 1. Open Stock Movements page and set period/date from filters. 2. Select movement Type filter. 3. Click Export CSV to trigger stock-movements export. | S1 (Date filters used): startDate `2026-02-27`, endDate `2026-03-28`.<br>S2 (Type filter selected): `IN` (allowed: `IN`, `OUT`, `ADJUST`, `ALL`).<br>S3 (Request triggered): `/api/export/stock-movements.csv` with matching query params. | CSV contains stock movement rows matching the supplied filter values. |  |  |

**Test Case ID:** ADA-EXP-004  
**Test Scenario:** Verify audit log CSV export returns audit records for selected filters.

| Test Case | Pre-Condition(s) | Procedure(s) | Test Data | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Export Audit Log CSV | Audit records exist. | 1. Open Settings and click Audit Log tab. 2. Select Action Type and Entity Type filters. 3. Click Export CSV to download the filtered audit file. | S1 (Tab selected): `Audit Log`.<br>S2 (Filters selected): action `Delete`, entity `Patient`.<br>S3 (Export request/data): `/api/export/audit-log.csv` with `action=Delete` and `entity=Patient`. | CSV is downloaded with audit rows matching selected criteria. |  |  |

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
