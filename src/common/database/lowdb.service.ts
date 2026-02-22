import { Injectable, OnModuleInit } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { User } from '../../modules/user/entities/user.entity';
import { Organization } from '../../modules/organization/entities/organization.entity';
import { BaseEntity } from '../interfaces/base-entity';

type DBSchema = {
	users: User[];
	organizations: Organization[];
};

@Injectable()
export class LowdbService implements OnModuleInit {
	private filePath = join(process.cwd(), 'data', 'db.json');
	private data: DBSchema = { users: [], organizations: [] };

	async onModuleInit() {
		await this.ensureDbFile();
		await this.read();
	}

	private async ensureDbFile() {
		try {
			await fs.access(this.filePath);
		} catch (e) {
			// create directory and file
			await fs.mkdir(join(process.cwd(), 'data'), { recursive: true });
			await fs.writeFile(this.filePath, JSON.stringify(this.data, null, 2), 'utf-8');
		}
	}

	private async read() {
		const raw = await fs.readFile(this.filePath, 'utf-8');
		try {
			const parsed = JSON.parse(raw) as DBSchema;
			this.data = {
				users: Array.isArray(parsed.users) ? parsed.users : [],
				organizations: Array.isArray(parsed.organizations) ? parsed.organizations : [],
			};
		} catch (e) {
			this.data = { users: [], organizations: [] };
		}
	}

	private async write() {
		await fs.writeFile(this.filePath, JSON.stringify(this.data, null, 2), 'utf-8');
	}

	// Generic helpers
	async getAll<T extends keyof DBSchema>(collection: T): Promise<DBSchema[T]> {
		await this.read();
		return this.data[collection];
	}

	async findById<T extends keyof DBSchema>(collection: T, id: string): Promise<DBSchema[T][number] | null> {
		await this.read();
		const records = this.data[collection] as BaseEntity[];
		return (records.find((r) => r.id === id) as DBSchema[T][number]) ?? null;
	}

	async insert<T extends keyof DBSchema>(collection: T, item: DBSchema[T][number]): Promise<DBSchema[T][number]> {
		await this.read();
		const arr = this.data[collection] as BaseEntity[];
		arr.push(item as BaseEntity);
		await this.write();
		return item;
	}

	async update<T extends keyof DBSchema>(
		collection: T,
		id: string,
		patch: Partial<DBSchema[T][number]>,
	): Promise<DBSchema[T][number] | null> {
		await this.read();
		const arr = this.data[collection] as BaseEntity[];
		const idx = arr.findIndex((r) => r.id === id);
		if (idx === -1) return null;
		arr[idx] = { ...arr[idx], ...patch };
		await this.write();
		return arr[idx] as DBSchema[T][number];
	}

	async remove<T extends keyof DBSchema>(collection: T, id: string): Promise<boolean> {
		await this.read();
		const arr = this.data[collection] as BaseEntity[];
		const idx = arr.findIndex((r) => r.id === id);
		if (idx === -1) return false;
		arr.splice(idx, 1);
		await this.write();
		return true;
	}
}
