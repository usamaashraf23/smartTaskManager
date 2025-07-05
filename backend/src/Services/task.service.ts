import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { Task, TaskDocument } from 'src/Models/task.model';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new this.taskModel(createTaskDto);
    return task.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async update(id: string, update: Partial<Task>): Promise<Task | null> {
    return this.taskModel.findByIdAndUpdate(id, update, { new: true });
  }

  async delete(id: string): Promise<any> {
    return this.taskModel.findByIdAndDelete(id);
  }
}
