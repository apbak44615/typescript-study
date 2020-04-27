import { Q004 } from "./q004";

describe("q004", () => {
  it("should output sort calculating quantity", async () => {
    let testConsole: any = {
      println: () => {},
    };
    spyOn(testConsole, "println");
    let q004: Q004 = new Q004(testConsole);
    // exercise
    await q004.main();

    // verify
    expect(testConsole.println.calls.count()).toBe(1);
    const arg: string = testConsole.println.calls.argsFor(0)[0];
    expect(arg).toContain("ソートOK: ");
    // 比較回数 n(n-1)/2 = 4950
    expect(arg).toContain("比較=4950");
    // 入れ替え 0 <= 4950
    let exchangeCount: number = Number.parseInt(arg.substring(arg.lastIndexOf("=")+1, arg.length));
    expect(0 <= exchangeCount && exchangeCount <= 4950).toBeTruthy();
  });
});
