import { AppPage } from "./app.po";

describe("workspace-project App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should display welcome message", () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual("Welcome to app!");
  });

  describe("Q001", () => {
    it("should display hello world", async () => {
      await page.navigateTo();
      expect(await page.getConsoleText()).toEqual("");
      await page.execQuestion("Q001");
      expect(await page.getConsoleText()).toEqual(
        '"Q001"を開始します。\nHello World.\n"Q001"が終了しました。'
      );
    });
  });

  describe("Q002", () => {
    it("should output the data sorted in ascending order by id", async () => {
      await page.navigateTo();
      expect(await page.getConsoleText()).toEqual("");
      await page.execQuestion("Q002");
      expect(await page.getConsoleText()).toEqual(
        '"Q002"を開始します。\n' +
          "1,伊藤\n2,井上\n3,加藤\n4,木村\n5,小林\n6,斉藤\n7,佐々木\n8,佐藤\n9,清水\n10,鈴木\n" +
          "11,高橋\n12,田中\n13,中村\n14,林\n15,松本\n16,山口\n17,山田\n18,山本\n19,吉田\n20,渡辺\n" +
          '"Q002"が終了しました。'
      );
    });
  });
});
