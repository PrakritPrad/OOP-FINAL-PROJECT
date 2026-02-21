import { Injectable, OnModuleInit } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

type DBSchema = {
	users: any[];
	organizations: any[];
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
	async getAll<T extends keyof DBSchema>(collection: T) {
		await this.read();
		return this.data[collection] as DBSchema[T];
	}

	async findById<T extends keyof DBSchema>(collection: T, id: string) {
		await this.read();
		return (this.data[collection] as any[]).find((r) => r.id === id) || null;
	}

	async insert<T extends keyof DBSchema>(collection: T, item: any) {
		await this.read();
		(this.data[collection] as any[]).push(item);
		await this.write();
		return item;
	}

	async update<T extends keyof DBSchema>(collection: T, id: string, patch: Partial<any>) {
		await this.read();
		const arr = this.data[collection] as any[];
		const idx = arr.findIndex((r) => r.id === id);
		if (idx === -1) return null;
		arr[idx] = { ...arr[idx], ...patch };
		await this.write();
		return arr[idx];
	}

	async remove<T extends keyof DBSchema>(collection: T, id: string) {
		await this.read();
		const arr = this.data[collection] as any[];
		const idx = arr.findIndex((r) => r.id === id);
		if (idx === -1) return false;
		arr.splice(idx, 1);
		await this.write();
		return true;
	}
}
