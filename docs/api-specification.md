# API Specification — User & Organization Management System

## ภาพรวม

ระบบนี้เป็น REST API สำหรับจัดการผู้ใช้งาน (User) และองค์กร (Organization) พัฒนาด้วย NestJS + TypeScript

- **Base URL:** `http://localhost:3000`
- **Authentication:** Bearer Token (JWT)
- **Content-Type:** `application/json`

---

## Standard Response Format

ทุก API response ใช้รูปแบบเดียวกัน:

```json
{
  "success": true,
  "message": "string",
  "data": { } | null
}
```

---

## HTTP Status Codes

| Status Code | ความหมาย |
|-------------|----------|
| `200` | OK — สำเร็จ (GET, PUT, PATCH, DELETE) |
| `201` | Created — สร้างข้อมูลสำเร็จ (POST) |
| `400` | Bad Request — ข้อมูลไม่ถูกต้อง |
| `401` | Unauthorized — ไม่มี Token หรือ Token ไม่ถูกต้อง |
| `403` | Forbidden — ไม่มีสิทธิ์ |
| `404` | Not Found — ไม่พบข้อมูล |

---

## Authentication

Endpoints ที่ต้องการ JWT Token ต้องส่ง header:

```
Authorization: Bearer <token>
```

---

## 1. Auth

### POST /auth/register

ลงทะเบียนผู้ใช้ใหม่

**Authentication:** ไม่ต้องการ

**Request Body:**

```json
{
  "username": "johndoe",
  "password": "secret1234",
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+66812345678",
  "role": "STAFF",
  "organizationId": "org-001",
  "department": "Engineering",
  "position": "Software Engineer",
  "bio": "A passionate developer.",
  "avatarUrl": "https://cdn.example.com/avatar.png",
  "isEmailVerified": false,
  "timezone": "Asia/Bangkok",
  "status": "ACTIVE"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `username` | string | ✅ | ชื่อผู้ใช้ |
| `password` | string (min 8) | ✅ | รหัสผ่าน |
| `fullName` | string | ✅ | ชื่อ-นามสกุล |
| `email` | string (email) | ✅ | อีเมล |
| `phone` | string | ✅ | เบอร์โทรศัพท์ |
| `role` | UserRole enum | ✅ | บทบาท (ADMIN / MANAGER / STAFF) |
| `organizationId` | string | ✅ | ID ขององค์กรที่สังกัด |
| `department` | string | ✅ | แผนก |
| `position` | string | ✅ | ตำแหน่ง |
| `timezone` | string | ✅ | timezone เช่น Asia/Bangkok |
| `bio` | string | ❌ | ประวัติย่อ |
| `avatarUrl` | string | ❌ | URL รูปโปรไฟล์ |
| `isEmailVerified` | boolean | ❌ | สถานะยืนยันอีเมล (default: false) |
| `lastLoginAt` | string (ISO 8601) | ❌ | เวลา login ล่าสุด |
| `status` | UserStatus enum | ❌ | สถานะ (default: ACTIVE) |

**Response 201:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "uuid",
    "username": "johndoe",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+66812345678",
    "role": "STAFF",
    "status": "ACTIVE",
    "organizationId": "org-001",
    "department": "Engineering",
    "position": "Software Engineer",
    "isEmailVerified": false,
    "timezone": "Asia/Bangkok",
    "createdAt": "2025-03-05T00:00:00.000Z",
    "updatedAt": "2025-03-05T00:00:00.000Z"
  }
}
```

> หมายเหตุ: `password` จะไม่ถูกส่งกลับใน response

---

### POST /auth/login

เข้าสู่ระบบด้วย username และ password

**Authentication:** ไม่ต้องการ

**Request Body:**

```json
{
  "username": "johndoe",
  "password": "secret1234"
}
```

| Field | Type | Required |
|-------|------|----------|
| `username` | string | ✅ |
| `password` | string | ✅ |

**Response 200:**

```json
{
  "access_token": "eyJhbGci..."
}
```

**Response 401:** Invalid credentials

