import { AppPage } from "./app.po";
import { readFileSync } from "fs";

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

  describe("Q003", () => {
    it("should output word count", async () => {
      await page.navigateTo();
      expect(await page.getConsoleText()).toEqual("");

      // fileの内容を一次元配列で取得
      const fileContent:Array<string> = (() => {
        const twoDimensionalArray = readFileSync("src/assets/q003.txt")
        .toString()
        .split("\n")
        .map((line) =>
          line.split(" ").map((src) => {
            let replacedString = src.replace(/\.|,|;|–/, "").replace(/\'/, "’");
            return replacedString === "I"
              ? replacedString
              : replacedString.toLowerCase();
          })
        );
        return new Array<string>().concat(...twoDimensionalArray);
      })();

      // exec
      await page.execQuestion("Q003");

      // check
      const consoleText: Array<string> = (await page.getConsoleText()).split("\n");
      expect(consoleText[0]).toEqual('"Q003"を開始します。');
      let str1 = consoleText[1];
      consoleText[1] = consoleText[2];
      consoleText[2] = str1;
      let beforePointArr: Array<number> = [];
      for(let i = 1; i < consoleText.length - 1; i++) {
        const [word, count] = consoleText[i].split("=");
        const pointArr: Array<number> = [];
        for(let j = 0; j < word.length; j++) {
          pointArr.push((word as string).toLowerCase().codePointAt(j) || -1);
        }
        for(let j = 0; j < pointArr.length; j++) {
          if(typeof beforePointArr[j] === 'undefined' || beforePointArr[j] < pointArr[j]) {
            j = pointArr.length;
          } else if(pointArr[j] < beforePointArr[j] || pointArr.length < j+1) {
            fail(`The order is different. before:${consoleText[i - 1]}, current:${consoleText[i]}`)
          }
        }
        expect(count).toEqual(`${fileContent.filter(el => el === word).length}`);
        beforePointArr = pointArr;
      }
      expect(consoleText[consoleText.length - 1]).toEqual(
        '"Q003"が終了しました。'
      );
    });
  });

  describe("Q004", () => {
    it("should output sort calculating quantity", async () => {
      await page.navigateTo();
      expect(await page.getConsoleText()).toEqual("");

      // exec
      await page.execQuestion("Q004");

      // check
      const consoleText: Array<string> = (await page.getConsoleText()).split("\n");
      expect(consoleText[0]).toEqual('"Q004"を開始します。');
      const sortStr = consoleText[1];
      expect(sortStr).toContain("ソートOK: ");
      // 比較回数 n(n-1)/2 = 4950
      expect(sortStr).toContain("比較=4950");
      // 入れ替え 0 <= 4950
      let exchangeCount: number = Number.parseInt(sortStr.substring(sortStr.lastIndexOf("=")+1, sortStr.length));
      expect(0 <= exchangeCount && exchangeCount <= 4950).toBeTruthy();
      expect(consoleText[consoleText.length - 1]).toEqual('"Q004"が終了しました。');
    });
  });
});
