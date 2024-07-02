import { Injectable } from '@nestjs/common';
import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';

@Injectable()
export class PluralNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  public tableName(targetName: string, userSpecifiedName: string | undefined): string {
    if (userSpecifiedName) return userSpecifiedName;
    else return `${targetName}s`;
  }
}