---

## 2. Users

> ทุก endpoint ต้องการ JWT Token

### GET /users

ดึงข้อมูลผู้ใช้ทั้งหมด

**Authentication:** ✅ JWT Required

**Response 200:**

```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "username": "johndoe",
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+66812345678",
      "role": "STAFF",
      "status": "ACTIVE",
      "organizationId": "org-001",
      "department": "Engineering",
      "position": "Software Engineer",
      "isEmailVerified": false,
      "timezone": "Asia/Bangkok",
      "createdAt": "2025-03-05T00:00:00.000Z",
      "updatedAt": "2025-03-05T00:00:00.000Z"
    }
  ]
}
```

---

### GET /users/:id

ดึงข้อมูลผู้ใช้ตาม ID

**Authentication:** ✅ JWT Required

**Path Parameter:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | User ID |

**Response 200:** ข้อมูล user คนเดียว (รูปแบบเดียวกับด้านบน)

**Response 404:**

```json
{
  "success": false,
  "message": "User not found",
  "data": null
}
```

---

### POST /users

สร้างผู้ใช้ใหม่

**Authentication:** ✅ JWT Required

**Request Body:** เหมือนกับ POST /auth/register

**Response 201:** ข้อมูล user ที่สร้างสำเร็จ

---

### PUT /users/:id

อัปเดตข้อมูลผู้ใช้ทั้งหมด (Full Update)

**Authentication:** ✅ JWT Required

**Path Parameter:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | User ID |

**Request Body:** เหมือนกับ POST /users

**Response 200:** ข้อมูล user ที่อัปเดตแล้ว

**Response 404:** User not found

---

### PATCH /users/:id

อัปเดตข้อมูลผู้ใช้บางส่วน (Partial Update)

**Authentication:** ✅ JWT Required

**Path Parameter:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | User ID |

**Request Body:** Field ใดก็ได้จาก CreateUserDto (ทั้งหมด optional)

```json
{
  "position": "Senior Software Engineer",
  "department": "Platform"
}
```

**Response 200:** ข้อมูล user ที่อัปเดตแล้ว

**Response 404:** User not found

---

### DELETE /users/:id

ลบผู้ใช้

**Authentication:** ✅ JWT Required

**Path Parameter:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | User ID |

**Response 200:**

```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": null
}
```

**Response 404:** User not found

---

## 3. Organizations

> ทุก endpoint ต้องการ JWT Token

### GET /organizations

ดึงข้อมูลองค์กรทั้งหมด

**Authentication:** ✅ JWT Required

**Response 200:**

```json
{
  "success": true,
  "message": "Organizations retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "name": "Acme Corporation",
      "registrationNumber": "TH-1234567",
      "description": "A leading technology company.",
      "industry": "Technology",
      "type": "CORPORATE",
      "status": "ACTIVE",
      "website": "https://acme.com",
      "email": "contact@acme.com",
      "phone": "+66212345678",
      "address": "123 Main Street",
      "city": "Bangkok",
      "country": "Thailand",
      "foundedDate": "2010-06-01",
      "numberOfEmployees": 500,
      "taxId": "TAX-0000000000",
      "createdAt": "2025-03-05T00:00:00.000Z",
      "updatedAt": "2025-03-05T00:00:00.000Z"
    }
  ]
}
```

---

### GET /organizations/:id

ดึงข้อมูลองค์กรตาม ID

**Authentication:** ✅ JWT Required

**Path Parameter:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Organization ID |

**Response 200:** ข้อมูลองค์กรรายเดียว

**Response 404:**

```json
{
  "success": false,
  "message": "Organization not found",
  "data": null
}
```

---

### POST /organizations

สร้างองค์กรใหม่

**Authentication:** ✅ JWT Required

**Request Body:**

