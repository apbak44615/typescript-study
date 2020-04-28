import { Q006 } from "./q006";

describe("q006", () => {
  [
    ["3 1.1 0.9 + 2.0 * -", "-1"], // サンプルの問題
    ["2 2 + 8 4 - + 1 4 * 16 4 / + +", "16"], // 四則演算が全て含まれる
    ["1 1.1 +", "2.1"], // アウトプットが実数
    ["-1 -5 +", "-6"] // 負の数字の演算
  ].forEach(([input, output]) => {
    it(`should output the calculation result input=${input}`, async () => {
      let testConsole: any = {
        print: () => {},
        readLine: () => {},
        println: () => {},
      };
      spyOn(testConsole, "readLine").and.returnValues(
        new Promise((resolve, reject) => {
          resolve(input);
        }),
        new Promise((resolve, reject) => {
          resolve("exit");
        })
      );
      spyOn(testConsole, "print");
      spyOn(testConsole, "println");
      // exercise
      await new Q006(testConsole).main();

      // verify
      expect(testConsole.print).toHaveBeenCalledTimes(2);
      expect(testConsole.print).toHaveBeenCalledWith("> ");
      expect(testConsole.readLine).toHaveBeenCalledTimes(2);
      expect(testConsole.println).toHaveBeenCalledTimes(1);
      expect(testConsole.println).toHaveBeenCalledWith(output);
    });
  });
});
