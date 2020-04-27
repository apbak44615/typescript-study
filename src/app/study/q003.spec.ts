import { Q003 } from "./q003";

describe("q003", () => {
  it("should output word count", async () => {
    let testConsole: any = {
      println: () => {},
    };
    let spy = spyOn(testConsole, "println");
    let q003: Q003 = new Q003(testConsole);
    q003["fileData"] = {
      fileName: "testxxx",
      content:
        "Life isn’t about finding yourself. Life is about creating yourself.\n" +
        "The most important thing in communication is hearing what isn't said.\n" +
        "I walk slowly, but I never walk backward.",
    };
    // exercise
    await q003.main();

    // verify
    expect(testConsole.println.calls.count()).toBe(22);
    [
      "about=2",
      "backward=1",
      "but=1",
      "communication=1",
      "creating=1",
      "finding=1",
      "hearing=1",
      "I=2",
      "important=1",
      "in=1",
      "is=2",
      "isn’t=2",
      "life=2",
      "most=1",
      "never=1",
      "said=1",
      "slowly=1",
      "the=1",
      "thing=1",
      "walk=2",
      "what=1",
      "yourself=2",
    ].forEach(str => expect(testConsole.println).toHaveBeenCalledWith(str));
  });
});
