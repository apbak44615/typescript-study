import { Q005 } from "./q005";

describe("q005", () => {
  it("work time should be aggregated and output by field", async () => {
    let testConsole: any = {
      println: () => {},
    };
    spyOn(testConsole, "println");
    let q005: Q005 = new Q005(testConsole);
    q005["fileData"] = {
      fileName: "testxxx",
      content:
        "社員番号,部署名,役職名,P-CODE,作業時間\n" +
        "194033,３事本 １事 開発推進,部長,Z-7-31100,10775\n" +
        "195052,３事本 １事 開発推進 １課,課長,I-7-31100,65\n" +
        "195052,３事本 １事 開発推進 １課,課長,T-7-30002,3848\n" +
        "195052,３事本 １事 開発推進 １課,課長,T-7-31001,7140",
    };
    // exercise
    await q005.main();

    // verify
    expect(testConsole.println.calls.count()).toBe(8);
    [
        "部長: 179時間35分",
        "課長: 184時間13分",
        "Z-7-31100: 179時間35分",
        "I-7-31100: 1時間5分",
        "T-7-30002: 64時間8分",
        "T-7-31001: 119時間0分",
        "194033: 179時間35分",
        "195052: 184時間13分",
    ].forEach((arg) =>
      expect(testConsole.println).toHaveBeenCalledWith(arg)
    );
  });
});
