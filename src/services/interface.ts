export interface IServiceMethods<T> {
	findAll(): Promise<T[]>;
	findById(id: string): Promise<T>;
	findOne(id: string): Promise<T>;
	findByIdAndDelete(id: string): Promise<T>;
	findByIdAndUpdate(id: string, param: any): Promise<T>;
	create(element: T): Promise<T>;
}
