import { Request, Response, RequestHandler as Middleware } from 'express';

export enum Method {
	GET = 'get',
	HEAD = 'head',
	POST = 'post',
	PUT = 'put',
	DELETE = 'delete',
	CONNECT = 'connect',
	OPTIONS = 'options',
	TRACE = 'trace',
	PATCH = 'patch',
}

export type Handler = (req: Request, res: Response, message?: string) => any;

export type Route = {
	method: Method;
	path: string;
	middleware: Middleware[];
	handler: any;
};
