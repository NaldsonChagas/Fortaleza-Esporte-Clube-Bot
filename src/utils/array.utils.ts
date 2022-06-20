export class ArrayUtils {
  public static returnRandomItem<Type>(array: Array<Type>): Type {
    return array[Math.floor(Math.random() * array.length)];
  }
}
