export interface IServiceMethods<T> {
	findAll(): Promise<T[]>;
	find(id: string): Promise<T>;
	findAndDelete(id: string): Promise<void>;
	update(element: T): Promise<T>;
	create(element: T): Promise<T>;
}
