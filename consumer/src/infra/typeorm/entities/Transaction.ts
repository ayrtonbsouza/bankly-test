import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('transactions')
export class Transaction {
  @PrimaryColumn()
  id?: string;

  @Column()
  accountOrigin: string;

  @Column()
  accountDestination: string;

  @Column()
  status?: string;

  @Column()
  error?: string;

  @Column()
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
    if (!this.status) {
      this.status = 'In Queue';
    }
  }
}
