import { Transform, TransformFnParams } from 'class-transformer';
import { IsString, IsEmail, Length, IsNumber } from 'class-validator';

export class QueryGetUserDto {
	@IsString()
	@IsEmail()
	@Transform((data: TransformFnParams) => (data.value as string).toLowerCase())
	email!: string;

	@IsNumber()
	@Length(6,6)
	number?: string;
}