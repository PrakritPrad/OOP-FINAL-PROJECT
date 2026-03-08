# OOP Final Project - User & Organization Management System

## Project Overview

โปรเจคนี้เป็นระบบ Backend REST API สำหรับจัดการผู้ใช้งานและองค์กร พัฒนาด้วย NestJS Framework และ TypeScript โดยเป็นส่วนหนึ่งของ Final Project รายวิชา Object-Oriented Programming

ระบบนี้ประกอบด้วย 3 ส่วนหลัก ได้แก่

- Authentication: ระบบสมัครสมาชิก เข้าสู่ระบบ และตรวจสอบสิทธิ์ด้วย JWT
- Users Management: ระบบจัดการข้อมูลผู้ใช้งาน เช่น สร้าง แก้ไข ลบ และดูรายละเอียดผู้ใช้
- Organizations Management: ระบบจัดการข้อมูลองค์กร เช่น สร้าง แก้ไข ลบ และดูรายละเอียดองค์กร

ระบบใช้การจำลองฐานข้อมูลด้วยไฟล์ JSON ผ่าน lowdb และมี Swagger สำหรับดูเอกสารและทดสอบ API

Base URL: `http://localhost:3000`

Swagger: `http://localhost:3000/api`

## ผู้จัดทำ

- ประกฤษฎิ์ ขวัญพัทลุง 68010653
- พลอินทุ์ เขมปัญญานุรักษ์ 68010756
- สิรภัทร ทรัพย์เอนก 68011141

## Technology Stack

- Framework: NestJS
- Language: TypeScript
- API Style: REST API
- Database: JSON-based database ด้วย lowdb
- Authentication: Passport JWT และ bcrypt
- API Documentation: Swagger (OpenAPI)
- Validation: class-validator และ class-transformer
- Testing: Jest และ Supertest

## การติดตั้งและรันโปรเจค

ติดตั้ง Dependencies

```bash
npm install
```

รัน Development Server

```bash
npm run start:dev
```

เมื่อ Server ทำงานแล้ว สามารถเข้าไปดูเอกสารและทดสอบ API ได้ที่ `http://localhost:3000/api`

## Project Structure

```text
.
├── data/
│   └── db.json
├── docs/
│   ├── api-specification.md
│   ├── data-model.md
│   └── uml-diagram.png
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── common/
│   │   ├── database/
│   │   ├── interfaces/
│   │   └── utils/
│   └── modules/
│       ├── auth/
│       ├── organization/
│       └── user/
├── test/
├── package.json
├── tsconfig.json
└── README.md
```

สรุปการทำงานโดยย่อ

- `auth` จัดการ register, login และตรวจสอบ Bearer Token
- `user` จัดการข้อมูลผู้ใช้งาน พร้อมตรวจข้อมูลซ้ำและซ่อนรหัสผ่านจาก response
- `organization` จัดการข้อมูลองค์กร พร้อมตรวจ `registrationNumber` ไม่ให้ซ้ำ
- `common` รวม service กลางสำหรับฐานข้อมูล, interface และ utility ของระบบ
- `data/db.json` ใช้เก็บข้อมูลจริงของระบบในรูปแบบ JSON

## เอกสารทางเทคนิค

สามารถดูรายละเอียดเพิ่มเติมในโฟลเดอร์ `docs/` ได้ที่

- API Specification: [docs/api-specification.md](docs/api-specification.md)
- Data Model Documentation: [docs/data-model.md](docs/data-model.md)
- UML Diagram: [docs/uml-diagram.png](docs/uml-diagram.png)
