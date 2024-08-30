declare global {

  type Constructor<T> = new (...arg: any[]) => T;
  type EnumValues<T> = T[keyof T];

  type Split<S extends string, D extends string> =
    string extends S ? string[] :
      S extends '' ? [] :
        S extends `${infer T}${D}${infer U}` ? [T, ...Split<U, D>] : [S];

  type SplitUnion<S extends string, D extends string> =
    string extends S ? never :
      S extends '' ? never :
        S extends `${infer T}${D}${infer U}` ? T | SplitUnion<U, D> : S

}

declare global {
  interface String {
    words: string[];
    capitalize(): string;
    kebabize(): string;
    slugify(): string;
    camelize(): string;
    split<T extends string, U extends string>(this: T, delimiter: U): Split<T, U>;
    split(delimiter: RegExp): string[];
  }
}

export { }