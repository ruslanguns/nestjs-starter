import { InternalServerErrorException } from '@nestjs/common';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { MongoError } from 'mongodb';
import { DocumentQuery, Types, Query } from 'mongoose';
import { BaseModel } from '../models';

type QueryList<T extends BaseModel> = DocumentQuery<
    Array<DocumentType<T>>,
    DocumentType<T>
>;
type QueryItem<T extends BaseModel> = DocumentQuery<
    DocumentType<T>,
    DocumentType<T>
>;

export abstract class BaseService<T extends BaseModel> {
    protected model: ReturnModelType<AnyParamConstructor<T>>;

    protected constructor(model: ReturnModelType<AnyParamConstructor<T>>) {
        this.model = model;
    }

    // TODO: Create exception for InternalServerErrror
    protected static throwMongoError(err: MongoError): void {
        throw new InternalServerErrorException(err, err.errmsg || err.message);
    }

    protected static toObjectId(id: string): Types.ObjectId {
        try {
            return Types.ObjectId(id);
        } catch (e) {
            this.throwMongoError(e);
        }
    }

    createModel(doc?: Partial<T>): T {
        return new this.model(doc);
    }

    findAll(filter = {}): QueryList<T> {
        return this.model.find(filter);
    }

    async findAllAsync(filter = {}): Promise<Array<DocumentType<T>>> {
        try {
            return await this.findAll(filter).exec();
        } catch (e) {
            BaseService.throwMongoError(e);
        }
    }

    findOne(filter = {}): QueryItem<T> {
        return this.model.findOne(filter);
    }

    async findOneAsync(filter = {}): Promise<DocumentType<T>> {
        try {
            return await this.findOne(filter).exec();
        } catch (e) {
            BaseService.throwMongoError(e);
        }
    }

    findById(id: string): QueryItem<T> {
        return this.model.findById(BaseService.toObjectId(id));
    }

    async findByIdAsync(id: string): Promise<DocumentType<T>> {
        try {
            return await this.findById(id).exec();
        } catch (e) {
            BaseService.throwMongoError(e);
        }
    }

    async create(item: T): Promise<DocumentType<T>> {
        try {
            return await this.model.create(item);
        } catch (e) {
            BaseService.throwMongoError(e);
        }
    }

    delete(filter = {}): QueryItem<T> {
        return this.model.findOneAndDelete(filter);
    }

    async deleteAsync(filter = {}): Promise<DocumentType<T>> {
        try {
            return await this.delete(filter).exec();
        } catch (e) {
            BaseService.throwMongoError(e);
        }
    }

    deleteById(id: string): QueryItem<T> {
        return this.model.findByIdAndDelete(BaseService.toObjectId(id));
    }

    async deleteByIdAsync(id: string): Promise<DocumentType<T>> {
        try {
            return await this.deleteById(id).exec();
        } catch (e) {
            BaseService.throwMongoError(e);
        }
    }

    update(item: T): QueryItem<T> {
        return this.model.findByIdAndUpdate(
            BaseService.toObjectId(item.id),
            item,
            {
                new: true,
            },
        );
    }

    async updateAsync(item: T): Promise<DocumentType<T>> {
        try {
            return await this.update(item).exec();
        } catch (e) {
            BaseService.throwMongoError(e);
        }
    }

    count(filter = {}): Query<number> {
        return this.model.count(filter);
    }

    async countAsync(filter = {}): Promise<number> {
        try {
            return await this.count(filter);
        } catch (e) {
            BaseService.throwMongoError(e);
        }
    }
}
