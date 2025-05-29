export interface IStore<TValue> {

	namespace(name: string): void;

	get(key: string): Promise<Record<string, TValue>>;

	set(key: string, value: TValue): Promise<Record<string, TValue>>;

	close(): void;
}
