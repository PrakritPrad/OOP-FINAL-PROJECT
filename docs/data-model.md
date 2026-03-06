# Data Model Documentation — User & Organization Management System

## Model Set 0: User & Organization Management

ระบบนี้ประกอบด้วย Core Data Model 2 ตัว คือ **User** และ **Organization** โดยมีความสัมพันธ์แบบ Many-to-One กล่าวคือ User หนึ่งคนสังกัดได้ 1 Organization และ Organization หนึ่งมีได้หลาย User

---

## BaseEntity (Abstract)

ทุก Model สืบทอดมาจาก `BaseEntity` ซึ่งมี attribute พื้นฐานดังนี้:

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | string (UUID) | รหัสเฉพาะตัว (ไม่ซ้ำกัน) |
| `createdAt` | string (ISO 8601) | เวลาที่สร้างข้อมูล |
| `updatedAt` | string (ISO 8601) | เวลาที่แก้ไขข้อมูลล่าสุด |

---

## 1. User Model

ข้อมูลผู้ใช้งานในระบบ แต่ละ User สังกัดอยู่ใน Organization เดียว

### Attributes

| Attribute | Type | Required | Category | Description |
|-----------|------|----------|----------|-------------|
| `id` | string (UUID) | ✅ | Identity | รหัสผู้ใช้ (สืบทอดจาก BaseEntity) |
| `username` | string | ✅ | Identity | ชื่อที่ใช้เข้าสู่ระบบ (ไม่ซ้ำกัน) |
| `fullName` | string | ✅ | Core Info | ชื่อ-นามสกุลจริง |
| `email` | string | ✅ | Core Info | อีเมล (format: email) |
| `phone` | string | ✅ | Core Info | เบอร์โทรศัพท์ |
| `role` | UserRole | ✅ | Status/State | บทบาทในระบบ (enum) |
| `status` | UserStatus | ✅ | Status/State | สถานะการใช้งาน (enum) |
| `organizationId` | string | ✅ | Relation | ID ขององค์กรที่สังกัด (FK → Organization) |
| `department` | string | ✅ | Core Info | แผนกที่สังกัด |
| `position` | string | ✅ | Core Info | ตำแหน่งงาน |
| `isEmailVerified` | boolean | ✅ | Config/Flag | สถานะการยืนยันอีเมล |
| `timezone` | string | ✅ | Config/Flag | timezone ที่ใช้งาน เช่น Asia/Bangkok |
| `password` | string | ✅ | Security | รหัสผ่าน (เข้ารหัสด้วย bcrypt — ไม่ส่งกลับใน response) |
| `bio` | string? | ❌ | Core Info | ประวัติย่อ (optional) |
| `avatarUrl` | string? | ❌ | Core Info | URL รูปโปรไฟล์ (optional) |
| `lastLoginAt` | string? | ❌ | Timestamp | เวลา login ล่าสุด (optional, ISO 8601) |
| `createdAt` | string | ✅ | Timestamp | เวลาสร้างข้อมูล (สืบทอดจาก BaseEntity) |
| `updatedAt` | string | ✅ | Timestamp | เวลาแก้ไขล่าสุด (สืบทอดจาก BaseEntity) |

> `SafeUser` = User ทั้งหมดยกเว้น `password` — ใช้เป็น response type เพื่อความปลอดภัย

### Enums

#### UserRole

```typescript
enum UserRole {
  ADMIN   = 'ADMIN',    // ผู้ดูแลระบบ
  MANAGER = 'MANAGER',  // ผู้จัดการ
  STAFF   = 'STAFF',    // พนักงานทั่วไป
}
```

#### UserStatus

```typescript
enum UserStatus {
  ACTIVE    = 'ACTIVE',     // ใช้งานอยู่
  INACTIVE  = 'INACTIVE',   // ไม่ได้ใช้งาน
  SUSPENDED = 'SUSPENDED',  // ถูกระงับการใช้งาน
}
```

---

## 2. Organization Model

ข้อมูลองค์กรที่ User สังกัดอยู่ แต่ละองค์กรสามารถมี User ได้หลายคน

### Attributes

