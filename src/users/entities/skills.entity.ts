import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Skill {
  @Prop()
  readonly name: string;
  @Prop()
  readonly color: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
