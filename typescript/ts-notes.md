### Solution to TS7017

> Element implicitly has an 'any' type because type '{ DEV: { key: string; url: string; }; ST: { key: string; url: string; }; UAT: { key: string; url: string; }; PROD: { key: string; url: string; }; }' has no index signature.ts(7017)

```js
export const SYS_ENV = {
  DEV: { key: 'DEV', url: 'hello' },
  ST: { key: 'ST', url: 'hello' },
  UAT: { key: 'UAT', url: 'hello' },
  PROD: { key: 'PROD', url: 'hello' }
} as { [key: string]: { key: string; url: string } };

export const getSysEnv = (env: string) => {
  return SYS_ENV[env];
};
```

Or, you can add `suppressImplicitAnyIndexErrors: true`in `tsconfig` to skip this warning.

### enum in Typescript

- [Ref](https://ts.xcatliu.com/advanced/enum)
- [Typescript_Playground](<https://www.typescriptlang.org/play/index.html#src=enum%20Days%20%7B%20Sun%20%3D%207%2C%20Mon%20%3D%201%2C%20Tue%2C%20Wed%2C%20Thu%2C%20Fri%2C%20Sat%20%7D%3B%0D%0A%0D%0Aalert(Days%5BDays.Mon%5D%2B%22%20%22%2BDays.Mon)>)

简单的例子

枚举使用 enum 关键字来定义：
`enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};`

枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：

```js
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true
```

事实上，上面的例子会被编译为：

```js
var Days;
(function (Days) {
  Days[(Days["Sun"] = 0)] = "Sun";
  Days[(Days["Mon"] = 1)] = "Mon";
  Days[(Days["Tue"] = 2)] = "Tue";
  Days[(Days["Wed"] = 3)] = "Wed";
  Days[(Days["Thu"] = 4)] = "Thu";
  Days[(Days["Fri"] = 5)] = "Fri";
  Days[(Days["Sat"] = 6)] = "Sat";
})(Days || (Days = {}));
```

## 20200809 update

[An index signature parameter type cannot be a union type. Consider using a mapped object type ins...](https://www.jianshu.com/p/9cd6ba509515)
希望一个类型的键值是联合类型中固定的几个:

```ts
const enum INFO_KEYS {
  TEL = "tel",
  AGE = "age",
}
// or
// type IInfoKeys = 'tel' | 'age';

interface IAreaInfo {
  area_id: number;
  area_name: string;
}

export type IPersonnalInfo = {
  [key in INFO_KEYS]: number; // or [key in IInfoKeys]: number;
} &
  IAreaInfo;
```
