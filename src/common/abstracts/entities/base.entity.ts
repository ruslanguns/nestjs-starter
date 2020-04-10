import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export type Constructor<T = {}> = new (...args: any[]) => T;

/**
 * This is an empty class entity
 */
export class EmptyEntity {}

/**
 * This abstract class includes ID as a Primary Key
 * @param Base Class which plans to extends from AbstractBase
 */
export function EntityBase<TBase extends Constructor>(Base: TBase) {
  abstract class AbstractBase extends Base {
    @PrimaryGeneratedColumn()
    id: number;
  }

  return AbstractBase;
}

/**
 * This abstract function includes CreatedAt && UpdatedAt timestamps can attach another class as parameter
 * @param Base Class which plans to extends from AbstractBase
 */
export function EntityBaseWithDate<TBase extends Constructor>(Base: TBase) {
  abstract class AbstractBase extends Base {
    @CreateDateColumn({
      type: 'timestamp',
      nullable: true,
      default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;

    @UpdateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
      onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date;
  }

  return AbstractBase;
}