| Attribute | Type | Required | Category | Description |
|-----------|------|----------|----------|-------------|
| `id` | string (UUID) | ✅ | Identity | รหัสองค์กร (สืบทอดจาก BaseEntity) |
| `registrationNumber` | string | ✅ | Identity | หมายเลขทะเบียนองค์กร (ไม่ซ้ำกัน) |
| `taxId` | string | ✅ | Identity | เลขประจำตัวผู้เสียภาษี |
| `name` | string | ✅ | Core Info | ชื่อองค์กร |
| `description` | string | ✅ | Core Info | คำอธิบายองค์กร |
| `industry` | string | ✅ | Core Info | อุตสาหกรรมที่ดำเนินธุรกิจ |
| `website` | string (URL) | ✅ | Core Info | เว็บไซต์ขององค์กร |
| `email` | string (email) | ✅ | Core Info | อีเมลติดต่อองค์กร |
| `phone` | string | ✅ | Core Info | เบอร์โทรศัพท์ |
| `address` | string | ✅ | Core Info | ที่อยู่ |
| `city` | string | ✅ | Core Info | เมือง |
| `country` | string | ✅ | Core Info | ประเทศ |
| `foundedDate` | string (YYYY-MM-DD) | ✅ | Core Info | วันที่ก่อตั้ง |
| `numberOfEmployees` | number | ✅ | Core Info | จำนวนพนักงาน |
| `type` | OrganizationType | ✅ | Status/State | ประเภทองค์กร (enum) |
| `status` | OrganizationStatus | ✅ | Status/State | สถานะองค์กร (enum) |
| `logo` | string? | ❌ | Core Info | URL โลโก้องค์กร (optional) |
| `createdAt` | string | ✅ | Timestamp | เวลาสร้างข้อมูล (สืบทอดจาก BaseEntity) |
| `updatedAt` | string | ✅ | Timestamp | เวลาแก้ไขล่าสุด (สืบทอดจาก BaseEntity) |

### Enums

#### OrganizationType

```typescript
enum OrganizationType {
  CORPORATE  = 'CORPORATE',   // บริษัทเอกชน
  NGO        = 'NGO',         // องค์กรไม่แสวงหากำไร
  STARTUP    = 'STARTUP',     // สตาร์ทอัพ
  GOVERNMENT = 'GOVERNMENT',  // หน่วยงานรัฐบาล
  EDUCATION  = 'EDUCATION',   // สถาบันการศึกษา
  HEALTHCARE = 'HEALTHCARE',  // สถานพยาบาล
}
```

#### OrganizationStatus

```typescript
enum OrganizationStatus {
  ACTIVE   = 'ACTIVE',    // ดำเนินการอยู่
  INACTIVE = 'INACTIVE',  // หยุดดำเนินการชั่วคราว
  SUSPENDED = 'SUSPENDED', // ถูกระงับ
  ARCHIVED = 'ARCHIVED',  // ปิดกิจการแล้ว
}
```

---

## ความสัมพันธ์ระหว่าง Model

```
Organization (1) ────── (*) User
```

- Organization หนึ่งมีได้หลาย User
- User แต่ละคนสังกัดอยู่ใน Organization เดียว
- ความสัมพันธ์นี้เชื่อมผ่าน `User.organizationId → Organization.id`

---

## UML Class Diagram

```
┌─────────────────────────────────┐
│         <<abstract>>            │
│           BaseEntity            │
├─────────────────────────────────┤
│ + id: string                    │
│ + createdAt: string             │
│ + updatedAt: string             │
└─────────────┬───────────────────┘
              │ extends
    ┌─────────┴───────────┐
    │                     │
    ▼                     ▼
┌───────────────────┐  ┌──────────────────────────────┐
│       User        │  │         Organization          │
├───────────────────┤  ├──────────────────────────────┤
│ username: string  │  │ name: string                 │
│ password: string  │  │ registrationNumber: string   │
│ fullName: string  │  │ description: string          │
│ email: string     │  │ industry: string             │
│ phone: string     │  │ type: OrganizationType       │
│ role: UserRole    │  │ status: OrganizationStatus   │
│ status: UserStatus│  │ website: string              │
│ organizationId ───┼──┤ email: string                │
│ department: string│  │ phone: string                │
│ position: string  │  │ address: string              │
│ bio?: string      │  │ city: string                 │
│ avatarUrl?: string│  │ country: string              │
│ isEmailVerified   │  │ foundedDate: string          │
│ timezone: string  │  │ numberOfEmployees: number    │
│ lastLoginAt?      │  │ logo?: string                │
└───────────────────┘  │ taxId: string                │
                       └──────────────────────────────┘

<<enum>> UserRole         <<enum>> UserStatus
─────────────────         ───────────────────
ADMIN                     ACTIVE
MANAGER                   INACTIVE
STAFF                     SUSPENDED

<<enum>> OrganizationType     <<enum>> OrganizationStatus
──────────────────────────    ───────────────────────────
CORPORATE                     ACTIVE
NGO                           INACTIVE
STARTUP                       SUSPENDED
GOVERNMENT                    ARCHIVED
EDUCATION
HEALTHCARE
```

---

## Database

ระบบใช้ **lowdb** (JSON-based file database) สำหรับจัดเก็บข้อมูล ข้อมูลจะถูกบันทึกใน `db.json` โดยมีโครงสร้างดังนี้:

```json
{
  "users": [],
  "organizations": []
}
```