```json
{
  "name": "Acme Corporation",
  "registrationNumber": "TH-1234567",
  "description": "A leading technology company.",
  "industry": "Technology",
  "type": "CORPORATE",
  "status": "ACTIVE",
  "website": "https://acme.com",
  "email": "contact@acme.com",
  "phone": "+66212345678",
  "address": "123 Main Street",
  "city": "Bangkok",
  "country": "Thailand",
  "foundedDate": "2010-06-01",
  "numberOfEmployees": 500,
  "logo": "https://cdn.acme.com/logo.png",
  "taxId": "TAX-0000000000"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | ชื่อองค์กร |
| `registrationNumber` | string | ✅ | หมายเลขทะเบียนองค์กร |
| `description` | string | ✅ | คำอธิบายองค์กร |
| `industry` | string | ✅ | อุตสาหกรรม |
| `type` | OrganizationType enum | ✅ | ประเภทองค์กร |
| `website` | string (URL) | ✅ | เว็บไซต์ |
| `email` | string (email) | ✅ | อีเมลองค์กร |
| `phone` | string | ✅ | เบอร์โทรศัพท์ |
| `address` | string | ✅ | ที่อยู่ |
| `city` | string | ✅ | เมือง |
| `country` | string | ✅ | ประเทศ |
| `foundedDate` | string (YYYY-MM-DD) | ✅ | วันที่ก่อตั้ง |
| `numberOfEmployees` | number | ✅ | จำนวนพนักงาน |
| `taxId` | string | ✅ | เลขประจำตัวผู้เสียภาษี |
| `status` | OrganizationStatus enum | ❌ | สถานะ (default: ACTIVE) |
| `logo` | string | ❌ | URL โลโก้องค์กร |

**Response 201:** ข้อมูลองค์กรที่สร้างสำเร็จ

---

### PUT /organizations/:id

อัปเดตข้อมูลองค์กรทั้งหมด (Full Update)

**Authentication:** ✅ JWT Required

**Path Parameter:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Organization ID |

**Request Body:** เหมือนกับ POST /organizations

**Response 200:** ข้อมูลองค์กรที่อัปเดตแล้ว

**Response 404:** Organization not found

---

### PATCH /organizations/:id

อัปเดตข้อมูลองค์กรบางส่วน (Partial Update)

**Authentication:** ✅ JWT Required

**Path Parameter:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Organization ID |

**Request Body:** Field ใดก็ได้จาก CreateOrganizationDto (ทั้งหมด optional)

```json
{
  "numberOfEmployees": 600,
  "status": "INACTIVE"
}
```

**Response 200:** ข้อมูลองค์กรที่อัปเดตแล้ว

**Response 404:** Organization not found

---

### DELETE /organizations/:id

ลบองค์กร

**Authentication:** ✅ JWT Required

**Path Parameter:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Organization ID |

**Response 200:**

```json
{
  "success": true,
  "message": "Organization deleted successfully",
  "data": null
}
```

**Response 404:** Organization not found

---

## Enum Reference

### UserRole

| Value | ความหมาย |
|-------|----------|
| `ADMIN` | ผู้ดูแลระบบ |
| `MANAGER` | ผู้จัดการ |
| `STAFF` | พนักงานทั่วไป |

### UserStatus

| Value | ความหมาย |
|-------|----------|
| `ACTIVE` | ใช้งานอยู่ |
| `INACTIVE` | ไม่ได้ใช้งาน |
| `SUSPENDED` | ถูกระงับการใช้งาน |

### OrganizationType

| Value | ความหมาย |
|-------|----------|
| `CORPORATE` | บริษัทเอกชน |
| `NGO` | องค์กรไม่แสวงหากำไร |
| `STARTUP` | สตาร์ทอัพ |
| `GOVERNMENT` | หน่วยงานรัฐบาล |
| `EDUCATION` | สถาบันการศึกษา |
| `HEALTHCARE` | สถานพยาบาล |

### OrganizationStatus

| Value | ความหมาย |
|-------|----------|
| `ACTIVE` | ดำเนินการอยู่ |
| `INACTIVE` | หยุดดำเนินการชั่วคราว |
| `SUSPENDED` | ถูกระงับ |
| `ARCHIVED` | ปิดกิจการแล้ว |
