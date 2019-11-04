### [模块化模拟 （module mock）](https://www.jianshu.com/p/5551541d2b6d)

可以模块中的部分函数进行模拟，官方栗子：

**注意！**

模块的 mock 要放在测试的最外层，即不被任何`describe`或者`test`包裹。

以下这种 mock 对模拟模块的`default export`函数很有效。但是不能在测试过程中动态修改 mock 返回的内容

```js
import defaultExport, { apple, strawberry } from "../fruit";

jest.mock("../fruit", () => {
  const originalModule = require.requireActual("../fruit");
  const mockedModule = jest.genMockFromModule("../fruit");

  //Mock the default export and named export 'apple'.
  return Object.assign({}, mockedModule, originalModule, {
    apple: "mocked apple",
    default: jest.fn(() => "mocked fruit")
  });
});

it("does a partial mock", () => {
  const defaultExportResult = defaultExport();
  expect(defaultExportResult).toBe("mocked fruit");
  expect(defaultExport).toHaveBeenCalled();

  expect(apple).toBe("mocked apple");
  expect(strawberry()).toBe("strawberry");
});
```

以上代码只模拟了 fruit 中的 default 与 apple 函数，保留了其他函数

也可以在一个文件中对相同的模块做不同的模拟，栗子：

**但是！**

如果是测试的函数内部依赖了另一个模块的某函数,则不能用以下方法进行相同模块的不同模拟

```js
describe("define mock per test", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("uses mocked module", () => {
    jest.doMock("../fruit", () => ({
      apple: "mocked apple",
      default: jest.fn(() => "mocked fruit"),
      strawberry: jest.fn(() => "mocked strawberry")
    }));
    const { apple, strawberry, default: defaultExport } = require("../fruit");

    const defaultExportResult = defaultExport();
    expect(defaultExportResult).toBe("mocked fruit");
    expect(defaultExport).toHaveBeenCalled();

    expect(apple).toBe("mocked apple");
    expect(strawberry()).toBe("mocked strawberry");
  });

  it("uses actual module", () => {
    jest.dontMock("../fruit");
    const { apple, strawberry, default: defaultExport } = require("../fruit");

    const defaultExportResult = defaultExport();
    expect(defaultExportResult).toBe("banana");

    expect(apple).toBe("apple");
    expect(strawberry()).toBe("strawberry");
  });
});
```
