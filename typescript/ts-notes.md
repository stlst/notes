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
